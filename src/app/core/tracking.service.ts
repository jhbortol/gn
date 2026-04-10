import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TrackingService {
  /**
   * Dispara um evento de conversão do Google Ads
   */
  private trackGoogleAdsConversion(sendTo: string, value?: number, currency?: string) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: sendTo,
        ...(value !== undefined && { value }),
        ...(currency && { currency })
      });
    }
  }

  /**
   * Rastreia cliques em botões de contato (WhatsApp, Instagram, Facebook, etc)
   */
  trackContactClick(contactType: 'whatsapp' | 'instagram' | 'facebook' | 'website' | 'phone' | 'maps', vendorData?: {
    vendorId: string;
    vendorName: string;
    vendorCategory?: string;
  }) {
    // Google Tag Manager
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'contact_click',
        contact_type: contactType,
        vendor_id: vendorData?.vendorId,
        vendor_name: vendorData?.vendorName,
        vendor_category: vendorData?.vendorCategory
      });
    }

    // Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Contact', {
        content_type: 'product',
        content_name: `${contactType} - ${vendorData?.vendorName || 'Unknown'}`,
        value: 0,
        currency: 'BRL',
        content_id: vendorData?.vendorId || ''
      });
    }

    // Google Ads - track contact click as a lead engagement event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        send_to: 'AW-18077793493',
        contact_type: contactType,
        vendor_name: vendorData?.vendorName
      });
    }
  }

  /**
   * Rastreia visualização de fornecedor
   */
  trackVendorView(vendorData?: {
    vendorId: string;
    vendorName: string;
    vendorCategory?: string;
  }) {
    // Google Tag Manager
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'view_vendor',
        vendor_id: vendorData?.vendorId,
        vendor_name: vendorData?.vendorName,
        vendor_category: vendorData?.vendorCategory
      });
    }

    // Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_type: 'product',
        content_name: vendorData?.vendorName || 'Vendor',
        value: 0,
        currency: 'BRL',
        content_id: vendorData?.vendorId || ''
      });
    }
  }

  /**
   * Rastreia busca
   */
  trackSearch(searchTerm: string, resultCount: number) {
    // Google Tag Manager
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'search',
        search_term: searchTerm,
        result_count: resultCount
      });
    }

    // Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Search', {
        search_string: searchTerm
      });
    }
  }

  /**
   * Rastreia submissão de formulário
   */
  trackFormSubmit(formType: 'contact' | 'anuncio' | 'newsletter', vendorData?: any) {
    // Google Tag Manager
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'form_submit',
        form_type: formType,
        vendor_id: vendorData?.vendorId
      });
    }

    // Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', formType === 'newsletter' ? 'Lead' : 'Contact');
    }

    // Google Ads - track form submit as a conversion
    this.trackGoogleAdsConversion('AW-18077793493');
  }

  /**
   * Rastreia visualização de página (SPA pageview) para Google Analytics via GTM
   */
  trackPageView(pagePath: string, pageTitle?: string) {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'page_view',
        page_path: pagePath,
        page_title: pageTitle || (typeof document !== 'undefined' ? document.title : ''),
        page_location: typeof window !== 'undefined' ? window.location.href : undefined
      });
    }
  }
}
