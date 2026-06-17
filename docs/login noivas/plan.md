
Vou explorar o repositório para identificar o que já está implementado vs. o que falta dos requisitos. Deixe-me fazer uma descoberta rápida.

Excelente! Encontrei que muita coisa já está implementada. Preciso esclarecer alguns pontos antes de criar o plano final:

Analyzing your answers...

Q: Qual é o escopo: implementar APENAS configurações OAuth faltantes, ou incluir também Bride Dashboard e Wedding Planning?
A: implementar tudo de autenticacao para noivas, e integrar com os processos ja existentes de meu-casamento, garantindo controle de acesso
Q: O formulário de contato público ainda deveria usar Formspree, ou migrar para backend autenticado?
A: Manter Formspree (sem auth)
Q: Ao formulário de contato detectar noiva logada, devo: pré-preencher auto + campo email read-only, ou apenas pré-preencher?
A: Apenas pré-preencher
Q: Ao enviar lead sem logar, exibir modal de login com fallback 'Continuar sem logar'?
A: Não, permitir envio anônimo sempre
Perfeito! Agora vou criar um plano detalhado baseado na descoberta e suas respostas.

Plan: Bride Authentication & Integration Completion
TL;DR: A maioria do sistema de autenticação de noivas já existe (BrideAuthService, BrideLoginModalComponent, interceptores). Faltam principalmente: configurar OAuth (Google/Apple ClientIDs), pré-popular formulários quando noiva logada, exibir perfil na navbar, e criar página de perfil de noiva. Tudo integrado com meu-casamento e com controle de acesso.

📋 Fases de Implementação
Phase 1: OAuth Configuration & Environment Setup
(Sem dependências — pode iniciar imediatamente)

Adicionar GOOGLE_CLIENT_ID, APPLE_CLIENT_ID, APPLE_TEAM_ID em environment.ts e production
Verificar se @abacritt/angularx-social-login está instalado
Configurar AppleID SDK script em index.html e redirect URI no Apple Console
Atualizar inicialização do AppleID SDK em bride-login-modal.component.ts
Phase 2: Form Pre-Population & Navbar Updates
Depende: Phase 1 completa

LeadFormComponent lead-form.component.ts

Injetar BrideAuthService
Se noiva logada: pré-preencher clienteName e clientePhone com dados do perfil
Navbar navbar.ts

Se noiva logada: exibir avatar + "Olá, {nome}" + dropdown com "Meu Perfil" e "Sair"
Se deslogada: exibir "Entrar"
Verificar integração de LeadService com brideAuthInterceptor (já implementado)

Phase 3: Bride Profile Management Page
Depende: Phase 2 completa (navbar linkar para perfil)

Criar BrideProfileComponent src/app/features/bride/bride-profile/bride-profile.component.ts

Rota: /meu-casamento/perfil
Exibir dados (nome, email, telefone, dataCasamento)
Modo edição com validação
Botão salvar → chamar BrideAuthService.updateProfile(payload)
Email Verification Flow (opcional mas recomendado)

Adicionar método sendVerificationEmail() em BrideAuthService
Exibir banner se email não verificado
Phase 4: Wedding Planning Integration & Access Control
Depende: Phase 3 completa

Atualizar Meu-Casamento Hub src/app/features/meu-casamento/meu-casamento-page.ts

Adicionar route guard: requer BrideAuthService.isLoggedIn$ === true
Template: greeting + menu de navegação (Perfil, Dados, Orçamentos, etc.)
Criar Bride Leads History (opcional — melhor UX)

Lista de orçamentos solicitados pela noiva
Verificar Route Guards

Confirmar src/app/core/guards/bride.guard.ts existe
Aplicar a /meu-casamento/*
Phase 5: Testing & QA
Depende: Phases 1-4

Testes OAuth: Google login → token salvo, navbar atualizado; Apple login idem
Testes Pre-Population: logar como noiva → ir para página de fornecedor → form preenchido
Testes Access Control: /meu-casamento redireciona não-autenticado; perfil carrega após auth
Testes Token Injection: DevTools Network → verificar header Authorization nos requests
📁 Arquivos Relevantes
Serviços de Auth (já implementados)
bride-auth.service.ts — Pode precisar adicionar updateProfile()
lead.service.ts — Submissão de leads
Interceptadores
src/app/core/interceptors/bride-auth.interceptor.ts — Injeção de token (já ok)
Componentes a Atualizar/Criar
Atualizar: bride-login-modal.component.ts
Atualizar: navbar.ts
Atualizar: lead-form.component.ts
Atualizar: src/app/features/meu-casamento/meu-casamento-page.ts
NOVO: src/app/features/bride/bride-profile/bride-profile.component.ts
Configuração
environment.ts e .prod.ts
index.html
✅ Verificação
Testes Automatizados (Unit)

Token e perfil salvos corretamente após login Google/Apple
brideAuthInterceptor injeta token para /v1/noiva/* e contatos
LeadFormComponent pré-preenche quando noiva logada
NavbarComponent exibe nome e logout button quando autenticado
Testes Manuais

Google OAuth: "Entrar com Google" → autentica → navbar mostra nome
Apple OAuth: "Entrar com Apple" → autentica → navbar mostra nome
Pre-população: logar como noiva → ir para fornecedor → form auto-preenchido
Logout: "Sair" → modal confirma → navbar volta ao estado deslogado
Perfil: "Meu Perfil" → carrega página
Access Control: /meu-casamento sem login → redireciona
Token: DevTools Network → lead submission → header Authorization presente
🎯 Decisões
✅ Sistemas paralelos: bride_accessToken (localStorage) ≠ auth_token (sessionStorage)
✅ Contato público permite envio anônimo (sem hard login)
✅ Pré-preenchimento apenas em formulários de noivas, não em Formspree
✅ /meu-casamento requer login; resto do site público
❓ Pontos de Clarificação Finais
AppleID SDK Script: Está em index.html? Se não, adicionar.
OAuth Redirect URIs: Confirmado no Google Console e Apple Developer?
Email Verification: Será necessário backend para /v1/noiva/verify-email?
Status: Pronto para Implementation. Você quer que eu comece com qual fase?

