import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CidadeService } from '../../core/cidade.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
  imports: [RouterModule]
})
export class FooterComponent {
  private cidadeService = inject(CidadeService);

  buildUrl(path: string | string[]): string | string[] {
    if (Array.isArray(path)) {
      // Para rotas com parâmetros como ['/categorias', 'fotografia']
      const basePath = path[0];
      const params = path.slice(1);
      const fullPath = params.length > 0 ? `${basePath}/${params.join('/')}` : basePath;
      return this.cidadeService.buildUrl(fullPath.replace(/^\//, ''));
    }
    return this.cidadeService.buildUrl(path.toString().replace(/^\//, ''));
  }
}
