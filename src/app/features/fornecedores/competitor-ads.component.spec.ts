import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CompetitorAdsComponent } from './competitor-ads.component';
import { CompetitorAd } from '../../core/models/tier-system.model';

describe('CompetitorAdsComponent', () => {
    let component: CompetitorAdsComponent;
    let fixture: ComponentFixture<CompetitorAdsComponent>;

    const mockAds: CompetitorAd[] = [
        { fornecedorId: 1, nomeFantasia: 'Fornecedor 1', fotoUrl: 'img1.jpg', whatsAppUrl: 'wa.me/1', detailUrl: '/f/1' },
        { fornecedorId: 2, nomeFantasia: 'Fornecedor 2', fotoUrl: 'img2.jpg', whatsAppUrl: 'wa.me/2', detailUrl: '/f/2' },
        { fornecedorId: 3, nomeFantasia: 'Fornecedor 3', fotoUrl: 'img3.jpg', whatsAppUrl: 'wa.me/3', detailUrl: '/f/3' },
        { fornecedorId: 4, nomeFantasia: 'Fornecedor 4', fotoUrl: 'img4.jpg', whatsAppUrl: 'wa.me/4', detailUrl: '/f/4' }
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CompetitorAdsComponent, RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(CompetitorAdsComponent);
        component = fixture.componentInstance;
    });

    describe('Display Logic', () => {
        it('should not render section when ads array is empty', () => {
            component.ads = [];
            fixture.detectChanges();

            const section = fixture.nativeElement.querySelector('section');
            expect(section).toBeNull();
        });

        it('should render section when ads are provided', () => {
            component.ads = mockAds;
            fixture.detectChanges();

            const section = fixture.nativeElement.querySelector('section');
            expect(section).toBeTruthy();
        });

        it('should limit display to maximum 3 competitor ads', () => {
            component.ads = mockAds; // 4 ads
            fixture.detectChanges();

            const cards = fixture.nativeElement.querySelectorAll('.group.bg-white');
            expect(cards.length).toBe(3);
        });
    });

    describe('Content Display', () => {
        beforeEach(() => {
            component.ads = mockAds;
            fixture.detectChanges();
        });

        it('should display competitor name', () => {
            const names = fixture.nativeElement.querySelectorAll('h4');
            expect(names[0].textContent.trim()).toBe('Fornecedor 1');
        });

        it('should include WhatsApp links with correct URLs', () => {
            const whatsappLinks = fixture.nativeElement.querySelectorAll('a[href^="wa.me"]');
            expect(whatsappLinks.length).toBeGreaterThan(0);
        });

        it('should include profile links', () => {
            const profileLinks = fixture.nativeElement.querySelectorAll('a[href*="/fornecedores/"]');
            expect(profileLinks.length).toBe(3);
        });
    });

    describe('Upgrade CTA', () => {
        it('should display upgrade CTA when ads are present', () => {
            component.ads = mockAds;
            fixture.detectChanges();

            const ctaLink = fixture.nativeElement.querySelector('a[href="/anuncie"]');
            expect(ctaLink).toBeTruthy();
            expect(ctaLink.textContent).toContain('Anuncie');
        });
    });

    describe('Accessibility', () => {
        beforeEach(() => {
            component.ads = mockAds;
            fixture.detectChanges();
        });

        it('should have aria-labels on WhatsApp buttons', () => {
            const whatsappLinks = fixture.nativeElement.querySelectorAll('a[href^="wa.me"]');
            whatsappLinks.forEach((link: HTMLAnchorElement) => {
                expect(link.getAttribute('aria-label')).toContain('Contatar');
            });
        });

        it('should have alt text on competitor images', () => {
            const images = fixture.nativeElement.querySelectorAll('img');
            images.forEach((img: HTMLImageElement, index: number) => {
                expect(img.alt).toBe(mockAds[index].nomeFantasia);
            });
        });
    });
});
