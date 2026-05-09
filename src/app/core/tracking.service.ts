import { Injectable } from '@angular/core';

type MetaPlatform = 'facebook' | 'instagram';

interface MetaAttribution {
  landingPath?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  fbclid?: string;
  sourcePlatform?: MetaPlatform;
  isPaidMetaTraffic?: boolean;
}

@Injectable({ providedIn: 'root' })
export class TrackingService {
  private readonly metaAttributionStorageKey = 'gn_meta_attribution';
  private readonly metaLandingTrackedKey = 'gn_meta_paid_landing_tracked';

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

  private getWindow(): Window | null {
    return typeof window !== 'undefined' ? window : null;
  }

  private getSessionStorage(): Storage | null {
    const currentWindow = this.getWindow();
    if (!currentWindow) return null;

    try {
      return currentWindow.sessionStorage;
    } catch {
      return null;
    }
  }

  private readMetaAttribution(): MetaAttribution | null {
    const storage = this.getSessionStorage();
    if (!storage) return null;

    const rawValue = storage.getItem(this.metaAttributionStorageKey);
    if (!rawValue) return null;

    try {
      return JSON.parse(rawValue) as MetaAttribution;
    } catch {
      storage.removeItem(this.metaAttributionStorageKey);
      return null;
    }
  }

  private saveMetaAttribution(attribution: MetaAttribution): void {
    const storage = this.getSessionStorage();
    if (!storage) return;

    storage.setItem(this.metaAttributionStorageKey, JSON.stringify(attribution));
  }

  private shouldPersistAttribution(attribution: MetaAttribution): boolean {
    return Boolean(
      attribution.sourcePlatform || attribution.fbclid || attribution.utmSource || attribution.utmCampaign
    );
  }

  private hasMetaPixel(): boolean {
    const currentWindow = this.getWindow();
    return Boolean(currentWindow && (currentWindow as any).fbq);
  }

  private inferMetaPlatform(utmSource?: string, referrer?: string, fbclid?: string): MetaPlatform | undefined {
    const normalizedSource = (utmSource || '').toLowerCase();
    const normalizedReferrer = (referrer || '').toLowerCase();

    if (normalizedSource.includes('instagram') || normalizedReferrer.includes('instagram')) {
      return 'instagram';
    }

    if (normalizedSource.includes('facebook') || normalizedReferrer.includes('facebook') || fbclid) {
      return 'facebook';
    }

    return undefined;
  }

  private isPaidMetaTraffic(sourcePlatform?: MetaPlatform, fbclid?: string, utmMedium?: string): boolean {
    if (!sourcePlatform) return false;
    if (fbclid) return true;

    const normalizedMedium = (utmMedium || '').trim().toLowerCase();
    if (!normalizedMedium) return false;

    const collapsedMedium = normalizedMedium.replace(/[\s-]+/g, '_');
    if (['paid', 'paid_social', 'social_paid', 'cpc', 'ppc', 'ads'].includes(collapsedMedium)) {
      return true;
    }

    const mediumParts = normalizedMedium.split(/[\s,_-]+/).filter(Boolean);
    return (
      mediumParts.includes('cpc') ||
      mediumParts.includes('ppc') ||
      mediumParts.includes('ads') ||
      (mediumParts.includes('paid') && mediumParts.includes('social'))
    );
  }

  private buildMetaAttribution(pagePath?: string): MetaAttribution {
    const currentWindow = this.getWindow();
    const storedAttribution = this.readMetaAttribution();

    if (!currentWindow) {
      return storedAttribution || {};
    }

    const currentUrl = new URL(currentWindow.location.href);
    const params = currentUrl.searchParams;
    const referrer =
      typeof document !== 'undefined' ? document.referrer || storedAttribution?.referrer || '' : '';
    const utmSource = params.get('utm_source') || storedAttribution?.utmSource;
    const utmMedium = params.get('utm_medium') || storedAttribution?.utmMedium;
    const utmCampaign = params.get('utm_campaign') || storedAttribution?.utmCampaign;
    const utmContent = params.get('utm_content') || storedAttribution?.utmContent;
    const utmTerm = params.get('utm_term') || storedAttribution?.utmTerm;
    const fbclid = params.get('fbclid') || storedAttribution?.fbclid;
    const sourcePlatform = this.inferMetaPlatform(utmSource || undefined, referrer || undefined, fbclid || undefined);
    const attribution: MetaAttribution = {
      landingPath: storedAttribution?.landingPath || pagePath || `${currentUrl.pathname}${currentUrl.search}`,
      referrer: referrer || undefined,
      utmSource: utmSource || undefined,
      utmMedium: utmMedium || undefined,
      utmCampaign: utmCampaign || undefined,
      utmContent: utmContent || undefined,
      utmTerm: utmTerm || undefined,
      fbclid: fbclid || undefined,
      sourcePlatform,
      isPaidMetaTraffic: this.isPaidMetaTraffic(sourcePlatform, fbclid || undefined, utmMedium || undefined)
    };

    if (this.shouldPersistAttribution(attribution)) {
      this.saveMetaAttribution(attribution);
    }

    return attribution;
  }

