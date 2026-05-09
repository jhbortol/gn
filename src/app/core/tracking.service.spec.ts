import { TrackingService } from './tracking.service';

describe('TrackingService', () => {
  let service: TrackingService;
  let originalDataLayer: any;
  let originalFbq: any;
  let originalInitialGaPageview: any;
  let originalInitialMetaPageview: any;
  let originalPrebootState: any;
  let originalStopPrebootTracking: any;

  beforeEach(() => {
    service = new TrackingService();

    originalDataLayer = (window as any).dataLayer;
    originalFbq = (window as any).fbq;
    originalInitialGaPageview = (window as any).__GN_INITIAL_GA_PAGEVIEW_PATH;
    originalInitialMetaPageview = (window as any).__GN_INITIAL_META_PAGEVIEW_PATH;
    originalPrebootState = (window as any).__GN_PREBOOT_ANALYTICS_STATE;
    originalStopPrebootTracking = (window as any).__gnStopPrebootAnalyticsTracking;

    (window as any).dataLayer = {
      push: jasmine.createSpy('dataLayer.push')
    };
    (window as any).fbq = jasmine.createSpy('fbq');
    (window as any).__GN_INITIAL_GA_PAGEVIEW_PATH = undefined;
    (window as any).__GN_INITIAL_META_PAGEVIEW_PATH = undefined;
    (window as any).__GN_PREBOOT_ANALYTICS_STATE = undefined;
    (window as any).__gnStopPrebootAnalyticsTracking = undefined;
  });

  afterEach(() => {
    (window as any).dataLayer = originalDataLayer;
    (window as any).fbq = originalFbq;
    (window as any).__GN_INITIAL_GA_PAGEVIEW_PATH = originalInitialGaPageview;
    (window as any).__GN_INITIAL_META_PAGEVIEW_PATH = originalInitialMetaPageview;
    (window as any).__GN_PREBOOT_ANALYTICS_STATE = originalPrebootState;
    (window as any).__gnStopPrebootAnalyticsTracking = originalStopPrebootTracking;
  });

  it('should skip duplicated initial GA and Meta pageviews when preboot tracking already captured the landing page', () => {
    (window as any).__GN_INITIAL_GA_PAGEVIEW_PATH = '/piracicaba';
    (window as any).__GN_INITIAL_META_PAGEVIEW_PATH = '/piracicaba';
    (window as any).__GN_PREBOOT_ANALYTICS_STATE = {
      startedAt: Date.now() - 500
    };
    (window as any).__gnStopPrebootAnalyticsTracking = jasmine.createSpy('stopPreboot');

    service.trackPageView('/piracicaba', 'Guia Noivas');

    expect((window as any).dataLayer.push).not.toHaveBeenCalledWith(
      jasmine.objectContaining({ event: 'page_view', page_path: '/piracicaba' })
    );
    expect((window as any).fbq).not.toHaveBeenCalledWith(
      'track',
      'PageView',
      jasmine.objectContaining({ page_path: '/piracicaba' })
    );
    expect((window as any).__gnStopPrebootAnalyticsTracking).toHaveBeenCalled();
  });

  it('should flush page engagement on SPA route changes', () => {
    const nowSpy = spyOn(Date, 'now');
    nowSpy.and.returnValues(1000, 2500, 3000);

    service.trackPageView('/piracicaba', 'Página inicial');
    service.trackPageView('/piracicaba/fornecedores', 'Fornecedores');

    expect((window as any).dataLayer.push).toHaveBeenCalledWith(
      jasmine.objectContaining({
        event: 'page_engagement',
        page_path: '/piracicaba',
        engagement_time_msec: 1500,
        exit_reason: 'route_change'
      })
    );
    expect((window as any).fbq).toHaveBeenCalledWith(
      'trackCustom',
      'PageEngagement',
      jasmine.objectContaining({
        page_path: '/piracicaba',
        engagement_time_msec: 1500,
        exit_reason: 'route_change'
      })
    );
  });
});
