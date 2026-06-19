import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, of, catchError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CategoriasData } from '../../categorias/services/categorias-data';
import { CidadeService } from '../../../core/cidade.service';
import {
  BudgetItem,
  FavoriteItem,
  GuestItem,
  WeddingProfile,
  WeddingRestorePayload,
  CompletedTask
} from '../meu-casamento.models';

@Injectable({
  providedIn: 'root'
})
export class MeuCasamentoApiService {
  private readonly http = inject(HttpClient);
  private readonly categoriasData = inject(CategoriasData);
  private readonly cidadeService = inject(CidadeService);
  private readonly baseUrl = environment.API_BASE_URL;

  getWeddingProfile() {
    return this.http.get<WeddingProfile>(`${this.baseUrl}/v1/meu-casamento/wedding-profile`);
  }

  saveWeddingProfile(profile: WeddingProfile) {
    return this.http.post<WeddingProfile>(`${this.baseUrl}/v1/meu-casamento/wedding-profile`, {
      brideFirstName: profile.brideFirstName,
      groomFirstName: profile.brideFirstName,
      whatsappNumber: profile.whatsappNumber.replace(/\D/g, ''),
      weddingDate: profile.weddingDate,
      estimatedGuests: profile.estimatedGuests,
      weddingStyle: profile.weddingStyle
    });
  }

  getChecklist() {
    return this.http.get<{ completedTasks: CompletedTask[] }>(`${this.baseUrl}/v1/meu-casamento/checklist`)
      .pipe(map(response => response.completedTasks ?? []));
  }

  syncChecklist(completedTasks: CompletedTask[]) {
    return this.http.post(`${this.baseUrl}/v1/meu-casamento/checklist/sync`, { completedTasks });
  }

  getBudget() {
    return this.http.get<{ totalBudget: number | null; items: BudgetItem[]; updatedAt?: string | null }>(`${this.baseUrl}/v1/meu-casamento/budget`)
      .pipe(
        map(response => ({
          totalBudget: response.totalBudget ?? null,
          items: (response.items ?? []).map(item => ({ ...item, syncState: 'synced' as const })),
          updatedAt: response.updatedAt ?? null
        }))
      );
  }

  updateBudgetTotal(totalBudget: number | null) {
    return this.http.patch(`${this.baseUrl}/v1/meu-casamento/budget/total`, { totalBudget });
  }

  upsertBudgetItem(item: BudgetItem) {
    return this.http.patch(`${this.baseUrl}/v1/meu-casamento/budget/items/${item.id}`, {
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

  deleteBudgetItem(itemId: string) {
    return this.http.delete(`${this.baseUrl}/v1/meu-casamento/budget/items/${itemId}`);
  }

  getFavorites() {
    return this.http.get<FavoriteItem[]>(`${this.baseUrl}/v1/meu-casamento/favorites`).pipe(
      map(items => (items ?? []).map(item => ({ ...item, syncState: 'synced' as const })))
    );
  }

  syncFavorites(favorites: FavoriteItem[]) {
    return this.http.post(`${this.baseUrl}/v1/meu-casamento/favorites`, favorites.map(item => ({
      fornecedorId: item.fornecedorId,
      fornecedorNome: item.fornecedorNome,
      fornecedorSlug: item.fornecedorSlug,
      imagemUrl: item.imagemUrl,
      categoriaNome: item.categoriaNome,
      nota: item.nota,
      createdAt: item.createdAt
    })));
  }

  deleteFavorite(fornecedorId: string) {
    return this.http.delete(`${this.baseUrl}/v1/meu-casamento/favorites/${fornecedorId}`);
  }

  updateFavoriteNote(fornecedorId: string, nota: string | null) {
    return this.http.patch(`${this.baseUrl}/v1/meu-casamento/favorites/${fornecedorId}/nota`, { nota });
  }

  getGuests() {
    return this.http.get<GuestItem[]>(`${this.baseUrl}/v1/meu-casamento/guests`).pipe(
      map(guests => (guests ?? []).map(guest => ({
        ...guest,
        group: this.normalizeGuestGroup(guest.group || (guest as any).groupName),
        phone: guest.phone ?? null,
        notes: guest.notes ?? null,
        syncState: 'synced' as const
      })))
    );
  }

  createGuest(guest: GuestItem) {
    return this.http.post(`${this.baseUrl}/v1/meu-casamento/guests`, this.mapGuestPayload(guest));
  }

  updateGuest(guest: GuestItem) {
    return this.http.put(`${this.baseUrl}/v1/meu-casamento/guests/${guest.id}`, this.mapGuestPayload(guest));
  }

  deleteGuest(guestId: string) {
    return this.http.delete(`${this.baseUrl}/v1/meu-casamento/guests/${guestId}`);
  }

  deleteAllData() {
    return this.http.delete(`${this.baseUrl}/v1/meu-casamento/account`);
  }

  migrateLegacyData(oldDeviceId: string) {
    return this.http.post(`${this.baseUrl}/v1/meu-casamento/migrate`, { oldDeviceId });
  }

  restoreAll() {
    return forkJoin({
      profile: this.getWeddingProfile().pipe(catchError(() => of({
        brideFirstName: '',
        groomFirstName: null,
        whatsappNumber: '',
        weddingDate: null,
        estimatedGuests: null,
        weddingStyle: null,
        updatedAt: null
      } as WeddingProfile))),
      checklist: this.getChecklist().pipe(catchError(() => of([]))),
      budget: this.getBudget().pipe(catchError(() => of({ totalBudget: null, items: [], updatedAt: null }))),
      favorites: this.getFavorites().pipe(catchError(() => of([]))),
      guests: this.getGuests().pipe(catchError(() => of([])))
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
    const cidadeSlug = this.cidadeService.getCidade() || undefined;
    return this.categoriasData.getAll(cidadeSlug).pipe(
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

  private normalizeGuestGroup(group: any): 'familia' | 'trabalho' | 'amigos' | 'outros' {
    if (!group) return 'outros';
    const g = String(group).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (g === 'familia' || g === 'family') return 'familia';
    if (g === 'trabalho' || g === 'work') return 'trabalho';
    if (g === 'amigos' || g === 'friends') return 'amigos';
    return 'outros';
  }
}
