# ✅ Análise de Compatibilidade Frontend-Backend - Sistema Tier

**Data**: 18 de janeiro de 2026  
**Versão**: 1.0  
**Status**: ✅ **COMPATÍVEL - Frontend consegue usar dados do backend proposto**

---

## 📊 Resumo Executivo

**Resposta Direta**: Sim, as mudanças propostas no backend **FUNCIONAM** com o frontend atual. Porém, com **ressalvas importantes** sobre o que precisa ser adicionado ao frontend para a experiência tier funcionar completa.

| Aspecto | Status | Observação |
|---------|--------|-----------|
| **GET /fornecedores/{id}** | ✅ PRONTO | Frontend já consome e mapeia corretamente |
| **GET /fornecedores?categoria** | ✅ PRONTO | Frontend já usa `getByCategoria()` |
| **WhatsApp condicional (tier)** | ⚠️ PARCIAL | Frontend está hardcoded com `getWhatsAppLink()`, não lê `planLevel` da DTO |
| **Formulário de lead** | ❌ FALTA | Nenhum componente LeadForm existe no frontend |
| **Ad injection (zumbi state)** | ❌ FALTA | Nenhuma lógica de exibição de anúncios existe |
| **Painel de leads** | ❌ FALTA | Nenhuma tela de dashboard para fornecedores |
| **Ordenação por tier** | ⚠️ PARCIAL | Frontend já ordena por `destaque`, mas não por `planLevel` |

---

## 🔍 Análise Detalhada

### ✅ O QUE JÁ FUNCIONA SEM MUDANÇAS

#### 1. **GET /fornecedores/{id}** (Detalhe do Fornecedor)

**Arquivo Frontend**: `src/app/features/fornecedores/services/fornecedores-data.ts` (linhas 144-183)

**Estado Atual**:
```typescript
getById(identifier: string, preview = false): Observable<Fornecedor> {
  const endpoint = isGuid ? `/fornecedores/${identifier}` : `/fornecedores/slug/${identifier}`;
  return this.api.get<FornecedorDetailDto>(endpoint, params).pipe(
    map(detail => ({
      id: detail.id,
      nome: detail.nome,
      telefone: detail.telefone,
      // ... mais campos
    }))
  );
}
```

**Com Backend Proposto**:
- ✅ Backend retorna `VendorPublicDto` com campos novos: `planLevel`, `phoneDisplay`, `whatsAppUrl`, `showContactForm`, `adInjection`
- ✅ Frontend continua funcionando (ignora campos novos, lê campos conhecidos)
- ✅ **Nenhuma mudança necessária no frontend por enquanto**

---

#### 2. **GET /fornecedores?categoria** (Lista por Categoria)

**Arquivo Frontend**: `src/app/features/fornecedores/services/fornecedores-data.ts` (linhas 185-203)

**Estado Atual**:
```typescript
getByCategoria(categoriaSlugOrId: string): Observable<FornecedorListDto[]> {
  const params: any = { page: 1, pageSize: 100 };
  return this.api.get<{ data: FornecedorListDto[] }>(
    `/fornecedores/ativos/categoria/${categoriaSlugOrId}`, 
    params
  ).pipe(map(r => r.data));
}
```

**Com Backend Proposto**:
- ✅ Backend retorna lista com `VendorPublicDto[]` já ordenado por `PlanLevel DESC`
- ✅ Frontend renderiza naturalmente (não precisa saber da ordenação)
- ✅ **Nenhuma mudança necessária**

**Obs**: Frontend faz ordenação local por `destaque`, isso se mantém compatível:
```typescript
private sortFornecedores(list: FornecedorListDto[], order: string): FornecedorListDto[] {
  switch (order) {
    case 'relevante':
      return sorted.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
    // ...
  }
}
```

---

### ⚠️ O QUE FUNCIONA MAS PRECISA SER ATUALIZADO

#### 1. **WhatsApp Condicional (Vitrine vs Free)**

**Problema**:
- Frontend está hardcoded para sempre gerar WhatsApp URL
- Arquivo: `src/app/features/fornecedores/fornecedor-page.ts` (linhas 83-88)

```typescript
getWhatsAppLink(): string {
  const w = this.fornecedor?.telefone || '';
  const digits = w.replace(/\D/g, '');
  const message = encodeURIComponent('Olá, Te encontrei no Guia Noivas...');
  return digits ? `https://wa.me/${digits}?text=${message}` : '#';
}
```

**HTML renderiza sempre**:
```html
<a *ngIf="fornecedor.telefone" 
   [href]="getWhatsAppLink()" 
   target="_blank"
   class="...bg-green-500...">
  WhatsApp
</a>
```

**Solução Necessária**:

Após backend estar pronto, frontend precisa fazer:

```typescript
// No service, adicionar planLevel à interface Fornecedor
export interface Fornecedor {
  // ... campos existentes
  planLevel?: number; // 0 = Free, 1 = Vitrine
  whatsAppUrl?: string; // URL já calculada pelo backend
  showContactForm?: boolean; // Se deve mostrar form de lead
  adInjection?: CompetitorAd[]; // Anúncios de concorrentes
}

