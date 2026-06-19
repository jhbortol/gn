🚀 Especificação Técnica: Migração "Meu Casamento" para Login Unificado
1. Visão Geral
Atualmente, as funcionalidades do módulo "Meu Casamento" (Checklist, Convidados, Orçamento) são vinculadas a um deviceId enviado via rota. O objetivo é remover o deviceId das URLs e utilizar o userId extraído do Token JWT para identificar a noiva.

Regra de Ouro: Nenhuma rota de dados do casamento deve ser pública. O [Authorize(Roles = "Bride")] é obrigatório em todos os novos endpoints.

2. Mudanças de Arquitetura e Segurança
2.1. Extração de Identidade
O backend não deve mais confiar no ID vindo da URL. O ID do usuário deve ser recuperado através das Claims do Identity:

csharp
// Exemplo de recuperação no Controller ou Service
var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
2.2. Mudança no Padrão de Rotas
As rotas deixam de ser subordinadas a /users/{deviceId} e passam a ser globais sob o domínio /meu-casamento.

Funcionalidade	Rota Atual (DEPRECATED)	Nova Rota (PROPOSTA)
Perfil do Casamento	GET /users/{deviceId}/wedding-profile	GET /v1/meu-casamento/wedding-profile
Checklist	GET /users/{deviceId}/checklist	GET /v1/meu-casamento/checklist
Sincronizar Checklist	POST /users/{deviceId}/checklist/sync	POST /v1/meu-casamento/checklist/sync
Orçamento Total	PATCH /users/{deviceId}/budget/total	PATCH /v1/meu-casamento/budget/total
Convidados	GET /users/{deviceId}/guests	GET /v1/meu-casamento/guests
3. Detalhamento das Entidades (Banco de Dados)
As tabelas do módulo devem ser atualizadas para suportar o vínculo com a tabela de usuários (Noivas).

3.1. Tabelas Afetadas
WeddingProfiles
ChecklistTasks
Guests
BudgetItems
Favorites
3.2. Estratégia de Migração de Dados
Para evitar perda de dados de usuárias que usavam o app sem login:

Adicionar coluna UserId (Guid, Nullable) em todas as tabelas acima.
Manter a coluna DeviceId temporariamente como referência de migração.
Endpoint de Vínculo: Criar um endpoint para associar dados órfãos ao novo login.
POST /v1/meu-casamento/migrate
Objetivo: Transfere dados de um deviceId local para a conta logada.

Payload: { "oldDeviceId": "UUID-AQUI" }
Lógica:
sql
UPDATE Guests SET UserId = @CurrentUserId, DeviceId = NULL 
WHERE DeviceId = @OldDeviceId AND UserId IS NULL;
-- Repetir para Checklist, Budget, etc.
4. Novos Contratos de API (Exemplos)
4.1. Perfil do Casamento
O retorno não contém mais referências a dispositivos, apenas dados do casal vinculados à conta.

GET /v1/meu-casamento/wedding-profile

json
 Show full code block 
{
  "brideFirstName": "Ana & Carlos",
  "whatsappNumber": "19999999999",
  "weddingDate": "2027-03-15",
  "estimatedGuests": 150,
  "weddingStyle": "classico",
  "updatedAt": "2026-06-08T10:00:00Z"
}
4.2. Sincronização de Checklist
O backend deve garantir que a lista de tarefas completadas pertença ao userId do token.

POST /v1/meu-casamento/checklist/sync

json
 Show full code block 
{
  "completedTasks": [
    { "taskId": "task_001", "completedAt": "2026-03-15T10:00:00Z" },
    { "taskId": "task_005", "completedAt": "2026-04-01T08:30:00Z" }
  ]
}
5. Fluxo de Autenticação de Noivas (Recapitulação)
Conforme especificado anteriormente, o backend deve suportar os logins sociais que geram o userId necessário:

Google Login: POST /api/v1/auth/noiva/google (valida idToken).
Apple Login: POST /api/v1/auth/noiva/apple (valida token + nome no 1º acesso).
JWT Claim: O token gerado DEVE conter role: "Bride".
6. Checklist de Implementação (Para o Backend)
[ ] Criar novo Controller MeuCasamentoController com atributo [Authorize(Roles = "Bride")].
[ ] Implementar lógica de persistência baseada em UserId em todos os repositórios do módulo.
[ ] Criar o endpoint POST /migrate para vincular dados antigos.
[ ] Ajustar as tabelas no SQL Server para incluir UserId como Foreign Key para a tabela de Noivas.
[ ] Atualizar o Swagger para refletir as novas rotas sem o parâmetro {deviceId}.
[ ] Garantir que o delete de conta (DELETE /v1/meu-casamento/account) remova todos os dados vinculados ao UserId (LGPD).
Este plano garante que a transição seja transparente para a usuária e que o backend se torne o "único ponto da verdade" para os dados do casamento, independente de qual dispositivo ela esteja usando.
