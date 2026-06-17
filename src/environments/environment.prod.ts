export const environment = {
  production: true,
  API_BASE_URL: 'https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1',
  INTERNAL_AUTH_EMAIL: 'jhbortol@gmail.com',
  INTERNAL_AUTH_PASSWORD: 'pesc01',
  FORNECEDOR_PUBLICADO: true as boolean | null,
  PAINEL_URL: 'https://painel.guianoivas.com',
  // Version will be injected at build time by inject-version.js
  APP_VERSION: (typeof window !== 'undefined' && (window as any).__BUILD_VERSION__) || 'unknown',
  ENABLE_VERSION_CHECK: true,
  VERSION_CHECK_INTERVAL_MS: 5 * 60 * 1000, // 5 minutes
  GOOGLE_CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID', // TODO: preencher com o client ID real
  APPLE_CLIENT_ID: 'YOUR_APPLE_CLIENT_ID', // TODO: preencher com o client ID real
  APPLE_TEAM_ID: 'YOUR_APPLE_TEAM_ID', // TODO: preencher com o Apple Team ID
  APPLE_REDIRECT_URI: 'https://yourdomain.com/apple-auth-callback', // TODO: ajustar para a URL de callback registrada
};
