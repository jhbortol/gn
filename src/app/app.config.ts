import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './core/auth-token.interceptor';
import { casingNormalizerInterceptor } from './core/casing-normalizer.interceptor';
// import { credentialsSanitizerInterceptor } from './core/credentials-sanitizer.interceptor';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MeuCasamentoSyncService } from './features/meu-casamento/services/meu-casamento-sync.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([authTokenInterceptor, casingNormalizerInterceptor])),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [MeuCasamentoSyncService],
      useFactory: (syncService: MeuCasamentoSyncService) => () => syncService.init()
    }
  ]
};
