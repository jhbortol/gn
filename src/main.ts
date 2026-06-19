import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  if (environment.production) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').catch((error) => {
        console.warn('Falha ao registrar service worker', error);
      });
    });
  } else {
    // Em modo de desenvolvimento, remove o Service Worker e limpa cache para evitar loops de recarregamento
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().then((success) => {
          if (success) {
            console.log('[PWA] Service Worker desregistrado com sucesso em desenvolvimento.');
            window.location.reload();
          }
        });
      }
    });

    if ('caches' in window) {
      caches.keys().then((keys) => {
        return Promise.all(keys.map((key) => caches.delete(key)));
      }).then(() => {
        console.log('[PWA] Caches limpos em desenvolvimento.');
      });
    }
  }
}
