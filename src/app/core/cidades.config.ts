export interface CidadeConfig {
  slug: string;
  nome: string;
  guid?: string;
}

export const CIDADES_DISPONIVEIS: CidadeConfig[] = [
  { slug: 'piracicaba', nome: 'Piracicaba', guid: '93e3496e-6a26-4851-ad9b-f9d6b4b58f3d' },
  { slug: 'limeira', nome: 'Limeira' },
  { slug: 'americana', nome: 'Americana' }
];

export const CIDADE_PADRAO = CIDADES_DISPONIVEIS[0].slug;
