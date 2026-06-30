import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { MeuCasamentoApiService } from './meu-casamento-api.service';
import { MeuCasamentoObservabilityService } from './meu-casamento-observability.service';
import { MeuCasamentoStoreService } from './meu-casamento-store.service';
import { FavoriteItem, GuestItem, SyncQueueItem, WeddingRestorePayload } from '../meu-casamento.models';
import { getWeddingRetryDelayMs, shouldRetryWeddingSync } from './meu-casamento-sync.utils';
import { BrideAuthService } from '../../../core/services/bride-auth.service';
import { ToastService } from '../../../shared/services/toast.service';

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
    private readonly observability: MeuCasamentoObservabilityService,
    private readonly brideAuthService: BrideAuthService,
    private readonly toastService: ToastService,
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

    let previousState: boolean | null = null;
    this.brideAuthService.isLoggedIn$.subscribe(async (loggedIn) => {
      const isFirst = previousState === null;
      const transitionToLoggedOut = previousState === true && !loggedIn;
      const transitionToLoggedIn = previousState === false && loggedIn;
      previousState = loggedIn;

      if (isFirst) {
        if (loggedIn) {
          console.log('[MeuCasamentoSync] Startup: User is logged in. Hydrating/syncing with server...');
          void (async () => {
            await this.syncPendingChanges();
            await this.forceSyncFromServer();
          })();
        }
        return;
      }

      if (transitionToLoggedIn) {
        void (async () => {
          const toastId = this.toastService.show('Sincronizando dados', 'info', 0);
          const success = await this.forceSyncFromServer();
          this.toastService.remove(toastId);
          if (success) {
            this.toastService.success('Sincronização concluída');
          } else {
            this.toastService.error('Não foi possível sincronizar os dados.');
          }
        })();
      } else if (transitionToLoggedOut) {
        console.log('[MeuCasamentoSync] User logged out. Clearing local store data.');
        this.store.resetLocalData();
      }
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
    if (!this.isBrowser || !navigator.onLine) return;

    // If a sync is already in progress, wait for it to finish then retry
    if (this.syncing) {
      await this.waitForSyncToFinish();
      // After previous sync finishes, check if there are still pending items
      if (this.store.state().syncQueue.length > 0) {
        await this.syncPendingChanges();
      }
      return;
    }

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

  private waitForSyncToFinish(): Promise<void> {
    return new Promise(resolve => {
      const check = () => {
        if (!this.syncing) {
          resolve();
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  }

  async requestDeleteAllData(): Promise<{ queued: boolean }> {
    const intent = { createdAt: new Date().toISOString() };

    try {
      if (!navigator.onLine) {
        throw new Error('offline');
      }

      await this.withRetry('delete-all', () => firstValueFrom(this.api.deleteAllData()));
      this.store.clearPendingDeleteIntent();
      this.store.resetLocalData();
      return { queued: false };
    } catch (error) {
      this.observability.logSyncFailure('delete-all', error, { queued: true });
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
      const payload = await this.withRetry('hydrate-empty', () => firstValueFrom(this.api.restoreAll()));
      this.store.replaceFromRestore(payload);
      await this.loadBudgetCategories();
    } catch {
      // Ignore hydration failures on empty state.
    }
  }

  async forceSyncFromServer(): Promise<boolean> {
    if (!navigator.onLine) return false;
    try {
      const payload = await this.withRetry('force-sync', () => firstValueFrom(this.api.restoreAll()));
      this.store.replaceFromRestore(payload);
      await this.loadBudgetCategories();
      return true;
    } catch (e) {
      this.observability.logSyncFailure('force-sync', e);
      return false;
    }
  }

  async syncFeatureFromServer(path: string): Promise<void> {
    if (!navigator.onLine) return;
    try {
      if (path.includes('cronograma')) {
        const checklist = await this.withRetry('checklist-refresh', () => firstValueFrom(this.api.getChecklist()));
        this.store.hydrateRemoteChecklist(checklist);
      } else if (path.includes('orcamento')) {
        const budget = await this.withRetry('budget-refresh', () => firstValueFrom(this.api.getBudget()));
        this.store.markBudgetSynced(budget);
      } else if (path.includes('convidados')) {
        const guests = await this.withRetry('guests-refresh', () => firstValueFrom(this.api.getGuests()));
        this.store.markGuestsSynced(guests);
      } else if (path.includes('favoritos')) {
        const favorites = await this.withRetry('favorites-refresh', () => firstValueFrom(this.api.getFavorites()));
        this.store.markFavoritesSynced(favorites);
      } else if (path.endsWith('/meu-casamento')) {
        const profile = await this.withRetry('profile-refresh', () => firstValueFrom(this.api.getWeddingProfile()));
        this.store.hydrateRemoteProfile(profile);
      }
    } catch (e) {
      this.observability.logSyncFailure('feature-refresh', e);
    }
  }


  private async processPendingDeleteIntent(): Promise<void> {
    const intent = this.store.getPendingDeleteIntent();
    if (!intent || !navigator.onLine) return;

    await this.withRetry('delete-intent', () => firstValueFrom(this.api.deleteAllData()));
    this.store.clearPendingDeleteIntent();
  }

  private async processQueueItem(item: SyncQueueItem): Promise<void> {
    const state = this.store.state();

    switch (item.type) {
      case 'profileSync':
        await this.withRetry('profile', () => firstValueFrom(this.api.saveWeddingProfile(state.profile)));
        this.store.markQueueProcessed(item.type);
        break;
      case 'checklistSync':
        await this.withRetry('checklist', () => firstValueFrom(this.api.syncChecklist(state.checklist)));
        this.store.markQueueProcessed(item.type);
        break;
      case 'budgetSync':
        await this.syncBudget();
        this.store.markQueueProcessed(item.type);
        break;
      case 'favoritesSync':
        await this.syncFavorites();
        this.store.markQueueProcessed(item.type);
        break;
      case 'guestsSync':
        await this.syncGuests();
        this.store.markQueueProcessed(item.type);
        break;
      case 'deleteAllData':
        await this.withRetry('delete-all', () => firstValueFrom(this.api.deleteAllData()));
        this.store.markQueueProcessed(item.type);
        break;
      default:
        break;
    }
  }

  private async syncBudget(): Promise<void> {
    const budget = this.store.state().budget;
    await this.withRetry('budget-total', () => firstValueFrom(this.api.updateBudgetTotal(budget.totalBudget)));

    for (const item of budget.items) {
      if (item.syncState === 'deleted') {
        await this.withRetry('budget-delete-item', () => firstValueFrom(this.api.deleteBudgetItem(item.id)));
        continue;
      }

      if (item.syncState === 'created' || item.syncState === 'updated') {
        await this.withRetry('budget-upsert-item', () => firstValueFrom(this.api.upsertBudgetItem(item)));
      }
    }

    const remoteBudget = await this.withRetry('budget-refresh', () => firstValueFrom(this.api.getBudget()));
    this.store.markBudgetSynced(remoteBudget);
  }

  private async syncFavorites(): Promise<void> {
    const activeFavorites = this.store.state().favorites.filter(item => item.syncState !== 'deleted');
    await this.withRetry('favorites', () => firstValueFrom(this.api.syncFavorites(activeFavorites)));

    const deletedFavorites = this.store.state().favorites.filter(item => item.syncState === 'deleted');
    for (const item of deletedFavorites) {
      await this.withRetry('favorites-delete-item', () => firstValueFrom(this.api.deleteFavorite(item.fornecedorId)));
    }

    const updatedNotes = activeFavorites.filter(item => item.syncState === 'updated' && item.nota);
    for (const item of updatedNotes) {
      await this.withRetry('favorites-note', () => firstValueFrom(this.api.updateFavoriteNote(item.fornecedorId, item.nota)));
    }

    const remoteFavorites = await this.withRetry('favorites-refresh', () => firstValueFrom(this.api.getFavorites()));
    this.store.markFavoritesSynced(remoteFavorites as FavoriteItem[]);
  }

  private async syncGuests(): Promise<void> {
    const guests = this.store.state().guests;
    for (const guest of guests) {
      if (guest.syncState === 'deleted') {
        await this.withRetry('guests-delete-item', () => firstValueFrom(this.api.deleteGuest(guest.id)));
        continue;
      }

      if (guest.syncState === 'created') {
        await this.withRetry('guests-create-item', () => firstValueFrom(this.api.createGuest(guest)));
      } else if (guest.syncState === 'updated') {
        await this.withRetry('guests-update-item', () => firstValueFrom(this.api.updateGuest(guest)));
      }
    }

    const remoteGuests = await this.withRetry('guests-refresh', () => firstValueFrom(this.api.getGuests()));
    this.store.markGuestsSynced(remoteGuests as GuestItem[]);
  }

  private async withRetry<T>(feature: string, operation: () => Promise<T>, maxAttempts = 3): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        if (!shouldRetryWeddingSync(error) || attempt === maxAttempts) {
          this.observability.logSyncFailure(feature, error, { attempt });
          throw error;
        }

        const delayMs = getWeddingRetryDelayMs(attempt);
        this.observability.logSyncRetry(feature, attempt, delayMs, error);
        await this.delay(delayMs);
      }
    }

    this.observability.logSyncFailure(feature, lastError, { attempt: maxAttempts });
    throw lastError;
  }

  private async delay(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ms));
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
