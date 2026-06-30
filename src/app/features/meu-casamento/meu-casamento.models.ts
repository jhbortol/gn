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
  ctaLabel?: string;  // Button text; omit for tasks with no CTA button
  deepLink?: string;  // Absolute path (starts with /) or category slug for /:cidade/categorias/:slug
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
  createdAt: string;
}

export const WEDDING_CHECKLIST_TASKS: ChecklistTaskDefinition[] = [
  // ── Faltam 12 meses ──────────────────────────────────────
  { id: 'task_001', groupKey: '12m', label: 'Definir orçamento total do casamento' },
  { id: 'task_002', groupKey: '12m', label: 'Definir lista inicial de convidados', ctaLabel: 'Gerenciar Convidados', deepLink: '/meu-casamento/convidados' },
  { id: 'task_003', groupKey: '12m', label: 'Escolher e reservar o espaço/local', ctaLabel: 'Ver Espaços', deepLink: 'espacos' },
  { id: 'task_004', groupKey: '12m', label: 'Contratar cerimonialista', ctaLabel: 'Ver Cerimonialistas', deepLink: 'cerimonialistas' },
  { id: 'task_005', groupKey: '12m', label: 'Definir celebrante da cerimônia', ctaLabel: 'Ver Celebrantes', deepLink: 'celebrantes' },

  // ── Faltam 9 meses ───────────────────────────────────────
  { id: 'task_006', groupKey: '9m', label: 'Escolher o vestido de noiva', ctaLabel: 'Ver Estilistas / Lojas', deepLink: 'vestidos' },
  { id: 'task_007', groupKey: '9m', label: 'Escolher e contratar fotógrafo/videomaker', ctaLabel: 'Ver Fotógrafos', deepLink: 'fotografia' },
  { id: 'task_008', groupKey: '9m', label: 'Escolher decoração e floricultura', ctaLabel: 'Ver Decoradores', deepLink: 'decoracao' },
  { id: 'task_009', groupKey: '9m', label: 'Escolher e contratar buffet', ctaLabel: 'Ver Buffets', deepLink: 'buffet' },
  { id: 'task_010', groupKey: '9m', label: 'Escolher e contratar doces finos', ctaLabel: 'Ver Doces Finos', deepLink: 'doces-finos' },
  { id: 'task_011', groupKey: '9m', label: 'Contratar serviço de eternização', ctaLabel: 'Ver Eternização', deepLink: 'eternizacao' },
  { id: 'task_012', groupKey: '9m', label: 'Contratar storymaker para cobertura dos bastidores', ctaLabel: 'Ver Storymaker', deepLink: 'storymaker' },
  { id: 'task_013', groupKey: '9m', label: 'Definir necessidade de tenda para cerimônia/recepção', ctaLabel: 'Ver Tendas', deepLink: 'tendas' },

  // ── Faltam 6 meses ───────────────────────────────────────
  { id: 'task_014', groupKey: '6m', label: 'Contratar maquiagem para noiva e acompanhantes', ctaLabel: 'Ver Maquiagem', deepLink: 'maquiagem' },
  { id: 'task_015', groupKey: '6m', label: 'Planejar lua de mel e reservar passagens', ctaLabel: 'Ver Lua de Mel', deepLink: 'lua-de-mel' },
  { id: 'task_016', groupKey: '6m', label: 'Escolher e encomendar convites', ctaLabel: 'Ver Papelarias', deepLink: 'papelaria' },
  { id: 'task_017', groupKey: '6m', label: 'Confirmar música / banda / DJ', ctaLabel: 'Ver Músicos e DJs', deepLink: 'musica' },
  { id: 'task_018', groupKey: '6m', label: 'Escolher alianças e acessórios', ctaLabel: 'Ver Alianças e Acessórios', deepLink: 'aliancas' },
  { id: 'task_019', groupKey: '6m', label: 'Reservar veículos para noivos e familiares', ctaLabel: 'Ver Veículos', deepLink: 'veiculos' },
  { id: 'task_020', groupKey: '6m', label: 'Contratar cabines e totens para recepção', ctaLabel: 'Ver Cabines & Totens', deepLink: 'cabines' },
  { id: 'task_021', groupKey: '6m', label: 'Contratar experiências para convidados', ctaLabel: 'Ver Experiências', deepLink: 'experiencias' },
  { id: 'task_022', groupKey: '6m', label: 'Selecionar imagens sacras para cerimônia religiosa', ctaLabel: 'Ver Imagens Sacras', deepLink: 'imagens-sacras' },
  { id: 'task_023', groupKey: '6m', label: 'Definir lista de presentes (mesa de noivos)' },

  // ── Faltam 3 meses ───────────────────────────────────────
  { id: 'task_024', groupKey: '3m', label: 'Agendar prova do vestido (1ª prova)' },
  { id: 'task_025', groupKey: '3m', label: 'Enviar convites' },
  { id: 'task_026', groupKey: '3m', label: 'Confirmar cardápio com o buffet' },
  { id: 'task_027', groupKey: '3m', label: 'Agendar prova do vestido (2ª prova)' },
  { id: 'task_028', groupKey: '3m', label: 'Realizar teste de maquiagem e cabelo' },

  // ── Faltam 1 mês ─────────────────────────────────────────
  { id: 'task_029', groupKey: '1m', label: 'Confirmar presença dos convidados', ctaLabel: 'Ver Lista de Convidados', deepLink: '/meu-casamento/convidados' },
  { id: 'task_030', groupKey: '1m', label: 'Reunião final com o buffet e fornecedores' },
  { id: 'task_031', groupKey: '1m', label: 'Confirmar horários com todos os fornecedores' },
  { id: 'task_032', groupKey: '1m', label: 'Retirar vestido e acessórios' },

  // ── Semana do Casamento ───────────────────────────────────
  { id: 'task_033', groupKey: 'week', label: 'Briefing final com cerimonialista' },
  { id: 'task_034', groupKey: 'week', label: 'Preparar kits para banheiro e bem-casados' },
  { id: 'task_035', groupKey: 'week', label: 'Relaxar e curtir o momento! 💍' },
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
