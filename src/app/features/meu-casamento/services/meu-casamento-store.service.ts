import { Injectable, Inject, PLATFORM_ID, computed, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  BudgetItem,
  EMPTY_WEDDING_STATE,
  FavoriteItem,
  GuestItem,
  MeuCasamentoState,
  PendingDeleteIntent,
  SyncQueueItem,
  WeddingProfile,
  WeddingRestorePayload
} from '../meu-casamento.models';

const STORAGE_KEY = 'gn_meu_casamento_state';
const DELETE_INTENT_KEY = 'gn_meu_casamento_delete_intent';

@Injectable({
  providedIn: 'root'
})
export class MeuCasamentoStoreService {
  private readonly isBrowser: boolean;
  private readonly stateSignal = signal<MeuCasamentoState>(EMPTY_WEDDING_STATE(this.generateUuid()));

  readonly state = this.stateSignal.asReadonly();
  readonly profile = computed(() => this.stateSignal().profile);
  readonly checklist = computed(() => this.stateSignal().checklist);
  readonly guests = computed(() => this.stateSignal().guests.filter(guest => guest.syncState !== 'deleted'));
  readonly allGuests = computed(() => this.stateSignal().guests);
  readonly budget = computed(() => ({
    totalBudget: this.stateSignal().budget.totalBudget,
    items: this.stateSignal().budget.items.filter(item => item.syncState !== 'deleted'),
    updatedAt: this.stateSignal().budget.updatedAt
  }));
  readonly allBudgetItems = computed(() => this.stateSignal().budget.items);
  readonly favorites = computed(() => this.stateSignal().favorites.filter(item => item.syncState !== 'deleted'));
  readonly backupCode = computed(() => this.stateSignal().deviceId);
  readonly availableTools = computed(() => {
    const profile = this.stateSignal().profile;
    return !!profile.brideFirstName.trim() && !!profile.whatsappNumber.trim();
  });

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.load();
  }

  updateProfile(partial: Partial<WeddingProfile>): void {
    const current = this.stateSignal();
    const nextProfile: WeddingProfile = {
      ...current.profile,
      ...partial,
      brideFirstName: (partial.brideFirstName ?? current.profile.brideFirstName).trimStart(),
      whatsappNumber: this.onlyDigits(partial.whatsappNumber ?? current.profile.whatsappNumber),
      estimatedGuests: this.normalizeEstimatedGuests(partial.estimatedGuests ?? current.profile.estimatedGuests),
      weddingDate: this.normalizeWeddingDate(partial.weddingDate ?? current.profile.weddingDate),
      weddingStyle: this.normalizeNullableString(partial.weddingStyle ?? current.profile.weddingStyle),
      groomFirstName: this.normalizeNullableString(partial.groomFirstName ?? current.profile.groomFirstName),
      updatedAt: new Date().toISOString()
    };

    this.patchState({
      profile: nextProfile,
      syncQueue: this.upsertQueue(current.syncQueue, 'profileSync'),
      lastError: null
    });
  }

  replaceChecklist(completedTasks: MeuCasamentoState['checklist']): void {
    const current = this.stateSignal();
    this.patchState({
      checklist: [...completedTasks],
      syncQueue: this.upsertQueue(current.syncQueue, 'checklistSync'),
      lastError: null
    });
  }

  setChecklistTask(taskId: string, completed: boolean): void {
    const current = this.stateSignal();
    const existing = current.checklist.find(task => task.taskId === taskId);
    const nextChecklist = completed
      ? [
          ...current.checklist.filter(task => task.taskId !== taskId),
          { taskId, completedAt: existing?.completedAt ?? new Date().toISOString() }
        ]
      : current.checklist.filter(task => task.taskId !== taskId);

    this.patchState({
      checklist: nextChecklist,
      syncQueue: this.upsertQueue(current.syncQueue, 'checklistSync'),
      lastError: null
    });
  }

  mergeBudgetCategories(categories: Array<{ id: string; nome: string; slug: string }>): void {
    if (!categories.length) return;

    const current = this.stateSignal();
    const existingByCategory = new Map(current.budget.items.map(item => [item.categoryId || item.categorySlug, item]));
    
    // 1. Map all official categories (this ensures they exist)
    const officialItems = categories.map(category => {
      const existing = existingByCategory.get(category.id) ?? existingByCategory.get(category.slug);
      if (existing) {
        return {
          ...existing,
          category: category.slug,
          categoryId: category.id,
          categoryName: category.nome,
          categorySlug: category.slug
        };
      }

      return {
        id: this.generateUuid(),
        category: category.slug,
        categoryId: category.id,
        categoryName: category.nome,
        categorySlug: category.slug,
        allocatedAmount: 0,
        spentAmount: 0,
        supplierName: null,
        notes: null,
        status: 'pending' as const,
        updatedAt: null,
        syncState: 'created' as const
      };
    });

    // 2. Keep any existing items that were NOT in the official categories list (to avoid data loss)
    const officialIds = new Set(categories.map(c => c.id));
    const officialSlugs = new Set(categories.map(c => c.slug));
    
    const extraItems = current.budget.items.filter(item => 
      !officialIds.has(item.categoryId) && 
      !officialSlugs.has(item.categorySlug)
    );

    const mergedItems = [...officialItems, ...extraItems];

    this.patchState({
      budget: {
        ...current.budget,
        items: mergedItems
      }
    });

  }

  setBudgetTotal(totalBudget: number | null): void {
    const current = this.stateSignal();
    this.patchState({
      budget: {
        ...current.budget,
        totalBudget: this.normalizeCurrency(totalBudget),
        updatedAt: new Date().toISOString()
      },
      syncQueue: this.upsertQueue(current.syncQueue, 'budgetSync'),
      lastError: null
    });
  }

  saveBudgetItem(item: Partial<BudgetItem> & Pick<BudgetItem, 'id' | 'categoryId' | 'categoryName' | 'categorySlug'>): void {
    const current = this.stateSignal();
    const existing = current.budget.items.find(entry => entry.id === item.id);
    const nextItem: BudgetItem = {
      id: item.id,
      category: item.category ?? item.categorySlug,
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      categorySlug: item.categorySlug,
      allocatedAmount: this.normalizeCurrency(item.allocatedAmount) ?? 0,
      spentAmount: this.normalizeCurrency(item.spentAmount) ?? 0,
      supplierName: this.normalizeNullableString(item.supplierName),
      notes: this.normalizeNullableString(item.notes),
      status: item.status ?? existing?.status ?? 'pending',
      updatedAt: new Date().toISOString(),
      syncState: existing && existing.syncState !== 'created' ? 'updated' : existing?.syncState ?? 'created'
    };

    this.patchState({
      budget: {
        ...current.budget,
        items: [...current.budget.items.filter(entry => entry.id !== nextItem.id), nextItem],
        updatedAt: new Date().toISOString()
      },
      syncQueue: this.upsertQueue(current.syncQueue, 'budgetSync'),
      lastError: null
    });
  }

  deleteBudgetItem(itemId: string): void {
    const current = this.stateSignal();
    const existing = current.budget.items.find(item => item.id === itemId);
    if (!existing) return;

    const nextItems = existing.syncState === 'created'
      ? current.budget.items.filter(item => item.id !== itemId)
      : current.budget.items.map(item => item.id === itemId ? { ...item, syncState: 'deleted' as const, updatedAt: new Date().toISOString() } : item);

    this.patchState({
      budget: {
        ...current.budget,
        items: nextItems,
        updatedAt: new Date().toISOString()
      },
      syncQueue: this.upsertQueue(current.syncQueue, 'budgetSync'),
      lastError: null
    });
  }

  saveGuest(guest: Partial<GuestItem> & Pick<GuestItem, 'id' | 'name'>): void {
    const current = this.stateSignal();
    const existing = current.guests.find(item => item.id === guest.id);
    const now = new Date().toISOString();
    const nextGuest: GuestItem = {
      id: guest.id,
      name: guest.name.trim(),
      group: guest.group ?? existing?.group ?? 'outros',
      status: guest.status ?? existing?.status ?? 'pending',
      plusOnes: this.normalizePlusOnes(guest.plusOnes ?? existing?.plusOnes ?? 0),
      phone: this.normalizeNullableString(guest.phone),
      notes: this.normalizeNullableString(guest.notes),
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      syncState: existing && existing.syncState !== 'created' ? 'updated' : existing?.syncState ?? 'created'
    };

    this.patchState({
      guests: [...current.guests.filter(item => item.id !== nextGuest.id), nextGuest].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
      syncQueue: this.upsertQueue(current.syncQueue, 'guestsSync'),
      lastError: null
    });
  }

  deleteGuest(guestId: string): void {
    const current = this.stateSignal();
    const existing = current.guests.find(item => item.id === guestId);
    if (!existing) return;

    const nextGuests = existing.syncState === 'created'
      ? current.guests.filter(item => item.id !== guestId)
      : current.guests.map(item => item.id === guestId ? { ...item, syncState: 'deleted' as const, updatedAt: new Date().toISOString() } : item);

    this.patchState({
      guests: nextGuests,
      syncQueue: this.upsertQueue(current.syncQueue, 'guestsSync'),
      lastError: null
    });
  }

  saveFavorite(favorite: Omit<FavoriteItem, 'syncState' | 'createdAt'> & { createdAt?: string | null }): void {
    const current = this.stateSignal();
    const existing = current.favorites.find(item => item.fornecedorId === favorite.fornecedorId);
    const nextFavorite: FavoriteItem = {
      fornecedorId: favorite.fornecedorId,
      fornecedorNome: favorite.fornecedorNome,
      fornecedorSlug: favorite.fornecedorSlug,
      imagemUrl: favorite.imagemUrl ?? null,
      categoriaNome: favorite.categoriaNome ?? null,
      nota: this.normalizeNullableString(favorite.nota),
      createdAt: existing?.createdAt ?? favorite.createdAt ?? new Date().toISOString(),
      syncState: existing && existing.syncState !== 'created' ? 'updated' : existing?.syncState ?? 'created'
    };

    this.patchState({
      favorites: [...current.favorites.filter(item => item.fornecedorId !== nextFavorite.fornecedorId), nextFavorite],
      syncQueue: this.upsertQueue(current.syncQueue, 'favoritesSync'),
      lastError: null
    });
  }

  removeFavorite(fornecedorId: string): void {
    const current = this.stateSignal();
    const existing = current.favorites.find(item => item.fornecedorId === fornecedorId);
    if (!existing) return;

    const nextFavorites = existing.syncState === 'created'
      ? current.favorites.filter(item => item.fornecedorId !== fornecedorId)
      : current.favorites.map(item => item.fornecedorId === fornecedorId ? { ...item, syncState: 'deleted' as const } : item);

    this.patchState({
      favorites: nextFavorites,
      syncQueue: this.upsertQueue(current.syncQueue, 'favoritesSync'),
      lastError: null
    });
  }

  markQueueProcessed(type: SyncQueueItem['type']): void {
    const current = this.stateSignal();
    this.patchState({
      syncQueue: current.syncQueue.filter(item => item.type !== type),
      lastSyncAt: new Date().toISOString(),
      lastError: null
    });
  }

  markGuestsSynced(remoteGuests: GuestItem[]): void {
    this.patchState({
      guests: remoteGuests.map(guest => ({ ...guest, syncState: 'synced' }))
    });
  }

  markBudgetSynced(remoteBudget: MeuCasamentoState['budget']): void {
    const current = this.stateSignal();
    const existingById = new Map(current.budget.items.map(item => [item.id, item]));

    this.patchState({
      budget: {
        ...remoteBudget,
        items: remoteBudget.items.map(item => {
          const existing = existingById.get(item.id);
          return {
            ...item,
            categoryName: item.categoryName || existing?.categoryName || '',
            categorySlug: item.categorySlug || existing?.categorySlug || '',
            category: item.category || existing?.category || '',
            categoryId: item.categoryId || existing?.categoryId || '',
            syncState: 'synced'
          };
        })
      }
    });
  }

  markFavoritesSynced(remoteFavorites: FavoriteItem[]): void {
    this.patchState({
      favorites: remoteFavorites.map(item => ({ ...item, syncState: 'synced' }))
    });
  }

  setError(message: string | null): void {
    this.patchState({ lastError: message });
  }

  replaceFromRestore(payload: WeddingRestorePayload, deviceId?: string): void {
    const current = this.stateSignal();
    this.stateSignal.set({
      deviceId: deviceId ?? current.deviceId,
      profile: payload.profile,
      checklist: payload.checklist,
      guests: payload.guests.map(guest => ({ ...guest, syncState: 'synced' })),
      budget: {
        ...payload.budget,
        items: payload.budget.items.map(item => ({ ...item, syncState: 'synced' }))
      },
      favorites: payload.favorites.map(item => ({ ...item, syncState: 'synced' })),
      syncQueue: [],
      lastSyncAt: new Date().toISOString(),
      lastError: null
    });
    this.persist();
    this.clearPendingDeleteIntent();
  }

  resetLocalData(deviceId?: string): void {
    this.stateSignal.set(EMPTY_WEDDING_STATE(deviceId ?? this.generateUuid()));
    this.persist();
  }

  queueDeleteAllData(): void {
    const current = this.stateSignal();
    this.patchState({
      syncQueue: this.upsertQueue(current.syncQueue, 'deleteAllData')
    });
  }

  savePendingDeleteIntent(intent: PendingDeleteIntent): void {
    if (!this.isBrowser) return;
    localStorage.setItem(DELETE_INTENT_KEY, JSON.stringify(intent));
  }

  getPendingDeleteIntent(): PendingDeleteIntent | null {
    if (!this.isBrowser) return null;
    const raw = localStorage.getItem(DELETE_INTENT_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as PendingDeleteIntent;
    } catch {
      return null;
    }
  }

  clearPendingDeleteIntent(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(DELETE_INTENT_KEY);
  }

  hydrateRemoteProfile(profile: WeddingProfile): void {
    this.patchState({ profile });
  }

  hydrateRemoteChecklist(checklist: MeuCasamentoState['checklist']): void {
    this.patchState({ checklist });
  }

  private patchState(partial: Partial<MeuCasamentoState>): void {
    this.stateSignal.update(current => ({ ...current, ...partial }));
    this.persist();
  }

  private load(): void {
    if (!this.isBrowser) return;

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      this.persist();
      return;
    }

    try {
      const parsed = JSON.parse(raw) as MeuCasamentoState;
      this.stateSignal.set({
        ...EMPTY_WEDDING_STATE(parsed.deviceId || this.generateUuid()),
        ...parsed,
        profile: {
          ...EMPTY_WEDDING_STATE(parsed.deviceId || this.generateUuid()).profile,
          ...parsed.profile,
          whatsappNumber: this.onlyDigits(parsed.profile?.whatsappNumber || '')
        },
        budget: {
          totalBudget: parsed.budget?.totalBudget ?? null,
          items: parsed.budget?.items ?? [],
          updatedAt: parsed.budget?.updatedAt ?? null
        }
      });
    } catch {
      this.resetLocalData();
    }
  }

  private persist(): void {
    if (!this.isBrowser) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.stateSignal()));
  }

  private upsertQueue(queue: SyncQueueItem[], type: SyncQueueItem['type']): SyncQueueItem[] {
    return [...queue.filter(item => item.type !== type), { type, createdAt: new Date().toISOString() }];
  }

  private generateUuid(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, character => {
      const random = Math.random() * 16 | 0;
      const value = character === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }

  private onlyDigits(value: string | null | undefined): string {
    return String(value ?? '').replace(/\D/g, '');
  }

  private normalizeCurrency(value: number | string | null | undefined): number | null {
    if (value === null || value === undefined || value === '') return null;
    const normalized = Number(String(value).replace(',', '.'));
    return Number.isFinite(normalized) ? Number(normalized.toFixed(2)) : null;
  }

  private normalizePlusOnes(value: number | string): number {
    const normalized = Number(value);
    if (!Number.isFinite(normalized)) return 0;
    return Math.max(0, Math.min(10, Math.trunc(normalized)));
  }

  private normalizeEstimatedGuests(value: number | string | null | undefined): number | null {
    if (value === null || value === undefined || value === '') return null;
    const normalized = Math.trunc(Number(value));
    if (!Number.isFinite(normalized)) return null;
    return Math.max(0, Math.min(9999, normalized));
  }

  private normalizeWeddingDate(value: string | null | undefined): string | null {
    if (!value) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const parsed = new Date(value);
    parsed.setHours(0, 0, 0, 0);
    return parsed >= today ? value : null;
  }

  private normalizeNullableString(value: string | null | undefined): string | null {
    const normalized = String(value ?? '').trim();
    return normalized ? normalized : null;
  }
}
