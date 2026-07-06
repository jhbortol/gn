import { Component, inject } from '@angular/core';
import { CanMatchFn, Router, Routes } from '@angular/router';
import { CidadeService } from './core/cidade.service';
import { legacyRedirectGuard } from './core/legacy-redirect.guard';
import { weddingToolsGuard } from './features/meu-casamento/wedding-tools.guard';
import { brideAuthGuard } from './core/bride.guard';

const ROTAS_RESERVADAS = new Set([
'selecionar-cidade',
'meu-casamento',
'meus-favoritos',
'restaurar',
'meus-dados',
'politica-de-privacidade',
'assets',
'api',
'_next'
]);

@Component({ standalone: true, template: '' })
class EmptyComponent {}

const cidadeCanMatch: CanMatchFn = async (_route, segments) => {
if (!segments.length) return false;

const cidade = segments[0].path.toLowerCase();
if (ROTAS_RESERVADAS.has(cidade) || !/^[a-z0-9][a-z0-9-]*$/.test(cidade)) {
return false;
}

const cidadeService = inject(CidadeService);
const router = inject(Router);
const cidadeValida = await cidadeService.isCidadeValidaAsync(cidade);
return cidadeValida ? true : router.parseUrl('/selecionar-cidade');
};

export const routes: Routes = [
{
path: '',
redirectTo: 'selecionar-cidade',
pathMatch: 'full'
},
{
path: 'selecionar-cidade',
loadComponent: () => import('./features/cidades/cidade-selector-page').then(m => m.CidadeSelectorPageComponent)
},
{
path: 'meu-casamento',
loadComponent: () => import('./features/meu-casamento/pages/meu-casamento-hub/meu-casamento-hub.component').then(m => m.MeuCasamentoHubComponent)
},
{
path: 'meu-casamento/cronograma',
loadComponent: () => import('./features/meu-casamento/pages/meu-casamento-cronograma/meu-casamento-cronograma.component').then(m => m.MeuCasamentoCronogramaComponent)
},
{
path: 'meu-casamento/convidados',
loadComponent: () => import('./features/meu-casamento/pages/meu-casamento-convidados/meu-casamento-convidados.component').then(m => m.MeuCasamentoConvidadosComponent)
},
{
path: 'meu-casamento/orcamento',
loadComponent: () => import('./features/meu-casamento/pages/meu-casamento-orcamento/meu-casamento-orcamento.component').then(m => m.MeuCasamentoOrcamentoComponent)
},
{
path: 'meu-casamento/perfil',
canActivate: [brideAuthGuard],
loadComponent: () => import('./features/meu-casamento/pages/bride-profile/bride-profile.component').then(m => m.BrideProfileComponent)
},
{
path: 'meus-favoritos',
loadComponent: () => import('./features/meu-casamento/pages/meus-favoritos/meus-favoritos.component').then(m => m.MeusFavoritosComponent)
},
{
path: 'meus-dados/remover',
canActivate: [brideAuthGuard],
loadComponent: () => import('./features/meu-casamento/pages/remover-meus-dados/remover-meus-dados.component').then(m => m.RemoverMeusDadosComponent)
},
{
path: ':cidade',
canMatch: [cidadeCanMatch],
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
{
path: 'politica-de-privacidade',
loadComponent: () => import('./features/privacy/privacy-policy-page/privacy-policy-page').then(m => m.PrivacyPolicyPageComponent)
},
{
path: '**',
redirectTo: '/selecionar-cidade',
pathMatch: 'full'
}
];
