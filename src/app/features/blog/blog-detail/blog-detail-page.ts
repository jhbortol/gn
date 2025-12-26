import { Component, OnInit, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Meta, Title, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogData, BlogPost, BlogPostListDto } from '../services/blog-data';
import { CidadeService } from '../../../core/cidade.service';
import { TrackingService } from '../../../core/tracking.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  templateUrl: './blog-detail-page.html',
  styleUrls: ['./blog-detail-page.css'],
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogDetailPage implements OnInit {
  post = signal<BlogPost | undefined>(undefined);
  relatedPosts = signal<BlogPostListDto[]>([]);
  isLoading = signal(true);
  
  // Safe HTML content
  safeContent = computed<SafeHtml | undefined>(() => {
    const content = this.post()?.content;
    return content ? this.sanitizer.sanitize(1, content) || content : undefined;
  });

  private meta = inject(Meta);
  private title = inject(Title);
  private route = inject(ActivatedRoute);
  private blogData = inject(BlogData);
  private cidadeService = inject(CidadeService);
  private tracking = inject(TrackingService);
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    const slug = this.route.snapshot.params['slug'];
    if (slug) {
      this.loadPost(slug);
    }
  }

  loadPost(slug: string): void {
    this.isLoading.set(true);
    this.blogData.getBySlug(slug).subscribe({
      next: (post) => {
        this.post.set(post);
        this.isLoading.set(false);
        this.setSEOMeta(post);
        this.addStructuredData(post);
        this.blogData.incrementViews(post.id).subscribe();
        this.loadRelated(post.id);
        
        // Track blog view
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'ViewContent', {
            content_type: 'blog_post',
            content_name: post.title,
            content_id: post.id
          });
        }
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  loadRelated(postId: string): void {
    this.blogData.getRelated(postId, 3).subscribe({
      next: (posts) => {
        this.relatedPosts.set(posts);
      }
    });
  }

  setSEOMeta(post: BlogPost): void {
    // Set page title
    const pageTitle = post.metaTitle || `${post.title} | Blog Guia Noivas`;
    this.title.setTitle(pageTitle);

    // Set meta description
    const description = post.metaDescription || post.excerpt;
    this.meta.updateTag({ name: 'description', content: description });

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: post.title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    if (post.featuredImage) {
      this.meta.updateTag({ property: 'og:image', content: post.featuredImage });
    }

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: post.title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    if (post.featuredImage) {
      this.meta.updateTag({ name: 'twitter:image', content: post.featuredImage });
    }

    // Article tags
    this.meta.updateTag({ property: 'article:published_time', content: post.publishedAt });
    if (post.updatedAt) {
      this.meta.updateTag({ property: 'article:modified_time', content: post.updatedAt });
    }
    if (post.author) {
      this.meta.updateTag({ property: 'article:author', content: post.author });
    }
  }

  addStructuredData(post: BlogPost): void {
    if (typeof document === 'undefined') return;

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.excerpt,
      'image': post.featuredImage || '',
      'datePublished': post.publishedAt,
      'dateModified': post.updatedAt || post.publishedAt,
      'author': {
        '@type': 'Person',
        'name': post.author || 'Guia Noivas'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Guia Noivas Piracicaba',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://guianoivas.com/assets/logo.png'
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
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

  shareOnFacebook(): void {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  }

  shareOnWhatsApp(): void {
    const text = encodeURIComponent(`${this.post()?.title} - ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }
}
