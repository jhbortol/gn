"use strict";
(self["webpackChunkguia_noivas"] = self["webpackChunkguia_noivas"] || []).push([[479],{

/***/ 7479:
/*!*********************************************************************!*\
  !*** ./src/app/features/painel/alterar-senha/alterar-senha-page.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlterarSenhaPage: () => (/* binding */ AlterarSenhaPage)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _services_supplier_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/supplier.service */ 6972);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2596);







function AlterarSenhaPage_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 3)(1, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\u2713");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AlterarSenhaPage_Conditional_6_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.successMessage.set(null));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.successMessage());
  }
}
function AlterarSenhaPage_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4)(1, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\u26A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AlterarSenhaPage_Conditional_7_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.error.set(null));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.error());
  }
}
function AlterarSenhaPage_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.getFieldError("currentPassword"));
  }
}
function AlterarSenhaPage_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 16)(1, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "For\u00E7a da senha:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("fraca", ctx_r1.getPasswordStrength() === "fraca")("media", ctx_r1.getPasswordStrength() === "m\u00E9dia")("forte", ctx_r1.getPasswordStrength() === "forte");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r1.getPasswordStrength(), " ");
  }
}
function AlterarSenhaPage_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.getFieldError("newPassword"));
  }
}
function AlterarSenhaPage_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.getFieldError("confirmPassword"));
  }
}
let AlterarSenhaPage = /*#__PURE__*/(() => {
  class AlterarSenhaPage {
    fb;
    supplierService;
    router;
    changePasswordForm;
    isSubmitting = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(false);
    successMessage = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(null);
    error = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(null);
    showCurrentPassword = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(false);
    showNewPassword = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(false);
    showConfirmPassword = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(false);
    constructor(fb, supplierService, router) {
      this.fb = fb;
      this.supplierService = supplierService;
      this.router = router;
      this.changePasswordForm = this.fb.group({
        currentPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]],
        newPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.minLength(6)]],
        confirmPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required]]
      });
    }
    onSubmit() {
      if (this.changePasswordForm.invalid) {
        this.changePasswordForm.markAllAsTouched();
        return;
      }
      const currentPassword = this.changePasswordForm.get('currentPassword')?.value;
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      const confirmPassword = this.changePasswordForm.get('confirmPassword')?.value;
      // Validar senhas iguais
      if (newPassword !== confirmPassword) {
        this.error.set('A nova senha e a confirmação não coincidem.');
        return;
      }
      this.isSubmitting.set(true);
      this.error.set(null);
      this.successMessage.set(null);
      this.supplierService.changePassword(currentPassword, newPassword).subscribe({
        next: () => {
          this.successMessage.set('Senha alterada com sucesso!');
          this.changePasswordForm.reset();
          this.isSubmitting.set(false);
          // Limpar mensagem de sucesso após 3 segundos
          setTimeout(() => this.successMessage.set(null), 3000);
        },
        error: err => {
          const message = err.error?.message || 'Erro ao alterar senha. Verifique se a senha atual está correta.';
          this.error.set(message);
          this.isSubmitting.set(false);
          console.error('Erro ao alterar senha:', err);
        }
      });
    }
    togglePasswordVisibility(field) {
      if (field === 'current') {
        this.showCurrentPassword.set(!this.showCurrentPassword());
      } else if (field === 'new') {
        this.showNewPassword.set(!this.showNewPassword());
      } else {
        this.showConfirmPassword.set(!this.showConfirmPassword());
      }
    }
    getPasswordStrength() {
      const password = this.changePasswordForm.get('newPassword')?.value || '';
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
      const field = this.changePasswordForm.get(fieldName);
      return !!(field && field.invalid && (field.dirty || field.touched));
    }
    getFieldError(fieldName) {
      const field = this.changePasswordForm.get(fieldName);
      if (!field || !field.errors) return '';
      if (field.errors['required']) return 'Campo obrigatório';
      if (field.errors['minlength']) return 'Mínimo 6 caracteres';
      return '';
    }
    static ɵfac = function AlterarSenhaPage_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AlterarSenhaPage)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_supplier_service__WEBPACK_IMPORTED_MODULE_0__.SupplierService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
    };
    static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: AlterarSenhaPage,
      selectors: [["app-alterar-senha"]],
      decls: 63,
      vars: 22,
      consts: [[1, "alterar-senha-page"], [1, "page-header"], [1, "subtitle"], [1, "alert", "alert-success"], [1, "alert", "alert-error"], [1, "form-card"], [3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "currentPassword"], [1, "password-input-wrapper"], ["id", "currentPassword", "formControlName", "currentPassword", "placeholder", "Digite sua senha atual", "autocomplete", "current-password", 3, "type"], ["type", "button", "tabindex", "-1", 1, "toggle-password", 3, "click"], [1, "error-message"], [1, "divider"], ["for", "newPassword"], ["id", "newPassword", "formControlName", "newPassword", "placeholder", "M\u00EDnimo 6 caracteres", "autocomplete", "new-password", 3, "type"], [1, "password-strength"], ["for", "confirmPassword"], ["id", "confirmPassword", "formControlName", "confirmPassword", "placeholder", "Digite novamente", "autocomplete", "new-password", 3, "type"], [1, "requirements-box"], [1, "requirements-title"], [1, "form-actions"], ["type", "button", 1, "btn-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn-primary", 3, "disabled"], [1, "info-card"], [1, "icon"], [1, "close-btn", 3, "click"], [1, "label"], [1, "strength-indicator"]],
      template: function AlterarSenhaPage_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Alterar Senha");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Altere sua senha de acesso ao painel");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, AlterarSenhaPage_Conditional_6_Template, 7, 1, "div", 3)(7, AlterarSenhaPage_Conditional_7_Template, 7, 1, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 5)(9, "form", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function AlterarSenhaPage_Template_form_ngSubmit_9_listener() {
            return ctx.onSubmit();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 7)(11, "label", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Senha Atual *");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "input", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "button", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AlterarSenhaPage_Template_button_click_15_listener() {
            return ctx.togglePasswordVisibility("current");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, AlterarSenhaPage_Conditional_17_Template, 2, 1, "span", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "div", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 7)(20, "label", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "Nova Senha *");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](23, "input", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "button", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AlterarSenhaPage_Template_button_click_24_listener() {
            return ctx.togglePasswordVisibility("new");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](26, AlterarSenhaPage_Conditional_26_Template, 5, 7, "div", 16)(27, AlterarSenhaPage_Conditional_27_Template, 2, 1, "span", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "div", 7)(29, "label", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "Confirmar Nova Senha *");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](32, "input", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "button", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AlterarSenhaPage_Template_button_click_33_listener() {
            return ctx.togglePasswordVisibility("confirm");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](35, AlterarSenhaPage_Conditional_35_Template, 2, 1, "span", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "div", 19)(37, "p", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38, "Requisitos da nova senha:");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "ul")(40, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](41, "\u2713 M\u00EDnimo 6 caracteres");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](43, "\u2713 Recomendado: letras mai\u00FAsculas e min\u00FAsculas");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](45, "\u2713 Recomendado: n\u00FAmeros e caracteres especiais");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "div", 21)(47, "button", 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AlterarSenhaPage_Template_button_click_47_listener() {
            return ctx.changePasswordForm.reset();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](48, " Cancelar ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](49, "button", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](50);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](51, "div", 24)(52, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](53, "\uD83D\uDD12 Dicas de Seguran\u00E7a");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](54, "ul")(55, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](56, "Use uma senha \u00FAnica que voc\u00EA n\u00E3o utilize em outros sites");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](58, "Combine letras mai\u00FAsculas, min\u00FAsculas, n\u00FAmeros e s\u00EDmbolos");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](59, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](60, "Evite informa\u00E7\u00F5es pessoais \u00F3bvias (nome, data de nascimento, etc.)");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](61, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](62, "Altere sua senha regularmente");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          let tmp_10_0;
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx.successMessage() ? 6 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx.error() ? 7 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.changePasswordForm);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("invalid", ctx.isFieldInvalid("currentPassword"));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("type", ctx.showCurrentPassword() ? "text" : "password");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.showCurrentPassword() ? "\uD83D\uDC41\uFE0F" : "\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8\uFE0F", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx.isFieldInvalid("currentPassword") ? 17 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("invalid", ctx.isFieldInvalid("newPassword"));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("type", ctx.showNewPassword() ? "text" : "password");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.showNewPassword() ? "\uD83D\uDC41\uFE0F" : "\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8\uFE0F", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](((tmp_10_0 = ctx.changePasswordForm.get("newPassword")) == null ? null : tmp_10_0.value) && !ctx.isFieldInvalid("newPassword") ? 26 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx.isFieldInvalid("newPassword") ? 27 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("invalid", ctx.isFieldInvalid("confirmPassword"));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("type", ctx.showConfirmPassword() ? "text" : "password");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.showConfirmPassword() ? "\uD83D\uDC41\uFE0F" : "\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8\uFE0F", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx.isFieldInvalid("confirmPassword") ? 35 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.isSubmitting());
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.isSubmitting() || ctx.changePasswordForm.invalid);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.isSubmitting() ? "Alterando..." : "Alterar Senha", " ");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName],
      styles: [".alterar-senha-page[_ngcontent-%COMP%] {\n  padding: 2rem;\n  max-width: 800px;\n  margin: 0 auto;\n}\n\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 600;\n  color: #1a1a1a;\n  margin-bottom: 0.5rem;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.95rem;\n  margin: 0;\n}\n\n\n\n.alert[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border-radius: 8px;\n  margin-bottom: 1.5rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.alert-success[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  border: 1px solid #c8e6c9;\n  color: #2e7d32;\n}\n\n.alert-error[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  border: 1px solid #ffcdd2;\n  color: #c62828;\n}\n\n.alert[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n}\n\n.close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 1.5rem;\n  cursor: pointer;\n  color: inherit;\n  opacity: 0.7;\n  padding: 0;\n  width: 24px;\n  height: 24px;\n  line-height: 1;\n}\n\n.close-btn[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n\n\n.form-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 2rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  margin-bottom: 1.5rem;\n}\n\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  color: #333;\n  font-weight: 500;\n  font-size: 0.95rem;\n}\n\n.password-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.password-input-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.875rem 3rem 0.875rem 1rem;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  font-size: 1rem;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n\n.password-input-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n\n.password-input-wrapper[_ngcontent-%COMP%]   input.invalid[_ngcontent-%COMP%] {\n  border-color: #f44336;\n}\n\n.toggle-password[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: 1.25rem;\n  padding: 0.25rem;\n  opacity: 0.6;\n  transition: opacity 0.2s;\n}\n\n.toggle-password[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n.error-message[_ngcontent-%COMP%] {\n  display: block;\n  color: #f44336;\n  font-size: 0.85rem;\n  margin-top: 0.375rem;\n}\n\n\n\n.divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: #eee;\n  margin: 2rem 0;\n}\n\n\n\n.password-strength[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n  font-size: 0.85rem;\n}\n\n.password-strength[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  color: #666;\n}\n\n.strength-indicator[_ngcontent-%COMP%] {\n  padding: 0.125rem 0.5rem;\n  border-radius: 4px;\n  font-weight: 500;\n}\n\n.strength-indicator.fraca[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n}\n\n.strength-indicator.media[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #f57c00;\n}\n\n.strength-indicator.forte[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n\n\n\n.requirements-box[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  border-radius: 8px;\n  padding: 1rem 1.25rem;\n  margin-bottom: 1.5rem;\n}\n\n.requirements-title[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: #333;\n  margin: 0 0 0.5rem 0;\n}\n\n.requirements-box[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n.requirements-box[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #666;\n  margin: 0.25rem 0;\n}\n\n\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  justify-content: flex-end;\n}\n\n.btn-primary[_ngcontent-%COMP%], \n.btn-secondary[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n}\n\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background: white;\n  color: #666;\n  border: 1px solid #ddd;\n}\n\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f5f5f5;\n  border-color: #999;\n}\n\n.btn-secondary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n\n\n.info-card[_ngcontent-%COMP%] {\n  background: #f9f9f9;\n  border-radius: 12px;\n  padding: 1.5rem;\n  border: 1px solid #eee;\n}\n\n.info-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #333;\n  margin: 0 0 1rem 0;\n}\n\n.info-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n.info-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #666;\n  margin: 0.5rem 0;\n  padding-left: 1.5rem;\n  position: relative;\n}\n\n.info-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: '\u2022';\n  position: absolute;\n  left: 0;\n  color: #667eea;\n  font-size: 1.2rem;\n}\n\n\n\n@media (max-width: 768px) {\n  .alterar-senha-page[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n\n  .form-card[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsdGVyYXItc2VuaGEtcGFnZS5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLFNBQVM7QUFDWDs7QUFFQSxXQUFXO0FBQ1g7RUFDRSxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIseUJBQXlCO0VBQ3pCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIseUJBQXlCO0VBQ3pCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsY0FBYztFQUNkLFlBQVk7RUFDWixVQUFVO0VBQ1YsV0FBVztFQUNYLFlBQVk7RUFDWixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBLGNBQWM7QUFDZDtFQUNFLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLHdDQUF3QztFQUN4QyxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QscUJBQXFCO0VBQ3JCLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsV0FBVztFQUNYLG9DQUFvQztFQUNwQyxzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZiw4Q0FBOEM7QUFDaEQ7O0FBRUE7RUFDRSxhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLDhDQUE4QztBQUNoRDs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixjQUFjO0VBQ2QsUUFBUTtFQUNSLDJCQUEyQjtFQUMzQixnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixvQkFBb0I7QUFDdEI7O0FBRUEsWUFBWTtBQUNaO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixjQUFjO0FBQ2hCOztBQUVBLHNCQUFzQjtBQUN0QjtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsY0FBYztBQUNoQjs7QUFFQSxxQkFBcUI7QUFDckI7RUFDRSxtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsVUFBVTtFQUNWLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsaUJBQWlCO0FBQ25COztBQUVBLGlCQUFpQjtBQUNqQjtFQUNFLGFBQWE7RUFDYixTQUFTO0VBQ1QseUJBQXlCO0FBQzNCOztBQUVBOztFQUVFLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2Ysb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsNkRBQTZEO0VBQzdELFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IsK0NBQStDO0FBQ2pEOztBQUVBO0VBQ0UsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLFdBQVc7RUFDWCxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLG1CQUFtQjtBQUNyQjs7QUFFQSxjQUFjO0FBQ2Q7RUFDRSxtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsVUFBVTtFQUNWLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLG9CQUFvQjtFQUNwQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLE9BQU87RUFDUCxjQUFjO0VBQ2QsaUJBQWlCO0FBQ25COztBQUVBLHNCQUFzQjtBQUN0QjtFQUNFO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsaUJBQWlCO0VBQ25COztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLHNCQUFzQjtFQUN4Qjs7RUFFQTtJQUNFLFdBQVc7RUFDYjtBQUNGIiwiZmlsZSI6ImFsdGVyYXItc2VuaGEtcGFnZS5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWx0ZXJhci1zZW5oYS1wYWdlIHtcbiAgcGFkZGluZzogMnJlbTtcbiAgbWF4LXdpZHRoOiA4MDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5wYWdlLWhlYWRlciB7XG4gIG1hcmdpbi1ib3R0b206IDJyZW07XG59XG5cbi5wYWdlLWhlYWRlciBoMSB7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMxYTFhMWE7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbn1cblxuLnN1YnRpdGxlIHtcbiAgY29sb3I6ICM2NjY7XG4gIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgbWFyZ2luOiAwO1xufVxuXG4vKiBBbGVydHMgKi9cbi5hbGVydCB7XG4gIHBhZGRpbmc6IDFyZW0gMS41cmVtO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDAuNzVyZW07XG59XG5cbi5hbGVydC1zdWNjZXNzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZjVlOTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2M4ZTZjOTtcbiAgY29sb3I6ICMyZTdkMzI7XG59XG5cbi5hbGVydC1lcnJvciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmViZWU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmZmNkZDI7XG4gIGNvbG9yOiAjYzYyODI4O1xufVxuXG4uYWxlcnQgLmljb24ge1xuICBmb250LXNpemU6IDEuMjVyZW07XG59XG5cbi5jbG9zZS1idG4ge1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBvcGFjaXR5OiAwLjc7XG4gIHBhZGRpbmc6IDA7XG4gIHdpZHRoOiAyNHB4O1xuICBoZWlnaHQ6IDI0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuXG4uY2xvc2UtYnRuOmhvdmVyIHtcbiAgb3BhY2l0eTogMTtcbn1cblxuLyogRm9ybSBDYXJkICovXG4uZm9ybS1jYXJkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDJyZW07XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbn1cblxuLmZvcm0tZ3JvdXAge1xuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG59XG5cbi5mb3JtLWdyb3VwIGxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgY29sb3I6ICMzMzM7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc2l6ZTogMC45NXJlbTtcbn1cblxuLnBhc3N3b3JkLWlucHV0LXdyYXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5wYXNzd29yZC1pbnB1dC13cmFwcGVyIGlucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDAuODc1cmVtIDNyZW0gMC44NzVyZW0gMXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjJzLCBib3gtc2hhZG93IDAuMnM7XG59XG5cbi5wYXNzd29yZC1pbnB1dC13cmFwcGVyIGlucHV0OmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyLWNvbG9yOiAjNjY3ZWVhO1xuICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSgxMDIsIDEyNiwgMjM0LCAwLjEpO1xufVxuXG4ucGFzc3dvcmQtaW5wdXQtd3JhcHBlciBpbnB1dC5pbnZhbGlkIHtcbiAgYm9yZGVyLWNvbG9yOiAjZjQ0MzM2O1xufVxuXG4udG9nZ2xlLXBhc3N3b3JkIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMC43NXJlbTtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgcGFkZGluZzogMC4yNXJlbTtcbiAgb3BhY2l0eTogMC42O1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnM7XG59XG5cbi50b2dnbGUtcGFzc3dvcmQ6aG92ZXIge1xuICBvcGFjaXR5OiAxO1xufVxuXG4uZXJyb3ItbWVzc2FnZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBjb2xvcjogI2Y0NDMzNjtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xuICBtYXJnaW4tdG9wOiAwLjM3NXJlbTtcbn1cblxuLyogRGl2aWRlciAqL1xuLmRpdmlkZXIge1xuICBoZWlnaHQ6IDFweDtcbiAgYmFja2dyb3VuZDogI2VlZTtcbiAgbWFyZ2luOiAycmVtIDA7XG59XG5cbi8qIFBhc3N3b3JkIFN0cmVuZ3RoICovXG4ucGFzc3dvcmQtc3RyZW5ndGgge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDAuNXJlbTtcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xuICBmb250LXNpemU6IDAuODVyZW07XG59XG5cbi5wYXNzd29yZC1zdHJlbmd0aCAubGFiZWwge1xuICBjb2xvcjogIzY2Njtcbn1cblxuLnN0cmVuZ3RoLWluZGljYXRvciB7XG4gIHBhZGRpbmc6IDAuMTI1cmVtIDAuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4uc3RyZW5ndGgtaW5kaWNhdG9yLmZyYWNhIHtcbiAgYmFja2dyb3VuZDogI2ZmZWJlZTtcbiAgY29sb3I6ICNjNjI4Mjg7XG59XG5cbi5zdHJlbmd0aC1pbmRpY2F0b3IubWVkaWEge1xuICBiYWNrZ3JvdW5kOiAjZmZmM2UwO1xuICBjb2xvcjogI2Y1N2MwMDtcbn1cblxuLnN0cmVuZ3RoLWluZGljYXRvci5mb3J0ZSB7XG4gIGJhY2tncm91bmQ6ICNlOGY1ZTk7XG4gIGNvbG9yOiAjMmU3ZDMyO1xufVxuXG4vKiBSZXF1aXJlbWVudHMgQm94ICovXG4ucmVxdWlyZW1lbnRzLWJveCB7XG4gIGJhY2tncm91bmQ6ICNmNWY1ZjU7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgcGFkZGluZzogMXJlbSAxLjI1cmVtO1xuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG59XG5cbi5yZXF1aXJlbWVudHMtdGl0bGUge1xuICBmb250LXNpemU6IDAuOXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbjogMCAwIDAuNXJlbSAwO1xufVxuXG4ucmVxdWlyZW1lbnRzLWJveCB1bCB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbn1cblxuLnJlcXVpcmVtZW50cy1ib3ggbGkge1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIGNvbG9yOiAjNjY2O1xuICBtYXJnaW46IDAuMjVyZW0gMDtcbn1cblxuLyogRm9ybSBBY3Rpb25zICovXG4uZm9ybS1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxcmVtO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xufVxuXG4uYnRuLXByaW1hcnksXG4uYnRuLXNlY29uZGFyeSB7XG4gIHBhZGRpbmc6IDAuNzVyZW0gMS41cmVtO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycztcbn1cblxuLmJ0bi1wcmltYXJ5IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKTtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXI6IG5vbmU7XG59XG5cbi5idG4tcHJpbWFyeTpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuNCk7XG59XG5cbi5idG4tcHJpbWFyeTpkaXNhYmxlZCB7XG4gIG9wYWNpdHk6IDAuNjtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgdHJhbnNmb3JtOiBub25lO1xufVxuXG4uYnRuLXNlY29uZGFyeSB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBjb2xvcjogIzY2NjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbn1cblxuLmJ0bi1zZWNvbmRhcnk6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xuICBib3JkZXItY29sb3I6ICM5OTk7XG59XG5cbi5idG4tc2Vjb25kYXJ5OmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMC41O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4vKiBJbmZvIENhcmQgKi9cbi5pbmZvLWNhcmQge1xuICBiYWNrZ3JvdW5kOiAjZjlmOWY5O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XG59XG5cbi5pbmZvLWNhcmQgaDMge1xuICBmb250LXNpemU6IDEuMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbjogMCAwIDFyZW0gMDtcbn1cblxuLmluZm8tY2FyZCB1bCB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbn1cblxuLmluZm8tY2FyZCBsaSB7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xuICBjb2xvcjogIzY2NjtcbiAgbWFyZ2luOiAwLjVyZW0gMDtcbiAgcGFkZGluZy1sZWZ0OiAxLjVyZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmluZm8tY2FyZCBsaTo6YmVmb3JlIHtcbiAgY29udGVudDogJ+KAoic7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgY29sb3I6ICM2NjdlZWE7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xufVxuXG4vKiBNb2JpbGUgUmVzcG9uc2l2ZSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5hbHRlcmFyLXNlbmhhLXBhZ2Uge1xuICAgIHBhZGRpbmc6IDFyZW07XG4gIH1cblxuICAucGFnZS1oZWFkZXIgaDEge1xuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICB9XG5cbiAgLmZvcm0tY2FyZCB7XG4gICAgcGFkZGluZzogMS41cmVtO1xuICB9XG5cbiAgLmZvcm0tYWN0aW9ucyB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuXG4gIC5mb3JtLWFjdGlvbnMgYnV0dG9uIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxufVxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvcGFpbmVsL2FsdGVyYXItc2VuaGEvYWx0ZXJhci1zZW5oYS1wYWdlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsU0FBUztBQUNYOztBQUVBLFdBQVc7QUFDWDtFQUNFLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6Qix5QkFBeUI7RUFDekIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6Qix5QkFBeUI7RUFDekIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixjQUFjO0VBQ2QsWUFBWTtFQUNaLFVBQVU7RUFDVixXQUFXO0VBQ1gsWUFBWTtFQUNaLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxVQUFVO0FBQ1o7O0FBRUEsY0FBYztBQUNkO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2Isd0NBQXdDO0VBQ3hDLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxxQkFBcUI7RUFDckIsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsb0NBQW9DO0VBQ3BDLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLDhDQUE4QztBQUNoRDs7QUFFQTtFQUNFLGFBQWE7RUFDYixxQkFBcUI7RUFDckIsOENBQThDO0FBQ2hEOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxRQUFRO0VBQ1IsMkJBQTJCO0VBQzNCLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLG9CQUFvQjtBQUN0Qjs7QUFFQSxZQUFZO0FBQ1o7RUFDRSxXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLGNBQWM7QUFDaEI7O0FBRUEsc0JBQXNCO0FBQ3RCO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QixrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBLHFCQUFxQjtBQUNyQjtFQUNFLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixVQUFVO0VBQ1YsU0FBUztBQUNYOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxpQkFBaUI7QUFDbkI7O0FBRUEsaUJBQWlCO0FBQ2pCO0VBQ0UsYUFBYTtFQUNiLFNBQVM7RUFDVCx5QkFBeUI7QUFDM0I7O0FBRUE7O0VBRUUsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSw2REFBNkQ7RUFDN0QsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQiwrQ0FBK0M7QUFDakQ7O0FBRUE7RUFDRSxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsV0FBVztFQUNYLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osbUJBQW1CO0FBQ3JCOztBQUVBLGNBQWM7QUFDZDtFQUNFLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixVQUFVO0VBQ1YsU0FBUztBQUNYOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIsb0JBQW9CO0VBQ3BCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsT0FBTztFQUNQLGNBQWM7RUFDZCxpQkFBaUI7QUFDbkI7O0FBRUEsc0JBQXNCO0FBQ3RCO0VBQ0U7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxpQkFBaUI7RUFDbkI7O0VBRUE7SUFDRSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0Usc0JBQXNCO0VBQ3hCOztFQUVBO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7O0FBRUEsd2dVQUF3Z1UiLCJzb3VyY2VzQ29udGVudCI6WyIuYWx0ZXJhci1zZW5oYS1wYWdlIHtcbiAgcGFkZGluZzogMnJlbTtcbiAgbWF4LXdpZHRoOiA4MDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5wYWdlLWhlYWRlciB7XG4gIG1hcmdpbi1ib3R0b206IDJyZW07XG59XG5cbi5wYWdlLWhlYWRlciBoMSB7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMxYTFhMWE7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbn1cblxuLnN1YnRpdGxlIHtcbiAgY29sb3I6ICM2NjY7XG4gIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgbWFyZ2luOiAwO1xufVxuXG4vKiBBbGVydHMgKi9cbi5hbGVydCB7XG4gIHBhZGRpbmc6IDFyZW0gMS41cmVtO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDAuNzVyZW07XG59XG5cbi5hbGVydC1zdWNjZXNzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZjVlOTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2M4ZTZjOTtcbiAgY29sb3I6ICMyZTdkMzI7XG59XG5cbi5hbGVydC1lcnJvciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmViZWU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmZmNkZDI7XG4gIGNvbG9yOiAjYzYyODI4O1xufVxuXG4uYWxlcnQgLmljb24ge1xuICBmb250LXNpemU6IDEuMjVyZW07XG59XG5cbi5jbG9zZS1idG4ge1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBvcGFjaXR5OiAwLjc7XG4gIHBhZGRpbmc6IDA7XG4gIHdpZHRoOiAyNHB4O1xuICBoZWlnaHQ6IDI0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuXG4uY2xvc2UtYnRuOmhvdmVyIHtcbiAgb3BhY2l0eTogMTtcbn1cblxuLyogRm9ybSBDYXJkICovXG4uZm9ybS1jYXJkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDJyZW07XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbn1cblxuLmZvcm0tZ3JvdXAge1xuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG59XG5cbi5mb3JtLWdyb3VwIGxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgY29sb3I6ICMzMzM7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc2l6ZTogMC45NXJlbTtcbn1cblxuLnBhc3N3b3JkLWlucHV0LXdyYXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5wYXNzd29yZC1pbnB1dC13cmFwcGVyIGlucHV0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDAuODc1cmVtIDNyZW0gMC44NzVyZW0gMXJlbTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjJzLCBib3gtc2hhZG93IDAuMnM7XG59XG5cbi5wYXNzd29yZC1pbnB1dC13cmFwcGVyIGlucHV0OmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyLWNvbG9yOiAjNjY3ZWVhO1xuICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSgxMDIsIDEyNiwgMjM0LCAwLjEpO1xufVxuXG4ucGFzc3dvcmQtaW5wdXQtd3JhcHBlciBpbnB1dC5pbnZhbGlkIHtcbiAgYm9yZGVyLWNvbG9yOiAjZjQ0MzM2O1xufVxuXG4udG9nZ2xlLXBhc3N3b3JkIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMC43NXJlbTtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgcGFkZGluZzogMC4yNXJlbTtcbiAgb3BhY2l0eTogMC42O1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnM7XG59XG5cbi50b2dnbGUtcGFzc3dvcmQ6aG92ZXIge1xuICBvcGFjaXR5OiAxO1xufVxuXG4uZXJyb3ItbWVzc2FnZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBjb2xvcjogI2Y0NDMzNjtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xuICBtYXJnaW4tdG9wOiAwLjM3NXJlbTtcbn1cblxuLyogRGl2aWRlciAqL1xuLmRpdmlkZXIge1xuICBoZWlnaHQ6IDFweDtcbiAgYmFja2dyb3VuZDogI2VlZTtcbiAgbWFyZ2luOiAycmVtIDA7XG59XG5cbi8qIFBhc3N3b3JkIFN0cmVuZ3RoICovXG4ucGFzc3dvcmQtc3RyZW5ndGgge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDAuNXJlbTtcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xuICBmb250LXNpemU6IDAuODVyZW07XG59XG5cbi5wYXNzd29yZC1zdHJlbmd0aCAubGFiZWwge1xuICBjb2xvcjogIzY2Njtcbn1cblxuLnN0cmVuZ3RoLWluZGljYXRvciB7XG4gIHBhZGRpbmc6IDAuMTI1cmVtIDAuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4uc3RyZW5ndGgtaW5kaWNhdG9yLmZyYWNhIHtcbiAgYmFja2dyb3VuZDogI2ZmZWJlZTtcbiAgY29sb3I6ICNjNjI4Mjg7XG59XG5cbi5zdHJlbmd0aC1pbmRpY2F0b3IubWVkaWEge1xuICBiYWNrZ3JvdW5kOiAjZmZmM2UwO1xuICBjb2xvcjogI2Y1N2MwMDtcbn1cblxuLnN0cmVuZ3RoLWluZGljYXRvci5mb3J0ZSB7XG4gIGJhY2tncm91bmQ6ICNlOGY1ZTk7XG4gIGNvbG9yOiAjMmU3ZDMyO1xufVxuXG4vKiBSZXF1aXJlbWVudHMgQm94ICovXG4ucmVxdWlyZW1lbnRzLWJveCB7XG4gIGJhY2tncm91bmQ6ICNmNWY1ZjU7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgcGFkZGluZzogMXJlbSAxLjI1cmVtO1xuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG59XG5cbi5yZXF1aXJlbWVudHMtdGl0bGUge1xuICBmb250LXNpemU6IDAuOXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbjogMCAwIDAuNXJlbSAwO1xufVxuXG4ucmVxdWlyZW1lbnRzLWJveCB1bCB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbn1cblxuLnJlcXVpcmVtZW50cy1ib3ggbGkge1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIGNvbG9yOiAjNjY2O1xuICBtYXJnaW46IDAuMjVyZW0gMDtcbn1cblxuLyogRm9ybSBBY3Rpb25zICovXG4uZm9ybS1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxcmVtO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xufVxuXG4uYnRuLXByaW1hcnksXG4uYnRuLXNlY29uZGFyeSB7XG4gIHBhZGRpbmc6IDAuNzVyZW0gMS41cmVtO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycztcbn1cblxuLmJ0bi1wcmltYXJ5IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKTtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXI6IG5vbmU7XG59XG5cbi5idG4tcHJpbWFyeTpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuNCk7XG59XG5cbi5idG4tcHJpbWFyeTpkaXNhYmxlZCB7XG4gIG9wYWNpdHk6IDAuNjtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgdHJhbnNmb3JtOiBub25lO1xufVxuXG4uYnRuLXNlY29uZGFyeSB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBjb2xvcjogIzY2NjtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbn1cblxuLmJ0bi1zZWNvbmRhcnk6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xuICBib3JkZXItY29sb3I6ICM5OTk7XG59XG5cbi5idG4tc2Vjb25kYXJ5OmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMC41O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4vKiBJbmZvIENhcmQgKi9cbi5pbmZvLWNhcmQge1xuICBiYWNrZ3JvdW5kOiAjZjlmOWY5O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XG59XG5cbi5pbmZvLWNhcmQgaDMge1xuICBmb250LXNpemU6IDEuMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbjogMCAwIDFyZW0gMDtcbn1cblxuLmluZm8tY2FyZCB1bCB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbn1cblxuLmluZm8tY2FyZCBsaSB7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xuICBjb2xvcjogIzY2NjtcbiAgbWFyZ2luOiAwLjVyZW0gMDtcbiAgcGFkZGluZy1sZWZ0OiAxLjVyZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmluZm8tY2FyZCBsaTo6YmVmb3JlIHtcbiAgY29udGVudDogJ8OiwoDCoic7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgY29sb3I6ICM2NjdlZWE7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xufVxuXG4vKiBNb2JpbGUgUmVzcG9uc2l2ZSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5hbHRlcmFyLXNlbmhhLXBhZ2Uge1xuICAgIHBhZGRpbmc6IDFyZW07XG4gIH1cblxuICAucGFnZS1oZWFkZXIgaDEge1xuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICB9XG5cbiAgLmZvcm0tY2FyZCB7XG4gICAgcGFkZGluZzogMS41cmVtO1xuICB9XG5cbiAgLmZvcm0tYWN0aW9ucyB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuXG4gIC5mb3JtLWFjdGlvbnMgYnV0dG9uIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
  return AlterarSenhaPage;
})();

/***/ })

}]);
//# sourceMappingURL=479.js.map