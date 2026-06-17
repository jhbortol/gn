import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './core/auth-token.interceptor';
import { brideAuthInterceptor } from './core/bride-auth.interceptor';
import { casingNormalizerInterceptor } from './core/casing-normalizer.interceptor';
// import { credentialsSanitizerInterceptor } from './core/credentials-sanitizer.interceptor';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MeuCasamentoSyncService } from './features/meu-casamento/services/meu-casamento-sync.service';
import { SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from '../environments/environment';

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
    provideHttpClient(withInterceptors([authTokenInterceptor, brideAuthInterceptor, casingNormalizerInterceptor])),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.GOOGLE_CLIENT_ID, {
              oneTapEnabled: false
            })
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [MeuCasamentoSyncService],
      useFactory: (syncService: MeuCasamentoSyncService) => () => syncService.init()
    }
  ]
};
