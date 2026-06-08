import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { MeuCasamentoApiService } from './meu-casamento-api.service';
import { MeuCasamentoStoreService } from './meu-casamento-store.service';
import { FavoriteItem, GuestItem, SyncQueueItem, WeddingRestorePayload } from '../meu-casamento.models';

@Injectable({
  providedIn: 'root'
})
export class MeuCasamentoSyncService {
  private readonly isBrowser: boolean;
  private initialized = false;
  private syncing = false;

  constructor(
    private readonly api: MeuCasamentoApiService,
    private readonly store: MeuCasamentoStoreService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async init(): Promise<void> {
    if (!this.isBrowser || this.initialized) return;

    this.initialized = true;
    window.addEventListener('online', () => {
      void this.syncPendingChanges();
    });

    void this.processPendingDeleteIntent();
    void this.loadBudgetCategories();
    void this.syncPendingChanges();
  }

  async loadBudgetCategories(): Promise<void> {
    const categories = await firstValueFrom(this.api.getBudgetCategories());
    this.store.mergeBudgetCategories(categories);
  }

  async syncPendingChanges(): Promise<void> {
    if (!this.isBrowser || !navigator.onLine || this.syncing) return;

    this.syncing = true;
    try {
      await this.processPendingDeleteIntent();

      const queue = [...this.store.state().syncQueue];
      for (const item of queue) {
        await this.processQueueItem(item);
      }
      this.store.setError(null);
    } catch (error) {
      this.store.setError(this.toFriendlyError(error));
    } finally {
      this.syncing = false;
    }
  }

  async restoreByDeviceId(deviceId: string): Promise<WeddingRestorePayload> {
    const payload = await firstValueFrom(this.api.restoreAll(deviceId));
    this.store.replaceFromRestore(payload, deviceId);
    await this.loadBudgetCategories();
    return payload;
  }

  async restoreByWhatsapp(whatsappNumber: string, otp: string): Promise<{ deviceId: string }> {
    const response = await firstValueFrom(this.api.verifyPhoneRecovery(whatsappNumber, otp));
    await this.restoreByDeviceId(response.deviceId);
    return { deviceId: response.deviceId };
  }

  async requestDeleteAllData(): Promise<{ queued: boolean }> {
    const deviceId = this.store.backupCode();
    const intent = { deviceId, createdAt: new Date().toISOString() };

    try {
      if (!navigator.onLine) {
        throw new Error('offline');
      }

      await firstValueFrom(this.api.deleteAllData(deviceId));
      this.store.clearPendingDeleteIntent();
      this.store.resetLocalData();
      return { queued: false };
    } catch (error) {
      this.store.savePendingDeleteIntent(intent);
      this.store.resetLocalData();
      return { queued: true };
    }
  }

  async hydrateFromServerIfEmpty(): Promise<void> {
    const state = this.store.state();
    const isEmpty = !state.profile.brideFirstName && !state.profile.whatsappNumber && !state.checklist.length && !state.guests.length && !state.favorites.length && !state.budget.items.length;
    if (!isEmpty || !navigator.onLine) return;

    try {
      const payload = await firstValueFrom(this.api.restoreAll(state.deviceId));
      this.store.replaceFromRestore(payload, state.deviceId);
      await this.loadBudgetCategories();
    } catch {
      // Ignore hydration failures on empty state.
    }
  }

  private async processPendingDeleteIntent(): Promise<void> {
    const intent = this.store.getPendingDeleteIntent();
    if (!intent || !navigator.onLine) return;

    await firstValueFrom(this.api.deleteAllData(intent.deviceId));
    this.store.clearPendingDeleteIntent();
  }

  private async processQueueItem(item: SyncQueueItem): Promise<void> {
    const deviceId = this.store.backupCode();
    const state = this.store.state();

    switch (item.type) {
      case 'profileSync':
        await firstValueFrom(this.api.saveWeddingProfile(deviceId, state.profile));
        this.store.markQueueProcessed(item.type);
        break;
      case 'checklistSync':
        await firstValueFrom(this.api.syncChecklist(deviceId, state.checklist));
        this.store.markQueueProcessed(item.type);
        break;
      case 'budgetSync':
        await this.syncBudget(deviceId);
        this.store.markQueueProcessed(item.type);
        break;
      case 'favoritesSync':
        await this.syncFavorites(deviceId);
        this.store.markQueueProcessed(item.type);
        break;
      case 'guestsSync':
        await this.syncGuests(deviceId);
        this.store.markQueueProcessed(item.type);
        break;
      case 'deleteAllData':
        await firstValueFrom(this.api.deleteAllData(deviceId));
        this.store.markQueueProcessed(item.type);
        break;
      default:
        break;
    }
  }

  private async syncBudget(deviceId: string): Promise<void> {
    const budget = this.store.state().budget;
    await firstValueFrom(this.api.updateBudgetTotal(deviceId, budget.totalBudget));

    for (const item of budget.items) {
      if (item.syncState === 'deleted') {
        await firstValueFrom(this.api.deleteBudgetItem(deviceId, item.id));
        continue;
      }

      if (item.syncState === 'created' || item.syncState === 'updated') {
        await firstValueFrom(this.api.upsertBudgetItem(deviceId, item));
      }
    }

    const remoteBudget = await firstValueFrom(this.api.getBudget(deviceId));
    this.store.markBudgetSynced(remoteBudget);
  }

  private async syncFavorites(deviceId: string): Promise<void> {
    const activeFavorites = this.store.state().favorites.filter(item => item.syncState !== 'deleted');
    await firstValueFrom(this.api.syncFavorites(deviceId, activeFavorites));

    const deletedFavorites = this.store.state().favorites.filter(item => item.syncState === 'deleted');
    for (const item of deletedFavorites) {
      await firstValueFrom(this.api.deleteFavorite(deviceId, item.fornecedorId));
    }

    const updatedNotes = activeFavorites.filter(item => item.syncState === 'updated' && item.nota);
    for (const item of updatedNotes) {
      await firstValueFrom(this.api.updateFavoriteNote(deviceId, item.fornecedorId, item.nota));
    }

    const remoteFavorites = await firstValueFrom(this.api.getFavorites(deviceId));
    this.store.markFavoritesSynced(remoteFavorites as FavoriteItem[]);
  }

  private async syncGuests(deviceId: string): Promise<void> {
    const guests = this.store.state().guests;
    for (const guest of guests) {
      if (guest.syncState === 'deleted') {
        await firstValueFrom(this.api.deleteGuest(deviceId, guest.id));
        continue;
      }

      if (guest.syncState === 'created') {
        await firstValueFrom(this.api.createGuest(deviceId, guest));
      } else if (guest.syncState === 'updated') {
        await firstValueFrom(this.api.updateGuest(deviceId, guest));
      }
    }

    const remoteGuests = await firstValueFrom(this.api.getGuests(deviceId));
    this.store.markGuestsSynced(remoteGuests as GuestItem[]);
  }

  private toFriendlyError(error: unknown): string {
    if (typeof error === 'object' && error && 'status' in error) {
      const status = Number((error as { status?: number }).status);
      if (status === 429) return 'Limite de tentativas atingido. Aguarde alguns minutos e tente novamente.';
      if (status === 401 || status === 403) return 'Sua sessão expirou. Tente novamente em instantes.';
      if (status === 404) return 'Não encontramos os dados solicitados.';
      if (status === 400) return 'Alguns dados informados são inválidos.';
    }

    return 'Não foi possível sincronizar agora. Suas alterações continuam salvas localmente.';
  }
}
