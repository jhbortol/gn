import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./blog-list/blog-list-page').then(m => m.BlogListPage)
  },
  {
    path: ':slug',
    loadComponent: () => import('./blog-detail/blog-detail-page').then(m => m.BlogDetailPage)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
