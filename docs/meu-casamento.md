# Especificação Completa — Módulo **Meu Casamento** para PWA

## 1) Objetivo

Documentar, de ponta a ponta, o módulo **Meu Casamento** para implementação no PWA, cobrindo:

- Funcionalidades e fluxos baseados em conta de usuário.
- Regras de negócio e segurança via JWT.
- Campos por tela e contratos de API atualizados.
- Sincronização em tempo real entre dispositivos.
- Critérios de aceite para o sistema de login.

---

## 2) Escopo funcional do módulo

O módulo **Meu Casamento** no app atual inclui:

1. **Hub Meu Casamento**
2. **Cronograma** (checklist regressivo)
3. **Lista de Convidados** (CRUD)
4. **Orçamento** (total + categorias)
5. **Favoritos** (fornecedores salvos + nota)
6. **Login unificado (E-mail ou WhatsApp OTP)**
7. **Sincronização multi-dispositivo**
8. **Remoção total de dados (LGPD)**

---

## 3) Rotas do PWA (proposta compatível com app atual)

- `/meu-casamento`
- `/meu-casamento/cronograma`
- `/meu-casamento/convidados`
- `/meu-casamento/orcamento`
- `/meus-favoritos`
- `/login`
- `/restaurar/whatsapp`
- `/meus-dados/remover`

---

## 4) Regras de negócio globais

1. **Acesso Autenticado**: Todas as ferramentas exigem login. O desbloqueio de funcionalidades específicas ocorre quando:
   - `nome do casal` preenchido (`brideFirstName` no payload), e
   - `whatsappNumber` validado via OTP.
2. **Data do casamento**: não permite data passada (somente hoje+).
3. **WhatsApp**: armazenar e enviar **apenas dígitos**.
4. **Identificação do Usuário**:
   - O sistema utiliza o `userId` extraído do Token JWT para todas as operações.
5. **Segurança**: Dados são privados e vinculados estritamente à conta da noiva.
6. **Sincronização**:
   - Persistência em nuvem obrigatória.
   - Cache local apenas para modo offline temporário.
7. **Exclusão LGPD**:
   - remove dados no servidor e local;
   - operação irreversível.

---

## 5) Telas, campos e ações

## 5.1 Hub Meu Casamento (`/meu-casamento`)

### Seção “Dados do casal”
- Nome do casal (`string`, obrigatório para desbloqueio)
- Nº convidados estimados (`int`, opcional, até 4 dígitos)
- Nº WhatsApp (`string`, obrigatório para desbloqueio; só dígitos no backend)
- Data do casamento (`date`, opcional)
- Estilo do casamento (`weddingStyle`, opcional; hoje não exposto na UI principal do app, mas previsto no contrato de API para evolução)

### Ações
- Salvar dados
- Editar dados
- Exibir countdown quando houver data
- Navegar para: Cronograma, Convidados, Orçamento, Favoritos
- Copiar código de backup (deviceId)
- Ir para restauração
- Ir para remoção de dados

---

## 5.2 Cronograma (`/meu-casamento/cronograma`)

### Dados exibidos
- Lista de tarefas padrão por janelas:
  - 12 meses, 9 meses, 6 meses, 3 meses, 1 mês, semana do casamento
- Status por tarefa:
  - concluída / não concluída
- Barra de progresso total

### Ações
- Marcar/desmarcar tarefa
- Abrir deep links de tarefas (categoria ou funcionalidade interna)

### Regras
- Sync envia **lista completa** de tarefas concluídas.
- Quando existe data do casamento, título de grupo mostra referência de mês/ano.

---

## 5.3 Lista de Convidados (`/meu-casamento/convidados`)

### Campos do convidado
- `id` (UUID)
- `name` (obrigatório)
- `group` (`familia | trabalho | amigos | outros`)
- `status` (`pending | confirmed | declined`)
- `plusOnes` (0..10)
- `phone` (opcional)
- `notes` (opcional)

### Ações
- Adicionar convidado
- Editar convidado
- Excluir convidado
- Busca por nome
- Filtro por grupo
- Filtro por status

### Regras
- Contadores consideram `1 + plusOnes`.
- Exclusão local é soft-delete até sincronizar com API.
- Ordenação alfabética por nome.

---

## 5.4 Orçamento (`/meu-casamento/orcamento`)

### Estado
- `totalBudget`
- `items[]` por categoria com:
  - `id`
  - `categoryId`
  - `categoryName`
  - `categorySlug`
  - `allocatedAmount`
  - `spentAmount`
  - `supplierName` (opcional)
  - `notes` (opcional)
  - `status` (`pending | inProgress | contracted | paid`)

