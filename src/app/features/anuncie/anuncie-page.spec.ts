import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';

import { AnunciePageComponent } from './anuncie-page';
import { ApiService } from '../../core/api.service';
import { TermoAdesaoService } from '../../core/services/termo-adesao.service';
import { TrackingService } from '../../core/tracking.service';
import { MetaTagService } from '../../core/meta-tag.service';

describe('AnunciePageComponent', () => {
  let component: AnunciePageComponent;
  let fixture: ComponentFixture<AnunciePageComponent>;
  let apiSpy: jasmine.SpyObj<ApiService>;
  let termoSpy: jasmine.SpyObj<TermoAdesaoService>;
  let trackingSpy: jasmine.SpyObj<TrackingService>;
  let metaSpy: jasmine.SpyObj<MetaTagService>;

  beforeEach(async () => {
    apiSpy = jasmine.createSpyObj('ApiService', ['post']);
    termoSpy = jasmine.createSpyObj('TermoAdesaoService', ['carregarTermo', 'calcularHashTermo', 'validarHash']);
    trackingSpy = jasmine.createSpyObj('TrackingService', ['trackFormSubmit', 'trackFreeSignupFunnel']);
    metaSpy = jasmine.createSpyObj('MetaTagService', ['applyMetadata']);

    termoSpy.carregarTermo.and.returnValue(of({ termo: { texto: 'Termo teste', hash: 'abc123' } } as any));
    termoSpy.validarHash.and.resolveTo(true);
    termoSpy.calcularHashTermo.and.resolveTo('hash-calculado');
    apiSpy.post.and.returnValue(of({ fornecedorId: 'forn-1', status: 'SUCESSO' }));

    await TestBed.configureTestingModule({
      imports: [AnunciePageComponent],
      providers: [
        provideRouter([]),
        provideExperimentalZonelessChangeDetection(),
        { provide: ApiService, useValue: apiSpy },
        { provide: TermoAdesaoService, useValue: termoSpy },
        { provide: TrackingService, useValue: trackingSpy },
        { provide: MetaTagService, useValue: metaSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AnunciePageComponent);
    component = fixture.componentInstance;

    const router = TestBed.inject(Router);
    spyOnProperty(router, 'url', 'get').and.returnValue('/piracicaba/anuncie');

    fixture.detectChanges();
  });

  it('should require terms acceptance before submit', async () => {
    component.cadastroForm.patchValue({
      nomeFantasia: 'Studio X',
      nomeResponsavel: 'Maria Silva',
      email: 'maria@email.com',
      telefone: '(19) 99999-9999',
      cnpjCpf: '123.456.789-09',
      aceitaTermos: false
    });

    await component.onSubmit();

    expect(apiSpy.post).not.toHaveBeenCalled();
    expect(component.errorMessage).toContain('Revise os campos obrigatórios');
  });

  it('should submit payload with free plan and legal acceptance metadata', async () => {
    component.cadastroForm.patchValue({
      nomeFantasia: 'Studio X',
      nomeResponsavel: 'Maria Silva',
      email: 'maria@email.com',
      telefone: '(19) 99999-9999',
      cnpjCpf: '12.345.678/0001-90',
      senha: 'Senha123!',
      aceitaTermos: true
    });

    await component.onSubmit();

    expect(apiSpy.post).toHaveBeenCalled();
    const payload = apiSpy.post.calls.mostRecent().args[1];
    expect(payload.planLevel).toBe('Free');
    expect(payload.aceitaTermos).toBeTrue();
    expect(payload.termoHash).toBe('hash-calculado');
    expect(payload.contato.telefone).toBe('19999999999');
    expect(payload.empresa.cnpjCpf).toBe('12345678000190');
    expect(payload.password).toBe('Senha123!');
    expect(component.submitted).toBeTrue();
  });

  it('should map duplicate email API errors to email field', async () => {
    apiSpy.post.and.returnValue(throwError(() => ({ error: { codigo: 'EMAIL_JA_CADASTRADO' } })));

    component.cadastroForm.patchValue({
      nomeFantasia: 'Studio X',
      nomeResponsavel: 'Maria Silva',
      email: 'maria@email.com',
      telefone: '(19) 99999-9999',
      cnpjCpf: '123.456.789-09',
      aceitaTermos: true
    });

    await component.onSubmit();

    expect(component.getFieldError('email')).toContain('já está cadastrado');
    expect(component.errorMessage).toContain('e-mail já está cadastrado');
    expect(trackingSpy.trackFreeSignupFunnel).toHaveBeenCalledWith(
      'falha',
      jasmine.objectContaining({ reason: 'EMAIL_JA_CADASTRADO' })
    );
  });
});
