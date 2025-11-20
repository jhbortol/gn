import { Injectable } from '@angular/core';

export interface Categoria {
  id: string;
  name: string;
  descricao: string;
  imagem: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriasData {
  private categorias: Categoria[] = [
    {
      id: 'fotografia',
      name: 'Fotografia',
      descricao: 'Profissionais para registrar seu grande dia.',
      imagem: 'assets/categorias/fotografia.jpg'
    },
    {
      id: 'buffet',
      name: 'Buffet',
      descricao: 'Buffets e serviços de alimentação para eventos.',
      imagem: 'assets/categorias/buffet.jpg'
    },
    {
      id: 'decoracao',
      name: 'Decoração',
      descricao: 'Decoração e ambientação para casamentos.',
      imagem: 'assets/categorias/decoracao.jpg'
    },
    {
      id: 'musica',
      name: 'Música',
      descricao: 'Bandas, DJs e músicos para cerimônia e festa.',
      imagem: 'assets/categorias/musica.jpg'
    },
    {
      id: 'espacos',
      name: 'Espaços',
      descricao: 'Locais para realização de eventos.',
      imagem: 'assets/categorias/espacos.jpg'
    },
    {
      id: 'vestidos',
      name: 'Vestido de Noiva',
      descricao: 'Estilistas e lojas especializadas.',
      imagem: 'assets/categorias/vestidos.jpg'
    }
  ];

  getAll(): Categoria[] {
    return this.categorias;
  }
}
