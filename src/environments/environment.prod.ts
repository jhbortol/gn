declare global {
  interface Window {
    __env__?: {
      API_BASE_URL?: string;
    };
  }
}

export const environment = {
  API_BASE_URL: typeof window !== 'undefined' && window.__env__?.API_BASE_URL
    ? window.__env__.API_BASE_URL
    : 'https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1',
  INTERNAL_AUTH_EMAIL: 'jhbortol@gmail.com',
  INTERNAL_AUTH_PASSWORD: 'pesc01',
  FORNECEDOR_PUBLICADO: true as boolean | null,
  PAINEL_URL: 'https://painel.guianoivas.com'
};
