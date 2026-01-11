import { Routes } from '@angular/router';

export const routes: Routes = [
	// Rota raiz - redireciona para /piracicaba (cidade padrão)
	{
		path: '',
		redirectTo: '/piracicaba',
		pathMatch: 'full'
	},
	// Rotas por cidade - estrutura escalável para futuras cidades (limeira, americana, etc)
	{
		path: ':cidade',
		children: [
			{
				path: '',
				loadChildren: () => import('./features/home/home-module').then(m => m.HomeModule)
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
				loadChildren: () => import('./features/anuncie/anuncie-module').then(m => m.AnuncieModule)
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
			}
		]
	},
	// Painel de fornecedor - não dependente de cidade (admin global)
	{
		path: 'painel',
		loadChildren: () => import('./features/painel/painel-module').then(m => m.PainelModule)
	},
	// Rotas legadas sem cidade - redirecionar para /piracicaba (compatibilidade)
	{
		path: 'termos',
		redirectTo: '/piracicaba/termos',
		pathMatch: 'full'
	},
	{
		path: 'categorias',
		redirectTo: '/piracicaba/categorias',
		pathMatch: 'full'
	},
	{
		path: 'fornecedores',
		redirectTo: '/piracicaba/fornecedores',
		pathMatch: 'full'
	},
	{
		path: 'institucional',
		redirectTo: '/piracicaba/institucional',
		pathMatch: 'full'
	},
	{
		path: 'anuncie',
		redirectTo: '/piracicaba/anuncie',
		pathMatch: 'full'
	},
	{
		path: 'contato',
		redirectTo: '/piracicaba/contato',
		pathMatch: 'full'
	},
	// Catch-all - redireciona para painel/login
	{
		path: '**',
		redirectTo: '/painel/login',
		pathMatch: 'full'
	}
];
