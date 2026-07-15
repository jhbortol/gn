import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { FornecedorPageComponent } from './fornecedor-page';
import { FornecedoresData, Fornecedor } from './services/fornecedores-data';
import { PlanLevel } from '../../core/models/tier-system.model';
import { MeuCasamentoSyncService } from '../meu-casamento/services/meu-casamento-sync.service';

describe('FornecedorPageComponent', () => {
    let component: FornecedorPageComponent;
    let fixture: ComponentFixture<FornecedorPageComponent>;
    let mockFornecedoresData: jasmine.SpyObj<FornecedoresData>;
    let mockWeddingSync: jasmine.SpyObj<MeuCasamentoSyncService>;
    let queryParamsMock: any;
    let paramsMock: any;

    const mockFornecedorVitrine: Fornecedor = {
        id: '1',
        nome: 'Fotógrafo Premium',
        slug: 'fotografo-premium',
        descricao: 'Especialista em casamentos',
        cidade: 'São Paulo',
        endereco: 'Rua das Flores, 123',
        horarioFuncionamento: '09:00 - 18:00',
        telefone: '(11) 99999-8888',
        email: 'contato@fotografo.com',
        planLevel: PlanLevel.Vitrine,
        imagens: [
            { url: 'img1.jpg', orderIndex: 0 },
            { url: 'img2.jpg', orderIndex: 1 },
            { url: 'img3.jpg', orderIndex: 2 }
        ],
        depoimentos: [{ texto: 'Excelente trabalho!', casal: 'João e Maria' }]
    };

    const mockFornecedorFree: Fornecedor = {
        id: '2',
        nome: 'Decorador Simples',
        slug: 'decorador-simples',
        descricao: 'Decoração para festas',
        cidade: 'São Paulo',
        endereco: 'Av. Principal, 456',
        horarioFuncionamento: '08:00 - 17:00',
        telefone: '(11) 88888-7777',
        planLevel: PlanLevel.Free,
        imagens: [
            { url: 'img1.jpg', orderIndex: 0 },
            { url: 'img2.jpg', orderIndex: 1 },
            { url: 'img3.jpg', orderIndex: 2 },
            { url: 'img4.jpg', orderIndex: 3 }
        ]
    };

    beforeEach(async () => {
        queryParamsMock = {};
        paramsMock = { id: 'fotografo-premium' };

        mockFornecedoresData = jasmine.createSpyObj('FornecedoresData', ['getById']);
        mockFornecedoresData.getById.and.returnValue(of(mockFornecedorVitrine));
        
        mockWeddingSync = jasmine.createSpyObj('MeuCasamentoSyncService', ['init', 'syncPendingChanges']);
        mockWeddingSync.init.and.returnValue(Promise.resolve());
        mockWeddingSync.syncPendingChanges.and.returnValue(Promise.resolve());

        await TestBed.configureTestingModule({
            imports: [
                FornecedorPageComponent,
                RouterTestingModule,
                BrowserAnimationsModule
            ],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: MeuCasamentoSyncService, useValue: mockWeddingSync },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of(paramsMock),
                        snapshot: {
                            params: paramsMock,
                            queryParams: queryParamsMock
                        }
                    }
                }
            ]
        });

        TestBed.overrideProvider(FornecedoresData, { useValue: mockFornecedoresData });
        await TestBed.compileComponents();

        fixture = TestBed.createComponent(FornecedorPageComponent);
        component = fixture.componentInstance;
    });

    describe('Tier Logic', () => {
        it('should show lead form for Free tier', fakeAsync(() => {
            mockFornecedoresData.getById.and.returnValue(of(mockFornecedorFree));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            expect(component.showLeadForm()).toBeTrue();
        }));

        it('should render lead form and hide Vitrine CTAs for Free tier', fakeAsync(() => {
            const freeWithDirectFields = {
                ...mockFornecedorFree,
                instagram: '@decorador',
                facebook: 'decorador',
                website: 'https://decorador.com',
                whatsAppUrl: 'https://wa.me/5511999999999'
            };

            mockFornecedoresData.getById.and.returnValue(of(freeWithDirectFields));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            const leadForm = fixture.nativeElement.querySelector('app-lead-form');
            const asideText = fixture.nativeElement.querySelector('aside')?.textContent || '';

            expect(leadForm).toBeTruthy();
            expect(asideText).not.toContain('WhatsApp');
            expect(asideText).not.toContain('Instagram');
            expect(asideText).not.toContain('Facebook');
            expect(asideText).not.toContain('Visitar Site');
        }));

        it('should show lead form for Zombie tier', fakeAsync(() => {
            const zombieFornecedor = { ...mockFornecedorFree, planLevel: PlanLevel.Zombie };
            mockFornecedoresData.getById.and.returnValue(of(zombieFornecedor));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            expect(component.showLeadForm()).toBeTrue();
        }));

        it('should NOT show lead form for Vitrine tier regardless of showContactForm', fakeAsync(() => {
            const vitrineWithForm = { ...mockFornecedorVitrine, showContactForm: true };
            mockFornecedoresData.getById.and.returnValue(of(vitrineWithForm));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            expect(component.showLeadForm()).toBeFalse();
        }));
    });

    describe('Gallery Limits', () => {
        it('should limit gallery to 2 images for Free tier', fakeAsync(() => {
            mockFornecedoresData.getById.and.returnValue(of(mockFornecedorFree));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            const images = component.getGalleryImages();
            expect(images.length).toBe(2);
        }));

        it('should show all images (up to 20) for Vitrine tier', fakeAsync(() => {
            mockFornecedoresData.getById.and.returnValue(of(mockFornecedorVitrine));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            const images = component.getGalleryImages();
            expect(images.length).toBe(3); // All images in mock
        }));
    });

    describe('Gallery Carousel Navigation', () => {
        beforeEach(fakeAsync(() => {
            fixture.detectChanges();
            tick();
            component.fornecedor = mockFornecedorVitrine;
        }));

        it('should open image and set correct index', () => {
            component.openImage('img2.jpg');

            expect(component.selectedImage).toBe('img2.jpg');
            expect(component.selectedImageIndex).toBe(1);
        });

        it('should navigate to next image with wraparound', () => {
            component.openImage('img3.jpg'); // Last image
            component.nextImage();

            expect(component.selectedImageIndex).toBe(0);
            expect(component.selectedImage).toBe('img1.jpg');
        });

        it('should navigate to previous image with wraparound', () => {
            component.openImage('img1.jpg'); // First image
            component.prevImage();

            expect(component.selectedImageIndex).toBe(2);
            expect(component.selectedImage).toBe('img3.jpg');
        });

        it('should reset index when closing image', () => {
            component.openImage('img2.jpg');
            component.closeImage();

            expect(component.selectedImage).toBeUndefined();
            expect(component.selectedImageIndex).toBe(0);
        });
    });

    describe('Competitor Ads', () => {
        it('should show competitor ads for Free tier with adInjection', fakeAsync(() => {
            const freeWithAds = {
                ...mockFornecedorFree,
                adInjection: [
                    { fornecedorId: 10, nomeFantasia: 'Competitor 1', fotoUrl: 'c1.jpg', whatsAppUrl: 'wa.me/1', detailUrl: '/f/1' }
                ]
            };
            mockFornecedoresData.getById.and.returnValue(of(freeWithAds));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            expect(component.hasCompetitorAds()).toBeTrue();
        }));

        it('should NOT show competitor ads for Vitrine tier', fakeAsync(() => {
            mockFornecedoresData.getById.and.returnValue(of(mockFornecedorVitrine));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            expect(component.hasCompetitorAds()).toBeFalse();
        }));
    });

    describe('Claim Bar', () => {
        it('should show claim bar for Zombie tier unclaimed', fakeAsync(() => {
            const zombieUnclaimed = { ...mockFornecedorFree, planLevel: PlanLevel.Zombie, isClaimed: false };
            mockFornecedoresData.getById.and.returnValue(of(zombieUnclaimed));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            expect(component.showClaimBar()).toBeTrue();
        }));

        it('should NOT show claim bar for claimed profiles', fakeAsync(() => {
            const claimed = { ...mockFornecedorFree, planLevel: PlanLevel.Free, isClaimed: true };
            mockFornecedoresData.getById.and.returnValue(of(claimed));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            expect(component.showClaimBar()).toBeFalse();
        }));
    });

    describe('WhatsApp Link', () => {
        it('should return valid WhatsApp link for Vitrine tier', fakeAsync(() => {
            mockFornecedoresData.getById.and.returnValue(of(mockFornecedorVitrine));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            const link = component.getWhatsAppLink();
            expect(link).toContain('wa.me');
        }));

        it('should return # for non-Vitrine tier', fakeAsync(() => {
            mockFornecedoresData.getById.and.returnValue(of(mockFornecedorFree));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            const link = component.getWhatsAppLink();
            expect(link).toBe('#');
        }));
    });

    describe('Preview Mode', () => {
        it('should set isPreviewMode to true when preview=true in query params', fakeAsync(() => {
            queryParamsMock.preview = 'true';

            fixture.detectChanges();
            tick();

            expect(component.isPreviewMode).toBeTrue();
        }));

        it('should call getById with preview=true when in preview mode', fakeAsync(() => {
            queryParamsMock.preview = 'true';

            fixture.detectChanges();
            tick();

            expect(mockFornecedoresData.getById).toHaveBeenCalledWith('fotografo-premium', true);
        }));

        it('should show preview banner when isPreviewMode is true', fakeAsync(() => {
            queryParamsMock.preview = 'true';
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            const bannerElement = fixture.nativeElement.querySelector('.preview-banner');
            expect(bannerElement).toBeTruthy();
        }));

        it('should NOT show preview banner when isPreviewMode is false', fakeAsync(() => {
            queryParamsMock.preview = undefined;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            const bannerElement = fixture.nativeElement.querySelector('.preview-banner');
            expect(bannerElement).toBeFalsy();
        }));
    });

    describe('Loading State', () => {
        it('should show loading placeholder and avoid not-found while loading supplier data', fakeAsync(() => {
            const pendingRequest$ = new Subject<Fornecedor>();
            mockFornecedoresData.getById.and.returnValue(pendingRequest$.asObservable());
            const updateNotFoundSpy = spyOn<any>(component, 'updateNotFoundMetaTags');

            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            const loadingPlaceholder = fixture.nativeElement.querySelector('.fornecedor-loading-placeholder');
            expect(loadingPlaceholder).toBeTruthy();
            expect(fixture.nativeElement.textContent).not.toContain('Fornecedor não encontrado');
            expect(updateNotFoundSpy).not.toHaveBeenCalled();
        }));
    });
});
