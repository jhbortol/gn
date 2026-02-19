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

// Load config from server if not already set
if (typeof window !== 'undefined' && !window.__env__?.API_BASE_URL) {
  fetch('/config.json')
    .then(response => response.json())
    .then(config => {
      if (window.__env__) {
        window.__env__.API_BASE_URL = config.API_BASE_URL;
      }
    })
    .catch(e => console.warn('Could not load config.json', e));
}
