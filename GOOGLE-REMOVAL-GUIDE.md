# 🗑️ Guia para Remover dev.guianoivas.com do Google

## Passo 1: Acessar Google Search Console

1. Vá para: https://search.google.com/search-console
2. Faça login com sua conta Google que gerencia o site

## Passo 2: Adicionar Propriedade (se necessário)

Se `dev.guianoivas.com` ainda não estiver adicionado:

1. Clique em **Adicionar propriedade**
2. Escolha tipo: **Prefixo da URL**
3. Digite: `https://dev.guianoivas.com`
4. Clique em **Continuar**
5. Verifique a propriedade usando um dos métodos:
   - **Tag HTML**: Adicione a meta tag no `<head>`
   - **Arquivo HTML**: Faça upload do arquivo fornecido
   - **Google Analytics**: Se já estiver configurado
   - **DNS**: Adicione registro TXT no DNS

## Passo 3: Solicitar Remoção Temporária

1. No menu lateral esquerdo, clique em **Remoções**
2. Clique no botão **+ NOVA SOLICITAÇÃO**
3. Selecione: **Remover temporariamente URL**
4. Digite a URL: `https://dev.guianoivas.com/`
5. Marque a opção: ✅ **"Remover também todas as URLs que começam com este prefixo"**
6. Clique em **Próximo**
7. Revise as informações
8. Clique em **Enviar solicitação**

## Passo 4: Aguardar Processamento

- **Status**: A solicitação aparecerá como "Pendente"
- **Tempo**: Geralmente 1-2 dias para aprovação
- **Duração**: A remoção dura 6 meses
- **Permanente**: Após 6 meses, se robots.txt + noindex estiverem ativos, não será re-indexado

## Passo 5: Verificar Remoção

### Via Google Search Console
1. Vá em **Remoções**
2. Verifique o status da solicitação
3. Status "Aprovada" = URLs removidas

### Via Busca do Google
```
site:dev.guianoivas.com
```
- Antes: Vários resultados
- Depois: "Nenhum resultado encontrado" ou muito poucos

## Passo 6: Manter Proteções Ativas

⚠️ **IMPORTANTE**: Mantenha sempre ativo em dev:
- ✅ Meta tag `<meta name="robots" content="noindex, nofollow">`
- ✅ robots.txt bloqueando crawlers (`Disallow: /`)

Isso evita re-indexação após os 6 meses da remoção temporária.

## Opção Alternativa: Remoção Permanente

Se você tem acesso ao Google Search Console da propriedade antiga:

1. Vá em **Configurações** (engrenagem)
2. Role até **Rastreamento do Google**
3. Clique em **Remover URL do índice**
4. Adicione padrões de URL para remover

## Monitoramento Contínuo

### Verificar Status Semanal (primeiras 2 semanas)
```bash
# Verificar robots.txt
curl https://dev.guianoivas.com/robots.txt

# Buscar no Google
# Abrir: https://www.google.com/search?q=site:dev.guianoivas.com
```

### Alertas (Opcional)
Configure alerta no Google Search Console:
1. Vá em **Configurações** > **Usuários e Notificações**
2. Ative notificações por email
3. Receberá alertas sobre problemas de indexação

## Problemas Comuns

### "Não foi possível remover"
**Causa**: Site ainda permite indexação  
**Solução**: 
1. Verificar meta tag noindex está presente
2. Verificar robots.txt está bloqueando
3. Aguardar 48h e tentar novamente

### "URLs ainda aparecem na busca"
**Causa**: Google cache ainda não atualizou  
**Solução**:
1. Aguardar mais tempo (pode levar até 7 dias)
2. Usar ferramenta de Inspeção de URL para forçar re-crawl
3. Solicitar remoção de cache individual

### "Remoção expirou e site voltou ao índice"
**Causa**: Proteções (noindex/robots.txt) foram removidas  
**Solução**:
1. Re-aplicar proteções
2. Fazer novo build com `build-dev.ps1`
3. Fazer nova solicitação de remoção

## Links Úteis

- **Google Search Console**: https://search.google.com/search-console
- **Ferramenta de Inspeção de URL**: (dentro do Search Console)
- **Documentação Google**: https://developers.google.com/search/docs/crawling-indexing/remove-information
- **Status de Indexação**: https://www.google.com/search?q=site:dev.guianoivas.com

## Checklist Final

- [ ] Google Search Console acessado
- [ ] Propriedade dev.guianoivas.com adicionada/verificada
- [ ] Solicitação de remoção enviada
- [ ] Opção "remover com prefixo" marcada
- [ ] Status "Aprovada" confirmado
- [ ] Busca `site:dev.guianoivas.com` retorna zero resultados
- [ ] Meta tag noindex verificada no site
- [ ] robots.txt verificado bloqueando crawlers
- [ ] Alerta configurado para monitoramento

---

**Tempo estimado total**: 3-7 dias para remoção completa  
**Esforço**: ~15 minutos de configuração + monitoramento