### Ações
- Definir orçamento total
- Editar item da categoria
- (API preparada para exclusão de item)

### Regras
- Primeiro acesso: exige valor total para iniciar.
- Categorias são baseadas no catálogo de categorias da API pública.
- Merge de categorias novas sem perder itens existentes.

---

## 5.5 Favoritos (`/meus-favoritos`)

### Campos
- `fornecedorId`
- `fornecedorNome`
- `fornecedorSlug`
- `imagemUrl` (opcional)
- `categoriaNome` (opcional)
- `nota` (opcional)
- `createdAt`

### Ações
- Favoritar/desfavoritar
- Editar nota
- Abrir detalhe do fornecedor

### Regras
- Remoção por swipe no app atual (PWA pode usar menu de ação equivalente).
- Persistência local em SQLite com marcação de sincronização.

---

## 5.6 Restaurar dados por código (`/restaurar`)

### Campos
- `codigoBackup` (UUID)

### Ações
- Validar formato
- Verificar existência do código no backend
- Restaurar tudo (pull geral)
- Alternativa: ir para recuperação por WhatsApp

### Regras
- Se `exists=false`, não restaura e exibe erro.

---

## 5.7 Recuperar via WhatsApp (`/restaurar/whatsapp`)

### Campos
- `whatsappNumber` (DDD + número, sem máscara no payload)
- `otp` (6 dígitos)

### Ações
- Enviar OTP
- Verificar OTP
- Restaurar dados após retorno do `deviceId`

### Regras
- OTP expira em 10 min.
- OTP expira em 10 min (600 segundos).
- Rate limit backend:
  - envio: 3 tentativas / 10 min por número
  - verificação: 5 tentativas por OTP.

---

## 5.8 Remover meus dados (`/meus-dados/remover`)

### Ações
- Marcar confirmação explícita de irreversibilidade
- Executar exclusão total

### Regras
- Executar DELETE no backend e limpar dados locais (cache/storage/db/deviceId).

---

## 6) Contratos de API (PWA)

Base URL:

- Produção: `https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1`

Headers padrão:

```http
Content-Type: application/json
```

> Formato de autenticação: usar esquema **Bearer** no header Authorization.
> O `accessToken` é obtido em `POST /auth/login`.
> Especificação completa de autenticação: `docs/API-ENDPOINTS-CATALOG.md` (seção 1.1).
>
> Observação: endpoints públicos podem não exigir Authorization, mas o módulo Meu Casamento deve operar com o mesmo padrão de autenticação do app.

### 6.1 Perfil do casamento (Endpoints Protegidos)

#### GET `/v1/meu-casamento/wedding-profile`

Response 200:
```json
{
  "token": "eyJhbGci...",
  "brideFirstName": "Ana & Carlos",
  "groomFirstName": null,
  "whatsappNumber": "19999999999",
  "weddingDate": "2027-03-15",
  "estimatedGuests": 150,
  "weddingStyle": "classico",
  "updatedAt": "2026-06-08T10:00:00Z"
}
```

#### POST `/v1/meu-casamento/wedding-profile`

Request:
```json
{
  "brideFirstName": "Ana & Carlos",
  "groomFirstName": null,
  "whatsappNumber": "19999999999",
  "weddingDate": "2027-03-15",
  "estimatedGuests": 150,
  "weddingStyle": "classico"
}
```

---

### 6.2 Checklist

#### GET `/v1/meu-casamento/checklist`

Response 200:
```json
{
  "userId": "user-uuid-here",
  "completedTasks": [
    { "taskId": "task_001", "completedAt": "2026-03-15T10:00:00Z" }
  ],
  "updatedAt": "2026-04-25T10:00:00Z"
}
```

#### POST `/v1/meu-casamento/checklist/sync`

Request:
```json
{
  "completedTasks": [
    { "taskId": "task_001", "completedAt": "2026-03-15T10:00:00Z" },
    { "taskId": "task_005", "completedAt": "2026-04-01T08:30:00Z" }
  ]
}
```

Response 200:
```json
{
  "deviceId": "a3f8c2d1...",
  "savedCount": 2,
  "updatedAt": "2026-04-25T10:00:00Z"
}
```

---

### 6.3 Orçamento

#### GET `/v1/meu-casamento/budget`

