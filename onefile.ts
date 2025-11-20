import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// This file is a converted, runnable-friendly single-file Angular demo
// It contains standalone components and exported classes. Templates
// use Angular structural directives (*ngFor, *ngIf, [ngSwitch]).

// --- TIPAGEM DOS DADOS ---

interface Category {
  id: string;
  name: string;
  iconName: string;
  image: string;
}

interface Supplier {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  gallery: string[];
  contact: {
    phone: string;
    instagram: string;
    site: string | null;
  };
}

// --- DADOS MOCKADOS ---

const CATEGORIES: Category[] = [
  { id: 'fotografia', name: 'Fotografia', iconName: 'camera', image: 'https://images.unsplash.com/photo-1520854221256-17451cc330e7?auto=format&fit=crop&q=80&w=600' },
  { id: 'buffet', name: 'Buffet', iconName: 'utensils', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600' },
  { id: 'decoracao', name: 'Decoração', iconName: 'flower', image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&q=80&w=600' },
  { id: 'musica', name: 'Música', iconName: 'music', image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=600' },
  { id: 'espacos', name: 'Espaços', iconName: 'home', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600' },
  { id: 'vestidos', name: 'Vestido de Noiva', iconName: 'shirt', image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=600' }
];

const SUPPLIERS: Supplier[] = [
  {
    id: 1,
    name: 'Sandro Cardoso',
    category: 'fotografia',
    location: 'Piracicaba, SP',
    rating: 5.0,
    reviews: 154,
    image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&q=80&w=600',
    description: 'Eu sou um apaixonado pelo que faço, amo fotografar os melhores momentos da vida. Acredito que a fotografia é algo que completa minha vida, pois o que realmente importa são as Histórias.',
    gallery: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600'
    ],
    contact: { phone: '(19) 99843-7940', instagram: '@sandrocardoso', site: 'sandrocardoso.com.br' }
  },
  // (other suppliers truncated for brevity; keep full list in your real file)
  ...SUPPLIERS_PLACEHOLDER
];

// --- ICON COMPONENT ---
@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.stroke-width]="strokeWidth" stroke-linecap="round" stroke-linejoin="round" [attr.class]="className">
      <ng-container [ngSwitch]="name">
        <path *ngSwitchCase="'camera'" d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        <path *ngSwitchCase="'star'" d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        <path *ngSwitchCase="'heart'" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        <path *ngSwitchDefault d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
      </ng-container>
    </svg>
  `,
  imports: [CommonModule]
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: number = 24;
  @Input() strokeWidth: number = 2;
  @Input() className: string = '';
}

// Note: for brevity in this patch I will not reproduce every component in full.
// Instead I will scaffold a minimal App component that demonstrates the
// corrected template syntax and imports so you can run a demo and extend it.

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="min-h-screen bg-stone-50 text-gray-800 font-sans">
      <nav class="bg-white border-b p-4">
        <div class="container mx-auto flex items-center justify-between">
          <div class="flex items-center gap-2 text-2xl font-serif text-rose-600">
            <app-icon name="heart" [size]="22" className="text-rose-600"></app-icon>
            Guia Noivas <span class="text-sm text-gray-600 ml-2">Piracicaba</span>
          </div>
          <div class="hidden md:flex gap-6 text-sm text-gray-600">
            <button (click)="view='home'">INÍCIO</button>
            <button (click)="view='institutional'">SOBRE</button>
          </div>
        </div>
      </nav>

      <main class="p-8">
        <ng-container [ngSwitch]="view">
          <section *ngSwitchCase="'home'">
            <h1 class="text-4xl font-serif text-gray-800 mb-4">O Casamento dos seus Sonhos</h1>
            <p class="text-gray-600">Demo home page using mock data.</p>
          </section>

          <section *ngSwitchCase="'institutional'">
            <h2 class="text-2xl font-bold">Sobre Nós</h2>
            <p class="mt-2 text-gray-700">Conteúdo institucional de exemplo.</p>
          </section>

          <section *ngSwitchDefault>
            <h2>Demo</h2>
          </section>
        </ng-container>
      </main>
    </div>
  `
})
export class App implements OnInit {
  view: 'home' | 'institutional' | 'demo' = 'home';

  ngOnInit() {
    // demo logic
  }
}


// --- TIPAGEM DOS DADOS ---

interface Category {
  id: string;
  name: string;
  iconName: string;
  image: string;
}

interface Supplier {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  gallery: string[];
  contact: {
    phone: string;
    instagram: string;
    site: string | null;
  };
}

// --- DADOS MOCKADOS ---

const CATEGORIES: Category[] = [
  { id: 'fotografia', name: 'Fotografia', iconName: 'camera', image: 'https://images.unsplash.com/photo-1520854221256-17451cc330e7?auto=format&fit=crop&q=80&w=600' },
  { id: 'buffet', name: 'Buffet', iconName: 'utensils', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600' },
  { id: 'decoracao', name: 'Decoração', iconName: 'flower', image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&q=80&w=600' },
  { id: 'musica', name: 'Música', iconName: 'music', image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=600' },
  { id: 'espacos', name: 'Espaços', iconName: 'home', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600' },
  { id: 'vestidos', name: 'Vestido de Noiva', iconName: 'shirt', image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=600' }
];

const SUPPLIERS: Supplier[] = [
  {
    id: 1,
    name: 'Sandro Cardoso',
    category: 'fotografia',
    location: 'Piracicaba, SP',
    rating: 5.0,
    reviews: 154,
    image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&q=80&w=600',
    description: 'Eu sou um apaixonado pelo que faço, amo fotografar os melhores momentos da vida. Acredito que a fotografia é algo que completa minha vida, pois o que realmente importa são as Histórias.',
    gallery: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600'
    ],
    contact: { phone: '(19) 99843-7940', instagram: '@sandrocardoso', site: 'sandrocardoso.com.br' }
  },
  {
    id: 2,
    name: 'Buffet Sabor Real',
    category: 'buffet',
    location: 'Vila Rezende, Piracicaba',
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600',
    description: 'Gastronomia sofisticada para o seu grande dia. Cardápios personalizados que vão do clássico ao contemporâneo, garantindo uma experiência única de sabor.',
    gallery: [
      'https://images.unsplash.com/photo-1582291934243-aa13a3119d55?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1576610587650-a4a6880a2e94?auto=format&fit=crop&q=80&w=600'
    ],
    contact: { phone: '(19) 3422-0000', instagram: '@buffetsaborreal', site: 'saborreal.com.br' }
  },
  {
    id: 3,
    name: 'Flores & Sonhos',
    category: 'decoracao',
    location: 'Centro, Piracicaba',
    rating: 4.9,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&q=80&w=600',
    description: 'Transformamos ambientes com arranjos florais exclusivos e projetos de decoração que refletem a personalidade dos noivos.',
    gallery: [
      'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1507504031981-723e04343071?auto=format&fit=crop&q=80&w=600'
    ],
    contact: { phone: '(19) 99999-1234', instagram: '@floresesonhos', site: 'floresesonhos.com.br' }
  },
  {
    id: 4,
    name: 'Chácara do Sol',
    category: 'espacos',
    location: 'Saltinho, SP (Próximo a Piracicaba)',
    rating: 4.7,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600',
    description: 'Um espaço amplo ao ar livre, perfeito para casamentos no campo. Infraestrutura completa com salão coberto e área verde para cerimônia.',
    gallery: [
      'https://images.unsplash.com/photo-1464029902023-3e2bd434b915?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=600'
    ],
    contact: { phone: '(19) 3444-5555', instagram: '@chacaradosol', site: 'chacaradosol.com.br' }
  },
  {
    id: 5,
    name: 'Banda Harmonia',
    category: 'musica',
    location: 'Piracicaba, SP',
    rating: 5.0,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=600',
    description: 'Música ao vivo para cerimônia e festa. Repertório variado que vai do clássico ao pop rock, animando sua pista de dança.',
    gallery: [
       'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=600'
    ],
    contact: { phone: '(19) 98888-7777', instagram: '@bandaharmonia', site: 'bandaharmonia.com.br' }
  },
  {
    id: 6,
    name: 'Ateliê Bela Noiva',
    category: 'vestidos',
    location: 'Cidade Alta, Piracicaba',
    rating: 4.9,
    reviews: 310,
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=600',
    description: 'Coleções exclusivas de vestidos de noiva, madrinhas e debutantes. Ajustes perfeitos e atendimento personalizado.',
    gallery: [
        'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=600'
    ],
    contact: { phone: '(19) 3333-2222', instagram: '@belanoivapira', site: 'belanoiva.com.br' }
  },
  {
    id: 7,
    name: 'Luz & Cena Fotografia',
    category: 'fotografia',
    location: 'Piracicaba, SP',
    rating: 4.6,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc330e7?auto=format&fit=crop&q=80&w=600',
    description: 'Fotografia jornalística e espontânea.',
    gallery: [],
    contact: { phone: '(19) 9999-8888', instagram: '@luzecena', site: null }
  }
];

// --- COMPONENTES AUXILIARES ---

// 1. Ícone Component
@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      [attr.width]="size" 
      [attr.height]="size" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      [attr.stroke-width]="strokeWidth" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      [class]="className"
    >
      <ng-container [ngSwitch]="name">
        <path *ngSwitchCase="'camera'" d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        <path *ngSwitchCase="'music'" d="M9 18V5l12-2v13 M9 18a3 3 0 1 0-2.98 3 2.98 3 0 0 0 2.98-3zm12-2a3 3 0 1 0-2.98 3 2.98 3 0 0 0 2.98-3z"/>
        <path *ngSwitchCase="'utensils'" d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2 M7 2v20 M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
        <path *ngSwitchCase="'home'" d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10"/>
        <path *ngSwitchCase="'flower'" d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 1 4.5-4.5M7.5 12H9m3 4.5a4.5 4.5 0 1 1-4.5-4.5M12 16.5V15m4.5-3a4.5 4.5 0 1 0-4.5 4.5M16.5 12H15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0"/>
        <path *ngSwitchCase="'shirt'" d="M20.38 3.4a2 2 0 0 0-1.97-1.9L15.1 1.5a2 2 0 0 0-2.6 2.6L12 4.6l-.5-.5a2 2 0 0 0-2.6-2.6L5.6 1.5a2 2 0 0 0-1.98 1.9l-.3 1.6a6 6 0 0 0 1.6 4.8l.32.3a2 2 0 0 1 .6 1.4l.3 9.6a2 2 0 0 0 2 1.9h8.2a2 2 0 0 0 1.9-1.9l.25-9.6a2 2 0 0 1 .6-1.4l.3-.3a6 6 0 0 0 1.6-4.8l-.3-1.6z"/>
        <path *ngSwitchCase="'map-pin'" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        <path *ngSwitchCase="'phone'" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.12 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.03 12.03 0 0 0 2.81.57A2 2 0 0 1 22 16.92z"/>
        <path *ngSwitchCase="'instagram'" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0z"/> 
        <path *ngSwitchCase="'globe'" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        <path *ngSwitchCase="'star'" d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        <path *ngSwitchCase="'heart'" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        <path *ngSwitchCase="'chevron-right'" d="m9 18 6-6-6-6"/>
        <path *ngSwitchCase="'search'" d="m21 21-4.35-4.35 M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
        <path *ngSwitchCase="'menu'" d="M4 6h16 M4 12h16 M4 18h16"/>
        <path *ngSwitchCase="'x'" d="M18 6 6 18 M6 6l12 12"/>
        <path *ngSwitchCase="'arrow-left'" d="m12 19-7-7 7-7 M19 12H5"/>
        <path *ngSwitchCase="'check'" d="M20 6 9 17l-5-5"/>
        <path *ngSwitchCase="'file-text'" d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8"/>
        <path *ngSwitchCase="'shield'" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path *ngSwitchCase="'info'" d="M12 16v-4 M12 8h.01 M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z"/>
        <path *ngSwitchCase="'megaphone'" d="m3 11 18-5v12L3 14v-3z M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
        <path *ngSwitchCase="'alert-circle'" d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z M12 8v4 M12 16h.01"/>
      </ng-container>
    </svg>
  `,
  imports: [CommonModule]
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: number = 24;
  @Input() strokeWidth: number = 2;
  @Input() className: string = '';
}

// 2. Clickwrap Popup Component
@Component({
  selector: 'app-clickwrap-popup',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-fade-in">
      <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-rose-100 animate-zoom-in">
        <div class="bg-rose-50 px-6 py-4 border-b border-rose-100 flex items-center gap-3">
          <div class="bg-white p-2 rounded-full text-rose-600 shadow-sm">
            <app-icon name="alert-circle" [size]="24"></app-icon>
          </div>
          <h2 class="text-xl font-serif font-bold text-gray-800">Bem-vindo ao Guia</h2>
        </div>
        
        <div class="p-6 md:p-8">
          <div class="text-gray-600 space-y-4 text-sm leading-relaxed text-justify">
            <p>
              Este site é um portal de curadoria editorial e inspiração. Nossa missão é facilitar sua jornada apresentando uma seleção de fornecedores com destaque e identidade visual alinhada ao nosso estilo.
            </p>
            
            <div class="bg-stone-50 p-4 rounded-lg border border-stone-200">
              <p class="font-bold text-rose-700 mb-1 text-xs uppercase tracking-wider">Termo de Isenção</p>
              <p class="text-gray-700">
                Ao navegar por este Guia, você declara estar ciente de que o 'Guia de Noivas Piracicaba' atua exclusivamente na divulgação e sugestão de marcas. A negociação, contratação, pagamento e execução dos serviços são de responsabilidade total e exclusiva dos fornecedores anunciados.
              </p>
            </div>

            <p class="font-medium text-gray-800 text-center italic border-t border-gray-100 pt-4">
              "Recomendamos que firme contratos detalhados diretamente com cada profissional escolhido."
            </p>
          </div>

          <button 
            (click)="accept.emit()"
            class="mt-8 w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-rose-500/30 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <app-icon name="check" [size]="20"></app-icon>
            LI E ESTOU CIENTE
          </button>
        </div>
      </div>
    </div>
  `
})
export class ClickwrapPopupComponent {
  @Output() accept = new EventEmitter<void>();
}

// 3. Navbar Component
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="container mx-auto px-4 h-20 flex items-center justify-between">
        <div (click)="goHome.emit()" class="cursor-pointer text-2xl font-serif font-bold text-rose-600 flex items-center gap-2">
          <app-icon name="heart" [size]="24" className="fill-rose-600 text-rose-600"></app-icon>
          Guia Noivas <span class="text-gray-600 text-lg font-sans font-normal hidden sm:inline">Piracicaba</span>
        </div>
        <div class="hidden md:flex space-x-8 text-sm font-semibold text-gray-600">
          <button (click)="goHome.emit()" class="hover:text-rose-600 transition">INÍCIO</button>
          <button (click)="scrollToCategories.emit()" class="hover:text-rose-600 transition">CATEGORIAS</button>
          <button (click)="navigateTo.emit('advertise')" class="hover:text-rose-600 transition">ANUNCIE</button>
          <button class="px-4 py-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition shadow-md">LOGIN NOIVAS</button>
        </div>
        <button class="md:hidden text-gray-600">
          <app-icon name="menu" [size]="24"></app-icon>
        </button>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  @Output() goHome = new EventEmitter<void>();
  @Output() navigateTo = new EventEmitter<string>();
  @Output() scrollToCategories = new EventEmitter<void>();
}

// 4. Category Card Component
@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div 
      (click)="select.emit(category.id)"
      class="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1"
    >
      <div class="h-32 overflow-hidden relative">
        <img [src]="category.image" [alt]="category.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <app-icon [name]="category.iconName" [size]="24" className="absolute bottom-3 right-3 text-white opacity-80"></app-icon>
      </div>
      <div class="p-4 text-center">
        <h3 class="font-bold text-gray-800 group-hover:text-rose-600 transition-colors">{{category.name}}</h3>
        <p class="text-xs text-gray-500 mt-1">Ver fornecedores</p>
      </div>
    </div>
  `
})
export class CategoryCardComponent {
  @Input() category!: Category;
  @Output() select = new EventEmitter<string>();
}

// 5. Supplier Card Component
@Component({
  selector: 'app-supplier-card',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div 
      (click)="select.emit(supplier)"
      class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col h-full group"
    >
      <div class="relative h-48 overflow-hidden">
        <img [src]="supplier.image" [alt]="supplier.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-rose-600 uppercase">
          {{ getCategoryName(supplier.category) }}
        </div>
      </div>
      <div class="p-5 flex flex-col flex-grow">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-bold text-lg text-gray-800 leading-tight group-hover:text-rose-600 transition">{{supplier.name}}</h3>
          <div class="flex items-center gap-1 text-yellow-500 text-sm font-bold bg-yellow-50 px-2 py-0.5 rounded">
            <app-icon name="star" [size]="12" className="fill-current"></app-icon> {{supplier.rating}}
          </div>
        </div>
        <p class="text-sm text-gray-500 flex items-center gap-1 mb-3">
          <app-icon name="map-pin" [size]="14"></app-icon> {{supplier.location}}
        </p>
        <p class="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">{{supplier.description}}</p>
        <button class="mt-auto w-full py-2 border border-rose-200 text-rose-600 rounded font-semibold hover:bg-rose-600 hover:text-white transition">
          Ver Perfil Completo
        </button>
      </div>
    </div>
  `
})
export class SupplierCardComponent {
  @Input() supplier!: Supplier;
  @Output() select = new EventEmitter<Supplier>();

