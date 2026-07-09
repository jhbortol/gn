# Análise de Funcionalidades - Módulo "Meu Casamento"

## Introdução
Este documento detalha as funcionalidades do módulo "Meu Casamento", parte integrante do PWA, focado na organização e planejamento de casamentos. Ele foi elaborado para auxiliar na análise de pontos fortes e fracos de cada submódulo pela consultoria. O módulo é projetado com uma arquitetura *Offline-First*, garantindo resiliência e usabilidade mesmo em condições de rede adversas.

---

## 1. Hub Meu Casamento (Dashboard)
O Hub é a central de controle da noiva/casal, oferecendo uma visão geral do evento e atalhos para todas as outras ferramentas.

### Funcionalidades Detalhadas:
- **Perfil do Casal:** Gerenciamento de informações essenciais (nome da noiva, do noivo, número de WhatsApp, data do casamento, estilo e quantidade estimada de convidados).
- **Controle de Desbloqueio (Gatekeeping):** As ferramentas avançadas (Cronograma, Convidados, Orçamento) são bloqueadas até que o nome do casal e o WhatsApp sejam informados e validados, garantindo a captura de leads essenciais.
- **Contador Regressivo:** Exibe dinamicamente os dias restantes para o casamento com base na data configurada.
- **Gestão de Consentimento (LGPD):** Interface nativa para adesão e revogação do Termo de Adesão e políticas de privacidade (Lista VIP), com integração direta com a API e registro de protocolo de aceite.

### Pontos Fortes:
- **Captura Progressiva de Leads:** Permite que o usuário explore o app antes de exigir dados, mas impõe um bloqueio lógico (Gatekeeping) em ferramentas de alto valor, equilibrando usabilidade e aquisição de dados.
- **UX Personalizada:** Mensagens de boas-vindas e contador regressivo criam um engajamento emocional forte.
- **Transparência e Conformidade:** Gestão clara e rastreável do consentimento (LGPD) com feedback visual de sucesso e protocolos.

### Pontos Fracos / Oportunidades de Melhoria:
- **Onboarding Abrupto:** O bloqueio de ferramentas via query params (`desbloqueioPendente=1`) pode ser frustrante se não houver um onboarding guiado ou modal explicativo mais amigável.
- **Campos Limitados no Perfil:** A exclusividade de `brideFirstName` e `groomFirstName` pode não ser totalmente inclusiva para casais homoafetivos dependendo de como as labels são apresentadas na interface final, embora a lógica aceite valores nulos para o segundo nome.

---

## 2. Cronograma (Checklist)
Um guia de tarefas regressivo focado na preparação do casamento ao longo de 12 meses.

### Funcionalidades Detalhadas:
- **Tarefas Pré-definidas:** Lista imutável de tarefas organizadas em blocos cronológicos (12 meses, 9 meses, 6 meses, 3 meses, 1 mês, Semana do Casamento).
- **Cálculo de Prazos Dinâmico:** Se a data do casamento estiver definida, o sistema calcula e exibe em qual mês/ano cada grupo de tarefas deve ser concluído (ex: "Faltam 12 meses (até mai/2026)").
- **Ações de Engajamento (Call to Action):** Tarefas específicas possuem "deep links" (botões) que direcionam a noiva diretamente para categorias de fornecedores relevantes na plataforma (ex: "Ver Espaços", "Ver Fotógrafos").
- **Controle de Estado:** Permite marcar/desmarcar tarefas, com cálculo instantâneo de progresso (X/Y tarefas concluídas por grupo e total).

### Pontos Fortes:
- **Cross-Selling de Fornecedores:** Excelente integração com o core business da plataforma. Ao sugerir uma tarefa (ex: "Contratar Buffet"), o app já oferece o link para a lista de buffets da cidade atual.
- **Engajamento e Gamificação:** O tracking visual do progresso reduz a ansiedade do planejamento e mantém a usuária retornando ao app.

### Pontos Fracos / Oportunidades de Melhoria:
- **Falta de Personalização:** A lista é "hardcoded" (`WEDDING_CHECKLIST_TASKS`). A usuária não pode adicionar tarefas personalizadas, editar os títulos, ou mudar os prazos, o que pode não se adequar a casamentos organizados em tempo recorde ou com necessidades únicas.
- **Sem Notificações Push:** O módulo atualmente depende da visita proativa do usuário. Um sistema de alertas sobre tarefas atrasadas enriqueceria a funcionalidade.

---

## 3. Lista de Convidados
Gerenciador completo para a lista de presença do evento.

