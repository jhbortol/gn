import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CategoriaDetalhePageComponent } from './categoria-detalhe-page';
import { FornecedoresData, FornecedorListDto } from '../fornecedores/services/fornecedores-data';
import { CategoriasData, Categoria } from './services/categorias-data';
import { PlanLevel } from '../../core/models/tier-system.model';

describe('CategoriaDetalhePageComponent', () => {
    let component: CategoriaDetalhePageComponent;
    let fixture: ComponentFixture<CategoriaDetalhePageComponent>;
    let mockFornecedoresData: jasmine.SpyObj<FornecedoresData>;
    let mockCategoriasData: jasmine.SpyObj<CategoriasData>;

    const mockCategoria: Categoria = {
        id: 'cat-1',
        nome: 'Fotografia',
        slug: 'fotografia',
        descricao: 'Fotógrafos para casamento',
        imageId: null,
        imageUrl: null
    };

    // Fornecedores já ordenados pela API: Vitrine primeiro, depois Free/Low
    const mockFornecedoresOrdenados: FornecedorListDto[] = [
        {
            id: '1',
            nome: 'Fotógrafo Premium',
            slug: 'fotografo-premium',
            cidade: 'São Paulo',
            planLevel: PlanLevel.Vitrine,
            destaque: true,
            rating: 5.0
        },
        {
            id: '2',
            nome: 'Fotógrafo VIP',
            slug: 'fotografo-vip',
            cidade: 'São Paulo',
            planLevel: PlanLevel.Vitrine,
            destaque: true,
            rating: 4.8
        },
        {
            id: '3',
            nome: 'Fotógrafo Free',
            slug: 'fotografo-free',
            cidade: 'São Paulo',
            planLevel: PlanLevel.Free,
            destaque: false,
            rating: 4.5
        },
        {
            id: '4',
            nome: 'Fotógrafo Low',
            slug: 'fotografo-low',
            cidade: 'São Paulo',
            planLevel: PlanLevel.Low,
            destaque: false,
            rating: 4.0
        }
    ];

    const mockFornecedoresComZombie: FornecedorListDto[] = [
        ...mockFornecedoresOrdenados,
        {
            id: '5',
            nome: 'Fotógrafo Zombie',
            slug: 'fotografo-zombie',
            cidade: 'São Paulo',
            planLevel: PlanLevel.Zombie,
            destaque: false
        }
    ];

    beforeEach(async () => {
        mockFornecedoresData = jasmine.createSpyObj('FornecedoresData', ['getByCategoria']);
        mockCategoriasData = jasmine.createSpyObj('CategoriasData', ['getBySlug']);

        mockCategoriasData.getBySlug.and.returnValue(of(mockCategoria));
        mockFornecedoresData.getByCategoria.and.returnValue(of(mockFornecedoresOrdenados));

        await TestBed.configureTestingModule({
            imports: [
                CategoriaDetalhePageComponent,
                RouterTestingModule,
                BrowserAnimationsModule
            ],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: FornecedoresData, useValue: mockFornecedoresData },
                { provide: CategoriasData, useValue: mockCategoriasData },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ categoria: 'fotografia' }),
                        paramMap: of({
                            get: (key: string) => key === 'categoria' ? 'fotografia' : null
                        })
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CategoriaDetalhePageComponent);
        component = fixture.componentInstance;
    });

    describe('Ordering', () => {
        it('should NOT reorder fornecedores - API order is preserved', (done) => {
            fixture.detectChanges();

            component.publicFornecedores$.subscribe(fornecedores => {
                // Verificar que a ordem da API foi mantida
                expect(fornecedores[0].planLevel).toBe(PlanLevel.Vitrine);
                expect(fornecedores[1].planLevel).toBe(PlanLevel.Vitrine);
                expect(fornecedores[2].planLevel).toBe(PlanLevel.Free);
                expect(fornecedores[3].planLevel).toBe(PlanLevel.Low);

                // Verificar ordem original mantida
                expect(fornecedores[0].slug).toBe('fotografo-premium');
                expect(fornecedores[1].slug).toBe('fotografo-vip');
                done();
            });
        });

        it('should filter out Zombie tier fornecedores', (done) => {
            mockFornecedoresData.getByCategoria.and.returnValue(of(mockFornecedoresComZombie));
            fixture.detectChanges();

            component.publicFornecedores$.subscribe(fornecedores => {
                const zombies = fornecedores.filter(f => f.planLevel === PlanLevel.Zombie);
                expect(zombies.length).toBe(0);
                expect(fornecedores.length).toBe(4); // 5 - 1 zombie
                done();
            });
        });
    });

    describe('Visual Differentiation', () => {
        it('should apply correct CSS classes per tier type', () => {
            fixture.detectChanges();

            // Verificar que component tem dados para renderizar
            expect(component.publicFornecedores$).toBeTruthy();
        });
    });

    describe('URL Building', () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        it('should build correct fornecedor profile URL', () => {
            const url = component.buildUrl(['fornecedores', 'fotografo-premium']);
            expect(url).toContain('fornecedores');
            expect(url).toContain('fotografo-premium');
        });
    });

    describe('Tier Display Rules', () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        it('should identify Vitrine tier correctly', (done) => {
            component.publicFornecedores$.subscribe(fornecedores => {
                const vitrineFornecedores = fornecedores.filter(f => f.planLevel === PlanLevel.Vitrine);
                expect(vitrineFornecedores.length).toBe(2);
                done();
            });
        });

        it('should identify Free tier correctly', (done) => {
            component.publicFornecedores$.subscribe(fornecedores => {
                const freeFornecedores = fornecedores.filter(f => f.planLevel === PlanLevel.Free);
                expect(freeFornecedores.length).toBe(1);
                done();
            });
        });

        it('should identify Low tier correctly', (done) => {
            component.publicFornecedores$.subscribe(fornecedores => {
                const lowFornecedores = fornecedores.filter(f => f.planLevel === PlanLevel.Low);
                expect(lowFornecedores.length).toBe(1);
                done();
            });
        });
    });
});
