import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-midia-kit-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-50">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-widest text-rose-600 font-semibold">Mídia Kit</p>
          <h1 class="text-2xl md:text-3xl font-bold text-slate-900">Guia Noivas Piracicaba 2026</h1>
        </div>
        <a
          href="/midia-kit.html"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 bg-rose-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-rose-700 transition"
        >
          Abrir em nova aba
        </a>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div class="aspect-[3/4] w-full rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-white">
          <iframe
            title="Mídia Kit 2026"
            src="/midia-kit.html"
            class="w-full h-full border-0"
          ></iframe>
        </div>
      </div>
    </div>
  `
})
export class MidiaKitPage {}
