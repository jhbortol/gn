"use strict";
(self["webpackChunkguia_noivas"] = self["webpackChunkguia_noivas"] || []).push([[71],{

/***/ 4071:
/*!*****************************************************************!*\
  !*** ./src/app/features/painel/testemunhos/testemunhos-page.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TestemunhosPage: () => (/* binding */ TestemunhosPage)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _services_supplier_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/supplier.service */ 6972);







const _forTrack0 = ($index, $item) => $item.id;
function TestemunhosPage_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TestemunhosPage_Conditional_12_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.error.set(null));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.error());
  }
}
function TestemunhosPage_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 7)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TestemunhosPage_Conditional_13_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.successMessage.set(null));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.successMessage());
  }
}
function TestemunhosPage_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Carregando testemunhos...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function TestemunhosPage_Conditional_15_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 16)(1, "div", 17)(2, "div", 18)(3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 19)(6, "p", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 21)(9, "div", 22)(10, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](12, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 24)(14, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TestemunhosPage_Conditional_15_For_2_Template_button_click_14_listener() {
      const testemunho_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.openEditModal(testemunho_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, " \u270F\uFE0F ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TestemunhosPage_Conditional_15_For_2_Template_button_click_16_listener() {
      const testemunho_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.deleteTestemunho(testemunho_r5.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, " \uD83D\uDDD1\uFE0F ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const testemunho_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("inactive", !testemunho_r5.ativo);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](testemunho_r5.nome || testemunho_r5.nomeCliente);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](testemunho_r5.descricao || testemunho_r5.mensagem);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](12, 5, testemunho_r5.criadoEm, "dd/MM/yyyy"));
  }
}
function TestemunhosPage_Conditional_15_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 15)(1, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TestemunhosPage_Conditional_15_Conditional_3_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.changePage(ctx_r1.currentPage() - 1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " \u2190 Anterior ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TestemunhosPage_Conditional_15_Conditional_3_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.changePage(ctx_r1.currentPage() + 1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, " Pr\u00F3xima \u2192 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r1.currentPage() === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate3"](" P\u00E1gina ", ctx_r1.currentPage(), " de ", ctx_r1.totalPages(), " (", ctx_r1.total(), " total) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r1.currentPage() === ctx_r1.totalPages());
  }
}
function TestemunhosPage_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeaterCreate"](1, TestemunhosPage_Conditional_15_For_2_Template, 18, 8, "div", 14, _forTrack0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, TestemunhosPage_Conditional_15_Conditional_3_Template, 7, 5, "div", 15);
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeater"](ctx_r1.testemunhos());
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx_r1.totalPages() > 1 ? 3 : -1);
  }
}
function TestemunhosPage_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 9)(1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\uD83D\uDCAC");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Nenhum testemunho cadastrado");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Adicione depoimentos de clientes satisfeitos para aumentar sua credibilidade.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TestemunhosPage_Conditional_16_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.openCreateModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, " Criar Primeiro Testemunho ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function TestemunhosPage_Conditional_17_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.getFieldError("nome"));
  }
}
function TestemunhosPage_Conditional_17_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.getFieldError("descricao"));
  }
}
function TestemunhosPage_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TestemunhosPage_Conditional_17_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.closeModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TestemunhosPage_Conditional_17_Template_div_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 33)(3, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TestemunhosPage_Conditional_17_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.closeModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "form", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function TestemunhosPage_Conditional_17_Template_form_ngSubmit_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.saveTestemunho());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 36)(9, "div", 37)(10, "label", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Nome do Cliente *");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "input", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, TestemunhosPage_Conditional_17_Conditional_13_Template, 2, 1, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 37)(15, "label", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Mensagem *");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](17, "textarea", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, TestemunhosPage_Conditional_17_Conditional_20_Template, 2, 1, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div", 44)(22, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TestemunhosPage_Conditional_17_Template_button_click_22_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.closeModal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, " Cancelar ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    let tmp_6_0;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.isEditing() ? "Editar Testemunho" : "Novo Testemunho");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx_r1.testemunhoForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("invalid", ctx_r1.isFieldInvalid("nome"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx_r1.isFieldInvalid("nome") ? 13 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("invalid", ctx_r1.isFieldInvalid("descricao"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ((tmp_6_0 = ctx_r1.testemunhoForm.get("descricao")) == null ? null : tmp_6_0.value == null ? null : tmp_6_0.value.length) || 0, " / 2000 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx_r1.isFieldInvalid("descricao") ? 20 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r1.isSaving());
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r1.isSaving() || ctx_r1.testemunhoForm.invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r1.isSaving() ? "Salvando..." : ctx_r1.isEditing() ? "Atualizar" : "Criar", " ");
  }
}
let TestemunhosPage = /*#__PURE__*/(() => {
  class TestemunhosPage {
    supplierService;
    fb;
    testemunhos = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)([]);
    isLoading = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(false);
    error = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(null);
    successMessage = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(null);
    // Paginação
    currentPage = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(1);
    pageSize = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(10);
    totalPages = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(0);
    total = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(0);
    // Modal
    showModal = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(false);
    isEditing = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(false);
    isSaving = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(false);
    editingId = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(null);
    testemunhoForm;
    constructor(supplierService, fb) {
      this.supplierService = supplierService;
      this.fb = fb;
      this.testemunhoForm = this.fb.group({
        nome: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.maxLength(100)]],
        descricao: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.minLength(10), _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.maxLength(2000)]]
      });
    }
    ngOnInit() {
      this.loadTestemunhos();
    }
    loadTestemunhos() {
      this.isLoading.set(true);
      this.error.set(null);
      this.supplierService.getTestemunhos(this.currentPage(), this.pageSize()).subscribe({
        next: response => {
          console.log('Testemunhos recebidos:', response.data);
          this.testemunhos.set(response.data);
          this.total.set(response.total);
          this.totalPages.set(response.totalPages);
          this.isLoading.set(false);
        },
        error: err => {
          this.error.set('Erro ao carregar testemunhos. Tente novamente.');
          this.isLoading.set(false);
          console.error('Erro ao carregar testemunhos:', err);
        }
      });
    }
    openCreateModal() {
      this.isEditing.set(false);
      this.editingId.set(null);
      this.testemunhoForm.reset({
        nome: '',
        descricao: ''
      });
      this.showModal.set(true);
    }
    openEditModal(testemunho) {
      this.isEditing.set(true);
      this.editingId.set(testemunho.id);
      this.testemunhoForm.patchValue({
        nome: testemunho.nome || testemunho.nomeCliente,
        descricao: testemunho.descricao || testemunho.mensagem
      });
      this.showModal.set(true);
    }
    closeModal() {
      this.showModal.set(false);
      this.testemunhoForm.reset();
      this.editingId.set(null);
    }
    saveTestemunho() {
      if (this.testemunhoForm.invalid) {
        this.testemunhoForm.markAllAsTouched();
        return;
      }
      this.isSaving.set(true);
      this.error.set(null);
      const formData = this.testemunhoForm.value;
      if (this.isEditing()) {
        // Update
        this.supplierService.updateTestemunho(this.editingId(), formData).subscribe({
          next: () => {
            this.successMessage.set('Testemunho atualizado com sucesso!');
            this.closeModal();
            this.loadTestemunhos();
            this.isSaving.set(false);
            setTimeout(() => this.successMessage.set(null), 3000);
          },
          error: err => {
            this.error.set('Erro ao atualizar testemunho. Tente novamente.');
            this.isSaving.set(false);
            console.error('Erro ao atualizar:', err);
          }
        });
      } else {
        // Create
        this.supplierService.createTestemunho(formData).subscribe({
          next: () => {
            this.successMessage.set('Testemunho criado com sucesso!');
            this.closeModal();
            this.loadTestemunhos();
            this.isSaving.set(false);
            setTimeout(() => this.successMessage.set(null), 3000);
          },
          error: err => {
            this.error.set('Erro ao criar testemunho. Tente novamente.');
            this.isSaving.set(false);
            console.error('Erro ao criar:', err);
          }
        });
      }
    }
    deleteTestemunho(id) {
      if (!confirm('Tem certeza que deseja excluir este testemunho?')) {
        return;
      }
      this.supplierService.deleteTestemunho(id).subscribe({
        next: () => {
          this.successMessage.set('Testemunho excluído com sucesso!');
          this.loadTestemunhos();
          setTimeout(() => this.successMessage.set(null), 3000);
        },
        error: err => {
          this.error.set('Erro ao excluir testemunho.');
          console.error('Erro ao excluir:', err);
        }
      });
    }
    toggleAtivo(testemunho) {
      const newStatus = !testemunho.ativo;
      this.supplierService.updateTestemunho(testemunho.id, {
        ativo: newStatus
      }).subscribe({
        next: () => {
          this.successMessage.set(`Testemunho ${newStatus ? 'ativado' : 'desativado'} com sucesso!`);
          this.loadTestemunhos();
          setTimeout(() => this.successMessage.set(null), 3000);
        },
        error: err => {
          this.error.set('Erro ao atualizar status do testemunho.');
          console.error('Erro ao toggle ativo:', err);
        }
      });
    }
    changePage(page) {
      if (page < 1 || page > this.totalPages()) return;
      this.currentPage.set(page);
      this.loadTestemunhos();
    }
    getStars(rating) {
      return Array(5).fill('').map((_, i) => i < rating ? '★' : '☆');
    }
    // Validação helpers
    isFieldInvalid(fieldName) {
      const field = this.testemunhoForm.get(fieldName);
      return !!(field && field.invalid && (field.dirty || field.touched));
    }
    getFieldError(fieldName) {
      const field = this.testemunhoForm.get(fieldName);
      if (!field || !field.errors) return '';
      if (field.errors['required']) return 'Campo obrigatório';
      if (field.errors['email']) return 'Email inválido';
      if (field.errors['maxlength']) return `Máximo ${field.errors['maxlength'].requiredLength} caracteres`;
      if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['min']) return `Valor mínimo: ${field.errors['min'].min}`;
      if (field.errors['max']) return `Valor máximo: ${field.errors['max'].max}`;
      return '';
    }
    static ɵfac = function TestemunhosPage_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || TestemunhosPage)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_supplier_service__WEBPACK_IMPORTED_MODULE_0__.SupplierService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder));
    };
    static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: TestemunhosPage,
      selectors: [["app-testemunhos-page"]],
      decls: 18,
      vars: 6,
      consts: [[1, "testemunhos-page"], [1, "page-header"], [1, "header-content"], [1, "subtitle"], [1, "btn-primary", 3, "click"], [1, "icon"], [1, "alert", "alert-error"], [1, "alert", "alert-success"], [1, "loading"], [1, "empty-state"], [1, "modal-overlay"], [1, "close-btn", 3, "click"], [1, "spinner"], [1, "testemunhos-list"], [1, "testemunho-card", 3, "inactive"], [1, "pagination"], [1, "testemunho-card"], [1, "card-header"], [1, "client-info"], [1, "card-body"], [1, "mensagem"], [1, "card-footer"], [1, "footer-info"], [1, "date"], [1, "actions"], ["title", "Editar", 1, "action-btn", "edit-btn", 3, "click"], ["title", "Excluir", 1, "action-btn", "delete-btn", 3, "click"], [1, "page-btn", 3, "click", "disabled"], [1, "page-info"], [1, "empty-icon"], [1, "btn-primary-large", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "modal-header"], [1, "close-modal-btn", 3, "click"], [3, "ngSubmit", "formGroup"], [1, "modal-body"], [1, "form-group"], ["for", "nome"], ["type", "text", "id", "nome", "formControlName", "nome", "placeholder", "Digite o nome completo"], [1, "error-message"], ["for", "descricao"], ["id", "descricao", "formControlName", "descricao", "rows", "5", "placeholder", "Digite o depoimento do cliente...", "maxlength", "2000"], [1, "char-count"], [1, "modal-footer"], ["type", "button", 1, "btn-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn-primary", 3, "disabled"]],
      template: function TestemunhosPage_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Testemunhos");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Gerencie os depoimentos de seus clientes");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TestemunhosPage_Template_button_click_8_listener() {
            return ctx.openCreateModal();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "span", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "\u2795");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, " Novo Testemunho ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, TestemunhosPage_Conditional_12_Template, 5, 1, "div", 6)(13, TestemunhosPage_Conditional_13_Template, 5, 1, "div", 7)(14, TestemunhosPage_Conditional_14_Template, 4, 0, "div", 8)(15, TestemunhosPage_Conditional_15_Template, 4, 1)(16, TestemunhosPage_Conditional_16_Template, 9, 0, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, TestemunhosPage_Conditional_17_Template, 26, 12, "div", 10);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx.error() ? 12 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx.successMessage() ? 13 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx.isLoading() ? 14 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](!ctx.isLoading() && ctx.testemunhos().length > 0 ? 15 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](!ctx.isLoading() && ctx.testemunhos().length === 0 ? 16 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](ctx.showModal() ? 17 : -1);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DatePipe, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName],
      styles: [".testemunhos-page[_ngcontent-%COMP%] {\n  padding: 2rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n}\n\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 600;\n  color: #1a1a1a;\n  margin-bottom: 0.5rem;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.95rem;\n  margin: 0;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 500;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  transition: transform 0.2s, box-shadow 0.2s;\n  white-space: nowrap;\n}\n\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n\n\n.alert[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border-radius: 8px;\n  margin-bottom: 1.5rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.alert-error[_ngcontent-%COMP%] {\n  background-color: #fee;\n  border: 1px solid #fcc;\n  color: #c33;\n}\n\n.alert-success[_ngcontent-%COMP%] {\n  background-color: #efe;\n  border: 1px solid #cfc;\n  color: #3c3;\n}\n\n.close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 1.5rem;\n  cursor: pointer;\n  color: inherit;\n  opacity: 0.7;\n  padding: 0;\n  width: 24px;\n  height: 24px;\n  line-height: 1;\n}\n\n.close-btn[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n\n\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem;\n}\n\n.spinner[_ngcontent-%COMP%] {\n  border: 3px solid #f3f3f3;\n  border-top: 3px solid #667eea;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 1rem;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n\n\n.testemunhos-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n.testemunho-card[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #ddd;\n  border-radius: 12px;\n  padding: 1.5rem;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n\n.testemunho-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n}\n\n.testemunho-card.inactive[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  background: #f9f9f9;\n}\n\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: start;\n  margin-bottom: 1rem;\n  gap: 1rem;\n}\n\n.client-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #333;\n  margin: 0 0 0.25rem 0;\n}\n\n.email[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9rem;\n  margin: 0;\n}\n\n.rating[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.25rem;\n}\n\n.star[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: #ddd;\n}\n\n.star.filled[_ngcontent-%COMP%] {\n  color: #ffc107;\n}\n\n.card-body[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n\n.mensagem[_ngcontent-%COMP%] {\n  color: #444;\n  line-height: 1.6;\n  margin: 0;\n  font-size: 0.95rem;\n}\n\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: 1rem;\n  border-top: 1px solid #eee;\n}\n\n.footer-info[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n}\n\n.status-badge[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.75rem;\n  border-radius: 4px;\n  font-size: 0.85rem;\n  font-weight: 500;\n}\n\n.status-badge.active[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n}\n\n.date[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 0.85rem;\n}\n\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n\n.action-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 1.1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform 0.2s, opacity 0.2s;\n}\n\n.action-btn[_ngcontent-%COMP%]:hover {\n  transform: scale(1.1);\n}\n\n.toggle-btn[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1976d2;\n}\n\n.edit-btn[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #f57c00;\n}\n\n.delete-btn[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #d32f2f;\n}\n\n\n\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n  margin-top: 2rem;\n  padding: 1rem;\n}\n\n.page-btn[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  background: white;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.page-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f5f5f5;\n  border-color: #667eea;\n}\n\n.page-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.page-info[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9rem;\n}\n\n\n\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 2rem;\n  background: white;\n  border-radius: 12px;\n  border: 2px dashed #ddd;\n}\n\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  margin-bottom: 1rem;\n}\n\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: #333;\n  margin-bottom: 0.5rem;\n}\n\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  margin-bottom: 2rem;\n}\n\n.btn-primary-large[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 1rem 2.5rem;\n  border-radius: 8px;\n  font-size: 1.1rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n\n.btn-primary-large[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);\n}\n\n\n\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 1rem;\n}\n\n.modal-content[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 600px;\n  max-height: 90vh;\n  overflow-y: auto;\n  box-shadow: 0 8px 32px rgba(0,0,0,0.2);\n}\n\n.modal-header[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  border-bottom: 1px solid #eee;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #333;\n  margin: 0;\n}\n\n.close-modal-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 2rem;\n  cursor: pointer;\n  color: #999;\n  padding: 0;\n  width: 32px;\n  height: 32px;\n  line-height: 1;\n  transition: color 0.2s;\n}\n\n.close-modal-btn[_ngcontent-%COMP%]:hover {\n  color: #333;\n}\n\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  border-top: 1px solid #eee;\n  display: flex;\n  gap: 1rem;\n  justify-content: flex-end;\n}\n\n\n\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  color: #333;\n  font-weight: 500;\n  font-size: 0.95rem;\n}\n\n.form-group[_ngcontent-%COMP%]   input[type=\"text\"][_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   input[type=\"email\"][_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  font-size: 1rem;\n  transition: border-color 0.2s;\n  font-family: inherit;\n}\n\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n}\n\n.form-group[_ngcontent-%COMP%]   input.invalid[_ngcontent-%COMP%], \n.form-group[_ngcontent-%COMP%]   textarea.invalid[_ngcontent-%COMP%] {\n  border-color: #f44336;\n}\n\n.error-message[_ngcontent-%COMP%] {\n  display: block;\n  color: #f44336;\n  font-size: 0.85rem;\n  margin-top: 0.25rem;\n}\n\n.char-count[_ngcontent-%COMP%] {\n  text-align: right;\n  color: #999;\n  font-size: 0.85rem;\n  margin-top: 0.25rem;\n}\n\n\n\n.rating-input[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n\n.star-label[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.star-label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.star-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  color: #ddd;\n  transition: color 0.2s;\n}\n\n.star-icon.selected[_ngcontent-%COMP%] {\n  color: #ffc107;\n}\n\n.star-label[_ngcontent-%COMP%]:hover   .star-icon[_ngcontent-%COMP%] {\n  color: #ffb300;\n}\n\n\n\n.checkbox-group[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n\n.checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  font-weight: normal;\n}\n\n.checkbox-label[_ngcontent-%COMP%]   input[type=\"checkbox\"][_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n}\n\n\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background: white;\n  color: #666;\n  border: 1px solid #ddd;\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f5f5f5;\n  border-color: #999;\n}\n\n.btn-secondary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n\n\n@media (max-width: 768px) {\n  .testemunhos-page[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n\n  .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .btn-primary[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n\n  .card-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .card-footer[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: flex-start;\n  }\n\n  .actions[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: flex-end;\n  }\n\n  .pagination[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .modal-content[_ngcontent-%COMP%] {\n    max-height: 95vh;\n  }\n\n  .modal-footer[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .modal-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n/*# sourceMappingURL=data:application/json;base64,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QjtFQUN6Qjs7RUFFQTtJQUNFLFdBQVc7SUFDWCx5QkFBeUI7RUFDM0I7O0VBRUE7SUFDRSxzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxnQkFBZ0I7RUFDbEI7O0VBRUE7SUFDRSxzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxXQUFXO0VBQ2I7QUFDRiIsImZpbGUiOiJ0ZXN0ZW11bmhvcy1wYWdlLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50ZXN0ZW11bmhvcy1wYWdlIHtcbiAgcGFkZGluZzogMnJlbTtcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4ucGFnZS1oZWFkZXIge1xuICBtYXJnaW4tYm90dG9tOiAycmVtO1xufVxuXG4uaGVhZGVyLWNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMXJlbTtcbn1cblxuLnBhZ2UtaGVhZGVyIGgxIHtcbiAgZm9udC1zaXplOiAycmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzFhMWExYTtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xufVxuXG4uc3VidGl0bGUge1xuICBjb2xvcjogIzY2NjtcbiAgZm9udC1zaXplOiAwLjk1cmVtO1xuICBtYXJnaW46IDA7XG59XG5cbi5idG4tcHJpbWFyeSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2NjdlZWEgMCUsICM3NjRiYTIgMTAwJSk7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMC41cmVtO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycywgYm94LXNoYWRvdyAwLjJzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uYnRuLXByaW1hcnk6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgxMDIsIDEyNiwgMjM0LCAwLjQpO1xufVxuXG4uYnRuLXByaW1hcnk6ZGlzYWJsZWQge1xuICBvcGFjaXR5OiAwLjU7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi8qIEFsZXJ0cyAqL1xuLmFsZXJ0IHtcbiAgcGFkZGluZzogMXJlbSAxLjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5hbGVydC1lcnJvciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNmY2M7XG4gIGNvbG9yOiAjYzMzO1xufVxuXG4uYWxlcnQtc3VjY2VzcyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjZmM7XG4gIGNvbG9yOiAjM2MzO1xufVxuXG4uY2xvc2UtYnRuIHtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBjb2xvcjogaW5oZXJpdDtcbiAgb3BhY2l0eTogMC43O1xuICBwYWRkaW5nOiAwO1xuICB3aWR0aDogMjRweDtcbiAgaGVpZ2h0OiAyNHB4O1xuICBsaW5lLWhlaWdodDogMTtcbn1cblxuLmNsb3NlLWJ0bjpob3ZlciB7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi8qIExvYWRpbmcgKi9cbi5sb2FkaW5nIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAzcmVtO1xufVxuXG4uc3Bpbm5lciB7XG4gIGJvcmRlcjogM3B4IHNvbGlkICNmM2YzZjM7XG4gIGJvcmRlci10b3A6IDNweCBzb2xpZCAjNjY3ZWVhO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIHdpZHRoOiA0MHB4O1xuICBoZWlnaHQ6IDQwcHg7XG4gIGFuaW1hdGlvbjogc3BpbiAxcyBsaW5lYXIgaW5maW5pdGU7XG4gIG1hcmdpbjogMCBhdXRvIDFyZW07XG59XG5cbkBrZXlmcmFtZXMgc3BpbiB7XG4gIDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbn1cblxuLyogVGVzdGVtdW5ob3MgTGlzdCAqL1xuLnRlc3RlbXVuaG9zLWxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDEuNXJlbTtcbn1cblxuLnRlc3RlbXVuaG8tY2FyZCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzLCBib3gtc2hhZG93IDAuMnM7XG59XG5cbi50ZXN0ZW11bmhvLWNhcmQ6aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLDAsMCwwLjEpO1xufVxuXG4udGVzdGVtdW5oby1jYXJkLmluYWN0aXZlIHtcbiAgb3BhY2l0eTogMC42O1xuICBiYWNrZ3JvdW5kOiAjZjlmOWY5O1xufVxuXG4uY2FyZC1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBzdGFydDtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgZ2FwOiAxcmVtO1xufVxuXG4uY2xpZW50LWluZm8gaDMge1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbjogMCAwIDAuMjVyZW0gMDtcbn1cblxuLmVtYWlsIHtcbiAgY29sb3I6ICM2NjY7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xuICBtYXJnaW46IDA7XG59XG5cbi5yYXRpbmcge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDAuMjVyZW07XG59XG5cbi5zdGFyIHtcbiAgZm9udC1zaXplOiAxLjVyZW07XG4gIGNvbG9yOiAjZGRkO1xufVxuXG4uc3Rhci5maWxsZWQge1xuICBjb2xvcjogI2ZmYzEwNztcbn1cblxuLmNhcmQtYm9keSB7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbi5tZW5zYWdlbSB7XG4gIGNvbG9yOiAjNDQ0O1xuICBsaW5lLWhlaWdodDogMS42O1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMC45NXJlbTtcbn1cblxuLmNhcmQtZm9vdGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlZWU7XG59XG5cbi5mb290ZXItaW5mbyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMXJlbTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnN0YXR1cy1iYWRnZSB7XG4gIHBhZGRpbmc6IDAuMjVyZW0gMC43NXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5zdGF0dXMtYmFkZ2UuYWN0aXZlIHtcbiAgYmFja2dyb3VuZDogI2U4ZjVlOTtcbiAgY29sb3I6ICMyZTdkMzI7XG59XG5cbi5zdGF0dXMtYmFkZ2UuaW5hY3RpdmUge1xuICBiYWNrZ3JvdW5kOiAjZmZlYmVlO1xuICBjb2xvcjogI2M2MjgyODtcbn1cblxuLmRhdGUge1xuICBjb2xvcjogIzk5OTtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xufVxuXG4uYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMC41cmVtO1xufVxuXG4uYWN0aW9uLWJ0biB7XG4gIHdpZHRoOiAzNnB4O1xuICBoZWlnaHQ6IDM2cHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMsIG9wYWNpdHkgMC4ycztcbn1cblxuLmFjdGlvbi1idG46aG92ZXIge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG59XG5cbi50b2dnbGUtYnRuIHtcbiAgYmFja2dyb3VuZDogI2UzZjJmZDtcbiAgY29sb3I6ICMxOTc2ZDI7XG59XG5cbi5lZGl0LWJ0biB7XG4gIGJhY2tncm91bmQ6ICNmZmYzZTA7XG4gIGNvbG9yOiAjZjU3YzAwO1xufVxuXG4uZGVsZXRlLWJ0biB7XG4gIGJhY2tncm91bmQ6ICNmZmViZWU7XG4gIGNvbG9yOiAjZDMyZjJmO1xufVxuXG4vKiBQYWdpbmF0aW9uICovXG4ucGFnaW5hdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDFyZW07XG4gIG1hcmdpbi10b3A6IDJyZW07XG4gIHBhZGRpbmc6IDFyZW07XG59XG5cbi5wYWdlLWJ0biB7XG4gIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzO1xufVxuXG4ucGFnZS1idG46aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xuICBib3JkZXItY29sb3I6ICM2NjdlZWE7XG59XG5cbi5wYWdlLWJ0bjpkaXNhYmxlZCB7XG4gIG9wYWNpdHk6IDAuNTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLnBhZ2UtaW5mbyB7XG4gIGNvbG9yOiAjNjY2O1xuICBmb250LXNpemU6IDAuOXJlbTtcbn1cblxuLyogRW1wdHkgU3RhdGUgKi9cbi5lbXB0eS1zdGF0ZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogNHJlbSAycmVtO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYm9yZGVyOiAycHggZGFzaGVkICNkZGQ7XG59XG5cbi5lbXB0eS1pY29uIHtcbiAgZm9udC1zaXplOiA0cmVtO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG4uZW1wdHktc3RhdGUgaDMge1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbn1cblxuLmVtcHR5LXN0YXRlIHAge1xuICBjb2xvcjogIzY2NjtcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcbn1cblxuLmJ0bi1wcmltYXJ5LWxhcmdlIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKTtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDFyZW0gMi41cmVtO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xuICBmb250LXdlaWdodDogNTAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzLCBib3gtc2hhZG93IDAuMnM7XG59XG5cbi5idG4tcHJpbWFyeS1sYXJnZTpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYm94LXNoYWRvdzogMCA2cHggMjBweCByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuNCk7XG59XG5cbi8qIE1vZGFsICovXG4ubW9kYWwtb3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB6LWluZGV4OiAxMDAwO1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4ubW9kYWwtY29udGVudCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiA2MDBweDtcbiAgbWF4LWhlaWdodDogOTB2aDtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgYm94LXNoYWRvdzogMCA4cHggMzJweCByZ2JhKDAsMCwwLDAuMik7XG59XG5cbi5tb2RhbC1oZWFkZXIge1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWVlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5tb2RhbC1oZWFkZXIgaDIge1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbjogMDtcbn1cblxuLmNsb3NlLW1vZGFsLWJ0biB7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgZm9udC1zaXplOiAycmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGNvbG9yOiAjOTk5O1xuICBwYWRkaW5nOiAwO1xuICB3aWR0aDogMzJweDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBsaW5lLWhlaWdodDogMTtcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4ycztcbn1cblxuLmNsb3NlLW1vZGFsLWJ0bjpob3ZlciB7XG4gIGNvbG9yOiAjMzMzO1xufVxuXG4ubW9kYWwtYm9keSB7XG4gIHBhZGRpbmc6IDEuNXJlbTtcbn1cblxuLm1vZGFsLWZvb3RlciB7XG4gIHBhZGRpbmc6IDEuNXJlbTtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlZWU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMXJlbTtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbn1cblxuLyogRm9ybSAqL1xuLmZvcm0tZ3JvdXAge1xuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG59XG5cbi5mb3JtLWdyb3VwIGxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgY29sb3I6ICMzMzM7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc2l6ZTogMC45NXJlbTtcbn1cblxuLmZvcm0tZ3JvdXAgaW5wdXRbdHlwZT1cInRleHRcIl0sXG4uZm9ybS1ncm91cCBpbnB1dFt0eXBlPVwiZW1haWxcIl0sXG4uZm9ybS1ncm91cCB0ZXh0YXJlYSB7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAwLjc1cmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMnM7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xufVxuXG4uZm9ybS1ncm91cCBpbnB1dDpmb2N1cyxcbi5mb3JtLWdyb3VwIHRleHRhcmVhOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyLWNvbG9yOiAjNjY3ZWVhO1xufVxuXG4uZm9ybS1ncm91cCBpbnB1dC5pbnZhbGlkLFxuLmZvcm0tZ3JvdXAgdGV4dGFyZWEuaW52YWxpZCB7XG4gIGJvcmRlci1jb2xvcjogI2Y0NDMzNjtcbn1cblxuLmVycm9yLW1lc3NhZ2Uge1xuICBkaXNwbGF5OiBibG9jaztcbiAgY29sb3I6ICNmNDQzMzY7XG4gIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgbWFyZ2luLXRvcDogMC4yNXJlbTtcbn1cblxuLmNoYXItY291bnQge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgY29sb3I6ICM5OTk7XG4gIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgbWFyZ2luLXRvcDogMC4yNXJlbTtcbn1cblxuLyogUmF0aW5nIElucHV0ICovXG4ucmF0aW5nLWlucHV0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAwLjVyZW07XG59XG5cbi5zdGFyLWxhYmVsIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uc3Rhci1sYWJlbCBpbnB1dCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5zdGFyLWljb24ge1xuICBmb250LXNpemU6IDJyZW07XG4gIGNvbG9yOiAjZGRkO1xuICB0cmFuc2l0aW9uOiBjb2xvciAwLjJzO1xufVxuXG4uc3Rhci1pY29uLnNlbGVjdGVkIHtcbiAgY29sb3I6ICNmZmMxMDc7XG59XG5cbi5zdGFyLWxhYmVsOmhvdmVyIC5zdGFyLWljb24ge1xuICBjb2xvcjogI2ZmYjMwMDtcbn1cblxuLyogQ2hlY2tib3ggKi9cbi5jaGVja2JveC1ncm91cCB7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG5cbi5jaGVja2JveC1sYWJlbCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMC41cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG5cbi5jaGVja2JveC1sYWJlbCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0ge1xuICB3aWR0aDogMThweDtcbiAgaGVpZ2h0OiAxOHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi8qIEJ1dHRvbnMgKi9cbi5idG4tc2Vjb25kYXJ5IHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGNvbG9yOiAjNjY2O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XG59XG5cbi5idG4tc2Vjb25kYXJ5OmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHtcbiAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcbiAgYm9yZGVyLWNvbG9yOiAjOTk5O1xufVxuXG4uYnRuLXNlY29uZGFyeTpkaXNhYmxlZCB7XG4gIG9wYWNpdHk6IDAuNTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLyogTW9iaWxlIFJlc3BvbnNpdmUgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAudGVzdGVtdW5ob3MtcGFnZSB7XG4gICAgcGFkZGluZzogMXJlbTtcbiAgfVxuXG4gIC5wYWdlLWhlYWRlciBoMSB7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG4gIH1cblxuICAuaGVhZGVyLWNvbnRlbnQge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIH1cblxuICAuYnRuLXByaW1hcnkge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB9XG5cbiAgLmNhcmQtaGVhZGVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG5cbiAgLmNhcmQtZm9vdGVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogMXJlbTtcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgfVxuXG4gIC5hY3Rpb25zIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICB9XG5cbiAgLnBhZ2luYXRpb24ge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cblxuICAubW9kYWwtY29udGVudCB7XG4gICAgbWF4LWhlaWdodDogOTV2aDtcbiAgfVxuXG4gIC5tb2RhbC1mb290ZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cblxuICAubW9kYWwtZm9vdGVyIGJ1dHRvbiB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1cbiJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvcGFpbmVsL3Rlc3RlbXVuaG9zL3Rlc3RlbXVuaG9zLXBhZ2UuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsU0FBUztBQUNYOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixTQUFTO0FBQ1g7O0FBRUE7RUFDRSw2REFBNkQ7RUFDN0QsWUFBWTtFQUNaLFlBQVk7RUFDWix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLG9CQUFvQjtFQUNwQixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLDJDQUEyQztFQUMzQyxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IsK0NBQStDO0FBQ2pEOztBQUVBO0VBQ0UsWUFBWTtFQUNaLG1CQUFtQjtBQUNyQjs7QUFFQSxXQUFXO0FBQ1g7RUFDRSxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixzQkFBc0I7RUFDdEIsV0FBVztBQUNiOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLHNCQUFzQjtFQUN0QixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsY0FBYztFQUNkLFlBQVk7RUFDWixVQUFVO0VBQ1YsV0FBVztFQUNYLFlBQVk7RUFDWixjQUFjO0FBQ2hCOztBQUVBO0VBQ0Us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c0I7RUFDeEI7O0VBRUE7SUFDRSxzQkFBc0I7SUFDdEIsU0FBUztJQUNULHVCQUF1QjtFQUN6Qjs7RUFFQTtJQUNFLFdBQVc7SUFDWCx5QkFBeUI7RUFDM0I7O0VBRUE7SUFDRSxzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxnQkFBZ0I7RUFDbEI7O0VBRUE7SUFDRSxzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxXQUFXO0VBQ2I7QUFDRjs7QUFFQSx3b2tCQUF3b2tCIiwic291cmNlc0NvbnRlbnQiOlsiLnRlc3RlbXVuaG9zLXBhZ2Uge1xuICBwYWRkaW5nOiAycmVtO1xuICBtYXgtd2lkdGg6IDEyMDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5wYWdlLWhlYWRlciB7XG4gIG1hcmdpbi1ib3R0b206IDJyZW07XG59XG5cbi5oZWFkZXItY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxcmVtO1xufVxuXG4ucGFnZS1oZWFkZXIgaDEge1xuICBmb250LXNpemU6IDJyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjMWExYTFhO1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG5cbi5zdWJ0aXRsZSB7XG4gIGNvbG9yOiAjNjY2O1xuICBmb250LXNpemU6IDAuOTVyZW07XG4gIG1hcmdpbjogMDtcbn1cblxuLmJ0bi1wcmltYXJ5IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKTtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDAuNzVyZW0gMS41cmVtO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjVyZW07XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzLCBib3gtc2hhZG93IDAuMnM7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi5idG4tcHJpbWFyeTpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDEwMiwgMTI2LCAyMzQsIDAuNCk7XG59XG5cbi5idG4tcHJpbWFyeTpkaXNhYmxlZCB7XG4gIG9wYWNpdHk6IDAuNTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLyogQWxlcnRzICovXG4uYWxlcnQge1xuICBwYWRkaW5nOiAxcmVtIDEuNXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmFsZXJ0LWVycm9yIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZjYztcbiAgY29sb3I6ICNjMzM7XG59XG5cbi5hbGVydC1zdWNjZXNzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VmZTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NmYztcbiAgY29sb3I6ICMzYzM7XG59XG5cbi5jbG9zZS1idG4ge1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBvcGFjaXR5OiAwLjc7XG4gIHBhZGRpbmc6IDA7XG4gIHdpZHRoOiAyNHB4O1xuICBoZWlnaHQ6IDI0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuXG4uY2xvc2UtYnRuOmhvdmVyIHtcbiAgb3BhY2l0eTogMTtcbn1cblxuLyogTG9hZGluZyAqL1xuLmxvYWRpbmcge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDNyZW07XG59XG5cbi5zcGlubmVyIHtcbiAgYm9yZGVyOiAzcHggc29saWQgI2YzZjNmMztcbiAgYm9yZGVyLXRvcDogM3B4IHNvbGlkICM2NjdlZWE7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgYW5pbWF0aW9uOiBzcGluIDFzIGxpbmVhciBpbmZpbml0ZTtcbiAgbWFyZ2luOiAwIGF1dG8gMXJlbTtcbn1cblxuQGtleWZyYW1lcyBzcGluIHtcbiAgMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxufVxuXG4vKiBUZXN0ZW11bmhvcyBMaXN0ICovXG4udGVzdGVtdW5ob3MtbGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMS41cmVtO1xufVxuXG4udGVzdGVtdW5oby1jYXJkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDEuNXJlbTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMsIGJveC1zaGFkb3cgMC4ycztcbn1cblxuLnRlc3RlbXVuaG8tY2FyZDpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMSk7XG59XG5cbi50ZXN0ZW11bmhvLWNhcmQuaW5hY3RpdmUge1xuICBvcGFjaXR5OiAwLjY7XG4gIGJhY2tncm91bmQ6ICNmOWY5Zjk7XG59XG5cbi5jYXJkLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IHN0YXJ0O1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICBnYXA6IDFyZW07XG59XG5cbi5jbGllbnQtaW5mbyBoMyB7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzMzMztcbiAgbWFyZ2luOiAwIDAgMC4yNXJlbSAwO1xufVxuXG4uZW1haWwge1xuICBjb2xvcjogIzY2NjtcbiAgZm9udC1zaXplOiAwLjlyZW07XG4gIG1hcmdpbjogMDtcbn1cblxuLnJhdGluZyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMC4yNXJlbTtcbn1cblxuLnN0YXIge1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgY29sb3I6ICNkZGQ7XG59XG5cbi5zdGFyLmZpbGxlZCB7XG4gIGNvbG9yOiAjZmZjMTA3O1xufVxuXG4uY2FyZC1ib2R5IHtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuLm1lbnNhZ2VtIHtcbiAgY29sb3I6ICM0NDQ7XG4gIGxpbmUtaGVpZ2h0OiAxLjY7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAwLjk1cmVtO1xufVxuXG4uY2FyZC1mb290ZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmctdG9wOiAxcmVtO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2VlZTtcbn1cblxuLmZvb3Rlci1pbmZvIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxcmVtO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uc3RhdHVzLWJhZGdlIHtcbiAgcGFkZGluZzogMC4yNXJlbSAwLjc1cmVtO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLnN0YXR1cy1iYWRnZS5hY3RpdmUge1xuICBiYWNrZ3JvdW5kOiAjZThmNWU5O1xuICBjb2xvcjogIzJlN2QzMjtcbn1cblxuLnN0YXR1cy1iYWRnZS5pbmFjdGl2ZSB7XG4gIGJhY2tncm91bmQ6ICNmZmViZWU7XG4gIGNvbG9yOiAjYzYyODI4O1xufVxuXG4uZGF0ZSB7XG4gIGNvbG9yOiAjOTk5O1xuICBmb250LXNpemU6IDAuODVyZW07XG59XG5cbi5hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAwLjVyZW07XG59XG5cbi5hY3Rpb24tYnRuIHtcbiAgd2lkdGg6IDM2cHg7XG4gIGhlaWdodDogMzZweDtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1zaXplOiAxLjFyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycywgb3BhY2l0eSAwLjJzO1xufVxuXG4uYWN0aW9uLWJ0bjpob3ZlciB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcbn1cblxuLnRvZ2dsZS1idG4ge1xuICBiYWNrZ3JvdW5kOiAjZTNmMmZkO1xuICBjb2xvcjogIzE5NzZkMjtcbn1cblxuLmVkaXQtYnRuIHtcbiAgYmFja2dyb3VuZDogI2ZmZjNlMDtcbiAgY29sb3I6ICNmNTdjMDA7XG59XG5cbi5kZWxldGUtYnRuIHtcbiAgYmFja2dyb3VuZDogI2ZmZWJlZTtcbiAgY29sb3I6ICNkMzJmMmY7XG59XG5cbi8qIFBhZ2luYXRpb24gKi9cbi5wYWdpbmF0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMXJlbTtcbiAgbWFyZ2luLXRvcDogMnJlbTtcbiAgcGFkZGluZzogMXJlbTtcbn1cblxuLnBhZ2UtYnRuIHtcbiAgcGFkZGluZzogMC41cmVtIDFyZW07XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XG59XG5cbi5wYWdlLWJ0bjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gIGJhY2tncm91bmQ6ICNmNWY1ZjU7XG4gIGJvcmRlci1jb2xvcjogIzY2N2VlYTtcbn1cblxuLnBhZ2UtYnRuOmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMC41O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4ucGFnZS1pbmZvIHtcbiAgY29sb3I6ICM2NjY7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xufVxuXG4vKiBFbXB0eSBTdGF0ZSAqL1xuLmVtcHR5LXN0YXRlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiA0cmVtIDJyZW07XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBib3JkZXI6IDJweCBkYXNoZWQgI2RkZDtcbn1cblxuLmVtcHR5LWljb24ge1xuICBmb250LXNpemU6IDRyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbi5lbXB0eS1zdGF0ZSBoMyB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBjb2xvcjogIzMzMztcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xufVxuXG4uZW1wdHktc3RhdGUgcCB7XG4gIGNvbG9yOiAjNjY2O1xuICBtYXJnaW4tYm90dG9tOiAycmVtO1xufVxuXG4uYnRuLXByaW1hcnktbGFyZ2Uge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjY3ZWVhIDAlLCAjNzY0YmEyIDEwMCUpO1xuICBjb2xvcjogd2hpdGU7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogMXJlbSAyLjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgZm9udC1zaXplOiAxLjFyZW07XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMsIGJveC1zaGFkb3cgMC4ycztcbn1cblxuLmJ0bi1wcmltYXJ5LWxhcmdlOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xuICBib3gtc2hhZG93OiAwIDZweCAyMHB4IHJnYmEoMTAyLCAxMjYsIDIzNCwgMC40KTtcbn1cblxuLyogTW9kYWwgKi9cbi5tb2RhbC1vdmVybGF5IHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHotaW5kZXg6IDEwMDA7XG4gIHBhZGRpbmc6IDFyZW07XG59XG5cbi5tb2RhbC1jb250ZW50IHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDYwMHB4O1xuICBtYXgtaGVpZ2h0OiA5MHZoO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBib3gtc2hhZG93OiAwIDhweCAzMnB4IHJnYmEoMCwwLDAsMC4yKTtcbn1cblxuLm1vZGFsLWhlYWRlciB7XG4gIHBhZGRpbmc6IDEuNXJlbTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLm1vZGFsLWhlYWRlciBoMiB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzMzMztcbiAgbWFyZ2luOiAwO1xufVxuXG4uY2xvc2UtbW9kYWwtYnRuIHtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBmb250LXNpemU6IDJyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgY29sb3I6ICM5OTk7XG4gIHBhZGRpbmc6IDA7XG4gIHdpZHRoOiAzMnB4O1xuICBoZWlnaHQ6IDMycHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICB0cmFuc2l0aW9uOiBjb2xvciAwLjJzO1xufVxuXG4uY2xvc2UtbW9kYWwtYnRuOmhvdmVyIHtcbiAgY29sb3I6ICMzMzM7XG59XG5cbi5tb2RhbC1ib2R5IHtcbiAgcGFkZGluZzogMS41cmVtO1xufVxuXG4ubW9kYWwtZm9vdGVyIHtcbiAgcGFkZGluZzogMS41cmVtO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2VlZTtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxcmVtO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xufVxuXG4vKiBGb3JtICovXG4uZm9ybS1ncm91cCB7XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbn1cblxuLmZvcm0tZ3JvdXAgbGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICBjb2xvcjogIzMzMztcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAwLjk1cmVtO1xufVxuXG4uZm9ybS1ncm91cCBpbnB1dFt0eXBlPVwidGV4dFwiXSxcbi5mb3JtLWdyb3VwIGlucHV0W3R5cGU9XCJlbWFpbFwiXSxcbi5mb3JtLWdyb3VwIHRleHRhcmVhIHtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDAuNzVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4ycztcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG59XG5cbi5mb3JtLWdyb3VwIGlucHV0OmZvY3VzLFxuLmZvcm0tZ3JvdXAgdGV4dGFyZWE6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXItY29sb3I6ICM2NjdlZWE7XG59XG5cbi5mb3JtLWdyb3VwIGlucHV0LmludmFsaWQsXG4uZm9ybS1ncm91cCB0ZXh0YXJlYS5pbnZhbGlkIHtcbiAgYm9yZGVyLWNvbG9yOiAjZjQ0MzM2O1xufVxuXG4uZXJyb3ItbWVzc2FnZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBjb2xvcjogI2Y0NDMzNjtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xuICBtYXJnaW4tdG9wOiAwLjI1cmVtO1xufVxuXG4uY2hhci1jb3VudCB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBjb2xvcjogIzk5OTtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xuICBtYXJnaW4tdG9wOiAwLjI1cmVtO1xufVxuXG4vKiBSYXRpbmcgSW5wdXQgKi9cbi5yYXRpbmctaW5wdXQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDAuNXJlbTtcbn1cblxuLnN0YXItbGFiZWwge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5zdGFyLWxhYmVsIGlucHV0IHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnN0YXItaWNvbiB7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgY29sb3I6ICNkZGQ7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMnM7XG59XG5cbi5zdGFyLWljb24uc2VsZWN0ZWQge1xuICBjb2xvcjogI2ZmYzEwNztcbn1cblxuLnN0YXItbGFiZWw6aG92ZXIgLnN0YXItaWNvbiB7XG4gIGNvbG9yOiAjZmZiMzAwO1xufVxuXG4vKiBDaGVja2JveCAqL1xuLmNoZWNrYm94LWdyb3VwIHtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cblxuLmNoZWNrYm94LWxhYmVsIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjVyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbn1cblxuLmNoZWNrYm94LWxhYmVsIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXSB7XG4gIHdpZHRoOiAxOHB4O1xuICBoZWlnaHQ6IDE4cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLyogQnV0dG9ucyAqL1xuLmJ0bi1zZWNvbmRhcnkge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgY29sb3I6ICM2NjY7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gIHBhZGRpbmc6IDAuNzVyZW0gMS41cmVtO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycztcbn1cblxuLmJ0bi1zZWNvbmRhcnk6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xuICBib3JkZXItY29sb3I6ICM5OTk7XG59XG5cbi5idG4tc2Vjb25kYXJ5OmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMC41O1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuXG4vKiBNb2JpbGUgUmVzcG9uc2l2ZSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC50ZXN0ZW11bmhvcy1wYWdlIHtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICB9XG5cbiAgLnBhZ2UtaGVhZGVyIGgxIHtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgfVxuXG4gIC5oZWFkZXItY29udGVudCB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgfVxuXG4gIC5idG4tcHJpbWFyeSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIH1cblxuICAuY2FyZC1oZWFkZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cblxuICAuY2FyZC1mb290ZXIge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiAxcmVtO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICB9XG5cbiAgLmFjdGlvbnMge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gIH1cblxuICAucGFnaW5hdGlvbiB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuXG4gIC5tb2RhbC1jb250ZW50IHtcbiAgICBtYXgtaGVpZ2h0OiA5NXZoO1xuICB9XG5cbiAgLm1vZGFsLWZvb3RlciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuXG4gIC5tb2RhbC1mb290ZXIgYnV0dG9uIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
  return TestemunhosPage;
})();

/***/ })

}]);
//# sourceMappingURL=71.js.map