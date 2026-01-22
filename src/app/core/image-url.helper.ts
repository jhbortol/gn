import { environment } from '../../environments/environment';

/**
 * Resolve image URLs from API responses to full URLs
 * Handles absolute URLs, relative paths, and assets
 */
export function resolveImageUrl(url?: string | null, fallback: string = 'assets/fornecedores/placeholder.jpg'): string {
  if (!url) return fallback;
  
  // Already absolute URL (backend returns full Azure Blob URLs)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Local asset
  if (url.startsWith('assets/') || url.startsWith('/assets/')) {
    return url;
  }
  
  // For relative paths (legacy/fallback), construct full URL
  // Remove /api/v1 from base URL for images (images are served from root or /uploads path)
  const apiBase = environment.API_BASE_URL?.replace(/\/$/, '') || '';
  const base = apiBase.replace(/\/api\/v1$/, '');
  
  // Ensure path starts with /
  let path = url.startsWith('/') ? url : `/${url}`;
  
  // Remove duplicate /api/v1 if path contains it
  if (path.startsWith('/api/v1/')) {
    path = path.replace('/api/v1', '');
  }
  
  return `${base}${path}`;
}

/**
 * Add cache-busting parameter to image URL
 */
export function addCacheBuster(url: string, key: string): string {
  if (!url.startsWith('http')) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}cb=${encodeURIComponent(key)}`;
}