  private getMetaEventData(additionalData: Record<string, unknown> = {}, pagePath?: string) {
    const attribution = this.buildMetaAttribution(pagePath);

    return {
      ...additionalData,
      ...(attribution.sourcePlatform && { source_platform: attribution.sourcePlatform }),
      ...(attribution.isPaidMetaTraffic && { traffic_channel: 'paid_social_meta' }),
      ...(attribution.utmSource && { utm_source: attribution.utmSource }),
      ...(attribution.utmMedium && { utm_medium: attribution.utmMedium }),
      ...(attribution.utmCampaign && { utm_campaign: attribution.utmCampaign }),
      ...(attribution.utmContent && { utm_content: attribution.utmContent }),
      ...(attribution.utmTerm && { utm_term: attribution.utmTerm }),
      ...(attribution.fbclid && { fbclid: attribution.fbclid }),
      ...(attribution.referrer && { referrer: attribution.referrer }),
      ...(attribution.landingPath && { landing_path: attribution.landingPath })
    };
  }

  private trackMetaPaidLanding(pagePath: string, pageTitle?: string): void {
    const currentWindow = this.getWindow();
    const storage = this.getSessionStorage();
    const attribution = this.buildMetaAttribution(pagePath);

    if (!currentWindow || !(currentWindow as any).fbq || !attribution.isPaidMetaTraffic) {
      return;
    }

    if (storage?.getItem(this.metaLandingTrackedKey) === 'true') {
      return;
    }

    (currentWindow as any).fbq('trackCustom', 'PaidSocialLanding', this.getMetaEventData({
      page_path: pagePath,
      page_title: pageTitle || (typeof document !== 'undefined' ? document.title : '')
    }, pagePath));

    storage?.setItem(this.metaLandingTrackedKey, 'true');
  }

  trackMetaEvent(
    eventName: string,
    eventData: Record<string, unknown> = {},
    options?: { custom?: boolean; pagePath?: string }
  ): void {
    const currentWindow = this.getWindow();
    if (!currentWindow || !(currentWindow as any).fbq) {
      return;
    }

    const command = options?.custom ? 'trackCustom' : 'track';
    (currentWindow as any).fbq(command, eventName, this.getMetaEventData(eventData, options?.pagePath));
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
    if (this.hasMetaPixel()) {
      this.trackMetaEvent('Contact', {
        content_type: 'product',
        content_name: `${contactType} - ${vendorData?.vendorName || 'Unknown'}`,
        value: 0,
        currency: 'BRL',
        content_id: vendorData?.vendorId || ''
      });
    }

    // Google Ads - track contact click as a lead conversion
    this.trackGoogleAdsConversion('AW-18077793493');
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
    if (this.hasMetaPixel()) {
      this.trackMetaEvent('ViewContent', {
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
    if (this.hasMetaPixel()) {
      this.trackMetaEvent('Search', {
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
    if (this.hasMetaPixel()) {
      const eventName = formType === 'newsletter' ? 'Lead' : 'Contact';
      this.trackMetaEvent(eventName);
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

    if (this.hasMetaPixel()) {
      this.trackMetaPaidLanding(pagePath, pageTitle);
      this.trackMetaEvent('PageView', {
        page_path: pagePath,
        page_title: pageTitle || (typeof document !== 'undefined' ? document.title : '')
      }, { pagePath });
    }
  }
}