  categories = CATEGORIES;

  getCategoryName(id: string): string {
    return this.categories.find(c => c.id === id)?.name || 'Geral';
  `
})
export class InstitutionalPageComponent {
// 6. Institutional Page Component
@Component({
  selector: 'app-institutional-page',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="container mx-auto px-4 py-8 animate-fade-in max-w-4xl">
       <button (click)="goBack.emit()" class="flex items-center text-gray-500 hover:text-rose-600 mb-8 transition">
        <app-icon name="arrow-left" [size]="18" className="mr-2"></app-icon> Voltar para Início
      </button>
      
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="bg-rose-50 p-8 border-b border-rose-100 flex items-center gap-4">
           <div class="p-3 bg-white rounded-full shadow-sm text-rose-600">
             <app-icon [name]="getPageIcon()" [size]="32"></app-icon>
           </div>
           <h1 class="text-3xl font-serif font-bold text-gray-900">{{getPageTitle()}}</h1>
        </div>
        
        <div class="p-8 md:p-12 text-gray-700 leading-relaxed">
           <ng-container [ngSwitch]="pageType">
             
             <!-- Sobre Nós -->
             <div *ngSwitchCase="'about'">
                <p class="mb-4">Bem-vindo ao <strong>Guia Noivas Piracicaba</strong>, o portal definitivo para casais que estão a planear o dia mais importante das suas vidas em Piracicaba e região.</p>
                <p class="mb-4">Fundado em 2010, nascemos com uma missão simples mas ambiciosa: conectar os noivos aos melhores e mais confiáveis fornecedores locais, facilitando a organização do casamento dos sonhos.</p>
                <h3 class="text-xl font-bold mt-6 mb-3 text-rose-600">Nossa Missão</h3>
                <p class="mb-4">Proporcionar tranquilidade e segurança aos noivos, oferecendo uma curadoria de profissionais de excelência, enquanto impulsionamos o mercado de eventos do interior paulista.</p>
                <h3 class="text-xl font-bold mt-6 mb-3 text-rose-600">Nossos Valores</h3>
                <ul class="list-disc pl-5 space-y-2">
                  <li><strong>Confiança:</strong> Verificamos os fornecedores para garantir qualidade.</li>
                  <li><strong>Paixão:</strong> Amamos histórias de amor e finais felizes.</li>
                  <li><strong>Inovação:</strong> Buscamos sempre novas formas de facilitar a vida dos noivos.</li>
                </ul>
             </div>

             <!-- Anuncie -->
             <div *ngSwitchCase="'advertise'">
                <p class="mb-6 text-lg">Destaque a sua empresa para milhares de noivos que acessam nosso portal mensalmente em busca de serviços de qualidade.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div class="bg-rose-50 p-6 rounded-xl border border-rose-100">
                      <h3 class="font-bold text-lg mb-2 text-rose-700">Plano Básico</h3>
                      <p class="text-3xl font-bold mb-4">R$ 49,90<span class="text-sm font-normal text-gray-500">/mês</span></p>
                      <ul class="space-y-2 text-sm text-gray-600 mb-6">
                        <li class="flex items-center gap-2"><app-icon name="check" [size]="16" className="text-green-500"></app-icon> Perfil com fotos</li>
                        <li class="flex items-center gap-2"><app-icon name="check" [size]="16" className="text-green-500"></app-icon> Link para WhatsApp</li>
                        <li class="flex items-center gap-2"><app-icon name="check" [size]="16" className="text-green-500"></app-icon> Categoria Única</li>
                      </ul>
                      <button class="w-full py-2 bg-white border border-rose-600 text-rose-600 rounded-lg font-bold hover:bg-rose-600 hover:text-white transition">Começar Agora</button>
                  </div>
                  <div class="bg-white p-6 rounded-xl border-2 border-rose-600 shadow-lg relative overflow-hidden">
                      <div class="absolute top-0 right-0 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMENDADO</div>
                      <h3 class="font-bold text-lg mb-2 text-rose-700">Plano Premium</h3>
                      <p class="text-3xl font-bold mb-4">R$ 89,90<span class="text-sm font-normal text-gray-500">/mês</span></p>
                      <ul class="space-y-2 text-sm text-gray-600 mb-6">
                        <li class="flex items-center gap-2"><app-icon name="check" [size]="16" className="text-green-500"></app-icon> Tudo do Básico</li>
                        <li class="flex items-center gap-2"><app-icon name="check" [size]="16" className="text-green-500"></app-icon> Destaque na Home</li>
                        <li class="flex items-center gap-2"><app-icon name="check" [size]="16" className="text-green-500"></app-icon> 3 Categorias</li>
                        <li class="flex items-center gap-2"><app-icon name="check" [size]="16" className="text-green-500"></app-icon> Selo de Verificação</li>
                      </ul>
                      <button class="w-full py-2 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition">Assinar Premium</button>
                  </div>
                </div>
                <p class="text-sm text-gray-500 text-center">Entre em contato pelo e-mail <strong>comercial&#64;guianoivaspiracicaba.com.br</strong> para planos personalizados.</p>
             </div>

             <!-- Privacidade -->
             <div *ngSwitchCase="'privacy'">
                <p class="mb-4">A sua privacidade é importante para nós. É política do Guia Noivas Piracicaba respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Guia Noivas Piracicaba, e outros sites que possuímos e operamos.</p>
                <h3 class="text-lg font-bold mt-4 mb-2">Coleta de Informações</h3>
                <p class="mb-4">Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.</p>
                <h3 class="text-lg font-bold mt-4 mb-2">Uso de Dados</h3>
                <p class="mb-4">Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos.</p>
                <h3 class="text-lg font-bold mt-4 mb-2">Compartilhamento</h3>
                <p class="mb-4">Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
                <p class="text-sm text-gray-500 mt-8">Atualizado em Janeiro de 2025.</p>
             </div>

             <!-- Termos -->
             <div *ngSwitchCase="'terms'">
                <h3 class="text-lg font-bold mb-2">1. Termos</h3>
                <p class="mb-4">Ao acessar ao site Guia Noivas Piracicaba, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.</p>
                <h3 class="text-lg font-bold mb-2">2. Uso de Licença</h3>
                <p class="mb-4">É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Guia Noivas Piracicaba, apenas para visualização transitória pessoal e não comercial.</p>
                <h3 class="text-lg font-bold mb-2">3. Isenção de responsabilidade</h3>
                <p class="mb-4">Os materiais no site da Guia Noivas Piracicaba são fornecidos 'como estão'. Guia Noivas Piracicaba não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias.</p>
                <h3 class="text-lg font-bold mb-2">4. Precisão dos materiais</h3>
                <p class="mb-4">Os materiais exibidos no site da Guia Noivas Piracicaba podem incluir erros técnicos, tipográficos ou fotográficos. Guia Noivas Piracicaba não garante que qualquer material em seu site seja preciso, completo ou atual.</p>
             </div>

           </ng-container>
        </div>
      </div>
    </div>
  `
  `
})
export class HomePageComponent {
  @Output() goBack = new EventEmitter<void>();

  getPageTitle(): string {
    const titles: any = {
      'about': 'Sobre Nós',
      'advertise': 'Anuncie Conosco',
      'privacy': 'Política de Privacidade',
      'terms': 'Termos de Uso'
    };
    return titles[this.pageType] || '';
  }
})
export class CategoryPageComponent implements OnInit {
    const icons: any = {
      'about': 'info',
      'advertise': 'megaphone',
      'privacy': 'shield',
      'terms': 'file-text'
    };
    return icons[this.pageType] || 'info';
  }
}

// 7. Home Page Component
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent, SupplierCardComponent, IconComponent],
  template: `
    <div class="animate-fade-in">
      <!-- Hero Section -->
      <div class="relative h-[400px] flex items-center justify-center bg-rose-900 text-white">
        <div class="absolute inset-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" class="w-full h-full object-cover opacity-40" alt="Hero" />
        </div>
        <div class="relative z-10 container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-6xl font-serif font-bold mb-4">O Casamento dos seus Sonhos</h1>
          <p class="text-xl md:text-2xl text-rose-100 mb-8 font-light">Começa aqui, em Piracicaba.</p>
          
          <div class="max-w-2xl mx-auto bg-white rounded-full p-2 flex shadow-2xl transform hover:scale-105 transition">
            <div class="flex-grow flex items-center px-4 border-r border-gray-200 text-gray-500">
              <app-icon name="search" [size]="20"></app-icon>
              <input type="text" placeholder="O que você procura? (ex: Buffet, Foto...)" class="w-full p-2 outline-none text-gray-700" />
            </div>
            <button class="bg-rose-600 text-white px-8 py-3 rounded-full font-bold hover:bg-rose-700 transition">
              BUSCAR
            </button>
          </div>
        </div>
      </div>

      <!-- Categories Section -->
      <section class="py-16 container mx-auto px-4">
        <h2 class="text-3xl font-serif font-bold text-gray-800 text-center mb-2">Navegue por Categorias</h2>
        <p class="text-gray-500 text-center mb-10">Encontre os melhores profissionais de Piracicaba</p>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <ng-container *ngFor="let cat of categories">
            <app-category-card [category]="cat" (select)="selectCategory.emit($event)"></app-category-card>
          </ng-container>
        </div>
      </section>

      <!-- Featured Suppliers -->
      <section class="py-16 bg-rose-50">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-end mb-8">
            <div>
              <h2 class="text-3xl font-serif font-bold text-gray-800">Destaques da Semana</h2>
              <p class="text-gray-500">Os fornecedores mais bem avaliados pelos noivos</p>
            </div>
            <button class="text-rose-600 font-semibold flex items-center hover:underline">
              Ver todos <app-icon name="chevron-right" [size]="16"></app-icon>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ng-container *ngFor="let sup of featuredSuppliers">
              <app-supplier-card [supplier]="sup" (select)="selectSupplier.emit($event)"></app-supplier-card>
            </ng-container>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomePageComponent {
  @Output() selectCategory = new EventEmitter<string>();
  @Output() selectSupplier = new EventEmitter<Supplier>();
  
  categories = CATEGORIES;
  featuredSuppliers = SUPPLIERS.slice(0, 4);
}

// 8. Category Page Component
@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, SupplierCardComponent, IconComponent],
  template: `
    <div class="container mx-auto px-4 py-8 animate-slide-in">
      <button (click)="goBack.emit()" class="flex items-center text-gray-500 hover:text-rose-600 mb-6 transition">
        <app-icon name="arrow-left" [size]="18" className="mr-2"></app-icon> Voltar para Início
      </button>
      
      <div class="bg-rose-100 rounded-xl p-8 mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-serif font-bold text-gray-900 flex items-center gap-3">
            <app-icon [name]="category?.iconName || 'star'" [size]="36" className="text-rose-600"></app-icon>
            {{category?.name}}
          </h1>
          <p class="text-gray-700 mt-2">
            {{categorySuppliers.length}} fornecedores encontrados em Piracicaba
          </p>
        </div>
        <div class="hidden md:block opacity-50">
          <div class="grid grid-cols-3 gap-2">
             <ng-container *ngFor="let i of [1,2,3,4,5,6,7,8,9]">
               <div class="w-2 h-2 bg-rose-400 rounded-full"></div>
             </ng-container>
          </div>
        </div>
      </div>

      <ng-container *ngIf="categorySuppliers.length > 0; else emptyList">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ng-container *ngFor="let sup of categorySuppliers">
            <app-supplier-card [supplier]="sup" (select)="selectSupplier.emit($event)"></app-supplier-card>
          </ng-container>
        </div>
      </ng-container>
      <ng-template #emptyList>
        <div class="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <p class="text-gray-500 text-lg">Nenhum fornecedor encontrado nesta categoria no momento.</p>
          <button (click)="goBack.emit()" class="mt-4 text-rose-600 font-semibold hover:underline">Voltar e tentar outra</button>
        </div>
      </ng-template>
    </div>
  `
})
class CategoryPageComponent implements OnInit { // Removed export
  @Input() categoryId!: string;
  @Output() goBack = new EventEmitter<void>();
  @Output() selectSupplier = new EventEmitter<Supplier>();

