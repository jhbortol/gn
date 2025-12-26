import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogData, BlogPostListDto } from '../services/blog-data';
import { CidadeService } from '../../../core/cidade.service';

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
