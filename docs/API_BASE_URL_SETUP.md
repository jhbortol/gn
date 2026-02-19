# API_BASE_URL - Configuração para Azure Static Web Apps

## Como configurar no Azure Static Web Apps

A URL base da API é configurada via variável de ambiente no tempo de build. Para que funcione corretamente no Azure Static Web Apps, você precisa:

### Opção 1: Via GitHub Secrets (Recomendado)

1. No repositório GitHub, vá para **Settings > Secrets and variables > Actions**
2. Clique em **New repository secret**
3. Nome: `API_BASE_URL`
4. Valor: `https://func-guianoivas-dev-deczg2affxb9f7f7.brazilsouth-01.azurewebsites.net/api/v1`
5. Clique em **Add secret**

O workflow automaticamente usará este valor durante o build.

### Opção 2: Via Variáveis de Ambiente do Azure

Se preferir configurar diretamente no Azure Static Web Apps:

1. No portal Azure, vá para seu recurso **Static Web App**
2. Clique em **Configuration > Application settings**
3. Defina a variável de ambiente (ela ficará disponível apenas em tempo de runtime, não de build)
4. **Nota:** As variáveis do Azure Application Settings não são acessíveis durante o build no GitHub Actions

### Como funciona

- O arquivo `environment.prod.ts` contém um placeholder `%%API_BASE_URL%%`
- Durante o build, o script `replace-env.js` substitui esse placeholder pelo valor da variável de ambiente
- O workflow `.github/workflows/azure-static-web-apps-blue-river-014fe610f.yml` passa a variável para o job de build

### Testando localmente

```bash
API_BASE_URL="https://sua-api-url" npm run build
```

Isso substituirá o placeholder pela URL que você especificar.
