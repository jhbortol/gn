import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { Observable, map } from 'rxjs';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  category?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  views?: number;
}

export interface BlogPostListDto {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  author?: string;
  publishedAt: string;
  category?: string;
  tags?: string[];
  views?: number;
}

@Injectable({ providedIn: 'root' })
export class BlogData {
  constructor(private api: ApiService) {}

  getAll(page = 1, pageSize = 12, category?: string): Observable<BlogPostListDto[]> {
    const params: any = { page, pageSize };
    if (category) params.category = category;
    return this.api.get<{ data: BlogPostListDto[] }>('/blog/posts', params).pipe(
      map(r => r.data || [])
    );
  }

  getBySlug(slug: string): Observable<BlogPost> {
    return this.api.get<BlogPost>(`/blog/posts/slug/${slug}`);
  }

  getById(id: string): Observable<BlogPost> {
    return this.api.get<BlogPost>(`/blog/posts/${id}`);
  }

  getRelated(postId: string, limit = 3): Observable<BlogPostListDto[]> {
    return this.api.get<{ data: BlogPostListDto[] }>(`/blog/posts/${postId}/related`, { limit }).pipe(
      map(r => r.data || [])
    );
  }

  incrementViews(postId: string): Observable<void> {
    return this.api.post<void>(`/blog/posts/${postId}/view`, {});
  }

  search(query: string, page = 1, pageSize = 12): Observable<BlogPostListDto[]> {
    return this.api.get<{ data: BlogPostListDto[] }>('/blog/posts/search', { q: query, page, pageSize }).pipe(
      map(r => r.data || [])
    );
  }
}
