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
        '/assets/fornecedores/sandro-cardoso/1.png',
        '/assets/fornecedores/sandro-cardoso/2.png',
        '/assets/fornecedores/sandro-cardoso/3.png',
        '/assets/fornecedores/sandro-cardoso/4.png'
      ],
      depoimentos: [
        {
          texto: 'Excelentes profissionais! Super recomendo seu trabalho. Amei do começo ao fim.',
          casal: 'Fernanda e Ronildo'
        }
      ]
    },
    {
      id: 'fotografo-perez',
      nome: 'Fotógrafo Perez',
      categoria: 'FOTOGRAFIA',
      cidade: 'Piracicaba',
      estado: 'SP',
      rating: 5,
      sobre:
        'Com mais de três décadas dedicadas à arte de contar histórias, Antonio Perez não apenas fotografa, ele cria um legado. A sua jornada começou no fotojornalismo, onde apurou o seu olhar para captar a emoção crua de cada instante. Hoje, essa sensibilidade é a alma do seu trabalho em casamentos. Para Perez, cada casamento é uma tela em branco. Ele busca a essência de cada casal para criar imagens que sejam não apenas bonitas, mas atemporais e profundamente pessoais. O resultado é um trabalho exclusivo e intimista, que transforma o seu grande dia numa memória eterna.',
      whatsapp: '+5519997082651',
      site: 'https://fotoperez.com.br/',
      instagram: 'fotografo_ perez',
      imagens: [
        '/assets/fornecedores/perez/1.jpg',
        '/assets/fornecedores/perez/2.jpg',
        '/assets/fornecedores/perez/3.jpg',
        '/assets/fornecedores/perez/4.jpg',
        '/assets/fornecedores/perez/5.jpg',
        '/assets/fornecedores/perez/6.jpg',
        '/assets/fornecedores/perez/7.jpg',
        '/assets/fornecedores/perez/8.jpg'
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
      id: 'toccare',
      nome: 'Toccare Musica para Eventos',
      categoria: 'musica',
      cidade: 'Piracicaba',
      estado: 'SP',
      bairro: '',
      rating: 5,
      sobre:
        'Com 19 anos de história, a Toccare é especialista em criar a trilha sonora perfeita para cada momento.Desde a entrada impactante com o trompete até a formação completa com banda para a cerimônia, eles entregam arte, profissionalismo e a nota exata para eternizar o seu "sim"',
      whatsapp: '+5519983012271',
      site: 'https://linktr.ee/Toccare.musica',
      instagram: 'toccaremusica',
      imagens: [
        '/assets/fornecedores/toccare/1.jpeg',
        '/assets/fornecedores/toccare/2.jpeg',
        '/assets/fornecedores/toccare/3.jpeg',
        '/assets/fornecedores/toccare/4.jpeg',
        '/assets/fornecedores/toccare/5.jpeg',
        '/assets/fornecedores/toccare/6.jpeg',
        '/assets/fornecedores/toccare/7.jpeg',
        '/assets/fornecedores/toccare/8.jpeg'
      ],
      depoimentos: [
        {
          texto: 'Um dos momentos lindos de uma cerimonia que foi inteira emocionamente, graças a toda dedicação e maestria que vocês tiveram em executar o nosso sonho.',
          casal: 'Bianca e Estevan'
        },
        {
          texto: 'Obrigada por fazerem esse sonho ainda mais lindo e incrível com o dom de vocês!',
          casal: 'Bruna e Patrick'
        }
      ]
    }
  ];

  getById(id: string): Fornecedor | undefined {
    return this.data.find(f => f.id === id);
  }
  getByCategoria(categoria: string): Fornecedor[] {
    return this.data.filter(f => f.categoria?.toLowerCase() === categoria?.toLowerCase());
  }
  getAll(): Fornecedor[] {
    return this.data;
  }
}