### Funcionalidades Detalhadas:
- **CRUD Completo e Rascunho (Draft):** Permite adicionar, editar e remover convidados, garantindo que edições parciais não sejam perdidas usando um sistema de rascunhos em memória.
- **Categorização Estruturada:** Classificação de convidados por grupos ("Família", "Trabalho", "Amigos", "Outros") e status de confirmação ("Pendente", "Confirmado", "Recusado").
- **Gestão de Acompanhantes (Plus Ones):** Controle numérico de acompanhantes vinculados a um convidado principal, impactando na contagem total.
- **Painel de Estatísticas:** Resumo em tempo real do total de convidados esperados, confirmados, recusados e pendentes.
- **Busca e Filtros:** Pesquisa em tempo real por nome e filtros combinados por grupo e status.
- **Suporte Legado:** O modelo de dados possui tratamento para campos legados (`groupName` e `confirmed`) para manter retrocompatibilidade com versões antigas da API.

### Pontos Fortes:
- **Performance:** Os cálculos de totais são feitos utilizando a reatividade avançada do Angular 19 (`computed`), garantindo respostas instantâneas na interface.
- **Offline First Avançado:** Utiliza um modelo de `syncState` ('created', 'updated', 'deleted') para permitir o gerenciamento da lista mesmo sem internet, sincronizando alterações posteriormente via fila.

### Pontos Fracos / Oportunidades de Melhoria:
- **Sem Importação em Lote:** O cadastro é manual e individual. Falta opção para importar planilhas de contatos ou agenda telefônica do celular.
- **Sem Integração com RSVP Ativo:** O status é alterado manualmente pelo casal. Não existe, no momento, um link público (Mini-site) onde o próprio convidado possa confirmar presença (RSVP).

---

## 4. Orçamento (Budget)
Ferramenta financeira para estimar e controlar os gastos da festa.

### Funcionalidades Detalhadas:
- **Teto de Gastos (Total Budget):** A usuária define o valor total que deseja investir no casamento.
- **Acompanhamento de Progresso (Barra de Progresso):** O sistema calcula visualmente o percentual de uso do orçamento total com base no que já foi gasto.
- **Gestão de Categorias:** Edição de gastos divididos por categorias fornecidas pela plataforma (carregadas dinamicamente via `loadBudgetCategories`).
- **Controle de Alocação vs. Realizado:** Permite lançar um valor "Estimado/Alocado" para uma categoria e, posteriormente, lançar o valor "Gasto Real", fornecendo análise de desvios.
- **Gestão de Status e Fornecedor:** Cada categoria possui um status ("Pendente", "Em negociação", "Contratado", "Pago"), além de um campo livre para nome do fornecedor e anotações.
- **Navegação Integrada:** Ao lado de cada categoria orçamentária, há atalhos (Deep Links) para a respectiva listagem de fornecedores na plataforma, baseada na cidade selecionada.
- **Tratamento Seguro de Moeda:** Sistema robusto de *parsing* e formatação BRL para evitar problemas com floats e inputs de formulário.

### Pontos Fortes:
- **Gestão Financeira Realista:** A separação entre valor "alocado" e "gasto" demonstra um entendimento maduro das dores do planejamento financeiro de eventos.
- **Ligação com o Marketplace:** Atalhos contextuais de categorias orçamentárias fortalecem a conexão do usuário com os anunciantes do portal.

### Pontos Fracos / Oportunidades de Melhoria:
- **Gestão Engessada de Itens:** O controle financeiro é atrelado "1 para 1" a uma categoria. Se a noiva contratar dois fornecedores da mesma categoria (ex: dois músicos), ela terá dificuldade, pois só existe uma entrada de "Música" padrão. A usuária não pode criar itens personalizados avulsos.
- **Visualização Analítica Básica:** A ausência de gráficos de pizza ou distribuição de despesas pode tornar a análise menos visual.

---

## 5. Favoritos (Wishlist)
*(Funcionalidade referenciada na Store e API, ligada a fornecedores)*

### Funcionalidades Detalhadas:
- **Salvar Fornecedores:** Possibilidade de adicionar perfis de fornecedores da plataforma a uma lista de favoritos.
- **Anotações Pessoais:** O usuário pode adicionar uma nota em texto livre a cada fornecedor favoritado (ex: "Preço fechado em R$ 12.000 — confirmar em maio").
- **Sincronização Integrada:** O estado do favorito (`syncState`) garante que o fornecedor não se perca caso seja adicionado offline.

