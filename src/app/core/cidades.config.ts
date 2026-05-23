export interface CidadeConfig {
  slug: string;
  nome: string;
}

export const CIDADES_DISPONIVEIS: CidadeConfig[] = [
  { slug: 'piracicaba', nome: 'Piracicaba' },
  { slug: 'limeira', nome: 'Limeira' },
  { slug: 'americana', nome: 'Americana' }
];

export const CIDADE_PADRAO = CIDADES_DISPONIVEIS[0].slug;
