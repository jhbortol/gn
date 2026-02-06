import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
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
                ReactiveFormsModule
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

        it('should require valid email format', () => {
            const control = component.form.get('clienteEmail');

            control?.setValue('invalid');
            expect(control?.valid).toBeFalse();

            control?.setValue('valid@email.com');
            expect(control?.valid).toBeTrue();
        });

        it('should validate Brazilian phone format', () => {
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

        it('should require message with min 10 characters', () => {
            const control = component.form.get('message');

            control?.setValue('short');
            expect(control?.valid).toBeFalse();

            control?.setValue('This is a valid message');
            expect(control?.valid).toBeTrue();
        });
    });

    describe('Form Submission', () => {
        beforeEach(() => {
            // Fill form with valid data
            component.form.patchValue({
                clienteName: 'Maria Silva',
                clienteEmail: 'maria@email.com',
                clientePhone: '(11) 99999-8888',
                message: 'Gostaria de mais informações sobre o serviço',
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

    describe('Field Validation Display', () => {
        it('should return true for invalid and touched field', () => {
            const control = component.form.get('clienteName');
            control?.setValue('');
            control?.markAsTouched();

            expect(component.isFieldInvalid('clienteName')).toBeTrue();
        });

        it('should return false for valid field', () => {
            const control = component.form.get('clienteName');
            control?.setValue('Valid Name');

            expect(component.isFieldInvalid('clienteName')).toBeFalse();
        });
    });
});
