import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-destaques-semana',
  standalone: true,
  templateUrl: './destaques-semana.html',
  styleUrl: './destaques-semana.css',
  imports: [CommonModule, RouterModule]
})
export class DestaquesSemanaComponent {
  destaques = [
    {
      id: 'sandro-cardoso',
      categoria: 'FOTOGRAFIA',
      nome: 'Sandro Cardoso',
      local: 'Piracicaba, SP',
      descricao: 'Eu sou um apaixonado pelo que faço, amo fotografar os melhores momentos da vida. Acredito que a ...',
      nota: 5,
      imagem: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'buffet-sabor-real',
      categoria: 'BUFFET',
      nome: 'Buffet Sabor Real',
      local: 'Vila Rezende, Piracicaba',
      descricao: 'Gastronomia sofisticada para o seu grande dia. Cardápios personalizados que vão do clássico ...',
      nota: 4.8,
      imagem: 'https://images.unsplash.com/photo-1519864600265-abb23843a6c1?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'flores-sonhos',
      categoria: 'DECORAÇÃO',
      nome: 'Flores & Sonhos',
      local: 'Centro, Piracicaba',
      descricao: 'Transformamos ambientes com arranjos florais exclusivos e projetos de decoração que refletem ...',
      nota: 4.9,
      imagem: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'chacara-do-sol',
      categoria: 'ESPAÇOS',
      nome: 'Chácara do Sol',
      local: 'Saltinho, SP (Próximo a Piracicaba)',
      descricao: 'Um espaço amplo ao ar livre, perfeito para casamentos no campo e festas ao pôr do sol.',
      nota: 4.7,
      imagem: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600'
    }
  ];
}