  category?: Category;
  categorySuppliers: Supplier[] = [];

  ngOnInit() {
    this.category = CATEGORIES.find(c => c.id === this.categoryId);
    this.categorySuppliers = SUPPLIERS.filter(s => s.category === this.categoryId);
  }
}

// 9. Supplier Profile Component
@Component({
  selector: 'app-supplier-profile',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="bg-gray-50 min-h-screen animate-zoom-in">
      <!-- Breadcrumb -->
      <div class="bg-white border-b border-gray-200">
          <div class="container mx-auto px-4 py-3 text-xs text-gray-500 flex items-center gap-2">
              <button (click)="goBack.emit('home')" class="hover:text-rose-600">Início</button>
              <app-icon name="chevron-right" [size]="12"></app-icon>
              <button (click)="goBack.emit('category')" class="hover:text-rose-600">
                {{getCategoryName(supplier.category)}}
              </button>
              <app-icon name="chevron-right" [size]="12"></app-icon>
              <span class="text-rose-600 font-semibold">{{supplier.name}}</span>
          </div>
      </div>

      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col lg:flex-row gap-8">
            
            <!-- Coluna Esquerda: Conteúdo Principal -->
            <div class="w-full lg:w-2/3">
                
                <!-- Header do Perfil -->
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6 relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4 opacity-10">
                      <app-icon [name]="getCategoryIcon(supplier.category)" [size]="100"></app-icon>
                    </div>
                    <div class="relative z-10">
                        <span class="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                          {{getCategoryName(supplier.category)}}
                        </span>
                        <h1 class="text-3xl font-serif font-bold text-gray-800 mt-3 mb-2">{{supplier.name}}</h1>
                        <p class="text-gray-500 flex items-center gap-2">
                            <app-icon name="map-pin" [size]="16" className="text-rose-500"></app-icon> {{supplier.location}}
                        </p>
                        <div class="flex items-center gap-1 mt-2">
                           <ng-container *ngFor="let _ of [1,2,3,4,5]; let idx = index">
                             <app-icon name="star" [size]="16" [attr.class]="(idx+1) <= supplier.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"></app-icon>
                           </ng-container>
                           <span class="text-sm text-gray-500 ml-2">({{supplier.reviews}} avaliações)</span>
                        </div>
                    </div>
                </div>

                <!-- Sobre -->
                <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-6">
                    <h2 class="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Sobre</h2>
                    <div class="prose text-gray-600 leading-relaxed">
                        <p>{{supplier.description}}</p>
                    </div>
                    <div class="mt-6 flex gap-4">
                       <span class="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                         <app-icon name="check" [size]="14"></app-icon> Orçamento Grátis
                       </span>
                       <span class="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                         <app-icon name="check" [size]="14"></app-icon> Resposta Rápida
                       </span>
                    </div>
                </div>

                <!-- Galeria -->
                <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-6">
                    <h2 class="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">Galeria de Fotos</h2>
                    <div class="grid grid-cols-2 gap-4">
                          <ng-container *ngFor="let img of supplier.gallery">
                            <img [src]="img" class="w-full h-48 object-cover rounded-lg hover:opacity-90 transition cursor-pointer shadow-sm" />
                          </ng-container>
                          <p *ngIf="supplier.gallery.length === 0" class="col-span-2 text-gray-400 italic">Sem fotos na galeria.</p>
                    </div>
                </div>

            </div>

            <!-- Coluna Direita: Sidebar Contato -->
            <div class="w-full lg:w-1/3">
                <div class="bg-white p-6 rounded-lg shadow-lg border border-rose-100 sticky top-24">
                    <h3 class="text-lg font-bold text-gray-800 mb-6">Solicitar Orçamento</h3>
                    
                    <div class="space-y-4">
                        <a href="#" class="bg-[#25D366] text-white hover:bg-[#128C7E] py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-md transition-transform transform hover:-translate-y-1">
                            <app-icon name="phone" [size]="20"></app-icon>
                            WhatsApp
                        </a>

                        <a *ngIf="supplier.contact.site" href="#" class="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
                              <app-icon name="globe" [size]="18"></app-icon>
                              Visitar Site
                          </a>

                        <a href="#" class="w-full bg-white border border-gray-300 text-gray-700 hover:text-rose-600 hover:border-rose-600 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
                            <app-icon name="instagram" [size]="20"></app-icon>
                            Instagram
                        </a>
                    </div>

                    <div class="mt-8 pt-6 border-t border-gray-100">
                        <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Dados de Contato</h4>
                        <p class="text-sm text-gray-600 mb-2 flex items-center gap-2"><app-icon name="phone" [size]="14"></app-icon> {{supplier.contact.phone}}</p>
                        <p class="text-sm text-gray-600 mb-1 flex items-center gap-2"><app-icon name="instagram" [size]="14"></app-icon> {{supplier.contact.instagram}}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  `
})
class SupplierProfileComponent { // Removed export
  @Input() supplier!: Supplier;
  @Output() goBack = new EventEmitter<string>();

  categories = CATEGORIES;

  getCategoryName(id: string): string {
    return this.categories.find(c => c.id === id)?.name || 'Geral';
  }

  getCategoryIcon(id: string): string {
    return this.categories.find(c => c.id === id)?.iconName || 'star';
  }
}

// --- APP COMPONENT (ROOT) ---

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent, 
    HomePageComponent, 
    CategoryPageComponent, 
    SupplierProfileComponent, 
    InstitutionalPageComponent,
    ClickwrapPopupComponent
  ],
  template: `
    <div class="font-sans text-gray-800 min-h-screen flex flex-col bg-stone-50">
      
      <!-- Clickwrap Popup -->
      @if (showTermsPopup) {
        <app-clickwrap-popup (accept)="handleAcceptTerms()"></app-clickwrap-popup>
      }

      <app-navbar 
        (goHome)="handleGoHome()" 
        (scrollToCategories)="handleScrollToCategories()"
        (navigateTo)="handleInstitutionalNavigate($event)"
      ></app-navbar>

      <main class="flex-grow">
        @switch (view) {
          @case ('home') {
            <app-home-page 
              (selectCategory)="handleSelectCategory($event)" 
              (selectSupplier)="handleSelectSupplier($event)"
            ></app-home-page>
          }
          @case ('category') {
            <app-category-page 
              [categoryId]="selectedCategoryId!" 
              (goBack)="handleGoHome()" 
              (selectSupplier)="handleSelectSupplier($event)"
            ></app-category-page>
          }
          @case ('supplier') {
            <app-supplier-profile 
              [supplier]="selectedSupplier!" 
              (goBack)="handleBackFromProfile($event)"
            ></app-supplier-profile>
          }
          @case ('institutional') {
            <app-institutional-page 
              [pageType]="institutionalPage!" 
              (goBack)="handleGoHome()"
            ></app-institutional-page>
          }
        }
      </main>

      <footer class="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 class="text-white text-xl font-serif font-bold mb-4">Guia Noivas</h3>
              <p class="text-sm leading-relaxed">
                O maior portal de casamentos de Piracicaba e região. Conectando noivos aos melhores fornecedores desde 2010.
              </p>
            </div>
            <div>
              <h4 class="text-white font-bold mb-4">Categorias</h4>
              <ul class="space-y-2 text-sm">
                @for (cat of categories.slice(0,4); track cat.id) {
                  <li 
                    (click)="handleSelectCategory(cat.id)"
                    class="cursor-pointer hover:text-rose-500 transition"
                  >
                    {{cat.name}}
                  </li>
                }
              </ul>
            </div>
            <div>
              <h4 class="text-white font-bold mb-4">Institucional</h4>
              <ul class="space-y-2 text-sm">
                <li (click)="handleInstitutionalNavigate('about')" class="cursor-pointer hover:text-rose-500 transition">Sobre Nós</li>
                <li (click)="handleInstitutionalNavigate('advertise')" class="cursor-pointer hover:text-rose-500 transition">Anuncie Aqui</li>
                <li (click)="handleInstitutionalNavigate('privacy')" class="cursor-pointer hover:text-rose-500 transition">Política de Privacidade</li>
                <li (click)="handleInstitutionalNavigate('terms')" class="cursor-pointer hover:text-rose-500 transition">Termos de Uso</li>
              </ul>
            </div>
            <div>
              <h4 class="text-white font-bold mb-4">Newsletter</h4>
              <p class="text-xs mb-2">Receba dicas e promoções exclusivas.</p>
              <div class="flex gap-2">
                <input type="email" placeholder="Seu e-mail" class="bg-gray-800 border-none text-white text-sm p-2 rounded w-full" />
                <button class="bg-rose-600 text-white px-3 rounded font-bold hover:bg-rose-700">OK</button>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-800 pt-8 text-center text-xs">
            &copy; 2025 Guia Noivas Piracicaba. Desenvolvido como demonstração.
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    /* Animações personalizadas simples para simular o animate.css */
    .animate-fade-in { animation: fadeIn 0.5s ease-out; }
    .animate-slide-in { animation: slideIn 0.3s ease-out; }
    .animate-zoom-in { animation: zoomIn 0.3s ease-out; }
    
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  `]
})
export class App implements OnInit {
  categories = CATEGORIES;
  
  view: 'home' | 'category' | 'supplier' | 'institutional' = 'home';
  selectedCategoryId: string | null = null;
  selectedSupplier: Supplier | null = null;
  institutionalPage: string | null = null;
  showTermsPopup: boolean = false;

  ngOnInit() {
    const hasAcceptedTerms = localStorage.getItem('guiaNoivas_terms_accepted_v1');
    if (!hasAcceptedTerms) {
      setTimeout(() => {
        this.showTermsPopup = true;
      }, 500);
    }
  }

  handleAcceptTerms() {
    localStorage.setItem('guiaNoivas_terms_accepted_v1', 'true');
    this.showTermsPopup = false;
  }

  handleSelectCategory(id: string) {
    this.selectedCategoryId = id;
    this.view = 'category';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleSelectSupplier(supplier: Supplier) {
    this.selectedSupplier = supplier;
    this.view = 'supplier';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleInstitutionalNavigate(page: string) {
    this.institutionalPage = page;
    this.view = 'institutional';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleGoHome() {
    this.view = 'home';
    this.selectedCategoryId = null;
    this.selectedSupplier = null;
    this.institutionalPage = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleScrollToCategories() {
    if (this.view !== 'home') {
      this.handleGoHome();
      setTimeout(() => {
        window.scrollTo({ top: 600, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  }

  handleBackFromProfile(target: string) {
    if (target === 'home') {
      this.handleGoHome();
    } else {
      if (this.selectedSupplier) {
        this.selectedCategoryId = this.selectedSupplier.category;
        this.view = 'category';
      } else {
        this.handleGoHome();
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}