Com base na sua solicitação e nos documentos técnicos fornecidos, elaborei um plano de ação para migrar a lógica do módulo Meu Casamento de um identificador anônimo (device-id) para um sistema baseado em Autenticação de Usuário (Login da Noiva).

Esta mudança é fundamental para permitir o uso multi-dispositivo e garantir a persistência dos dados de forma segura.

📋 Plano de Ajustes: Migração para Login de Usuário
1. Backend: Refatoração das Rotas e Segurança
O backend deixará de receber o deviceId pela URL e passará a extrair o userId do JWT (JSON Web Token).

Remover Parâmetros de Rota: Alterar todos os endpoints de /api/v1/users/{deviceId}/... para /api/v1/me-casamento/....
Implementar [Authorize]: Garantir que todos os endpoints do módulo exijam o cabeçalho Authorization: Bearer {token}.
Extração de Identidade: O código deve buscar o ID do usuário via User.FindFirst(ClaimTypes.NameIdentifier).
Base de Dados: Vincular as tabelas de WeddingProfile, Checklist, Guests e Budget diretamente ao UserId da tabela de usuários.
2. Frontend: Integração com o Fluxo de Autenticação
O PWA deve parar de gerar UUIDs locais e passar a gerenciar o estado de login.

Auth Guard: Proteger as rotas do /meu-casamento com um guard que verifica a existência de um token válido.
Interceptor HTTP: Utilizar o AuthTokenInterceptor (já citado em outras documentações) para injetar o token em todas as requisições do módulo.
Remoção de UUID Local: Eliminar a lógica de geração de deviceId no primeiro acesso. O "ID" do usuário agora vem do processo de login/cadastro.
Fluxo de Onboarding: Se a noiva não estiver logada ao tentar acessar o "Meu Casamento", redirecionar para a tela de Login ou Cadastro.
3. Simplificação do Fluxo de Restauração
Com o login, o processo de "Backup" e "Restauração" torna-se nativo.

Restauração por Código: Esta funcionalidade pode ser descontinuada ou transformada em um "Vínculo de Conta".
Recuperação via WhatsApp: O fluxo de OTP (WhatsApp) agora servirá como o próprio método de Login/Cadastro simplificado (Passwordless).
4. Estratégia de Migração (Legacy Support)
Para usuários que já possuem dados salvos localmente sob um deviceId:

Ao realizar o primeiro login, o sistema deve perguntar se deseja importar os dados do dispositivo atual para a nova conta.
O backend deve ter um endpoint temporário POST /v1/meu-casamento/migrate que aceita um deviceId e vincula os registros órfãos ao novo userId.
📝 Ajustes na Documentação
Abaixo está o diff para atualizar a especificação oficial do módulo, removendo a dependência do deviceId.

meu-casamento.md
-45
+38
The code change produced by Gemini cannot be fully applied. Blocks that failed (highlighted below) can be applied manually.
- funcionalidades e fluxos;
- regras de negócio;
- campos por tela;
- contratos de API com exemplos de payload/response;
- sincronização/offline;
- critérios de aceite e checklist técnico para desenvolvimento.
- Funcionalidades e fluxos baseados em conta de usuário.
- Regras de negócio e segurança via JWT.
- Campos por tela e contratos de API atualizados.
- Sincronização em tempo real entre dispositivos.
- Critérios de aceite para o sistema de login.

6. **Restauração por código de backup**
7. **Recuperação por WhatsApp (OTP)**
6. **Login unificado (E-mail ou WhatsApp OTP)**
7. **Sincronização multi-dispositivo**
8. **Remoção total de dados (LGPD)**
- `/restaurar`
- `/login`
1. **Desbloqueio de ferramentas**: Cronograma, Convidados e Orçamento só liberam quando:
1. **Acesso Autenticado**: Todas as ferramentas exigem login. O desbloqueio de funcionalidades específicas ocorre quando:
   - `whatsappNumber` preenchido.
   - `whatsappNumber` validado via OTP.
4. **Modelo de nome do casal**:
   - no app atual, o campo principal de UI grava em `brideFirstName` (texto único, ex.: `Ana & Carlos`);
4. **Identificação do Usuário**:
   - O sistema utiliza o `userId` extraído do Token JWT para todas as operações.
   - `groomFirstName` permanece opcional/legado e normalmente segue `null`.
5. **Código de backup**: deve ser UUID **v4** válido.
5. **Segurança**: Dados são privados e vinculados estritamente à conta da noiva.
   - alterações locais devem persistir imediatamente;
   - sync com API é assíncrono (retry em reconexão);
   - restore sobrescreve estado local com API.
   - Persistência em nuvem obrigatória.
   - Cache local apenas para modo offline temporário.
### 6.1 Perfil do casamento
### 6.1 Perfil do casamento (Endpoints Protegidos)

#### GET `/users/{deviceId}/wedding-profile`
#### GET `/v1/meu-casamento/wedding-profile`

  "deviceId": "a3f8c2d1-7b4e-4f9a-8c2e-1d3f5a7b9e0c",
  "userId": "user-uuid-here",
#### POST `/users/{deviceId}/wedding-profile`
#### POST `/v1/meu-casamento/wedding-profile`

#### GET `/users/{deviceId}/checklist`
#### GET `/v1/meu-casamento/checklist`

  "deviceId": "a3f8c2d1-7b4e-4f9a-8c2e-1d3f5a7b9e0c",
  "userId": "user-uuid-here",
#### POST `/users/{deviceId}/checklist/sync`
#### POST `/v1/meu-casamento/checklist/sync`

#### GET `/users/{deviceId}/budget`
#### GET `/v1/meu-casamento/budget`

#### PATCH `/users/{deviceId}/budget/total`
#### PATCH `/v1/meu-casamento/budget/total`

#### PATCH `/users/{deviceId}/budget/items/{itemId}`
#### PATCH `/v1/meu-casamento/budget/items/{itemId}`

#### DELETE `/users/{deviceId}/budget/items/{itemId}`
#### DELETE `/v1/meu-casamento/budget/items/{itemId}`

#### GET `/users/{deviceId}/favorites`
#### GET `/v1/meu-casamento/favorites`

#### POST `/users/{deviceId}/favorites`
#### POST `/v1/meu-casamento/favorites`

#### DELETE `/users/{deviceId}/favorites/{fornecedorId}`
#### DELETE `/v1/meu-casamento/favorites/{fornecedorId}`

#### PATCH `/users/{deviceId}/favorites/{fornecedorId}/nota` (endpoint disponível)
#### PATCH `/v1/meu-casamento/favorites/{fornecedorId}/nota`

#### GET `/users/{deviceId}/guests`
#### GET `/v1/meu-casamento/guests`

#### POST `/users/{deviceId}/guests`
#### POST `/v1/meu-casamento/guests`

#### PUT `/users/{deviceId}/guests/{guestId}`
#### PUT `/v1/meu-casamento/guests/{guestId}`

#### DELETE `/users/{deviceId}/guests/{guestId}`
#### DELETE `/v1/meu-casamento/guests/{guestId}`

### 6.6 Utilitários de restauração

#### GET `/users/{deviceId}/exists`

Response 200:
{ "exists": true, "hasData": true }
### 6.6 Autenticação e Recuperação
O acesso é realizado via Login Tradicional ou WhatsApp OTP.
  "deviceId": "a3f8c2d1-7b4e-4f9a-8c2e-1d3f5a7b9e0c",
  "token": "eyJhbGci...",
#### DELETE `/users/{deviceId}`
#### DELETE `/v1/meu-casamento/account`
