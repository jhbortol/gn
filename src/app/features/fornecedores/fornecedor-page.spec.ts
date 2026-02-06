import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FornecedorPageComponent } from './fornecedor-page';
import { FornecedoresData, Fornecedor } from './services/fornecedores-data';
import { PlanLevel } from '../../core/models/tier-system.model';

describe('FornecedorPageComponent', () => {
    let component: FornecedorPageComponent;
    let fixture: ComponentFixture<FornecedorPageComponent>;
    let mockFornecedoresData: jasmine.SpyObj<FornecedoresData>;

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
        mockFornecedoresData = jasmine.createSpyObj('FornecedoresData', ['getById']);
        mockFornecedoresData.getById.and.returnValue(of(mockFornecedorVitrine));

        await TestBed.configureTestingModule({
            imports: [
                FornecedorPageComponent,
                RouterTestingModule,
                BrowserAnimationsModule
            ],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            params: { id: 'fotografo-premium' },
                            queryParams: {}
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
        it('should show lead form for Free tier', () => {
            mockFornecedoresData.getById.and.returnValue(of(mockFornecedorFree));
            fixture.detectChanges();

            expect(component.showLeadForm()).toBeTrue();
        });

        it('should show lead form for Zombie tier', () => {
            const zombieFornecedor = { ...mockFornecedorFree, planLevel: PlanLevel.Zombie };
            mockFornecedoresData.getById.and.returnValue(of(zombieFornecedor));
            fixture.detectChanges();

            expect(component.showLeadForm()).toBeTrue();
        });

        it('should optionally show lead form for Vitrine based on showContactForm flag', () => {
            const vitrineWithForm = { ...mockFornecedorVitrine, showContactForm: true };
            mockFornecedoresData.getById.and.returnValue(of(vitrineWithForm));
            fixture.detectChanges();

            expect(component.showLeadForm()).toBeTrue();
        });
    });

    describe('Gallery Limits', () => {
        it('should limit gallery to 2 images for Free tier', () => {
            mockFornecedoresData.getById.and.returnValue(of(mockFornecedorFree));
            fixture.detectChanges();

            const images = component.getGalleryImages();
            expect(images.length).toBe(2);
        });

        it('should show all images (up to 20) for Vitrine tier', () => {
            mockFornecedoresData.getById.and.returnValue(of(mockFornecedorVitrine));
            fixture.detectChanges();

            const images = component.getGalleryImages();
            expect(images.length).toBe(3); // All images in mock
        });
    });

    describe('Gallery Carousel Navigation', () => {
        beforeEach(() => {
            fixture.detectChanges();
            component.fornecedor = mockFornecedorVitrine;
        });

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
        it('should show competitor ads for Free tier with adInjection', () => {
            const freeWithAds = {
                ...mockFornecedorFree,
                adInjection: [
                    { fornecedorId: 10, nomeFantasia: 'Competitor 1', fotoUrl: 'c1.jpg', whatsAppUrl: 'wa.me/1', detailUrl: '/f/1' }
                ]
            };
            mockFornecedoresData.getById.and.returnValue(of(freeWithAds));
            fixture.detectChanges();

            expect(component.hasCompetitorAds()).toBeTrue();
        });

        it('should NOT show competitor ads for Vitrine tier', () => {
            mockFornecedoresData.getById.and.returnValue(of(mockFornecedorVitrine));
            fixture.detectChanges();

            expect(component.hasCompetitorAds()).toBeFalse();
        });
    });

    describe('Claim Bar', () => {
        it('should show claim bar for Zombie tier unclaimed', () => {
            const zombieUnclaimed = { ...mockFornecedorFree, planLevel: PlanLevel.Zombie, isClaimed: false };
            mockFornecedoresData.getById.and.returnValue(of(zombieUnclaimed));
            fixture.detectChanges();

            expect(component.showClaimBar()).toBeTrue();
        });

        it('should NOT show claim bar for claimed profiles', () => {
            const claimed = { ...mockFornecedorFree, planLevel: PlanLevel.Free, isClaimed: true };
            mockFornecedoresData.getById.and.returnValue(of(claimed));
            fixture.detectChanges();

            expect(component.showClaimBar()).toBeFalse();
        });
    });

    describe('WhatsApp Link', () => {
        it('should return valid WhatsApp link for Vitrine tier', () => {
            mockFornecedoresData.getById.and.returnValue(of(mockFornecedorVitrine));
            fixture.detectChanges();

            const link = component.getWhatsAppLink();
            expect(link).toContain('wa.me');
        });

        it('should return # for non-Vitrine tier', () => {
            mockFornecedoresData.getById.and.returnValue(of(mockFornecedorFree));
            fixture.detectChanges();

            const link = component.getWhatsAppLink();
            expect(link).toBe('#');
        });
    });
});
