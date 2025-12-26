"use strict";
(self["webpackChunkguia_noivas"] = self["webpackChunkguia_noivas"] || []).push([[607],{

/***/ 4607:
/*!***********************************************************************!*\
  !*** ./src/app/features/painel/reset-password/reset-password-page.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResetPasswordPage: () => (/* binding */ ResetPasswordPage)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2596);
/* harmony import */ var _services_supplier_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/supplier.service */ 6972);








function ResetPasswordPage_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4)(1, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\u26A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.error());
  }
}
function ResetPasswordPage_Conditional_8_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 17)(1, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "For\u00E7a da senha:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("fraca", ctx_r0.getPasswordStrength() === "fraca")("media", ctx_r0.getPasswordStrength() === "m\u00E9dia")("forte", ctx_r0.getPasswordStrength() === "forte");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.getPasswordStrength(), " ");
  }
}
function ResetPasswordPage_Conditional_8_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.getFieldError("newPassword"));
  }
}
function ResetPasswordPage_Conditional_8_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.getFieldError("confirmPassword"));
  }
}
function ResetPasswordPage_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function ResetPasswordPage_Conditional_8_Template_form_ngSubmit_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.onSubmit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 12)(2, "label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Nova Senha");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ResetPasswordPage_Conditional_8_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.togglePasswordVisibility("password"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, ResetPasswordPage_Conditional_8_Conditional_8_Template, 5, 7, "div", 17)(9, ResetPasswordPage_Conditional_8_Conditional_9_Template, 2, 1, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 12)(11, "label", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Confirmar Nova Senha");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ResetPasswordPage_Conditional_8_Template_button_click_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.togglePasswordVisibility("confirm"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, ResetPasswordPage_Conditional_8_Conditional_17_Template, 2, 1, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 21)(19, "p", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "Requisitos da senha:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "ul")(22, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "\u2713 M\u00EDnimo 6 caracteres");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "\u2713 Recomendado: letras mai\u00FAsculas e min\u00FAsculas");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "\u2713 Recomendado: n\u00FAmeros e caracteres especiais");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r0.resetForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("invalid", ctx_r0.isFieldInvalid("newPassword"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("type", ctx_r0.showPassword() ? "text" : "password");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.showPassword() ? "\uD83D\uDC41\uFE0F" : "\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8\uFE0F", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](((tmp_5_0 = ctx_r0.resetForm.get("newPassword")) == null ? null : tmp_5_0.value) && !ctx_r0.isFieldInvalid("newPassword") ? 8 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx_r0.isFieldInvalid("newPassword") ? 9 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("invalid", ctx_r0.isFieldInvalid("confirmPassword"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("type", ctx_r0.showConfirmPassword() ? "text" : "password");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.showConfirmPassword() ? "\uD83D\uDC41\uFE0F" : "\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8\uFE0F", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx_r0.isFieldInvalid("confirmPassword") ? 17 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r0.isSubmitting() || ctx_r0.resetForm.invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.isSubmitting() ? "Redefinindo..." : "Redefinir Senha", " ");
  }
}
function ResetPasswordPage_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Token inv\u00E1lido ou n\u00E3o fornecido.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "a", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, " Solicitar Novo Link ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
let ResetPasswordPage = /*#__PURE__*/(() => {
  class ResetPasswordPage {
    fb;
    route;
    router;
    supplierService;
    resetForm;
    token = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(null);
    isSubmitting = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(false);
    error = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(null);
    showPassword = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(false);
    showConfirmPassword = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(false);
    constructor(fb, route, router, supplierService) {
      this.fb = fb;
      this.route = route;
      this.router = router;
      this.supplierService = supplierService;
      this.resetForm = this.fb.group({
        newPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.minLength(6)]],
        confirmPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]]
      });
    }
    ngOnInit() {
      const token = this.route.snapshot.queryParamMap.get('token');
      if (!token) {
        this.error.set('Token de recuperação não encontrado. Solicite um novo link de recuperação.');
      } else {
        this.token.set(token);
      }
    }
    onSubmit() {
      if (this.resetForm.invalid || !this.token()) {
        this.resetForm.markAllAsTouched();
        return;
      }
      const newPassword = this.resetForm.get('newPassword')?.value;
      const confirmPassword = this.resetForm.get('confirmPassword')?.value;
      // Validar senhas iguais
      if (newPassword !== confirmPassword) {
        this.error.set('As senhas não coincidem.');
        return;
      }
      this.isSubmitting.set(true);
      this.error.set(null);
      this.supplierService.resetPassword(this.token(), newPassword).subscribe({
        next: () => {
          alert('Senha redefinida com sucesso! Faça login com sua nova senha.');
          this.router.navigate(['/painel/login']);
        },
        error: err => {
          const message = err.error?.message || 'Erro ao redefinir senha. O token pode ter expirado.';
          this.error.set(message);
          this.isSubmitting.set(false);
          console.error('Erro ao redefinir senha:', err);
        }
      });
    }
    togglePasswordVisibility(field) {
      if (field === 'password') {
        this.showPassword.set(!this.showPassword());
      } else {
        this.showConfirmPassword.set(!this.showConfirmPassword());
      }
    }
    getPasswordStrength() {
      const password = this.resetForm.get('newPassword')?.value || '';
      if (password.length === 0) return '';
      if (password.length < 6) return 'fraca';
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^a-zA-Z0-9]/.test(password)) strength++;
      if (strength === 0) return 'fraca';
      if (strength <= 2) return 'média';
      return 'forte';
    }
    isFieldInvalid(fieldName) {
      const field = this.resetForm.get(fieldName);
      return !!(field && field.invalid && (field.dirty || field.touched));
    }
    getFieldError(fieldName) {
      const field = this.resetForm.get(fieldName);
      if (!field || !field.errors) return '';
      if (field.errors['required']) return 'Campo obrigatório';
      if (field.errors['minlength']) return 'Mínimo 6 caracteres';
      return '';
    }
    static ɵfac = function ResetPasswordPage_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ResetPasswordPage)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_supplier_service__WEBPACK_IMPORTED_MODULE_0__.SupplierService));
    };
    static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: ResetPasswordPage,
      selectors: [["app-reset-password"]],
      decls: 13,
      vars: 2,
      consts: [[1, "reset-password-page"], [1, "reset-password-container"], [1, "header"], [1, "subtitle"], [1, "alert", "alert-error"], [3, "formGroup"], [1, "no-token"], [1, "footer-links"], ["routerLink", "/painel/login", 1, "link"], [1, "icon"], [1, "message"], [3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "newPassword"], [1, "password-input-wrapper"], ["id", "newPassword", "formControlName", "newPassword", "placeholder", "M\u00EDnimo 6 caracteres", "autocomplete", "new-password", 3, "type"], ["type", "button", "tabindex", "-1", 1, "toggle-password", 3, "click"], [1, "password-strength"], [1, "error-message"], ["for", "confirmPassword"], ["id", "confirmPassword", "formControlName", "confirmPassword", "placeholder", "Digite novamente", "autocomplete", "new-password", 3, "type"], [1, "requirements-box"], [1, "requirements-title"], ["type", "submit", 1, "btn-primary", 3, "disabled"], [1, "label"], [1, "strength-indicator"], ["routerLink", "/painel/forgot-password", 1, "btn-secondary"]],
      template: function ResetPasswordPage_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Redefinir Senha");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, " Digite sua nova senha abaixo. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, ResetPasswordPage_Conditional_7_Template, 5, 1, "div", 4)(8, ResetPasswordPage_Conditional_8_Template, 30, 14, "form", 5)(9, ResetPasswordPage_Conditional_9_Template, 5, 0, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 7)(11, "a", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, " \u2190 Voltar para login ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx.error() ? 7 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx.token() ? 8 : 9);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink],
      styles: [".reset-password-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  padding: 2rem;\n}\n\n.reset-password-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);\n  padding: 3rem;\n  width: 100%;\n  max-width: 480px;\n}\n\n.header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 600;\n  color: #1a1a1a;\n  margin-bottom: 0.75rem;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.95rem;\n  margin: 0;\n}\n\n\n\n.alert[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem;\n  border-radius: 8px;\n  margin-bottom: 1.5rem;\n  display: flex;\n  gap: 0.75rem;\n  align-items: start;\n}\n\n.alert[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  flex-shrink: 0;\n}\n\n.alert[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%] {\n  flex: 1;\n  line-height: 1.5;\n  font-size: 0.95rem;\n}\n\n.alert-error[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  border: 1px solid #ffcdd2;\n  color: #c62828;\n}\n\n\n\nform[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  color: #333;\n  font-weight: 500;\n  font-size: 0.95rem;\n}\n\n.password-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.password-input-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.875rem 3rem 0.875rem 1rem;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  font-size: 1rem;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n\n.password-input-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n\n.password-input-wrapper[_ngcontent-%COMP%]   input.invalid[_ngcontent-%COMP%] {\n  border-color: #f44336;\n}\n\n.toggle-password[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: 1.25rem;\n  padding: 0.25rem;\n  opacity: 0.6;\n  transition: opacity 0.2s;\n}\n\n.toggle-password[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n.error-message[_ngcontent-%COMP%] {\n  display: block;\n  color: #f44336;\n  font-size: 0.85rem;\n  margin-top: 0.375rem;\n}\n\n\n\n.password-strength[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n  font-size: 0.85rem;\n}\n\n.password-strength[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: #666;\n}\n\n.strength-indicator[_ngcontent-%COMP%] {\n  padding: 0.125rem 0.5rem;\n  border-radius: 4px;\n  font-weight: 500;\n}\n\n.strength-indicator.fraca[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n}\n\n.strength-indicator.media[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #f57c00;\n}\n\n.strength-indicator.forte[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n\n\n\n.requirements-box[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  border-radius: 8px;\n  padding: 1rem 1.25rem;\n  margin-bottom: 1.5rem;\n}\n\n.requirements-title[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: #333;\n  margin: 0 0 0.5rem 0;\n}\n\n.requirements-box[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n.requirements-box[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #666;\n  margin: 0.25rem 0;\n}\n\n\n\n.btn-primary[_ngcontent-%COMP%] {\n  width: 100%;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 1rem 1.5rem;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);\n}\n\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  display: inline-block;\n  background: white;\n  color: #667eea;\n  border: 2px solid #667eea;\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  font-weight: 500;\n  text-decoration: none;\n  transition: all 0.2s;\n}\n\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #667eea;\n  color: white;\n}\n\n\n\n.no-token[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem 0;\n}\n\n.no-token[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  margin-bottom: 1.5rem;\n  font-size: 1rem;\n}\n\n\n\n.footer-links[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 1.5rem;\n}\n\n.link[_ngcontent-%COMP%] {\n  color: #667eea;\n  text-decoration: none;\n  font-size: 0.95rem;\n  transition: color 0.2s;\n}\n\n.link[_ngcontent-%COMP%]:hover {\n  color: #764ba2;\n  text-decoration: underline;\n}\n\n\n\n@media (max-width: 576px) {\n  .reset-password-page[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .reset-password-container[_ngcontent-%COMP%] {\n    padding: 2rem 1.5rem;\n  }\n\n  .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n\n  .subtitle[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2V0LXBhc3N3b3JkLXBhZ2UuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLDZEQUE2RDtFQUM3RCxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLDBDQUEwQztFQUMxQyxhQUFhO0VBQ2IsV0FBVztFQUNYLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLFNBQVM7QUFDWDs7QUFFQSxXQUFXO0FBQ1g7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixhQUFhO0VBQ2IsWUFBWTtFQUNaLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsT0FBTztFQUNQLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIseUJBQXlCO0VBQ3pCLGNBQWM7QUFDaEI7O0FBRUEsU0FBUztBQUNUO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsY0FBYztFQUNkLHFCQUFxQjtFQUNyQixXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxvQ0FBb0M7RUFDcEMsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsOENBQThDO0FBQ2hEOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQiw4Q0FBOEM7QUFDaEQ7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsY0FBYztFQUNkLFFBQVE7RUFDUiwyQkFBMkI7RUFDM0IsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsY0FBYztFQUNkLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsb0JBQW9CO0FBQ3RCOztBQUVBLHNCQUFzQjtBQUN0QjtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsY0FBYztBQUNoQjs7QUFFQSxxQkFBcUI7QUFDckI7RUFDRSxtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsVUFBVTtFQUNWLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsaUJBQWlCO0FBQ25COztBQUVBLFlBQVk7QUFDWjtFQUNFLFdBQVc7RUFDWCw2REFBNkQ7RUFDN0QsWUFBWTtFQUNaLFlBQVk7RUFDWixvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLDJDQUEyQztBQUM3Qzs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQiwrQ0FBK0M7QUFDakQ7O0FBRUE7RUFDRSxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCx5QkFBeUI7RUFDekIsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLHFCQUFxQjtFQUNyQixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsWUFBWTtBQUNkOztBQUVBLG1CQUFtQjtBQUNuQjtFQUNFLGtCQUFrQjtFQUNsQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztFQUNYLHFCQUFxQjtFQUNyQixlQUFlO0FBQ2pCOztBQUVBLGlCQUFpQjtBQUNqQjtFQUNFLGtCQUFrQjtFQUNsQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsMEJBQTBCO0FBQzVCOztBQUVBLHNCQUFzQjtBQUN0QjtFQUNFO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0Usb0JBQW9CO0VBQ3RCOztFQUVBO0lBQ0UsaUJBQWlCO0VBQ25COztFQUVBO0lBQ0UsaUJBQWlCO0VBQ25CO0FBQ0YiLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQtcGFnZS5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucmVzZXQtcGFzc3dvcmQtcGFnZSB7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKTtcbiAgcGFkZGluZzogMnJlbTtcbn1cblxuLnJlc2V0LXBhc3N3b3JkLWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBib3gtc2hhZG93OiAwIDEwcHggNDBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIHBhZGRpbmc6IDNyZW07XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDQ4MHB4O1xufVxuXG4uaGVhZGVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAycmVtO1xufVxuXG4uaGVhZGVyIGgxIHtcbiAgZm9udC1zaXplOiAycmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzFhMWExYTtcbiAgbWFyZ2luLWJvdHRvbTogMC43NXJlbTtcbn1cblxuLnN1YnRpdGxlIHtcbiAgY29sb3I6ICM2NjY7XG4gIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgbWFyZ2luOiAwO1xufVxuXG4vKiBBbGVydHMgKi9cbi5hbGVydCB7XG4gIHBhZGRpbmc6IDFyZW0gMS4yNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMC43NXJlbTtcbiAgYWxpZ24taXRlbXM6IHN0YXJ0O1xufVxuXG4uYWxlcnQgLmljb24ge1xuICBmb250LXNpemU6IDEuMjVyZW07XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4uYWxlcnQgLm1lc3NhZ2Uge1xuICBmbGV4OiAxO1xuICBsaW5lLWhlaWdodDogMS41O1xuICBmb250LXNpemU6IDAuOTVyZW07XG59XG5cbi5hbGVydC1lcnJvciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmViZWU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmZmNkZDI7XG4gIGNvbG9yOiAjYzYyODI4O1xufVxuXG4vKiBGb3JtICovXG5mb3JtIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xufVxuXG4uZm9ybS1ncm91cCB7XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbn1cblxuLmZvcm0tZ3JvdXAgbGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICBjb2xvcjogIzMzMztcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAwLjk1cmVtO1xufVxuXG4ucGFzc3dvcmQtaW5wdXQtd3JhcHBlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnBhc3N3b3JkLWlucHV0LXdyYXBwZXIgaW5wdXQge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMC44NzVyZW0gM3JlbSAwLjg3NXJlbSAxcmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMnMsIGJveC1zaGFkb3cgMC4ycztcbn1cblxuLnBhc3N3b3JkLWlucHV0LXdyYXBwZXIgaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXItY29sb3I6ICM2NjdlZWE7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuMSk7XG59XG5cbi5wYXNzd29yZC1pbnB1dC13cmFwcGVyIGlucHV0LmludmFsaWQge1xuICBib3JkZXItY29sb3I6ICNmNDQzMzY7XG59XG5cbi50b2dnbGUtcGFzc3dvcmQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwLjc1cmVtO1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xuICBwYWRkaW5nOiAwLjI1cmVtO1xuICBvcGFjaXR5OiAwLjY7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycztcbn1cblxuLnRvZ2dsZS1wYXNzd29yZDpob3ZlciB7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi5lcnJvci1tZXNzYWdlIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGNvbG9yOiAjZjQ0MzM2O1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIG1hcmdpbi10b3A6IDAuMzc1cmVtO1xufVxuXG4vKiBQYXNzd29yZCBTdHJlbmd0aCAqL1xuLnBhc3N3b3JkLXN0cmVuZ3RoIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjVyZW07XG4gIG1hcmdpbi10b3A6IDAuNXJlbTtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xufVxuXG4ucGFzc3dvcmQtc3RyZW5ndGggLmxhYmVsIHtcbiAgY29sb3I6ICM2NjY7XG59XG5cbi5zdHJlbmd0aC1pbmRpY2F0b3Ige1xuICBwYWRkaW5nOiAwLjEyNXJlbSAwLjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLnN0cmVuZ3RoLWluZGljYXRvci5mcmFjYSB7XG4gIGJhY2tncm91bmQ6ICNmZmViZWU7XG4gIGNvbG9yOiAjYzYyODI4O1xufVxuXG4uc3RyZW5ndGgtaW5kaWNhdG9yLm1lZGlhIHtcbiAgYmFja2dyb3VuZDogI2ZmZjNlMDtcbiAgY29sb3I6ICNmNTdjMDA7XG59XG5cbi5zdHJlbmd0aC1pbmRpY2F0b3IuZm9ydGUge1xuICBiYWNrZ3JvdW5kOiAjZThmNWU5O1xuICBjb2xvcjogIzJlN2QzMjtcbn1cblxuLyogUmVxdWlyZW1lbnRzIEJveCAqL1xuLnJlcXVpcmVtZW50cy1ib3gge1xuICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIHBhZGRpbmc6IDFyZW0gMS4yNXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xufVxuXG4ucmVxdWlyZW1lbnRzLXRpdGxlIHtcbiAgZm9udC1zaXplOiAwLjlyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGNvbG9yOiAjMzMzO1xuICBtYXJnaW46IDAgMCAwLjVyZW0gMDtcbn1cblxuLnJlcXVpcmVtZW50cy1ib3ggdWwge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG59XG5cbi5yZXF1aXJlbWVudHMtYm94IGxpIHtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xuICBjb2xvcjogIzY2NjtcbiAgbWFyZ2luOiAwLjI1cmVtIDA7XG59XG5cbi8qIEJ1dHRvbnMgKi9cbi5idG4tcHJpbWFyeSB7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjY3ZWVhIDAlLCAjNzY0YmEyIDEwMCUpO1xuICBjb2xvcjogd2hpdGU7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogMXJlbSAxLjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBmb250LXdlaWdodDogNTAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzLCBib3gtc2hhZG93IDAuMnM7XG59XG5cbi5idG4tcHJpbWFyeTpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYm94LXNoYWRvdzogMCA2cHggMjBweCByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuNCk7XG59XG5cbi5idG4tcHJpbWFyeTpkaXNhYmxlZCB7XG4gIG9wYWNpdHk6IDAuNjtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgdHJhbnNmb3JtOiBub25lO1xufVxuXG4uYnRuLXNlY29uZGFyeSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGNvbG9yOiAjNjY3ZWVhO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNjY3ZWVhO1xuICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBmb250LXNpemU6IDAuOTVyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XG59XG5cbi5idG4tc2Vjb25kYXJ5OmhvdmVyIHtcbiAgYmFja2dyb3VuZDogIzY2N2VlYTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4vKiBObyBUb2tlbiBTdGF0ZSAqL1xuLm5vLXRva2VuIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAycmVtIDA7XG59XG5cbi5uby10b2tlbiBwIHtcbiAgY29sb3I6ICM2NjY7XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4vKiBGb290ZXIgTGlua3MgKi9cbi5mb290ZXItbGlua3Mge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDEuNXJlbTtcbn1cblxuLmxpbmsge1xuICBjb2xvcjogIzY2N2VlYTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBmb250LXNpemU6IDAuOTVyZW07XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMnM7XG59XG5cbi5saW5rOmhvdmVyIHtcbiAgY29sb3I6ICM3NjRiYTI7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufVxuXG4vKiBNb2JpbGUgUmVzcG9uc2l2ZSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDU3NnB4KSB7XG4gIC5yZXNldC1wYXNzd29yZC1wYWdlIHtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICB9XG5cbiAgLnJlc2V0LXBhc3N3b3JkLWNvbnRhaW5lciB7XG4gICAgcGFkZGluZzogMnJlbSAxLjVyZW07XG4gIH1cblxuICAuaGVhZGVyIGgxIHtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgfVxuXG4gIC5zdWJ0aXRsZSB7XG4gICAgZm9udC1zaXplOiAwLjlyZW07XG4gIH1cbn1cbiJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvcGFpbmVsL3Jlc2V0LXBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkLXBhZ2UuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLDZEQUE2RDtFQUM3RCxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLDBDQUEwQztFQUMxQyxhQUFhO0VBQ2IsV0FBVztFQUNYLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLFNBQVM7QUFDWDs7QUFFQSxXQUFXO0FBQ1g7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixhQUFhO0VBQ2IsWUFBWTtFQUNaLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsT0FBTztFQUNQLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIseUJBQXlCO0VBQ3pCLGNBQWM7QUFDaEI7O0FBRUEsU0FBUztBQUNUO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsY0FBYztFQUNkLHFCQUFxQjtFQUNyQixXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxvQ0FBb0M7RUFDcEMsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsOENBQThDO0FBQ2hEOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQiw4Q0FBOEM7QUFDaEQ7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsY0FBYztFQUNkLFFBQVE7RUFDUiwyQkFBMkI7RUFDM0IsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsY0FBYztFQUNkLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsb0JBQW9CO0FBQ3RCOztBQUVBLHNCQUFzQjtBQUN0QjtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsY0FBYztBQUNoQjs7QUFFQSxxQkFBcUI7QUFDckI7RUFDRSxtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsVUFBVTtFQUNWLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsaUJBQWlCO0FBQ25COztBQUVBLFlBQVk7QUFDWjtFQUNFLFdBQVc7RUFDWCw2REFBNkQ7RUFDN0QsWUFBWTtFQUNaLFlBQVk7RUFDWixvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLDJDQUEyQztBQUM3Qzs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQiwrQ0FBK0M7QUFDakQ7O0FBRUE7RUFDRSxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCx5QkFBeUI7RUFDekIsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLHFCQUFxQjtFQUNyQixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsWUFBWTtBQUNkOztBQUVBLG1CQUFtQjtBQUNuQjtFQUNFLGtCQUFrQjtFQUNsQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztFQUNYLHFCQUFxQjtFQUNyQixlQUFlO0FBQ2pCOztBQUVBLGlCQUFpQjtBQUNqQjtFQUNFLGtCQUFrQjtFQUNsQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsMEJBQTBCO0FBQzVCOztBQUVBLHNCQUFzQjtBQUN0QjtFQUNFO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0Usb0JBQW9CO0VBQ3RCOztFQUVBO0lBQ0UsaUJBQWlCO0VBQ25COztFQUVBO0lBQ0UsaUJBQWlCO0VBQ25CO0FBQ0Y7O0FBRUEsd3lTQUF3eVMiLCJzb3VyY2VzQ29udGVudCI6WyIucmVzZXQtcGFzc3dvcmQtcGFnZSB7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKTtcbiAgcGFkZGluZzogMnJlbTtcbn1cblxuLnJlc2V0LXBhc3N3b3JkLWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBib3gtc2hhZG93OiAwIDEwcHggNDBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIHBhZGRpbmc6IDNyZW07XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDQ4MHB4O1xufVxuXG4uaGVhZGVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAycmVtO1xufVxuXG4uaGVhZGVyIGgxIHtcbiAgZm9udC1zaXplOiAycmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzFhMWExYTtcbiAgbWFyZ2luLWJvdHRvbTogMC43NXJlbTtcbn1cblxuLnN1YnRpdGxlIHtcbiAgY29sb3I6ICM2NjY7XG4gIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgbWFyZ2luOiAwO1xufVxuXG4vKiBBbGVydHMgKi9cbi5hbGVydCB7XG4gIHBhZGRpbmc6IDFyZW0gMS4yNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMC43NXJlbTtcbiAgYWxpZ24taXRlbXM6IHN0YXJ0O1xufVxuXG4uYWxlcnQgLmljb24ge1xuICBmb250LXNpemU6IDEuMjVyZW07XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4uYWxlcnQgLm1lc3NhZ2Uge1xuICBmbGV4OiAxO1xuICBsaW5lLWhlaWdodDogMS41O1xuICBmb250LXNpemU6IDAuOTVyZW07XG59XG5cbi5hbGVydC1lcnJvciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmViZWU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmZmNkZDI7XG4gIGNvbG9yOiAjYzYyODI4O1xufVxuXG4vKiBGb3JtICovXG5mb3JtIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xufVxuXG4uZm9ybS1ncm91cCB7XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbn1cblxuLmZvcm0tZ3JvdXAgbGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICBjb2xvcjogIzMzMztcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAwLjk1cmVtO1xufVxuXG4ucGFzc3dvcmQtaW5wdXQtd3JhcHBlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnBhc3N3b3JkLWlucHV0LXdyYXBwZXIgaW5wdXQge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMC44NzVyZW0gM3JlbSAwLjg3NXJlbSAxcmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMnMsIGJveC1zaGFkb3cgMC4ycztcbn1cblxuLnBhc3N3b3JkLWlucHV0LXdyYXBwZXIgaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXItY29sb3I6ICM2NjdlZWE7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuMSk7XG59XG5cbi5wYXNzd29yZC1pbnB1dC13cmFwcGVyIGlucHV0LmludmFsaWQge1xuICBib3JkZXItY29sb3I6ICNmNDQzMzY7XG59XG5cbi50b2dnbGUtcGFzc3dvcmQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwLjc1cmVtO1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xuICBwYWRkaW5nOiAwLjI1cmVtO1xuICBvcGFjaXR5OiAwLjY7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycztcbn1cblxuLnRvZ2dsZS1wYXNzd29yZDpob3ZlciB7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi5lcnJvci1tZXNzYWdlIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGNvbG9yOiAjZjQ0MzM2O1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIG1hcmdpbi10b3A6IDAuMzc1cmVtO1xufVxuXG4vKiBQYXNzd29yZCBTdHJlbmd0aCAqL1xuLnBhc3N3b3JkLXN0cmVuZ3RoIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjVyZW07XG4gIG1hcmdpbi10b3A6IDAuNXJlbTtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xufVxuXG4ucGFzc3dvcmQtc3RyZW5ndGggLmxhYmVsIHtcbiAgY29sb3I6ICM2NjY7XG59XG5cbi5zdHJlbmd0aC1pbmRpY2F0b3Ige1xuICBwYWRkaW5nOiAwLjEyNXJlbSAwLjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLnN0cmVuZ3RoLWluZGljYXRvci5mcmFjYSB7XG4gIGJhY2tncm91bmQ6ICNmZmViZWU7XG4gIGNvbG9yOiAjYzYyODI4O1xufVxuXG4uc3RyZW5ndGgtaW5kaWNhdG9yLm1lZGlhIHtcbiAgYmFja2dyb3VuZDogI2ZmZjNlMDtcbiAgY29sb3I6ICNmNTdjMDA7XG59XG5cbi5zdHJlbmd0aC1pbmRpY2F0b3IuZm9ydGUge1xuICBiYWNrZ3JvdW5kOiAjZThmNWU5O1xuICBjb2xvcjogIzJlN2QzMjtcbn1cblxuLyogUmVxdWlyZW1lbnRzIEJveCAqL1xuLnJlcXVpcmVtZW50cy1ib3gge1xuICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIHBhZGRpbmc6IDFyZW0gMS4yNXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xufVxuXG4ucmVxdWlyZW1lbnRzLXRpdGxlIHtcbiAgZm9udC1zaXplOiAwLjlyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGNvbG9yOiAjMzMzO1xuICBtYXJnaW46IDAgMCAwLjVyZW0gMDtcbn1cblxuLnJlcXVpcmVtZW50cy1ib3ggdWwge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG59XG5cbi5yZXF1aXJlbWVudHMtYm94IGxpIHtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xuICBjb2xvcjogIzY2NjtcbiAgbWFyZ2luOiAwLjI1cmVtIDA7XG59XG5cbi8qIEJ1dHRvbnMgKi9cbi5idG4tcHJpbWFyeSB7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjY3ZWVhIDAlLCAjNzY0YmEyIDEwMCUpO1xuICBjb2xvcjogd2hpdGU7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogMXJlbSAxLjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBmb250LXdlaWdodDogNTAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzLCBib3gtc2hhZG93IDAuMnM7XG59XG5cbi5idG4tcHJpbWFyeTpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYm94LXNoYWRvdzogMCA2cHggMjBweCByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuNCk7XG59XG5cbi5idG4tcHJpbWFyeTpkaXNhYmxlZCB7XG4gIG9wYWNpdHk6IDAuNjtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgdHJhbnNmb3JtOiBub25lO1xufVxuXG4uYnRuLXNlY29uZGFyeSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGNvbG9yOiAjNjY3ZWVhO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNjY3ZWVhO1xuICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBmb250LXNpemU6IDAuOTVyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XG59XG5cbi5idG4tc2Vjb25kYXJ5OmhvdmVyIHtcbiAgYmFja2dyb3VuZDogIzY2N2VlYTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4vKiBObyBUb2tlbiBTdGF0ZSAqL1xuLm5vLXRva2VuIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAycmVtIDA7XG59XG5cbi5uby10b2tlbiBwIHtcbiAgY29sb3I6ICM2NjY7XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4vKiBGb290ZXIgTGlua3MgKi9cbi5mb290ZXItbGlua3Mge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDEuNXJlbTtcbn1cblxuLmxpbmsge1xuICBjb2xvcjogIzY2N2VlYTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBmb250LXNpemU6IDAuOTVyZW07XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMnM7XG59XG5cbi5saW5rOmhvdmVyIHtcbiAgY29sb3I6ICM3NjRiYTI7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufVxuXG4vKiBNb2JpbGUgUmVzcG9uc2l2ZSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDU3NnB4KSB7XG4gIC5yZXNldC1wYXNzd29yZC1wYWdlIHtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICB9XG5cbiAgLnJlc2V0LXBhc3N3b3JkLWNvbnRhaW5lciB7XG4gICAgcGFkZGluZzogMnJlbSAxLjVyZW07XG4gIH1cblxuICAuaGVhZGVyIGgxIHtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgfVxuXG4gIC5zdWJ0aXRsZSB7XG4gICAgZm9udC1zaXplOiAwLjlyZW07XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
      changeDetection: 0
    });
  }
  return ResetPasswordPage;
})();

/***/ })

}]);
//# sourceMappingURL=607.js.map