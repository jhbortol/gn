import { TestBed } from '@angular/core/testing';
import { provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { Router } from '@angular/router';

import { weddingToolsGuard } from './wedding-tools.guard';
import { MeuCasamentoStoreService } from './services/meu-casamento-store.service';

describe('weddingToolsGuard', () => {
  let available = signal(false);
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    available = signal(false);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['createUrlTree']);
    routerSpy.createUrlTree.and.returnValue({ redirected: true } as any);

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: MeuCasamentoStoreService,
          useValue: {
            availableTools: available
          }
        },
        { provide: Router, useValue: routerSpy }
      ]
    });
  });

  it('allows access when tools are unlocked', () => {
    available.set(true);

    const result = TestBed.runInInjectionContext(() => weddingToolsGuard({} as any, {} as any));

    expect(result).toBeTrue();
    expect(routerSpy.createUrlTree).not.toHaveBeenCalled();
  });

  it('redirects to hub when tools are locked', () => {
    const result = TestBed.runInInjectionContext(() => weddingToolsGuard({} as any, {} as any));

    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/meu-casamento'], {
      queryParams: { desbloqueioPendente: '1' }
    });
    expect(result).toEqual(jasmine.objectContaining({ redirected: true }));
  });
});
