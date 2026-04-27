import { Component, OnInit, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BlogData, BlogPostListDto } from '../services/blog-data';
import { CidadeService } from '../../../core/cidade.service';
import { MetaTagService } from '../../../core/meta-tag.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  templateUrl: './blog-list-page.html',
  styleUrls: ['./blog-list-page.css'],
  imports: [CommonModule, RouterModule, FormsModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogListPage implements OnInit {
  posts = signal<BlogPostListDto[]>([]);
  isLoading = signal(true);
  searchTerm = '';
  selectedCategory = signal<string | undefined>(undefined);

  private metaTagService = inject(MetaTagService);
  private router = inject(Router);
  private title = inject(Title);

  constructor(
    private blogData: BlogData,
    private route: ActivatedRoute,
    private cidadeService: CidadeService
  ) {}

  ngOnInit(): void {
    const category = this.route.snapshot.queryParamMap.get('categoria');
    if (category) {
      this.selectedCategory.set(category);
    }
    const route = this.router.url.split('?')[0];
    this.title.setTitle('Blog | Dicas e Inspirações para Casamento em Piracicaba');
    this.metaTagService.applyMetadata(route, {
      title: 'Blog | Dicas e Inspirações para Casamento em Piracicaba',
      description: 'Dicas de casamento, inspirações e guias completos para noivas de Piracicaba. Leia nossos artigos sobre planejamento, decoração, fornecedores e muito mais.'
    });
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading.set(true);
    this.blogData.getAll(1, 12, this.selectedCategory()).subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.isLoading.set(true);
      this.blogData.search(this.searchTerm).subscribe({
        next: (posts) => {
          this.posts.set(posts);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        }
      });
    } else {
      this.loadPosts();
    }
  }

  filterByCategory(category: string): void {
    this.selectedCategory.set(category);
    this.loadPosts();
  }

  buildUrl(path: string | string[]): string {
    if (Array.isArray(path)) {
      return this.cidadeService.buildUrl(path.join('/'));
    }
    return this.cidadeService.buildUrl(path);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