Response 200:
```json
{
  "deviceId": "a3f8c2d1...",
  "totalBudget": 75000.0,
  "items": [
    {
      "id": "uuid-do-item",
      "category": "buffet",
      "categoryId": "categoria-uuid",
      "categoryName": "Buffet",
      "categorySlug": "buffet",
      "allocatedAmount": 26250.0,
      "spentAmount": 15000.0,
      "supplierName": "Buffet Elegância",
      "notes": "Já pago o sinal",
      "status": "inProgress",
      "updatedAt": "2026-04-25T10:00:00Z"
    }
  ],
  "updatedAt": "2026-04-25T10:00:00Z"
}
```

#### PATCH `/v1/meu-casamento/budget/total`

Request:
```json
{ "totalBudget": 75000.0 }
```

#### PATCH `/v1/meu-casamento/budget/items/{itemId}`

Request:
```json
{
  "id": "uuid-do-item",
  "category": "buffet",
  "categoryId": "categoria-uuid",
  "categoryName": "Buffet",
  "categorySlug": "buffet",
  "allocatedAmount": 26250.0,
  "spentAmount": 15000.0,
  "supplierName": "Buffet Elegância",
  "notes": "Já pago o sinal",
  "status": "inProgress"
}
```

#### DELETE `/v1/meu-casamento/budget/items/{itemId}`

Response: `204 No Content`

---

### 6.4 Favoritos

#### GET `/v1/meu-casamento/favorites`

Response 200:
```json
[
  {
    "fornecedorId": "slug-ou-id-do-fornecedor",
    "fornecedorNome": "Buffet Elegância",
    "fornecedorSlug": "buffet-elegancia",
    "imagemUrl": "https://cdn.../foto.jpg",
    "categoriaNome": "Buffet",
    "nota": "Melhor custo-benefício",
    "createdAt": "2026-04-10T14:00:00Z"
  }
]
```

#### POST `/v1/meu-casamento/favorites`

Request:
```json
[
  {
    "fornecedorId": "slug-ou-id-do-fornecedor",
    "fornecedorNome": "Buffet Elegância",
    "fornecedorSlug": "buffet-elegancia",
    "imagemUrl": "https://cdn.../foto.jpg",
    "categoriaNome": "Buffet",
    "nota": "Melhor custo-benefício",
    "createdAt": "2026-04-10T14:00:00Z"
  }
]
```

#### DELETE `/v1/meu-casamento/favorites/{fornecedorId}`

Response: `204 No Content`

#### PATCH `/v1/meu-casamento/favorites/{fornecedorId}/nota`

Request:
```json
{ "nota": "Preço fechado em R$ 12.000 — confirmar em maio" }
```

---

### 6.5 Convidados

#### GET `/v1/meu-casamento/guests`

> Regra de compatibilidade: `status` é o campo canônico.  
> O campo `confirmed` é redundante/derivado e mantido apenas para compatibilidade com respostas legadas.

Response 200:
```json
[
  {
    "id": "uuid",
    "name": "Maria Silva",
    "group": "familia",
    "status": "confirmed",
    "confirmed": true,
    "phone": "(19) 99999-9999",
    "notes": "Vegetariana",
    "plusOnes": 1,
    "createdAt": "2026-01-01T10:00:00Z",
    "updatedAt": "2026-01-02T12:00:00Z"
  }
]
```

#### POST `/v1/meu-casamento/guests`

> Compatibilidade atual:
> - `group` é o campo canônico para novos clientes;
> - `groupName` é legado e deve ser enviado temporariamente com o mesmo valor de `group`;
> - `status` é canônico e `confirmed` deve ser derivado de `status` (`confirmed=true` somente quando `status=confirmed`).
> - `confirmed` deve ser tratado como opcional para novos clientes; se ausente, backend deve derivar via `status`.
>
> Critério para remoção futura de campos legados (`groupName`, `confirmed`): alinhamento formal de contrato no backend + janela de migração dos clientes antigos.
> Estratégia sugerida: remover envio desses campos legados no PWA após uma versão de backend que aceite explicitamente apenas os campos canônicos.

Request:
```json
{
  "id": "uuid",
  "name": "Maria Silva",
  "group": "familia",
  "groupName": "familia",
  "status": "confirmed",
  "confirmed": true,
  "phone": "(19) 99999-9999",
  "notes": "Vegetariana",
  "plusOnes": 1
}
```

#### PUT `/v1/meu-casamento/guests/{guestId}`

> Compatibilidade atual:
> - `group` é o campo canônico para novos clientes;
> - `groupName` é legado e deve ser enviado temporariamente com o mesmo valor de `group`;
> - `status` é canônico e `confirmed` deve ser derivado de `status` (`confirmed=true` somente quando `status=confirmed`).
> - `confirmed` deve ser tratado como opcional para novos clientes; se ausente, backend deve derivar via `status`.
>
> Critério para remoção futura de campos legados (`groupName`, `confirmed`): alinhamento formal de contrato no backend + janela de migração dos clientes antigos.
> Estratégia sugerida: remover envio desses campos legados no PWA após uma versão de backend que aceite explicitamente apenas os campos canônicos.

