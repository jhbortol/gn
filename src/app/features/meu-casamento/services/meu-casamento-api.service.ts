import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, of, catchError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CategoriasData } from '../../categorias/services/categorias-data';
import {
  BudgetItem,
  FavoriteItem,
  GuestItem,
  WeddingProfile,
  WeddingRestorePayload,
  CompletedTask
} from '../meu-casamento.models';

interface ExistsResponse {
  exists: boolean;
  hasData: boolean;
}

interface PhoneRecoveryResponse {
  sent: boolean;
  maskedNumber: string;
  expiresInSeconds: number;
}

interface PhoneRecoveryVerifyResponse {
  deviceId: string;
  verified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MeuCasamentoApiService {
  private readonly http = inject(HttpClient);
  private readonly categoriasData = inject(CategoriasData);
  private readonly baseUrl = environment.API_BASE_URL;

  getWeddingProfile(deviceId: string) {
    return this.http.get<WeddingProfile>(`${this.baseUrl}/users/${deviceId}/wedding-profile`);
  }

  saveWeddingProfile(deviceId: string, profile: WeddingProfile) {
    return this.http.post<WeddingProfile>(`${this.baseUrl}/users/${deviceId}/wedding-profile`, {
      brideFirstName: profile.brideFirstName,
      groomFirstName: profile.groomFirstName,
      whatsappNumber: profile.whatsappNumber.replace(/\D/g, ''),
      weddingDate: profile.weddingDate,
      estimatedGuests: profile.estimatedGuests,
      weddingStyle: profile.weddingStyle
    });
  }

  getChecklist(deviceId: string) {
    return this.http.get<{ completedTasks: CompletedTask[] }>(`${this.baseUrl}/users/${deviceId}/checklist`)
      .pipe(map(response => response.completedTasks ?? []));
  }

  syncChecklist(deviceId: string, completedTasks: CompletedTask[]) {
    return this.http.post(`${this.baseUrl}/users/${deviceId}/checklist/sync`, { completedTasks });
  }

  getBudget(deviceId: string) {
    return this.http.get<{ totalBudget: number | null; items: BudgetItem[]; updatedAt?: string | null }>(`${this.baseUrl}/users/${deviceId}/budget`)
      .pipe(
        map(response => ({
          totalBudget: response.totalBudget ?? null,
          items: (response.items ?? []).map(item => ({ ...item, syncState: 'synced' as const })),
          updatedAt: response.updatedAt ?? null
        }))
      );
  }

  updateBudgetTotal(deviceId: string, totalBudget: number | null) {
    return this.http.patch(`${this.baseUrl}/users/${deviceId}/budget/total`, { totalBudget });
  }

  upsertBudgetItem(deviceId: string, item: BudgetItem) {
    return this.http.patch(`${this.baseUrl}/users/${deviceId}/budget/items/${item.id}`, {
      id: item.id,
      category: item.category,
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      categorySlug: item.categorySlug,
      allocatedAmount: item.allocatedAmount,
      spentAmount: item.spentAmount,
      supplierName: item.supplierName,
      notes: item.notes,
      status: item.status
    });
  }

  deleteBudgetItem(deviceId: string, itemId: string) {
    return this.http.delete(`${this.baseUrl}/users/${deviceId}/budget/items/${itemId}`);
  }

  getFavorites(deviceId: string) {
    return this.http.get<FavoriteItem[]>(`${this.baseUrl}/users/${deviceId}/favorites`).pipe(
      map(items => (items ?? []).map(item => ({ ...item, syncState: 'synced' as const })))
    );
  }

  syncFavorites(deviceId: string, favorites: FavoriteItem[]) {
    return this.http.post(`${this.baseUrl}/users/${deviceId}/favorites`, favorites.map(item => ({
      fornecedorId: item.fornecedorId,
      fornecedorNome: item.fornecedorNome,
      fornecedorSlug: item.fornecedorSlug,
      imagemUrl: item.imagemUrl,
      categoriaNome: item.categoriaNome,
      nota: item.nota,
      createdAt: item.createdAt
    })));
  }

  deleteFavorite(deviceId: string, fornecedorId: string) {
    return this.http.delete(`${this.baseUrl}/users/${deviceId}/favorites/${fornecedorId}`);
  }

  updateFavoriteNote(deviceId: string, fornecedorId: string, nota: string | null) {
    return this.http.patch(`${this.baseUrl}/users/${deviceId}/favorites/${fornecedorId}/nota`, { nota });
  }

  getGuests(deviceId: string) {
    return this.http.get<GuestItem[]>(`${this.baseUrl}/users/${deviceId}/guests`).pipe(
      map(guests => (guests ?? []).map(guest => ({
        ...guest,
        phone: guest.phone ?? null,
        notes: guest.notes ?? null,
        syncState: 'synced' as const
      })))
    );
  }

  createGuest(deviceId: string, guest: GuestItem) {
    return this.http.post(`${this.baseUrl}/users/${deviceId}/guests`, this.mapGuestPayload(guest));
  }

  updateGuest(deviceId: string, guest: GuestItem) {
    return this.http.put(`${this.baseUrl}/users/${deviceId}/guests/${guest.id}`, this.mapGuestPayload(guest));
  }

  deleteGuest(deviceId: string, guestId: string) {
    return this.http.delete(`${this.baseUrl}/users/${deviceId}/guests/${guestId}`);
  }

  checkBackupCode(deviceId: string) {
    return this.http.get<ExistsResponse>(`${this.baseUrl}/users/${deviceId}/exists`);
  }

  sendPhoneRecovery(whatsappNumber: string) {
    return this.http.post<PhoneRecoveryResponse>(`${this.baseUrl}/auth/phone-recovery`, {
      whatsappNumber: whatsappNumber.replace(/\D/g, '')
    });
  }

  verifyPhoneRecovery(whatsappNumber: string, otp: string) {
    return this.http.post<PhoneRecoveryVerifyResponse>(`${this.baseUrl}/auth/phone-recovery/verify`, {
      whatsappNumber: whatsappNumber.replace(/\D/g, ''),
      otp
    });
  }

  deleteAllData(deviceId: string) {
    return this.http.delete(`${this.baseUrl}/users/${deviceId}`);
  }

  restoreAll(deviceId: string) {
    return forkJoin({
      profile: this.getWeddingProfile(deviceId).pipe(catchError(() => of({
        brideFirstName: '',
        groomFirstName: null,
        whatsappNumber: '',
        weddingDate: null,
        estimatedGuests: null,
        weddingStyle: null,
        updatedAt: null
      } as WeddingProfile))),
      checklist: this.getChecklist(deviceId).pipe(catchError(() => of([]))),
      budget: this.getBudget(deviceId).pipe(catchError(() => of({ totalBudget: null, items: [], updatedAt: null }))),
      favorites: this.getFavorites(deviceId).pipe(catchError(() => of([]))),
      guests: this.getGuests(deviceId).pipe(catchError(() => of([])))
    }).pipe(
      map(response => ({
        profile: response.profile,
        checklist: response.checklist,
        guests: response.guests,
        budget: response.budget,
        favorites: response.favorites
      } satisfies WeddingRestorePayload))
    );
  }

  getBudgetCategories() {
    return this.categoriasData.getAll().pipe(
      map(categories => categories.map(category => ({
        id: category.id,
        nome: category.nome,
        slug: category.slug
      })))
    );
  }

  private mapGuestPayload(guest: GuestItem) {
    const confirmed = guest.status === 'confirmed';
    return {
      id: guest.id,
      name: guest.name,
      group: guest.group,
      groupName: guest.group,
      status: guest.status,
      confirmed,
      phone: guest.phone,
      notes: guest.notes,
      plusOnes: guest.plusOnes
    };
  }
}