// Na página, usar a URL do backend ao invés de calcular:
getWhatsAppLink(): string {
  // Opção 1: Usar URL do backend se disponível
  if (this.fornecedor?.whatsAppUrl) {
    return this.fornecedor.whatsAppUrl;
  }
  // Opção 2: Fallback para lógica local (backward compat)
  const w = this.fornecedor?.telefone || '';
  const digits = w.replace(/\D/g, '');
  return digits ? `https://wa.me/${digits}` : '#';
}

// No HTML, condicionar renderização
<a *ngIf="fornecedor.whatsAppUrl && fornecedor.planLevel !== 0" 
   [href]="getWhatsAppLink()" 
   target="_blank"
   class="...bg-green-500...">
  WhatsApp
</a>
```

**Timeline**: Rápido (15 min) - Fazer após backend estar pronto

---

#### 2. **Ordenação por Tier na Listagem**

**Problema**:
- Frontend ordena por `destaque` local
- Backend vai ordenar por `PlanLevel DESC` + aleatório
- Duplicação de lógica

**Solução Necessária**:

Remover ordenação local, confiar na ordenação do backend:

```typescript
// ANTES (local sorting)
private sortFornecedores(list: FornecedorListDto[], order: string): FornecedorListDto[] {
  return sorted.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
}

