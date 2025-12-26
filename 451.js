"use strict";
(self["webpackChunkguia_noivas"] = self["webpackChunkguia_noivas"] || []).push([[451],{

/***/ 6451:
/*!**********************************************************!*\
  !*** ./src/app/features/fornecedores/fornecedor-page.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FornecedorPageComponent: () => (/* binding */ FornecedorPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 2596);
/* harmony import */ var _services_fornecedores_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/fornecedores-data */ 7237);
/* harmony import */ var _core_tracking_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/tracking.service */ 5050);








function FornecedorPageComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 4)(1, "div", 5)(2, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "svg", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "path", 8)(5, "circle", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 10)(7, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Modo Preview");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Esta \u00E9 uma visualiza\u00E7\u00E3o do seu perfil. Esta p\u00E1gina n\u00E3o est\u00E1 vis\u00EDvel publicamente ainda. Assim que estiver pronto, solicite a libera\u00E7\u00E3o.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
  }
}
function FornecedorPageComponent_div_2_span_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "svg", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "path", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r0.fornecedor.cidade, " ");
  }
}
function FornecedorPageComponent_div_2_span_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u2605 ", ctx_r0.fornecedor.rating, "");
  }
}
function FornecedorPageComponent_div_2_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "img", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FornecedorPageComponent_div_2_ng_container_20_Template_img_click_1_listener() {
      const img_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.openImage(img_r3.url));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const img_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", img_r3.url, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
  }
}
function FornecedorPageComponent_div_2_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 47)(1, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FornecedorPageComponent_div_2_div_21_Template_div_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.closeImage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 49)(3, "button", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FornecedorPageComponent_div_2_div_21_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.closeImage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "img", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", ctx_r0.selectedImage, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
  }
}
function FornecedorPageComponent_div_2_div_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 52)(1, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\u201C");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "blockquote", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const dep_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](dep_r5.texto);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("\u2013 ", dep_r5.casal, "");
  }
}
function FornecedorPageComponent_div_2_a_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FornecedorPageComponent_div_2_a_32_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.onWhatsAppClick());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " WhatsApp ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("href", ctx_r0.getWhatsAppLink(), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("data-event-category", "Contato")("data-event-action", "Clique WhatsApp")("data-vendor-id", ctx_r0.fornecedor.id)("data-vendor-name", ctx_r0.fornecedor.nome)("data-vendor-category", ctx_r0.fornecedor.categoria);
  }
}
function FornecedorPageComponent_div_2_a_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FornecedorPageComponent_div_2_a_33_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r7);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.onInstagramClick());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Instagram ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("href", ctx_r0.getInstagramLink(), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("data-event-category", "Contato")("data-event-action", "Clique Instagram")("data-vendor-id", ctx_r0.fornecedor.id)("data-vendor-name", ctx_r0.fornecedor.nome)("data-vendor-category", ctx_r0.fornecedor.categoria);
  }
}
function FornecedorPageComponent_div_2_a_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FornecedorPageComponent_div_2_a_34_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.onFacebookClick());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Facebook ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("href", ctx_r0.getFacebookLink(), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("data-event-category", "Contato")("data-event-action", "Clique Facebook")("data-vendor-id", ctx_r0.fornecedor.id)("data-vendor-name", ctx_r0.fornecedor.nome)("data-vendor-category", ctx_r0.fornecedor.categoria);
  }
}
function FornecedorPageComponent_div_2_a_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FornecedorPageComponent_div_2_a_35_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r9);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.onSiteClick());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Visitar Site ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("href", ctx_r0.getSiteLink(), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("data-event-category", "Contato")("data-event-action", "Clique Site")("data-vendor-id", ctx_r0.fornecedor.id)("data-vendor-name", ctx_r0.fornecedor.nome)("data-vendor-category", ctx_r0.fornecedor.categoria);
  }
}
function FornecedorPageComponent_div_2_div_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "svg", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "path", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r0.fornecedor.telefone, " ");
  }
}
function FornecedorPageComponent_div_2_div_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "svg", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "path", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r0.fornecedor.email, " ");
  }
}
function FornecedorPageComponent_div_2_div_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "svg", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "path", 64)(3, "path", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "a", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FornecedorPageComponent_div_2_div_41_Template_a_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r0.onMapsClick());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, " Ver no mapa \u2197 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.fornecedor.endereco);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("href", ctx_r0.getMapsLink(), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("data-event-category", "Contato")("data-event-action", "Clique Mapa")("data-vendor-id", ctx_r0.fornecedor.id)("data-vendor-name", ctx_r0.fornecedor.nome);
  }
}
function FornecedorPageComponent_div_2_div_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "svg", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "path", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r0.fornecedor.horarioFuncionamento, " ");
  }
}
function FornecedorPageComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 11)(1, "div", 12)(2, "div", 13)(3, "div", 14)(4, "div", 15)(5, "div", 16)(6, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "h2", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, FornecedorPageComponent_div_2_span_11_Template, 4, 1, "span", 20)(12, FornecedorPageComponent_div_2_span_12_Template, 2, 1, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 22)(14, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 23)(17, "h3", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "Galeria de Fotos");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](20, FornecedorPageComponent_div_2_ng_container_20_Template, 2, 1, "ng-container", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](21, FornecedorPageComponent_div_2_div_21_Template, 6, 1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "section", 28)(23, "h3", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "O que os noivos dizem");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](26, FornecedorPageComponent_div_2_div_26_Template, 7, 2, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "aside")(28, "div", 32)(29, "h4", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30, "Solicitar Or\u00E7amento");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](32, FornecedorPageComponent_div_2_a_32_Template, 2, 6, "a", 35)(33, FornecedorPageComponent_div_2_a_33_Template, 2, 6, "a", 36)(34, FornecedorPageComponent_div_2_a_34_Template, 2, 6, "a", 37)(35, FornecedorPageComponent_div_2_a_35_Template, 2, 6, "a", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "div", 39)(37, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](38, "Dados de Contato");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](39, FornecedorPageComponent_div_2_div_39_Template, 4, 1, "div", 41)(40, FornecedorPageComponent_div_2_div_40_Template, 4, 1, "div", 41)(41, FornecedorPageComponent_div_2_div_41_Template, 8, 6, "div", 41)(42, FornecedorPageComponent_div_2_div_42_Template, 4, 1, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.fornecedor.categoria);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.fornecedor.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.cidade);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.rating);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.fornecedor.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.fornecedor.imagens);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.selectedImage);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.fornecedor.depoimentos);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.telefone);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.instagram);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.facebook);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.website);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.telefone);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.endereco);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.horarioFuncionamento);
  }
}
function FornecedorPageComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 68)(1, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "svg", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "circle", 71)(4, "line", 72)(5, "line", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Fornecedor n\u00E3o encontrado");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "O perfil que voc\u00EA est\u00E1 procurando n\u00E3o est\u00E1 dispon\u00EDvel ou ainda n\u00E3o foi publicado.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "a", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Voltar para a p\u00E1gina inicial");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
}
let FornecedorPageComponent = /*#__PURE__*/(() => {
  class FornecedorPageComponent {
    route;
    router;
    fornecedores;
    cdr;
    tracking;
    fornecedor;
    selectedImage;
    isPreviewMode = false;
    notFound = false;
    constructor(route, router, fornecedores, cdr, tracking) {
      this.route = route;
      this.router = router;
      this.fornecedores = fornecedores;
      this.cdr = cdr;
      this.tracking = tracking;
    }
    ngOnInit() {
      const identifier = this.route.snapshot.params['id']; // pode ser GUID ou slug
      this.isPreviewMode = this.route.snapshot.queryParams['preview'] === 'true';
      if (identifier) {
        this.fornecedores.getById(identifier, this.isPreviewMode).subscribe({
          next: f => {
            // Validate publicado field if environment requires it
            // Only enforce if FORNECEDOR_PUBLICADO is true (production) and not in preview mode
            if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO === true && !this.isPreviewMode && !f.publicado) {
              console.warn('Fornecedor não publicado acessado diretamente:', f.id);
              this.notFound = true;
              this.cdr.markForCheck();
              return;
            }
            this.fornecedor = f;
            this.tracking.trackVendorView({
              vendorId: f.id,
              vendorName: f.nome,
              vendorCategory: f.categoria
            });
            this.cdr.markForCheck();
          },
          error: err => {
            console.error('Error loading fornecedor:', err);
            this.notFound = true;
            this.cdr.markForCheck();
          }
        });
      }
    }
    trackPageView() {
      if (typeof window !== 'undefined' && window.dataLayer && this.fornecedor) {
        window.dataLayer.push({
          event: 'view_vendor',
          vendor_id: this.fornecedor.id,
          vendor_name: this.fornecedor.nome,
          vendor_category: this.fornecedor.categoria
        });
      }
    }
    openImage(img) {
      this.selectedImage = img;
    }
    closeImage() {
      this.selectedImage = undefined;
    }
    getWhatsAppLink() {
      const w = this.fornecedor?.telefone || '';
      const digits = w.replace(/\D/g, '');
      const message = encodeURIComponent('Olá, Te encontrei no Guia Noivas Piracicaba, preciso de mais informações.');
      return digits ? `https://wa.me/${digits}?text=${message}` : '#';
    }
    onWhatsAppClick() {
      this.tracking.trackContactClick('whatsapp', {
        vendorId: this.fornecedor?.id || '',
        vendorName: this.fornecedor?.nome || '',
        vendorCategory: this.fornecedor?.categoria
      });
    }
    getSiteLink() {
      return this.fornecedor?.website || '#';
    }
    onSiteClick() {
      this.tracking.trackContactClick('website', {
        vendorId: this.fornecedor?.id || '',
        vendorName: this.fornecedor?.nome || '',
        vendorCategory: this.fornecedor?.categoria
      });
    }
    getInstagramLink() {
      const instagram = this.fornecedor?.instagram || '';
      const username = instagram.replace('@', '').trim();
      return username ? `https://instagram.com/${username}` : '#';
    }
    onInstagramClick() {
      this.tracking.trackContactClick('instagram', {
        vendorId: this.fornecedor?.id || '',
        vendorName: this.fornecedor?.nome || '',
        vendorCategory: this.fornecedor?.categoria
      });
    }
    getFacebookLink() {
      const facebook = this.fornecedor?.facebook || '';
      if (!facebook.trim()) return '#';
      // Se já for uma URL completa, retorna direto
      if (facebook.startsWith('http://') || facebook.startsWith('https://')) {
        return facebook;
      }
      // Caso contrário, adiciona o prefixo
      const cleaned = facebook.replace('@', '').trim();
      return `https://facebook.com/${cleaned}`;
    }
    onFacebookClick() {
      this.tracking.trackContactClick('facebook', {
        vendorId: this.fornecedor?.id || '',
        vendorName: this.fornecedor?.nome || '',
        vendorCategory: this.fornecedor?.categoria
      });
    }
    onPhoneClick() {
      this.tracking.trackContactClick('phone', {
        vendorId: this.fornecedor?.id || '',
        vendorName: this.fornecedor?.nome || '',
        vendorCategory: this.fornecedor?.categoria
      });
    }
    getMapsLink() {
      const endereco = this.fornecedor?.endereco || '';
      if (!endereco) return '#';
      const encoded = encodeURIComponent(endereco);
      return `https://www.google.com/maps/search/${encoded}`;
    }
    onMapsClick() {
      this.tracking.trackContactClick('maps', {
        vendorId: this.fornecedor?.id || '',
        vendorName: this.fornecedor?.nome || '',
        vendorCategory: this.fornecedor?.categoria
      });
    }
    static ɵfac = function FornecedorPageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || FornecedorPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_fornecedores_data__WEBPACK_IMPORTED_MODULE_1__.FornecedoresData), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_tracking_service__WEBPACK_IMPORTED_MODULE_2__.TrackingService));
    };
    static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: FornecedorPageComponent,
      selectors: [["app-fornecedor-page"]],
      decls: 5,
      vars: 3,
      consts: [["notfound", ""], ["class", "preview-banner", 4, "ngIf"], [1, "container", "mx-auto", "px-4", "py-10"], ["class", "grid lg:grid-cols-3 gap-6", 4, "ngIf", "ngIfElse"], [1, "preview-banner"], [1, "container", "mx-auto", "px-4"], [1, "preview-content"], ["xmlns", "http://www.w3.org/2000/svg", "width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], [1, "preview-text"], [1, "grid", "lg:grid-cols-3", "gap-6"], [1, "lg:col-span-2"], [1, "bg-white", "rounded-2xl", "shadow-lg", "p-8", "mb-6", "border", "border-gray-100"], [1, "flex", "items-start", "gap-6"], [1, "flex-1"], [1, "flex", "items-center", "gap-3", "mb-3"], [1, "text-xs", "bg-rose-500", "text-white", "px-3", "py-1", "rounded-full", "font-semibold", "shadow-sm"], [1, "text-3xl", "md:text-4xl", "font-serif", "font-bold", "text-gray-900", "mb-4"], [1, "text-base", "text-gray-600", "flex", "items-center", "gap-4", "mb-4"], ["class", "flex items-center gap-2", 4, "ngIf"], ["class", "flex items-center gap-1 text-yellow-500 font-semibold", 4, "ngIf"], [1, "text-gray-700", "leading-relaxed"], [1, "bg-white", "rounded-2xl", "shadow-lg", "p-8", "border", "border-gray-100", "mb-6"], [1, "font-serif", "font-bold", "text-2xl", "text-gray-900", "mb-6"], [1, "grid", "grid-cols-2", "gap-4"], [4, "ngFor", "ngForOf"], ["class", "fixed inset-0 z-50 flex items-center justify-center p-4", 4, "ngIf"], [1, "py-12", "px-2", "mb-6", "rounded-2xl", "bg-depoimentos"], [1, "text-3xl", "md:text-4xl", "font-serif", "font-bold", "text-gray-900", "mb-8", "text-center"], [1, "flex", "flex-wrap", "gap-6"], ["class", "bg-white rounded-xl shadow p-6 border border-rose-100 flex-1 min-w-[280px] max-w-[340px]", "style", "box-shadow:0 2px 8px #0001;", 4, "ngFor", "ngForOf"], [1, "bg-white", "rounded-2xl", "shadow-lg", "p-6", "border", "border-gray-100", "sticky", "top-4"], [1, "font-serif", "font-bold", "text-xl", "text-gray-900", "mb-6"], [1, "flex", "flex-col", "gap-3", "mb-6"], ["target", "_blank", "class", "inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-lg py-3 px-4 font-semibold transition-all duration-300 shadow-sm hover:shadow-md", 3, "href", "click", 4, "ngIf"], ["target", "_blank", "class", "inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg py-3 px-4 font-semibold transition-all duration-300 shadow-sm hover:shadow-md", 3, "href", "click", 4, "ngIf"], ["target", "_blank", "class", "inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-4 font-semibold transition-all duration-300 shadow-sm hover:shadow-md", 3, "href", "click", 4, "ngIf"], ["target", "_blank", "class", "inline-flex items-center justify-center gap-2 border border-gray-400 text-gray-700 bg-white hover:bg-gray-50 rounded-lg py-3 px-4 font-semibold transition-all duration-300 shadow-sm hover:shadow-md", 3, "href", "click", 4, "ngIf"], [1, "text-sm", "text-gray-600"], [1, "mb-2", "font-semibold"], ["class", "flex items-center gap-2 mb-2", 4, "ngIf"], [1, "flex", "items-center", "gap-2"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 1111.314-11.314l-4.243 4.243z"], [1, "flex", "items-center", "gap-1", "text-yellow-500", "font-semibold"], ["alt", "imagem", "loading", "lazy", "decoding", "async", "fetchpriority", "low", 1, "w-full", "h-40", "object-cover", "rounded-xl", "cursor-pointer", "hover:shadow-xl", "transition-all", "duration-300", "hover:scale-105", 3, "click", "src"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4"], [1, "absolute", "inset-0", "bg-black", "bg-opacity-70", 3, "click"], [1, "relative", "max-w-4xl", "max-h-[90vh]", "w-full"], ["aria-label", "Fechar", 1, "absolute", "right-2", "top-2", "z-60", "bg-white", "rounded-full", "p-2", "shadow", 3, "click"], ["alt", "imagem ampliada", "decoding", "async", 1, "w-full", "h-auto", "max-h-[90vh]", "object-contain", "rounded", 3, "src"], [1, "bg-white", "rounded-xl", "shadow", "p-6", "border", "border-rose-100", "flex-1", "min-w-[280px]", "max-w-[340px]", 2, "box-shadow", "0 2px 8px #0001"], [1, "text-rose-400", "text-3xl", "mb-2"], [1, "italic", "text-gray-700", "mb-4"], [1, "font-serif", "font-bold", "text-rose-700", "text-right"], ["target", "_blank", 1, "inline-flex", "items-center", "justify-center", "gap-2", "bg-green-500", "hover:bg-green-600", "text-white", "rounded-lg", "py-3", "px-4", "font-semibold", "transition-all", "duration-300", "shadow-sm", "hover:shadow-md", 3, "click", "href"], ["target", "_blank", 1, "inline-flex", "items-center", "justify-center", "gap-2", "bg-gradient-to-r", "from-purple-600", "to-pink-600", "hover:from-purple-700", "hover:to-pink-700", "text-white", "rounded-lg", "py-3", "px-4", "font-semibold", "transition-all", "duration-300", "shadow-sm", "hover:shadow-md", 3, "click", "href"], ["target", "_blank", 1, "inline-flex", "items-center", "justify-center", "gap-2", "bg-blue-600", "hover:bg-blue-700", "text-white", "rounded-lg", "py-3", "px-4", "font-semibold", "transition-all", "duration-300", "shadow-sm", "hover:shadow-md", 3, "click", "href"], ["target", "_blank", 1, "inline-flex", "items-center", "justify-center", "gap-2", "border", "border-gray-400", "text-gray-700", "bg-white", "hover:bg-gray-50", "rounded-lg", "py-3", "px-4", "font-semibold", "transition-all", "duration-300", "shadow-sm", "hover:shadow-md", 3, "click", "href"], [1, "flex", "items-center", "gap-2", "mb-2"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", 1, "w-4", "h-4", "text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 11a3 3 0 11-6 0 3 3 0 016 0z"], ["target", "_blank", 1, "text-rose-600", "hover:text-rose-700", "text-xs", "font-semibold", "ml-2", "whitespace-nowrap", 3, "click", "href"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "not-found-container"], [1, "not-found-card"], ["xmlns", "http://www.w3.org/2000/svg", "width", "64", "height", "64", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "not-found-icon"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["x1", "8", "y1", "11", "x2", "14", "y2", "11"], ["routerLink", "/", 1, "btn-home"]],
      template: function FornecedorPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, FornecedorPageComponent_div_0_Template, 11, 0, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "section", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, FornecedorPageComponent_div_2_Template, 43, 16, "div", 3)(3, FornecedorPageComponent_ng_template_3_Template, 12, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          const notfound_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isPreviewMode);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.fornecedor && !ctx.notFound)("ngIfElse", notfound_r11);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLink],
      styles: [".container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block}\n\n\n\n.preview-banner[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 16px 0;\n  box-shadow: 0 4px 12px rgba(118, 75, 162, 0.3);\n  position: sticky;\n  top: 0;\n  z-index: 40;\n}\n\n.preview-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.preview-content[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n}\n\n.preview-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.preview-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n}\n\n.preview-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  opacity: 0.95;\n}\n\n@media (max-width: 768px) {\n  .preview-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n    gap: 8px;\n  }\n}\n\n\n\n.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}\n.z-60[_ngcontent-%COMP%]{z-index:60}\n\n\n\n.bg-depoimentos[_ngcontent-%COMP%] {\n\tbackground:\n\t\tlinear-gradient(rgba(244, 63, 94, 0.08), rgba(244, 63, 94, 0.08)), \n\n\t\turl('/assets/bg-depoimentos.jpg') repeat;\n}\n\n\n\n.not-found-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 400px;\n  padding: 40px 20px;\n}\n\n.not-found-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  padding: 48px 32px;\n  text-align: center;\n  max-width: 500px;\n  border: 1px solid #e5e7eb;\n}\n\n.not-found-icon[_ngcontent-%COMP%] {\n  margin: 0 auto 24px;\n  color: #9ca3af;\n}\n\n.not-found-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0 0 12px;\n}\n\n.not-found-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #6b7280;\n  margin: 0 0 32px;\n  line-height: 1.5;\n}\n\n.btn-home[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 12px 32px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  text-decoration: none;\n  border-radius: 8px;\n  font-weight: 600;\n  transition: all 0.3s;\n}\n\n.btn-home[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 20px rgba(118, 75, 162, 0.3);\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm5lY2Vkb3ItcGFnZS5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZSxhQUFhOztBQUU1Qix3QkFBd0I7QUFDeEI7RUFDRSw2REFBNkQ7RUFDN0QsWUFBWTtFQUNaLGVBQWU7RUFDZiw4Q0FBOEM7RUFDOUMsZ0JBQWdCO0VBQ2hCLE1BQU07RUFDTixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFNBQVM7RUFDVCxpQkFBaUI7RUFDakIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGFBQWE7QUFDZjs7QUFFQTtFQUNFO0lBQ0Usc0JBQXNCO0lBQ3RCLGtCQUFrQjtJQUNsQixRQUFRO0VBQ1Y7QUFDRjs7QUFFQSw0Q0FBNEM7QUFDNUMsZ0JBQWdCLGNBQWM7QUFDOUIsTUFBTSxVQUFVOztBQUVoQix3RUFBd0U7QUFDeEU7Q0FDQzs7MENBRXlDO0FBQzFDOztBQUVBLHFCQUFxQjtBQUNyQjtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLHlDQUF5QztFQUN6QyxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsNkRBQTZEO0VBQzdELFlBQVk7RUFDWixxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IsK0NBQStDO0FBQ2pEIiwiZmlsZSI6ImZvcm5lY2Vkb3ItcGFnZS5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyIGltZ3tkaXNwbGF5OmJsb2NrfVxuXG4vKiBQcmV2aWV3IE1vZGUgQmFubmVyICovXG4ucHJldmlldy1iYW5uZXIge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjY3ZWVhIDAlLCAjNzY0YmEyIDEwMCUpO1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDE2cHggMDtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDExOCwgNzUsIDE2MiwgMC4zKTtcbiAgcG9zaXRpb246IHN0aWNreTtcbiAgdG9wOiAwO1xuICB6LWluZGV4OiA0MDtcbn1cblxuLnByZXZpZXctY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTZweDtcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4ucHJldmlldy1jb250ZW50IHN2ZyB7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICB3aWR0aDogMjRweDtcbiAgaGVpZ2h0OiAyNHB4O1xufVxuXG4ucHJldmlldy10ZXh0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA0cHg7XG59XG5cbi5wcmV2aWV3LXRleHQgc3Ryb25nIHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4ucHJldmlldy10ZXh0IHNwYW4ge1xuICBmb250LXNpemU6IDE0cHg7XG4gIG9wYWNpdHk6IDAuOTU7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAucHJldmlldy1jb250ZW50IHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcbiAgfVxufVxuXG4vKiBNb2RhbC9vdmVybGF5IHR3ZWFrcyBmb3IgZXhwYW5kZWQgaW1hZ2UgKi9cbi5jdXJzb3ItcG9pbnRlcntjdXJzb3I6cG9pbnRlcn1cbi56LTYwe3otaW5kZXg6NjB9XG5cbi8qIEZ1bmRvIGRlcG9pbWVudG9zIGF1dG9tYXRpemFkbyBjb20gY29yIHByaW5jaXBhbCBkbyBzaXRlIChyb3NlLTYwMCkgKi9cbi5iZy1kZXBvaW1lbnRvcyB7XG5cdGJhY2tncm91bmQ6XG5cdFx0bGluZWFyLWdyYWRpZW50KHJnYmEoMjQ0LCA2MywgOTQsIDAuMDgpLCByZ2JhKDI0NCwgNjMsIDk0LCAwLjA4KSksIC8qIHJvc2UtNjAwICovXG5cdFx0dXJsKCcvYXNzZXRzL2JnLWRlcG9pbWVudG9zLmpwZycpIHJlcGVhdDtcbn1cblxuLyogTm90IEZvdW5kIFN0eWxlcyAqL1xuLm5vdC1mb3VuZC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogNDAwcHg7XG4gIHBhZGRpbmc6IDQwcHggMjBweDtcbn1cblxuLm5vdC1mb3VuZC1jYXJkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICBwYWRkaW5nOiA0OHB4IDMycHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWF4LXdpZHRoOiA1MDBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2U1ZTdlYjtcbn1cblxuLm5vdC1mb3VuZC1pY29uIHtcbiAgbWFyZ2luOiAwIGF1dG8gMjRweDtcbiAgY29sb3I6ICM5Y2EzYWY7XG59XG5cbi5ub3QtZm91bmQtY2FyZCBoMiB7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMxZjI5Mzc7XG4gIG1hcmdpbjogMCAwIDEycHg7XG59XG5cbi5ub3QtZm91bmQtY2FyZCBwIHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBjb2xvcjogIzZiNzI4MDtcbiAgbWFyZ2luOiAwIDAgMzJweDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbn1cblxuLmJ0bi1ob21lIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nOiAxMnB4IDMycHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2NjdlZWEgMCUsICM3NjRiYTIgMTAwJSk7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzO1xufVxuXG4uYnRuLWhvbWU6aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gIGJveC1zaGFkb3c6IDAgMTBweCAyMHB4IHJnYmEoMTE4LCA3NSwgMTYyLCAwLjMpO1xufVxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZm9ybmVjZWRvcmVzL2Zvcm5lY2Vkb3ItcGFnZS5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZSxhQUFhOztBQUU1Qix3QkFBd0I7QUFDeEI7RUFDRSw2REFBNkQ7RUFDN0QsWUFBWTtFQUNaLGVBQWU7RUFDZiw4Q0FBOEM7RUFDOUMsZ0JBQWdCO0VBQ2hCLE1BQU07RUFDTixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFNBQVM7RUFDVCxpQkFBaUI7RUFDakIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGFBQWE7QUFDZjs7QUFFQTtFQUNFO0lBQ0Usc0JBQXNCO0lBQ3RCLGtCQUFrQjtJQUNsQixRQUFRO0VBQ1Y7QUFDRjs7QUFFQSw0Q0FBNEM7QUFDNUMsZ0JBQWdCLGNBQWM7QUFDOUIsTUFBTSxVQUFVOztBQUVoQix3RUFBd0U7QUFDeEU7Q0FDQzs7MENBRXlDO0FBQzFDOztBQUVBLHFCQUFxQjtBQUNyQjtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLHlDQUF5QztFQUN6QyxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsNkRBQTZEO0VBQzdELFlBQVk7RUFDWixxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IsK0NBQStDO0FBQ2pEOztBQUVBLGcxSUFBZzFJIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lciBpbWd7ZGlzcGxheTpibG9ja31cblxuLyogUHJldmlldyBNb2RlIEJhbm5lciAqL1xuLnByZXZpZXctYmFubmVyIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKTtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAxNnB4IDA7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgxMTgsIDc1LCAxNjIsIDAuMyk7XG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIHRvcDogMDtcbiAgei1pbmRleDogNDA7XG59XG5cbi5wcmV2aWV3LWNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDE2cHg7XG4gIG1heC13aWR0aDogMTIwMHB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLnByZXZpZXctY29udGVudCBzdmcge1xuICBmbGV4LXNocmluazogMDtcbiAgd2lkdGg6IDI0cHg7XG4gIGhlaWdodDogMjRweDtcbn1cblxuLnByZXZpZXctdGV4dCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogNHB4O1xufVxuXG4ucHJldmlldy10ZXh0IHN0cm9uZyB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLnByZXZpZXctdGV4dCBzcGFuIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBvcGFjaXR5OiAwLjk1O1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLnByZXZpZXctY29udGVudCB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG4gIH1cbn1cblxuLyogTW9kYWwvb3ZlcmxheSB0d2Vha3MgZm9yIGV4cGFuZGVkIGltYWdlICovXG4uY3Vyc29yLXBvaW50ZXJ7Y3Vyc29yOnBvaW50ZXJ9XG4uei02MHt6LWluZGV4OjYwfVxuXG4vKiBGdW5kbyBkZXBvaW1lbnRvcyBhdXRvbWF0aXphZG8gY29tIGNvciBwcmluY2lwYWwgZG8gc2l0ZSAocm9zZS02MDApICovXG4uYmctZGVwb2ltZW50b3Mge1xuXHRiYWNrZ3JvdW5kOlxuXHRcdGxpbmVhci1ncmFkaWVudChyZ2JhKDI0NCwgNjMsIDk0LCAwLjA4KSwgcmdiYSgyNDQsIDYzLCA5NCwgMC4wOCkpLCAvKiByb3NlLTYwMCAqL1xuXHRcdHVybCgnL2Fzc2V0cy9iZy1kZXBvaW1lbnRvcy5qcGcnKSByZXBlYXQ7XG59XG5cbi8qIE5vdCBGb3VuZCBTdHlsZXMgKi9cbi5ub3QtZm91bmQtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDQwMHB4O1xuICBwYWRkaW5nOiA0MHB4IDIwcHg7XG59XG5cbi5ub3QtZm91bmQtY2FyZCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgcGFkZGluZzogNDhweCAzMnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1heC13aWR0aDogNTAwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlNWU3ZWI7XG59XG5cbi5ub3QtZm91bmQtaWNvbiB7XG4gIG1hcmdpbjogMCBhdXRvIDI0cHg7XG4gIGNvbG9yOiAjOWNhM2FmO1xufVxuXG4ubm90LWZvdW5kLWNhcmQgaDIge1xuICBmb250LXNpemU6IDI0cHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjMWYyOTM3O1xuICBtYXJnaW46IDAgMCAxMnB4O1xufVxuXG4ubm90LWZvdW5kLWNhcmQgcCB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgY29sb3I6ICM2YjcyODA7XG4gIG1hcmdpbjogMCAwIDMycHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG59XG5cbi5idG4taG9tZSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcGFkZGluZzogMTJweCAzMnB4O1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjY3ZWVhIDAlLCAjNzY0YmEyIDEwMCUpO1xuICBjb2xvcjogd2hpdGU7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcbn1cblxuLmJ0bi1ob21lOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xuICBib3gtc2hhZG93OiAwIDEwcHggMjBweCByZ2JhKDExOCwgNzUsIDE2MiwgMC4zKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
      changeDetection: 0
    });
  }
  return FornecedorPageComponent;
})();

/***/ })

}]);
//# sourceMappingURL=451.js.map