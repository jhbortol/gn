import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./fornecedor-page').then(m => m.FornecedorPageComponent)
  }
];

// Function to fetch supplier IDs/slugs for prerendering
export async function getPrerenderParams(): Promise<{ id: string }[]> {
  try {
    const apiUrl = process.env['API_BASE_URL'] || 'https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1';
    // Fetch all active suppliers - using a large page size to get most suppliers
    const response = await fetch(`${apiUrl}/fornecedores/ativos?page=1&pageSize=100&publicado=true`);
    
    if (!response.ok) {
      console.warn('Failed to fetch suppliers for prerendering');
      return [];
    }

    interface FornecedorDto {
      id?: string;
      Id?: string;
      slug?: string;
      Slug?: string;
    }

    interface ApiResponse {
      data?: FornecedorDto[];
    }

    const result: ApiResponse = await response.json();
    const fornecedores = result.data || [];
    
    return fornecedores
      .map((fornecedor: FornecedorDto) => ({
        id: fornecedor.slug || fornecedor.Slug || fornecedor.id || fornecedor.Id
      }))
      .filter((p): p is { id: string } => typeof p.id === 'string' && p.id.length > 0);
  } catch (error) {
    console.warn('Error fetching suppliers for prerendering:', error);
    return [];
  }
}

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }
