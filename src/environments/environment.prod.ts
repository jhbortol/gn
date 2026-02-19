export const environment = (() => {
  const apiBaseUrl = typeof process !== 'undefined' && process.env ? process.env['API_BASE_URL'] : undefined;
  return {
    API_BASE_URL: apiBaseUrl || 'https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1',
    INTERNAL_AUTH_EMAIL: 'jhbortol@gmail.com',
    INTERNAL_AUTH_PASSWORD: 'pesc01',
    FORNECEDOR_PUBLICADO: true as boolean | null,
    PAINEL_URL: 'https://painel.guianoivas.com'
  };
})();
