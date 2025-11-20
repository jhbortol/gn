
import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./features/home/home-module').then(m => m.HomeModule)
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
	}
];
