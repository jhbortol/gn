import { Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { Component } from '@angular/core';
import { legacyRedirectGuard } from './core/legacy-redirect.guard';

// Rotas de nível raiz que não são cidades
const ROTAS_RAIZ = new Set([
	'politica-de-privacidade',
	'assets',
	'api',
	'_next',
]);

// Cidades suportadas (fallback local — expandido dinamicamente via API)
const CIDADES_VALIDAS = new Set(['piracicaba', 'limeira', 'americana', 'campinas', 'sao-paulo']);

// Componente vazio usado apenas para satisfazer rotas com canActivate que sempre redirecionam.
@Component({ standalone: true, template: '' })
class EmptyComponent {}

function cidadeMatcher(segments: UrlSegment[]): UrlMatchResult | null {
	if (!segments.length) {
		return null;
	}

	const segmento = segments[0].path.toLowerCase();

	// Rejeitar segmentos que são rotas conhecidas de nível raiz
	if (ROTAS_RAIZ.has(segmento)) {
		return null;
	}

	// Aceitar qualquer slug no formato esperado (letras, números e hífens)
	// que seja uma cidade conhecida OU que não seja uma rota estática conhecida
	if (!/^[a-z0-9][a-z0-9-]*$/.test(segmento)) {
		return null;
	}

	return {
		consumed: [segments[0]],
		posParams: {
			cidade: segments[0]
		}
	};
}

export const routes: Routes = [
	// Rota raiz - página de seleção de cidade
	{
		path: '',
		loadComponent: () => import('./features/home/cidade-selector/cidade-selector-page').then(m => m.CidadeSelectorPage),
		pathMatch: 'full'
	},
	// Rotas por cidade - estrutura escalável para futuras cidades (limeira, americana, etc)
	{
		matcher: cidadeMatcher,
		children: [
			{
				path: '',
				loadComponent: () => import('./features/home/home-page/home-page').then(m => m.HomePageComponent)
			},
			{
				path: 'termos',
				redirectTo: 'institucional/termos',
				pathMatch: 'full'
			},
			{
				path: 'categorias',
				loadChildren: () => import('./features/categorias/categorias-module').then(m => m.CategoriasModule)
			},
			{
				path: 'fornecedores',
				loadChildren: () => import('./features/fornecedores/fornecedores-module').then(m => m.FornecedoresModule)
			},
			{
				path: 'institucional',
				loadChildren: () => import('./features/institucional/institucional-module').then(m => m.InstitucionalModule)
			},
			{
				path: 'anuncie',
				loadComponent: () => import('./features/anuncie/anuncie-page').then(m => m.AnunciePageComponent)
			},
			{
				path: 'contato',
				loadChildren: () => import('./features/contato/contato-module').then(m => m.ContatoModule)
			},
			{
				path: 'blog',
				loadChildren: () => import('./features/blog/blog-module').then(m => m.BlogModule)
			},
			{
				path: 'guia-precos',
				loadChildren: () => import('./features/guia-precos/guia-precos-module').then(m => m.GuiaPrecosModule)
			},
			{
				path: 'guia-custos',
				loadComponent: () => import('./features/guia-custos/guia-custos-page').then(m => m.GuiaCustosPage)
			},
			{
				path: 'midia-kit',
				loadComponent: () => import('./features/midia-kit/midia-kit-page').then(m => m.MidiaKitPage)
			},
			{
				path: 'indicado',
				loadComponent: () => import('./features/comecar/comecar-page').then(m => m.ComecarPage)
			},
			{
				path: 'privacy',
				loadChildren: () => import('./features/privacy/privacy-module').then(m => m.PrivacyModule)
			}
		]
	},
	// Rotas legadas sem cidade — redirecionar para a cidade preferida do usuário
	{
		path: 'termos',
		canActivate: [legacyRedirectGuard('institucional/termos')],
		component: EmptyComponent
	},
	{
		path: 'categorias',
		canActivate: [legacyRedirectGuard('categorias')],
		component: EmptyComponent
	},
	{
		path: 'fornecedores',
		canActivate: [legacyRedirectGuard('fornecedores')],
		component: EmptyComponent
	},
	{
		path: 'institucional',
		canActivate: [legacyRedirectGuard('institucional')],
		component: EmptyComponent
	},
	{
		path: 'anuncie',
		canActivate: [legacyRedirectGuard('anuncie')],
		component: EmptyComponent
	},
	{
		path: 'contato',
		canActivate: [legacyRedirectGuard('contato')],
		component: EmptyComponent
	},
	{
		path: 'blog',
		canActivate: [legacyRedirectGuard('blog')],
		component: EmptyComponent
	},
	{
		path: 'guia-precos',
		canActivate: [legacyRedirectGuard('guia-precos')],
		component: EmptyComponent
	},
	{
		path: 'guia-custos',
		canActivate: [legacyRedirectGuard('guia-custos')],
		component: EmptyComponent
	},
	{
		path: 'midia-kit',
		canActivate: [legacyRedirectGuard('midia-kit')],
		component: EmptyComponent
	},
	{
		path: 'indicado',
		canActivate: [legacyRedirectGuard('indicado')],
		component: EmptyComponent
	},
	{
		path: 'privacy',
		canActivate: [legacyRedirectGuard('privacy')],
		component: EmptyComponent
	},
	// Política de privacidade - URL pública para Play Console
	{
		path: 'politica-de-privacidade',
		loadComponent: () => import('./features/privacy/privacy-policy-page/privacy-policy-page').then(m => m.PrivacyPolicyPageComponent)
	},
	// Catch-all - redireciona para seleção de cidade
	{
		path: '**',
		redirectTo: '/',
		pathMatch: 'full'
	}
];

