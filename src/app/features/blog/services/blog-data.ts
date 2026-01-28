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

  getAll(page = 1, pageSize = 10, category?: string): Observable<BlogPostListDto[]> {
    const params: any = { page, pageSize };
    if (category) params.category = category;
    return this.api.get<{ data: any[] }>('/blog', params).pipe(
      map(r => (r.data || []).map((src: any) => ({
        id: src.id || src.Id,
        title: src.title || src.Title,
        slug: src.slug || src.Slug,
        excerpt: src.excerpt || src.Excerpt,
        featuredImage: src.featuredImage || src.FeaturedImage,
        author: src.author || src.Author,
        publishedAt: src.publishedAt || src.PublishedAt,
        category: src.category || src.Category,
        tags: src.tags || src.Tags,
        views: src.views ?? src.Views ?? 0
      })) )
    );
  }

  getBySlug(slug: string): Observable<BlogPost> {
    return this.api.get<any>(`/blog/${slug}`).pipe(
      map((src: any) => ({
        id: src.id || src.Id,
        title: src.title || src.Title,
        slug: src.slug || src.Slug,
        excerpt: src.excerpt || src.Excerpt,
        content: src.content || src.Content,
        featuredImage: src.featuredImage || src.FeaturedImage,
        author: src.author || src.Author,
        publishedAt: src.publishedAt || src.PublishedAt,
        updatedAt: src.updatedAt || src.UpdatedAt,
        category: src.category || src.Category,
        tags: src.tags || src.Tags,
        metaTitle: src.metaTitle || src.MetaTitle,
        metaDescription: src.metaDescription || src.MetaDescription,
        views: src.views ?? src.Views ?? 0
      }))
    );
  }

  getById(id: string): Observable<BlogPost> {
    return this.api.get<any>(`/blog/posts/${id}`).pipe(
      map((src: any) => ({
        id: src.id || src.Id,
        title: src.title || src.Title,
        slug: src.slug || src.Slug,
        excerpt: src.excerpt || src.Excerpt,
        content: src.content || src.Content,
        featuredImage: src.featuredImage || src.FeaturedImage,
        author: src.author || src.Author,
        publishedAt: src.publishedAt || src.PublishedAt,
        updatedAt: src.updatedAt || src.UpdatedAt,
        category: src.category || src.Category,
        tags: src.tags || src.Tags,
        metaTitle: src.metaTitle || src.MetaTitle,
        metaDescription: src.metaDescription || src.MetaDescription,
        views: src.views ?? src.Views ?? 0
      }))
    );
  }

  getRelated(postId: string, limit = 3): Observable<BlogPostListDto[]> {
    return this.api.get<{ data: any[] }>(`/blog/posts/${postId}/related`, { limit }).pipe(
      map(r => (r.data || []).map((src: any) => ({
        id: src.id || src.Id,
        title: src.title || src.Title,
        slug: src.slug || src.Slug,
        excerpt: src.excerpt || src.Excerpt,
        featuredImage: src.featuredImage || src.FeaturedImage,
        author: src.author || src.Author,
        publishedAt: src.publishedAt || src.PublishedAt,
        category: src.category || src.Category,
        tags: src.tags || src.Tags,
        views: src.views ?? src.Views ?? 0
      })) )
    );
  }

  incrementViews(postId: string): Observable<void> {
    return this.api.post<void>(`/blog/posts/${postId}/view`, {});
  }

  search(query: string, page = 1, pageSize = 12): Observable<BlogPostListDto[]> {
    return this.api.get<{ data: any[] }>('/blog/posts/search', { q: query, page, pageSize }).pipe(
      map(r => (r.data || []).map((src: any) => ({
        id: src.id || src.Id,
        title: src.title || src.Title,
        slug: src.slug || src.Slug,
        excerpt: src.excerpt || src.Excerpt,
        featuredImage: src.featuredImage || src.FeaturedImage,
        author: src.author || src.Author,
        publishedAt: src.publishedAt || src.PublishedAt,
        category: src.category || src.Category,
        tags: src.tags || src.Tags,
        views: src.views ?? src.Views ?? 0
      })) )
    );
  }
}
