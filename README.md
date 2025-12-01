# GuiaNoivas

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.10.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Deploy (GitHub Pages)

This repository deploys to GitHub Pages using GitHub Actions.

- Public URL: `https://jhbortol.github.io/gn/`
- Base href: `/gn/` (set during build)

### How it works

- Workflow file: `.github/workflows/deploy-gh-pages.yml`
- Triggers on pushes to `main` and manual dispatch.
- Builds browser artifacts and publishes `dist/**/browser` to Pages.

### Run the build locally with the same base href

```bash
npx ng build --configuration production --base-href /gn/
```

### Repository Settings

In GitHub:
- Go to Settings → Pages → set Source to "GitHub Actions".
- Ensure branch `main` is the default or manually run the workflow in Actions.

### Notes

- The previous Netlify configuration (e.g., `public/_redirects`) is not used by GitHub Pages. You may keep it for local testing or remove it if not needed.
- If your repository name or owner changes, update the base href accordingly.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Backend API Integration

O projeto agora consome a API documentada em `docs/frontend-spec.md` e nos changelogs. Foi adicionada integração automática para Fornecedores e Categorias:

- Arquivo `src/environments/environment.ts` contém:
	- `API_BASE_URL`: URL base da API (`https://.../api/v1`)
	- `INTERNAL_AUTH_EMAIL` / `INTERNAL_AUTH_PASSWORD`: credenciais internas usadas para obter `accessToken` via `POST /auth/login` (não há fluxo de login de usuário final nesta versão).
- Serviço `AuthTokenService` realiza login quando necessário e o `authTokenInterceptor` anexa o header `Authorization`.
- Serviço `FornecedoresData` agora busca lista e detalhe via endpoints reais (`GET /fornecedores`, `GET /fornecedores/slug/{slug}`) e adapta o formato para o componente existente.
- Serviço `CategoriasData` tenta consumir `GET /categorias`; se o endpoint não estiver disponível ainda, retorna um fallback estático.

### Configuração de Credenciais (IMPORTANTE)
Não commite credenciais reais. Ajuste os valores de email e senha via:

1. Ambiente local: edite temporariamente `environment.ts` (substitua `CHANGEME`).
2. Produção (GitHub Pages): como é um hosting estático, variáveis de ambiente não são injetadas no runtime. Caso precise chaves/URLs diferentes, use arquivos `environment` de produção e/ou um passo de build que escreva configurações estáticas.

Caso `INTERNAL_AUTH_EMAIL` permaneça `CHANGEME`, as chamadas autenticadas falharão.

### Teste Rápido
Após configurar credenciais válidas:
```bash
npm install
ng serve
```
Abra uma rota de fornecedor (`/fornecedores/<slug>`) e verifique no DevTools as requisições para `/auth/login` (uma vez) e `/fornecedores/slug/<slug>` retornando JSON.

### Atualizações Futuras
- Implementar refresh token se necessário (em caso de expiração frequente).
- Substituir fallback de categorias por chamada real assim que o endpoint for disponibilizado.
- Adicionar listagem paginada de fornecedores na UI pública usando `getAll(page,pageSize)`.
