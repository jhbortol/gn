# Plano de Performance - Imagens e Bundle (Backend & Cloudflare)

O relatório Lighthouse apontou uma pontuação de performance muito baixa (0.37). A maior parte dessa nota (Total Byte Weight e Largest Contentful Paint) decorre do download de payloads gigantes, majoritariamente imagens PNG e JPG na casa dos 6MB a 7MB sem compressão. Além disso, havia bloqueio da thread principal pelos scripts de terceiros (já resolvido pelo frontend).

Este documento detalha o plano de ação fora do código-fonte (frontend) para que o sistema inteiro alcance pontuação > 90.

## 1. Cloudflare: Otimização On-the-Fly (Plano Gratuito)
Como o uso do plano gratuito da Cloudflare está nos planos, podemos utilizar as funcionalidades do próprio proxy para otimizar imagens antes que elas cheguem ao usuário, sem precisar, no primeiro momento, alterar a infraestrutura do Backend.

### Configurações Necessárias no Cloudflare
1. **Habilitar Proxy (Nuvem Laranja):** O subdomínio que serve as imagens (`gnmedias.blob.core.windows.net`) precisaria estar atrás da Cloudflare (por exemplo, criando um CNAME tipo `media.guianoivas.com` -> `gnmedias.blob.core.windows.net` e fazendo proxy).
   - *Nota:* Sem o proxy ativo para as mídias, o Cloudflare não conseguirá interceptar nem cachear os blobs da Azure.
2. **Speed -> Optimization -> Image Optimization:** O Cloudflare Polish (que comprime imagens automaticamente) está disponível nos planos pagos, mas no plano *Free* você pode aproveitar:
   - **Auto Minify:** Habilitar JS, CSS e HTML.
   - **Brotli Compression:** Certificar-se de que está habilitado para comprimir respostas de texto, json, js e css (afeta a aplicação principal).
   - **Early Hints:** Ativar para acelerar carregamento de assets críticos.
3. **Caching -> Cache Rules (Regras de Cache):**
   - Criar uma regra para fazer *cache everything* na rota das mídias (`media.guianoivas.com/*`) definindo "Edge Cache TTL" longo (ex: 1 ano) e "Browser Cache TTL" forte (ex: 1 ano). Isso resolverá o alerta *Use efficient cache lifetimes*.

## 2. Backend & Pipeline de Upload de Imagens
Como o Cloudflare Free não suporta otimização de imagem on-the-fly (redimensionamento / conversão para WebP), a ação definitiva deverá acontecer na camada de backend/API que processa o upload de novos fornecedores.

### Ações para os Novos Uploads (Backend/API)
- **Implementar processamento de imagens (C# / Node):** Antes de enviar a imagem para o `Azure Blob Storage`, a API deve:
  1. Reduzir a resolução máxima (ex: `1920x1080` para originais e `800x600` para cards).
  2. Converter PNGs e JPGs para formatos modernos (`.webp` ou `.avif`).
  3. Gerar "thumbnails" de tamanho reduzido.
- **Estrutura de pastas ou sufixos:** Salvar a imagem processada com prefixos (ex: `thumb_fornecedor.webp`, `large_fornecedor.webp`).

### Ações para o Acervo Existente (Ação Única/Manual)
Para resolver imediatamente as imagens de 6 a 7 MB que o Lighthouse acusou:
- **Identificar os Blobs Gigantes:**
  - `434094b2..._doces_finos.png` (7.03 MB)
  - `5648c236..._cerimonial.png` (6.37 MB)
  - `2e5ac607..._lua_de_mel.png` (6.26 MB)
  - E todas as imagens acima de 500 KB na pasta `/media/media/2025/11/`.
- **Script de Migração ou Intervenção Manual:**
  - Baixar essas imagens.
  - Usar ferramentas locais ou scripts (ex: squoosh-cli, ffmpeg, TinyPNG) para redimensioná-las (ex: 1200x800) e salvá-las como WebP (qualidade 80%).
  - Realizar o re-upload para a mesma URL/caminho (sobrescrevendo), ou atualizar a tabela de banco de dados para as novas URLs.

## 3. O que já foi resolvido pelo Frontend (Neste PR)
1. **Third-Party Scripts:** Scripts como Google Tag Manager, Google Ads, GSI (Google Identity) e Meta Pixel foram modificados para serem carregados *lazy* (apenas ao interagir com o site - scroll, clique - ou após 3.5 segundos). Isso remove o forte bloqueio de JavaScript inicial.
2. **Lazy Loading Angular:** Verifiquei as rotas do app (`app.routes.ts`) e o `loadComponent`/`loadChildren` já está devidamente configurado, separando os componentes pesados.

---
**Resumo da Próxima Ação:** Redimensionar manualmente e converter para WebP as imagens com mais de 2MB que se encontram no Azure Blob Storage (`gnmedias...`) e configurar proxy/caching no Cloudflare.