// DEPOIS (confiar no backend)
private sortFornecedores(list: FornecedorListDto[], order: string): FornecedorListDto[] {
  // O backend já ordena por PlanLevel DESC, então:
  // - Vitrine (1) vem primeiro
  // - Free (0) vem depois, aleatório
  // Ordenação local é apenas por user preference (rating, nome, etc)
  switch (order) {
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'nome':
      return sorted.sort((a, b) => a.nome.localeCompare(b.nome));
    default:
      return sorted; // Mantém ordenação do backend
  }
}
```

**Timeline**: Rápido (10 min) - Fazer após backend estar pronto

---

### ❌ O QUE FALTA NO FRONTEND (Novos Componentes Necessários)

#### 1. **LeadFormComponent** (CRÍTICO)

**Objetivo**: Formulário de contato exibido em fornecedores Free (< 3 leads)

**Não existe** - Precisa ser criado

**Arquivo Sugerido**: `src/app/features/fornecedores/lead-form.component.ts`

```typescript
@Component({
  selector: 'app-lead-form',
  standalone: true,
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input type="text" placeholder="Seu nome" formControlName="clienteName" required>
      <input type="email" placeholder="Email" formControlName="clienteEmail" required>
      <input type="tel" placeholder="Telefone" formControlName="clientePhone" required>
      <textarea placeholder="Sua mensagem" formControlName="message" required></textarea>
      <label>
        <input type="checkbox" formControlName="lgpdConsent" required>
        Autorizo compartilhar meus dados
      </label>
      <button type="submit" [disabled]="!form.valid">Enviar</button>
    </form>
  `
})
export class LeadFormComponent {
  @Input() fornecedorId!: number;
  form = new FormGroup({
    clienteName: new FormControl('', [Validators.required]),
    clienteEmail: new FormControl('', [Validators.required, Validators.email]),
    clientePhone: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
    lgpdConsent: new FormControl(false, [Validators.requiredTrue])
  });

  constructor(private api: ApiService) {}

  onSubmit() {
    if (this.form.valid) {
      this.api.post(`/fornecedores/${this.fornecedorId}/contact`, this.form.value).subscribe({
        next: () => { /* success message */ },
        error: (err) => { /* error handling */ }
      });
    }
  }
}
```

**Timeline**: 1-2 horas

---

#### 2. **Ad Injection (Anúncios de Concorrentes)**

**Objetivo**: Exibir 3 fornecedores Vitrine como "publicidade" quando Free atingir 3 leads

**Não existe** - Precisa ser criado

**Arquivo Sugerido**: `src/app/features/fornecedores/competitor-ads.component.ts`

```typescript
@Component({
  selector: 'app-competitor-ads',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section *ngIf="ads.length" class="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mt-8">
      <div class="text-center mb-4">
        <span class="text-xs bg-amber-500 text-white px-3 py-1 rounded-full font-semibold">
          Publicidade
        </span>
        <p class="text-sm text-amber-700 mt-2">
          Confira esses fornecedores recomendados
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div *ngFor="let ad of ads" class="bg-white rounded-lg p-4 border border-amber-200 hover:shadow-lg transition">
          <img [src]="ad.fotoUrl" alt="{{ ad.nomeFantasia }}" class="w-full h-40 object-cover rounded-lg mb-3">
          <h4 class="font-bold text-gray-900">{{ ad.nomeFantasia }}</h4>
          <a [href]="ad.whatsAppUrl" target="_blank" class="text-green-600 font-semibold mt-2 block">
            Contate no WhatsApp
          </a>
        </div>
      </div>
    </section>
  `
})
export class CompetitorAdsComponent {
  @Input() ads: CompetitorAd[] = [];
}
```

**Timeline**: 1 hora

---

#### 3. **Painel de Leads (Dashboard)**

**Objetivo**: Fornecedores verem leads recebidos (apenas Vitrine, ou Free que assinaram)

**Não existe** - Precisa ser criado

**Arquivo Sugerido**: `src/app/features/painel/leads-dashboard.component.ts`

```typescript
@Component({
  selector: 'app-leads-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-3 gap-4 mb-8">
      <div class="bg-white p-6 rounded-lg border">
        <div class="text-3xl font-bold text-blue-600">{{ leadsResponse.totalLeads }}</div>
        <div class="text-sm text-gray-600">Total de Leads</div>
      </div>
      <div class="bg-white p-6 rounded-lg border">
        <div class="text-3xl font-bold text-red-600">{{ leadsResponse.unreadLeads }}</div>
        <div class="text-sm text-gray-600">Não Lidos</div>
      </div>
      <div class="bg-white p-6 rounded-lg border">
        <div class="text-3xl font-bold text-amber-600">
          {{ leadsResponse.leadCountThisMonth }}/{{ leadsResponse.leadLimit }}
        </div>
        <div class="text-sm text-gray-600">Este Mês</div>
      </div>
    </div>
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-3 text-left">Nome</th>
          <th class="border p-3 text-left">Email</th>
          <th class="border p-3 text-left">Telefone</th>
          <th class="border p-3 text-left">Data</th>
          <th class="border p-3 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let lead of leadsResponse.leads" class="hover:bg-gray-50">
          <td class="border p-3">{{ lead.clienteName }}</td>
          <td class="border p-3">{{ lead.clienteEmail }}</td>
          <td class="border p-3">{{ lead.clientePhone }}</td>
          <td class="border p-3">{{ lead.createdAt | date }}</td>
          <td class="border p-3">
            <span *ngIf="!lead.isRead" class="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
              Não Lido
            </span>
            <span *ngIf="lead.isRead" class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
              Lido
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class LeadsDashboardComponent implements OnInit {
  leadsResponse: FornecedorLeadsResponse = {
    totalLeads: 0,
    unreadLeads: 0,
    leadCountThisMonth: 0,
    leadLimit: 0,
    leads: []
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get('/fornecedores/me/leads').subscribe({
      next: (response) => { this.leadsResponse = response; },
      error: (err) => console.error(err)
    });
  }
}
```

**Timeline**: 2-3 horas

---

## 📋 Checklist de Implementação Frontend

### **Fase 1 - Integração Imediata** (Após backend P1 pronto)

- [ ] Atualizar interface `Fornecedor` com campos: `planLevel`, `whatsAppUrl`, `showContactForm`, `adInjection`
- [ ] Modificar `getWhatsAppLink()` para usar `whatsAppUrl` do backend
- [ ] Renderizar condicional do botão WhatsApp (apenas se `whatsAppUrl` existe)
- [ ] Remover ordenação local por `destaque` (confiar no backend)

**Tempo**: 30-45 min  
**Bloqueador**: Backend P1 completo

---

### **Fase 2 - Novos Componentes** (Depois de Fase 1)

- [ ] Criar `LeadFormComponent`
- [ ] Integrar no `fornecedor-page` (exibir se `showContactForm === true`)
- [ ] Criar `CompetitorAdsComponent`
- [ ] Integrar no `fornecedor-page` (exibir se `adInjection.length > 0`)
- [ ] Criar `LeadsDashboardComponent`
- [ ] Integrar na rota `/painel/leads`

**Tempo**: 4-5 horas  
**Bloqueador**: Backend P1 + Painel menu item

---

### **Fase 3 - Upgrade Flow** (Opcional, depois)

- [ ] Criar `UpgradeComponent` (comparação Free vs Vitrine)
- [ ] Integrar Stripe Checkout
- [ ] Integrar webhook de upgrade (atualizar localStorage/JWT)

**Tempo**: 3-4 horas  
**Bloqueador**: Backend P2 (Stripe webhook)

---

## 🎯 Conclusão

**Resposta ao Usuário**: 

✅ **SIM, as mudanças backend FUNCIONAM com o frontend atual.**

Mas para **experiência tier completa**, o frontend precisa:

| O que | Timeline | Bloqueador |
|-------|----------|-----------|
| ✅ Usar `whatsAppUrl` do backend | 15 min | Backend P1 |
| ✅ Mostrar/ocultar botão WhatsApp por tier | 15 min | Backend P1 |
| ❌ LeadFormComponent | 1-2h | Backend P1 + designs |
| ❌ CompetitorAdsComponent | 1h | Backend P1 |
| ❌ LeadsDashboardComponent | 2-3h | Backend P1 + auth |
| ❌ UpgradeComponent + Stripe | 3-4h | Backend P2 |

**Caminho Recomendado**:

1. ✅ Backend termina P1 → Deploy
2. ✅ Frontend faz ajustes rápidos (30-45 min)
3. ✅ Testar fluxo basic (Get fornecedor com tier logic)
4. ❌ Frontend constrói novos componentes (4-5h paralelo)
5. ✅ Integração completa (Ad injection, Lead form)
6. ❌ Backend P2 (Stripe) + Frontend UpgradeComponent

