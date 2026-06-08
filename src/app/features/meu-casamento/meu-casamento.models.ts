export type WeddingToolKey = 'cronograma' | 'convidados' | 'orcamento';

export interface WeddingProfile {
  brideFirstName: string;
  groomFirstName: string | null;
  whatsappNumber: string;
  weddingDate: string | null;
  estimatedGuests: number | null;
  weddingStyle: string | null;
  updatedAt?: string | null;
}

export interface CompletedTask {
  taskId: string;
  completedAt: string;
}

export interface ChecklistTaskDefinition {
  id: string;
  label: string;
  groupKey: string;
  defaultTitle: string;
  deepLink?: string;
}

export interface GuestItem {
  id: string;
  name: string;
  group: 'familia' | 'trabalho' | 'amigos' | 'outros';
  status: 'pending' | 'confirmed' | 'declined';
  plusOnes: number;
  phone: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  syncState: 'created' | 'updated' | 'synced' | 'deleted';
}

export interface BudgetItem {
  id: string;
  category: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  allocatedAmount: number;
  spentAmount: number;
  supplierName: string | null;
  notes: string | null;
  status: 'pending' | 'inProgress' | 'contracted' | 'paid';
  updatedAt?: string | null;
  syncState: 'created' | 'updated' | 'synced' | 'deleted';
}

export interface FavoriteItem {
  fornecedorId: string;
  fornecedorNome: string;
  fornecedorSlug: string;
  imagemUrl: string | null;
  categoriaNome: string | null;
  nota: string | null;
  createdAt: string;
  syncState: 'created' | 'updated' | 'synced' | 'deleted';
}

export interface SyncQueueItem {
  type:
    | 'profileSync'
    | 'checklistSync'
    | 'budgetSync'
    | 'favoritesSync'
    | 'guestsSync'
    | 'deleteAllData';
  createdAt: string;
}

export interface MeuCasamentoState {
  deviceId: string;
  profile: WeddingProfile;
  checklist: CompletedTask[];
  guests: GuestItem[];
  budget: {
    totalBudget: number | null;
    items: BudgetItem[];
    updatedAt?: string | null;
  };
  favorites: FavoriteItem[];
  syncQueue: SyncQueueItem[];
  lastSyncAt: string | null;
  lastError: string | null;
}

export interface WeddingRestorePayload {
  profile: WeddingProfile;
  checklist: CompletedTask[];
  guests: GuestItem[];
  budget: MeuCasamentoState['budget'];
  favorites: FavoriteItem[];
}

export interface PendingDeleteIntent {
  deviceId: string;
  createdAt: string;
}

export const WEDDING_CHECKLIST_TASKS: ChecklistTaskDefinition[] = [
  { id: 'task_001', groupKey: '12m', defaultTitle: '12 meses antes', label: 'Definir orçamento inicial', deepLink: '/meu-casamento/orcamento' },
  { id: 'task_002', groupKey: '12m', defaultTitle: '12 meses antes', label: 'Criar lista inicial de convidados', deepLink: '/meu-casamento/convidados' },
  { id: 'task_003', groupKey: '9m', defaultTitle: '9 meses antes', label: 'Salvar fornecedores favoritos', deepLink: '/meus-favoritos' },
  { id: 'task_004', groupKey: '9m', defaultTitle: '9 meses antes', label: 'Pesquisar estilo do casamento' },
  { id: 'task_005', groupKey: '6m', defaultTitle: '6 meses antes', label: 'Revisar orçamento por categoria', deepLink: '/meu-casamento/orcamento' },
  { id: 'task_006', groupKey: '6m', defaultTitle: '6 meses antes', label: 'Atualizar confirmações dos convidados', deepLink: '/meu-casamento/convidados' },
  { id: 'task_007', groupKey: '3m', defaultTitle: '3 meses antes', label: 'Confirmar fornecedores contratados', deepLink: '/meus-favoritos' },
  { id: 'task_008', groupKey: '3m', defaultTitle: '3 meses antes', label: 'Fechar plano de cerimônia e festa' },
  { id: 'task_009', groupKey: '1m', defaultTitle: '1 mês antes', label: 'Revisar RSVP final', deepLink: '/meu-casamento/convidados' },
  { id: 'task_010', groupKey: '1m', defaultTitle: '1 mês antes', label: 'Conferir pagamentos pendentes', deepLink: '/meu-casamento/orcamento' },
  { id: 'task_011', groupKey: 'week', defaultTitle: 'Semana do casamento', label: 'Compartilhar cronograma com fornecedores' },
  { id: 'task_012', groupKey: 'week', defaultTitle: 'Semana do casamento', label: 'Separar contatos essenciais do grande dia' }
];

export const EMPTY_PROFILE: WeddingProfile = {
  brideFirstName: '',
  groomFirstName: null,
  whatsappNumber: '',
  weddingDate: null,
  estimatedGuests: null,
  weddingStyle: null,
  updatedAt: null
};

export const EMPTY_WEDDING_STATE = (deviceId: string): MeuCasamentoState => ({
  deviceId,
  profile: { ...EMPTY_PROFILE },
  checklist: [],
  guests: [],
  budget: {
    totalBudget: null,
    items: [],
    updatedAt: null
  },
  favorites: [],
  syncQueue: [],
  lastSyncAt: null,
  lastError: null
});
