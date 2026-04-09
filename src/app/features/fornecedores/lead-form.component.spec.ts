import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { LeadFormComponent } from './lead-form.component';
import { LeadService } from '../../core/services/lead.service';

describe('LeadFormComponent', () => {
    let component: LeadFormComponent;
    let fixture: ComponentFixture<LeadFormComponent>;
    let mockLeadService: jasmine.SpyObj<LeadService>;

    beforeEach(async () => {
        mockLeadService = jasmine.createSpyObj('LeadService', ['submitLead']);
        mockLeadService.submitLead.and.returnValue(of({ success: true, message: 'Lead enviado!', leadId: 123 }));

        await TestBed.configureTestingModule({
            imports: [
                LeadFormComponent,
                ReactiveFormsModule,
                RouterTestingModule
            ],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: LeadService, useValue: mockLeadService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LeadFormComponent);
        component = fixture.componentInstance;
        component.fornecedorId = '123';
        fixture.detectChanges();
    });

    describe('Form Validation', () => {
        it('should require clienteName with min 3 characters', () => {
            const control = component.form.get('clienteName');

            control?.setValue('');
            expect(control?.valid).toBeFalse();

            control?.setValue('AB');
            expect(control?.valid).toBeFalse();

            control?.setValue('ABC');
            expect(control?.valid).toBeTrue();
        });

        it('should validate Brazilian phone format for WhatsApp field', () => {
            const control = component.form.get('clientePhone');

            // Invalid formats
            control?.setValue('12345');
            expect(control?.valid).toBeFalse();

            // Valid formats
            control?.setValue('99999-9999');
            expect(control?.valid).toBeTrue();

            control?.setValue('(11) 99999-9999');
            expect(control?.valid).toBeTrue();

            control?.setValue('(11)99999-9999');
            expect(control?.valid).toBeTrue();

            control?.setValue('999999999');
            expect(control?.valid).toBeTrue();
        });

        it('should require eventDate', () => {
            const control = component.form.get('eventDate');

            control?.setValue('');
            expect(control?.valid).toBeFalse();

            control?.setValue('2024-12-25');
            expect(control?.valid).toBeTrue();
        });

        it('should require lgpdConsent to be true', () => {
            const control = component.form.get('lgpdConsent');

            control?.setValue(false);
            expect(control?.valid).toBeFalse();

            control?.setValue(true);
            expect(control?.valid).toBeTrue();
        });

        it('should NOT have email or message fields', () => {
            expect(component.form.get('clienteEmail')).toBeNull();
            expect(component.form.get('message')).toBeNull();
        });
    });

    describe('Form Submission', () => {
        beforeEach(() => {
            // Fill form with valid data (3 fields only)
            component.form.patchValue({
                clienteName: 'Maria Silva',
                clientePhone: '(11) 99999-8888',
                eventDate: '2024-12-25',
                lgpdConsent: true
            });
        });

        it('should submit valid form successfully', () => {
            component.onSubmit();

            expect(mockLeadService.submitLead).toHaveBeenCalledWith('123', jasmine.any(Object));
            expect(component.successMessage()).toBe('Lead enviado!');
            expect(component.isSubmitting()).toBeFalse();
        });

        it('should show error message on submission failure', () => {
            mockLeadService.submitLead.and.returnValue(throwError(() => ({ error: { message: 'Erro no servidor' } })));

            component.onSubmit();

            expect(component.errorMessage()).toBe('Erro no servidor');
            expect(component.isSubmitting()).toBeFalse();
        });

        it('should not submit if form is invalid', () => {
            component.form.patchValue({ clienteName: '' });

            component.onSubmit();

            expect(mockLeadService.submitLead).not.toHaveBeenCalled();
        });

        it('should emit submitSuccess event on success', () => {
            spyOn(component.submitSuccess, 'emit');

            component.onSubmit();

            expect(component.submitSuccess.emit).toHaveBeenCalledWith(123);
        });
    });

    describe('Compact Mode (WhatsApp modal)', () => {
        let compactFixture: ComponentFixture<LeadFormComponent>;
        let compactComponent: LeadFormComponent;

        beforeEach(() => {
            compactFixture = TestBed.createComponent(LeadFormComponent);
            compactComponent = compactFixture.componentInstance;
            compactComponent.fornecedorId = '456';
            compactComponent.compact = true;
            compactFixture.detectChanges(); // triggers ngOnInit
        });

        it('should clear eventDate validators in compact mode', () => {
            const control = compactComponent.form.get('eventDate');
            control?.setValue('');
            expect(control?.valid).toBeTrue();
        });

        it('should auto-set lgpdConsent to true in compact mode', () => {
            const control = compactComponent.form.get('lgpdConsent');
            expect(control?.value).toBeTrue();
            expect(control?.valid).toBeTrue();
        });

        it('should be valid with only name and phone in compact mode', () => {
            compactComponent.form.patchValue({
                clienteName: 'Maria Silva',
                clientePhone: '(11) 99999-8888'
            });
            expect(compactComponent.form.valid).toBeTrue();
        });

        it('should submit successfully in compact mode with just name and phone', () => {
            compactComponent.form.patchValue({
                clienteName: 'Maria Silva',
                clientePhone: '(11) 99999-8888'
            });
            compactComponent.onSubmit();
            expect(mockLeadService.submitLead).toHaveBeenCalledWith('456', jasmine.any(Object));
        });
    });
});
