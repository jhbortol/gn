import { Injectable } from '@angular/core';

export interface Fornecedor {
  id: string;
  nome: string;
  categoria: string;
  cidade?: string;
  estado?: string;
  bairro?: string;
  rating?: number;
  sobre?: string;
  whatsapp?: string;
  site?: string;
  instagram?: string;
  imagens?: string[];
  depoimentos?: Array<{
    texto: string;
    casal: string;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class FornecedoresData {
  private data: Fornecedor[] = [
    {
      id: 'sandro-cardoso',
      nome: 'Sandro Cardoso',
      categoria: 'FOTOGRAFIA',
      cidade: 'Piracicaba',
      estado: 'SP',
      rating: 5,
      sobre:
        'Eu sou um apaixonado pelo que faço, amo fotografar os melhores momentos da vida. Acredito que a fotografia é algo que completa minha vida, pois o que realmente importa são as Histórias.',
      whatsapp: '+5519998437940',
      site: '#',
      instagram: 'sandrocardoso',
      imagens: [
        '/assets/sample/rings.jpg',
        '/assets/sample/wedding-1.jpg',
        '/assets/sample/wedding-2.jpg',
        '/assets/sample/portrait.jpg'
      ],
      depoimentos: [
        {
          texto: 'Excelentes profissionais! Super recomendo seu trabalho. Amei do começo ao fim.',
          casal: 'Fernanda e Ronildo'
        },
        {
          texto: 'O melhor fotógrafo e profissional do mundo!!! Com um coração gigante, que realizou meu sonho encantado. Obrigada eternamente.',
          casal: 'Cris e Douglas'
        }
      ]
    },
    {
      id: 'buffet-sabor-real',
      nome: 'Buffet Sabor Real',
      categoria: 'BUFFET',
      cidade: 'Piracicaba',
      estado: 'SP',
      bairro: 'Vila Rezende',
      rating: 4.8,
      sobre:
        'Gastronomia sofisticada para o seu grande dia. Cardápios personalizados que vão do clássico ao contemporâneo.',
      whatsapp: '+5519999999999',
      site: '#',
      instagram: 'buffetsaborreal',
      imagens: [
        '/assets/sample/buffet.jpg'
      ]
    }
  ];

  getById(id: string): Fornecedor | undefined {
    return this.data.find(f => f.id === id);
  }
  getByCategoria(categoria: string): Fornecedor[] {
    return this.data.filter(f => f.categoria?.toLowerCase() === categoria?.toLowerCase());
  }
}