Request:
```json
{
  "id": "uuid",
  "name": "Maria Silva",
  "group": "familia",
  "groupName": "familia",
  "status": "declined",
  "confirmed": false,
  "phone": "(19) 99999-9999",
  "notes": "Não poderá comparecer",
  "plusOnes": 0
}
```

#### DELETE `/v1/meu-casamento/guests/{guestId}`

Response: `204 No Content`

---

### 6.6 Utilitários de restauração

#### GET `/users/{deviceId}/exists`

Response 200:
```json
{ "exists": true, "hasData": true }
```

---

### 6.7 Recuperação via WhatsApp

#### POST `/auth/phone-recovery`

Request:
```json
{ "whatsappNumber": "19999999999" }
```

Response 200:
```json
{
  "sent": true,
  "maskedNumber": "(******9999)",
  "expiresInSeconds": 600
}
```

Regra de máscara recomendada: ocultar todos os dígitos, exceto os 4 últimos.

#### POST `/auth/phone-recovery/verify`

Request:
```json
{
  "whatsappNumber": "19999999999",
  "otp": "847291"
}
```

Response 200:
```json
{
  "userId": "user-uuid-here",
  "verified": true
}
```

---

### 6.8 LGPD — exclusão total

#### DELETE `/v1/meu-casamento/account`

Response: `204 No Content`

---

## 7) Erros e respostas esperadas (mínimo)

- `400`: payload inválido / UUID inválido
- `401/403`: token inválido ou sem autorização
- `404`: recurso não encontrado (ex.: profile inexistente)
- `409`: conflito de estado (se backend adotar validação concorrente)
- `429`: limite excedido (fluxos OTP)
- `500`: erro interno

Para PWA, padronizar erro em UI:
- mensagem amigável;
- opção de retry;
- manter alterações locais quando possível.

---

## 8) Estratégia de sincronização no PWA

1. **Offline-first por domínio**:
   - perfil/checklist/orçamento: persistência local simples;
   - convidados/favoritos: persistência local com fila de sync.
2. **Disparos de sync**:
   - na inicialização;
   - ao voltar conexão;
   - após restore de código/OTP.
3. **Restore**:
   - pull de todos os domínios;
   - sobrescrever estado local.
4. **Delete total**:
   - tentar API;
   - se falhar por rede, manter intent de exclusão em fila local para retry automático (com aviso ao usuário);
   - limpar dados locais imediatamente apenas após confirmação explícita da usuária.

---

## 9) Requisitos não funcionais para implementação

1. **PWA installable** (manifest + service worker).
2. **Responsividade mobile-first** (principal uso em celular).
3. **Tempo de carregamento inicial** baixo no Hub.
4. **Resiliência de rede** (retry/backoff para sync).
5. **Observabilidade**:
   - logar falhas de sync por feature;
   - logar falhas de OTP (sem dados sensíveis).
6. **Segurança/LGPD**:
   - não expor dados sensíveis em logs;
   - limpar cache local no fluxo de exclusão.

---

## 10) Critérios de aceite (QA)

1. Usuária salva dados no Hub e ferramentas desbloqueiam apenas com nome+WhatsApp.
2. Cronograma marca/desmarca tarefas e mantém estado após reload.
3. Convidados: CRUD completo + filtros + contagem correta com acompanhantes.
4. Orçamento: total + edição por categoria + progresso correto.
5. Favoritos: adicionar, remover, editar nota e reabrir detalhe do fornecedor.
6. Restore por código:
   - sucesso com UUID existente;
   - falha amigável com UUID inexistente/inválido.
7. Restore por OTP:
   - envio e verificação;
   - tratamento de OTP inválido/expirado/rate limit.
8. Remoção total apaga dados locais e remotos.
9. Fluxo offline: alterações locais não se perdem e sincronizam ao reconectar.

---

## 11) Checklist de implementação para devs

- [ ] Criar rotas e telas equivalentes do módulo Meu Casamento no PWA
- [ ] Implementar store local por domínio + fila de sincronização
- [ ] Implementar camada de API com contratos acima
- [ ] Implementar guards/regras de desbloqueio no Hub
- [ ] Implementar fluxo completo de restauração (backup + WhatsApp OTP)
- [ ] Implementar fluxo LGPD de exclusão total
- [ ] Instrumentar logs e estados de erro/retry
- [ ] Validar critérios de aceite com QA
