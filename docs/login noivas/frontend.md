---

### 📄 Arquivo 2: `frontend-noivas-auth-spec.md` (Para o time de Frontend/Angular)

```markdown
# Especificação Técnica Frontend: Login de Noivas e Formulário de Contato

**Status:** Pronto para Desenvolvimento
**Contexto:** Integração de Sign-In com Google e Apple para visitantes/noivas do portal público.
**Regra de Ouro:** 🚫 **O sistema de login da noiva deve ser paralelo ao do fornecedor**. Não reutilizar o `AuthService` do fornecedor para não cruzar tokens e gerar bugs de permissão.

## 1. Dependências e Configuração

*   **Google:** Adicionar `@abacritt/angularx-social-login` (ou usar SDK oficial `<script src="https://accounts.google.com/gsi/client">`). Obter `Client ID` do Google Console.
*   **Apple:** Usar SDK oficial Sign in with Apple JS (`<https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js>`).

---

## 2. Gerenciamento de Estado e Serviços

### Novo Serviço: `BrideAuthService`
Responsável exclusivamente por gerenciar o ciclo de vida da noiva autenticada.

**Métodos Necessários:**
*   `loginWithGoogle(idToken: string): Observable<BrideAuthResponse>`
*   `loginWithApple(payload: AppleAuthPayload): Observable<BrideAuthResponse>`
*   `logout()`
*   `getBrideProfile(): Observable<BrideProfile>`
*   `get token(): string | null` (Lê o `bride_token` do localStorage)
*   `get isLoggedIn$(): Observable<boolean>`

**Armazenamento de Token:**
Para evitar que o token da Noiva sobrescreva o do Fornecedor (caso o usuário seja os dois e esteja testando), salvar o token da noiva no localStorage com chave distinta:
*   `localStorage.setItem('bride_accessToken', token)`

---

## 3. Http Interceptor e Segurança

### Novo Interceptor: `BrideAuthInterceptor`
Criar um interceptor específico (ou ajustar o atual) para injetar o `bride_accessToken`.

**Regra de injeção:**
*   Se a requisição for para `/api/v1/noiva/*` -> injeta `bride_accessToken`.
*   Se a requisição for `POST /v1/public/fornecedores/*/contact` e existir um `bride_accessToken` -> injeta o token no cabeçalho.
*   Rotas `/api/v1/admin/*` ou `/api/v1/supplier/*` **nunca** devem receber o `bride_token`.

---

## 4. Componentes UI a Serem Criados/Ajustados

### 4.1. Modal de Login de Noiva (`BrideLoginModalComponent`)
**Onde usar:** Ao clicar em "Entrar" no Header Público ou ao tentar enviar um Lead sem estar logado.
**UI/UX:**
*   Não existe formulário de "Email e Senha" digitável (reduz atrito).
*   Botão grande: "Entrar com o Google" (usando padrão visual do Google).
*   Botão grande: "Entrar com a Apple" (usando padrão visual da Apple).

**Fluxo Google:**
1. Usuário clica.
2. SDK abre popup do Google.
3. SDK retorna o `credential` (id_token).
4. Dispara `BrideAuthService.loginWithGoogle(credential)`.
5. Salva token, fecha modal, atualiza Header.

**Fluxo Apple:**
1. Usuário clica.
2. SDK abre popup da Apple.
3. Retorna objeto de autorização.
4. *ATENÇÃO:* Extrair `user.name.firstName` e `user.name.lastName` do retorno do SDK da Apple (só vem no primeiro login) e enviar no payload junto com o `id_token`.
5. Salva token, fecha modal, atualiza Header.

### 4.2. Header Público (`HeaderComponent`)
*   **Se Deslogado:** Exibir link/botão "Entrar" -> Abre `BrideLoginModalComponent`.
*   **Se Logado:** Exibir Avatar (ícone genérico ou inicial do nome) e "Olá, {Nome}". Menu dropdown com "Meu Perfil" e "Sair".

### 4.3. Ajuste Crítico: Formulário de Contato (`ContactForm.jsx/ts`)
Este é o ponto principal da conversão de leads (substituindo o antigo GUID).

**Comportamento Se Noiva estiver Logada (`isLoggedIn$ === true`):**
1. Ao montar o componente, o formulário deve **pré-preencher** automaticamente:
   * `name`: noivaProfile.nome
   * `email`: noivaProfile.email
   * `phone`: noivaProfile.telefone
   * `eventDate`: noivaProfile.dataCasamento
2. O campo de Email deve ficar em modo *Read-Only* (bloqueado).
3. Ao clicar em "Solicitar Orçamento", o backend identificará a noiva pelo JWT injetado no Header, garantindo a associação no banco.

**Comportamento Se Noiva estiver Deslogada (Soft-Login):**
1. O formulário fica em branco e os campos ficam livres.
2. *Decisão de UX (Soft Login vs Hard Login):* 
   * A regra de negócio aprovada permite enviar como anônima, mas, ao clicar em "Solicitar Orçamento", **podemos exibir o `BrideLoginModalComponent`** com uma mensagem persuasiva: *"Quer gerenciar todos os seus orçamentos em um só lugar? Entre rápido com o Google"*.
   * Ter um botão link na parte inferior do modal "Continuar sem logar" que apenas dispara o endpoint sem token (para não perder a conversão se a noiva for resistente).
3. Se a noiva enviou sem logar, o backend gravará o lead com `NoivaId = NULL`. Remover do código frontend a geração do antigo GUID anonimizado, pois o backend não precisará mais dele.

---

## 5. Exemplo de Contratos (TypeScript Interfaces)

```typescript
// Payload Login Apple
export interface AppleLoginPayload {
  idToken: string;
  firstName?: string; // Vem apenas no primeiro login da Apple
  lastName?: string;  // Vem apenas no primeiro login da Apple
}

// Resposta Padrão de Autenticação Noiva
export interface BrideAuthResponse {
  accessToken: string;
  expiresIn: number;
  noiva: BrideProfile;
}

// Perfil da Noiva
export interface BrideProfile {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  dataCasamento?: string;
}

// Payload Submissão de Lead (O Mesmo atual, mas disparado com/sem header Authorization)
export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  message: string;
}
