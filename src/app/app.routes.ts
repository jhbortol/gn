import { Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { CIDADES_DISPONIVEIS } from './core/cidades.config';

const CIDADES_VALIDAS = new Set(CIDADES_DISPONIVEIS.map(cidade => cidade.slug));

function cidadeMatcher(segments: UrlSegment[]): UrlMatchResult | null {
	if (!segments.length) {
		return null;
	}

	const cidade = segments[0].path.toLowerCase();
	if (!CIDADES_VALIDAS.has(cidade)) {
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
	{
		path: '',
		loadComponent: () => import('./features/cidades/cidade-selector-page').then(m => m.CidadeSelectorPageComponent)
	},
	{
		path: 'selecionar-cidade',
		loadComponent: () => import('./features/cidades/cidade-selector-page').then(m => m.CidadeSelectorPageComponent)
	},
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
	// Rotas legadas sem cidade - redirecionar para /piracicaba (compatibilidade)
	{
		path: 'termos',
		redirectTo: '/selecionar-cidade',
		pathMatch: 'full'
	},
	{
		path: 'categorias',
		redirectTo: '/selecionar-cidade',
		pathMatch: 'full'
	},
	{
		path: 'fornecedores',
		redirectTo: '/selecionar-cidade',
		pathMatch: 'full'
	},
	{
		path: 'institucional',
		redirectTo: '/selecionar-cidade',
		pathMatch: 'full'
	},
	{
		path: 'anuncie',
		redirectTo: '/selecionar-cidade',
		pathMatch: 'full'
	},
	{
		path: 'contato',
		redirectTo: '/selecionar-cidade',
		pathMatch: 'full'
	},
	{
		path: 'blog',
		redirectTo: '/selecionar-cidade',
		pathMatch: 'full'
	},
	{
		path: 'guia-precos',
		redirectTo: '/selecionar-cidade',
		pathMatch: 'full'
	},
	{
		path: 'guia-custos',
		redirectTo: '/selecionar-cidade',
		pathMatch: 'full'
	},
	{
		path: 'midia-kit',
		redirectTo: '/selecionar-cidade',
		pathMatch: 'full'
	},
	{
		path: 'indicado',
		redirectTo: '/selecionar-cidade',
		pathMatch: 'full'
	},
	{
		path: 'privacy',
		redirectTo: '/selecionar-cidade',
		pathMatch: 'full'
	},
	// Política de privacidade - URL pública para Play Console
	{
		path: 'politica-de-privacidade',
		loadComponent: () => import('./features/privacy/privacy-policy-page/privacy-policy-page').then(m => m.PrivacyPolicyPageComponent)
	},
	// Catch-all - redireciona para home
	{
		path: '**',
		redirectTo: '/selecionar-cidade',
		pathMatch: 'full'
	}
];
