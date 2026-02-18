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

// Function to fetch blog post slugs for prerendering
export async function getPrerenderParams(): Promise<{ slug: string }[]> {
  try {
    const apiUrl = process.env['API_BASE_URL'] || 'https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1';
    const response = await fetch(`${apiUrl}/blog?page=1&pageSize=100`);
    
    if (!response.ok) {
      console.warn('Failed to fetch blog posts for prerendering');
      return [];
    }

    const data = await response.json();
    const posts = data.data || [];
    
    return posts.map((post: any) => ({
      slug: post.slug || post.Slug
    })).filter((p: any) => p.slug);
  } catch (error) {
    console.warn('Error fetching blog posts for prerendering:', error);
    return [];
  }
}

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