### Pontos Fortes:
- **Anotações Privadas:** Funcionalidade crucial na jornada de cotações, permitindo à noiva centralizar informações de negociação dentro do próprio app em vez de usar planilhas de excel ou cadernos.

### Pontos Fracos / Oportunidades de Melhoria:
- Não há possibilidade de agrupar fornecedores (ex: "Top 3", "Descartados"). O recurso funciona apenas como uma lista plana.

---

## 6. Arquitetura de Sincronização & Offline-First
O coração técnico que garante a resiliência do módulo.

### Funcionalidades Detalhadas:
- **Store Local Reativa:** Os dados de todo o módulo (Perfil, Checklist, Orçamento, Convidados, Favoritos) são mantidos no `localStorage` sob a gestão de Angular Signals (`MeuCasamentoStoreService`), garantindo persistência entre reloads e respostas instantâneas na tela.
- **Fila de Sincronização (Sync Queue):** Sempre que uma alteração é feita, ela é marcada na Store com um tipo (ex: `guestsSync`) e enfileirada.
- **Processamento em Background (Sync Service):** O `MeuCasamentoSyncService` escuta eventos (inicialização, retorno de conexão) para descarregar a fila de sincronização chamando a API Restful (`MeuCasamentoApiService`).
- **Resolução de Conflitos e Retentativas:** Sistema de *Retry/Backoff Exponencial* para falhas de rede. Se a rede cai, a requisição pausa e tenta de novo com tempo crescente (1s, 2s, 4s). Erros definitivos mantêm os dados seguros no rascunho local.
- **Hydrate & Restore:** O app consegue restaurar o último estado remoto conhecido (Hydrate) se detectar um cache local vazio (útil ao logar num novo celular).
- **Observabilidade:** Métricas e logs rigorosos (`MeuCasamentoObservabilityService`) para falhas de sync e retry (monitoramento e correções).

### Pontos Fortes:
- **Experiência sem Interrupções (UX):** O usuário nunca vê "spinners" de carregamento ao salvar dados, e não perde trabalho se entrar no metrô ou perder a internet.
- **Engenharia de Ponta:** Implementação sólida e elegante da abordagem Offline-First. Separa de forma brilhante a experiência visual da latência de rede.

### Pontos Fracos / Oportunidades de Melhoria:
- **Conflito de Concorrência (Multi-device):** A estratégia atual funciona bem, mas é baseada no conceito "último a escrever ganha". Se o usuário utilizar dois dispositivos simultaneamente offline e depois sincronizar, não há algoritmo sofisticado de *Merge Conflict* (CRDTs); a alteração mais recente pode sobrescrever ou gerar anomalias pontuais.

---

## 7. Autenticação, Proteção de Dados e LGPD

### Funcionalidades Detalhadas:
- **Autenticação Segura via OTP:** Verificação primária baseada em WhatsApp com envio de OTP (One Time Password). Se o aparelho for perdido, basta usar o mesmo número de WhatsApp.
- **Remoção Definitiva de Dados (Direito ao Esquecimento):** Um fluxo claro e integrado para apagar todos os dados ("Delete Account").
- **Exclusão Offline (Pending Delete Intent):** Se a usuária tenta excluir seus dados estando offline, o aplicativo limpa imediatamente a tela do celular, salva uma intenção local (`DELETE_INTENT_KEY`) e envia silenciosamente o comando de exclusão para o backend na primeira oportunidade em que a internet retornar.

### Pontos Fortes:
- **Conformidade de Alto Nível (LGPD):** O sistema não apenas deleta na API, mas garante a anonimização e exclusão mesmo em casos borda de falha de conexão (Pending Delete Intent).
- **Sem Fricção de Senhas:** A autenticação via WhatsApp reduz drasticamente as taxas de abandono por senhas esquecidas.

### Pontos Fracos / Oportunidades de Melhoria:
- **Dependência de SMS/Mensageria:** Casos onde a provedora de OTP caia ou seja bloqueada impedirão as noivas de acessar seu planejamento de casamento em aparelhos novos.

---

## Conclusão Geral
O módulo "Meu Casamento" é um ecossistema incrivelmente robusto, construído sob as premissas mais modernas de Progressive Web Apps (PWA). Seus maiores trunfos são a fluidez do *Offline-First* e as conexões inteligentes criadas (Cross-Selling) com a listagem de fornecedores, maximizando o engajamento e a conversão de leads.
Como próximo passo para amadurecimento, o produto beneficiaria enormemente de mais opções de customização para a usuária final (ex: itens não tabelados no orçamento e checklist) e ferramentas colaborativas diretas com convidados (RSVP ativo).