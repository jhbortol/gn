# Plano de Implementação - Sistema de Solicitação de Remoção LGPD

Este plano descreve as etapas para implementar o sistema de Solicitação de Remoção LGPD conforme especificado em `docs/lgpd.md`. Isso envolve transformar o botão placeholder atual em um módulo totalmente funcional com página de formulário dedicada, rastreamento de status e integração adequada com o backend.

## Objetivo
Implementar um fluxo de "Direito à Eliminação" (Art. 18 LGPD) em conformidade, permitindo que fornecedores solicitem a remoção do perfil com validação, confirmação de propriedade e registro de auditoria.

## Alterações Propostas

### 1. Camada Core (Modelos e Serviços)
#### [MODIFICAR] `src/app/core/models/removal-request.model.ts`
- Atualizar `RemovalRequestPayload` para incluir: `requesterName`, `confirmsOwnership`, `additionalInfo` (substituindo description).
- Atualizar enum `RemovalReason` se necessário.
- Adicionar interfaces `RemovalRequestStatus` e `RemovalRequestTimeline`.

#### [MODIFICAR] `src/app/core/services/removal-request.service.ts`
- Garantir que `submitRemovalRequest` corresponda ao novo payload.
- Adicionar método `getRemovalRequestStatus(id, email)`.

### 2. Feature: Módulo de Privacidade
Criar um novo módulo de feature `PrivacyModule` em `src/app/features/privacy`.

#### [NOVO] `src/app/features/privacy/privacy-module.ts`
- Definição do Módulo Angular importando componentes de arquitetura limpa.

#### [NOVO] `src/app/features/privacy/privacy.routes.ts`
- Definir rotas filhas: `request-removal` e `request-removal/status`.

#### [NOVO] `src/app/features/privacy/removal-request-page/removal-request-page.ts`
- **Template**: Implementar o formulário descrito em RN-002 e RN-004.
- **Lógica**: Validação do formulário (RN-003), envio para API (RN-005).
- **Estilos**: Adaptados de `RemovalRequestForm.css` (RN-009).
- **Estado de Sucesso**: Mostrar informações do protocolo após envio.

#### [NOVO] `src/app/features/privacy/removal-status-page/removal-status-page.ts`
- **Template**: Formulário de busca e exibição de Status (RN-007).
- **Lógica**: Buscar status por ID + Email.

### 3. Roteamento da Aplicação
#### [MODIFICAR] `src/app/app.routes.ts`
- Adicionar caminho `privacy` às rotas filhas da cidade.
- Adicionar redirecionamento da raiz `/privacy` para a rota de privacidade da cidade padrão (opcional, mas bom para links diretos).

### 4. Integração
#### [MODIFICAR] `src/app/features/fornecedores/fornecedor-page.ts`
- Atualizar `requestRemoval()` para navegar para `/privacy/request-removal?fornecedorId=UUID`.

## Plano de Verificação

### Testes Automatizados
- `npm test` -> Verificação dos novos componentes (gerarei arquivos spec).

### Verificação Manual
1. **Navegação**: Ir para Perfil do Fornecedor -> Clicar "Solicitar remoção" -> Verificar redirecionamento para nova página com ID preenchido.
2. **Validação de Formulário**: Tentar enviar vazio -> Verificar erros. Tentar enviar sem checkbox -> Verificar botão desabilitado.
3. **Envio**: Enviar formulário válido -> Verificar mensagem de sucesso e ID do Protocolo.
4. **Verificação de Status**: Ir para página de Status -> Inserir Protocolo + Email -> Verificar exibição do status.
