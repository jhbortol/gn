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
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 2596);
/* harmony import */ var _services_fornecedores_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/fornecedores-data */ 7237);






function FornecedorPageComponent_div_1_span_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "svg", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "path", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.fornecedor.cidade, " ");
  }
}
function FornecedorPageComponent_div_1_span_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u2605 ", ctx_r0.fornecedor.rating, "");
  }
}
function FornecedorPageComponent_div_1_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "img", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FornecedorPageComponent_div_1_ng_container_20_Template_img_click_1_listener() {
      const img_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2).$implicit;
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.openImage(img_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const img_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngSrc", img_r3);
  }
}
function FornecedorPageComponent_div_1_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 38)(1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FornecedorPageComponent_div_1_div_21_Template_div_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.closeImage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 40)(3, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FornecedorPageComponent_div_1_div_21_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r0.closeImage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "img", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", ctx_r0.selectedImage, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
  }
}
function FornecedorPageComponent_div_1_div_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 43)(1, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\u201C");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "blockquote", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const dep_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](dep_r5.texto);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u2013 ", dep_r5.casal, "");
  }
}
function FornecedorPageComponent_div_1_a_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " WhatsApp ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("href", ctx_r0.getWhatsAppLink(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("data-event-category", "Contato")("data-event-action", "Clique WhatsApp")("data-vendor-id", ctx_r0.fornecedor.id)("data-vendor-name", ctx_r0.fornecedor.nome)("data-vendor-category", ctx_r0.fornecedor.categoria);
  }
}
function FornecedorPageComponent_div_1_a_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Instagram ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("href", ctx_r0.getInstagramLink(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("data-event-category", "Contato")("data-event-action", "Clique Instagram")("data-vendor-id", ctx_r0.fornecedor.id)("data-vendor-name", ctx_r0.fornecedor.nome)("data-vendor-category", ctx_r0.fornecedor.categoria);
  }
}
function FornecedorPageComponent_div_1_a_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Visitar Site ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("href", ctx_r0.getSiteLink(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("data-event-category", "Contato")("data-event-action", "Clique Site")("data-vendor-id", ctx_r0.fornecedor.id)("data-vendor-name", ctx_r0.fornecedor.nome)("data-vendor-category", ctx_r0.fornecedor.categoria);
  }
}
function FornecedorPageComponent_div_1_div_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "svg", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "path", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.fornecedor.telefone, " ");
  }
}
function FornecedorPageComponent_div_1_div_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "svg", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "path", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.fornecedor.email, " ");
  }
}
function FornecedorPageComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 3)(1, "div", 4)(2, "div", 5)(3, "div", 6)(4, "div", 7)(5, "div", 8)(6, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "h2", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, FornecedorPageComponent_div_1_span_11_Template, 4, 1, "span", 12)(12, FornecedorPageComponent_div_1_span_12_Template, 2, 1, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 14)(14, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 15)(17, "h3", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Galeria de Fotos");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, FornecedorPageComponent_div_1_ng_container_20_Template, 2, 1, "ng-container", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, FornecedorPageComponent_div_1_div_21_Template, 6, 1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "section", 20)(23, "h3", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "O que os noivos dizem");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](26, FornecedorPageComponent_div_1_div_26_Template, 7, 2, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "aside")(28, "div", 24)(29, "h4", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "Solicitar Or\u00E7amento");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](32, FornecedorPageComponent_div_1_a_32_Template, 2, 6, "a", 27)(33, FornecedorPageComponent_div_1_a_33_Template, 2, 6, "a", 28)(34, FornecedorPageComponent_div_1_a_34_Template, 2, 6, "a", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "div", 30)(36, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](37, "Dados de Contato");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](38, FornecedorPageComponent_div_1_div_38_Template, 4, 1, "div", 32)(39, FornecedorPageComponent_div_1_div_39_Template, 4, 1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.fornecedor.categoria);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.fornecedor.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.cidade);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.rating);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.fornecedor.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.fornecedor.imagens);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.selectedImage);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.fornecedor.depoimentos);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.telefone);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.instagram);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.website);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.telefone);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.fornecedor.email);
  }
}
function FornecedorPageComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Fornecedor n\u00E3o encontrado.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
let FornecedorPageComponent = /*#__PURE__*/(() => {
  class FornecedorPageComponent {
    route;
    fornecedores;
    cdr;
    fornecedor;
    selectedImage;
    constructor(route, fornecedores, cdr) {
      this.route = route;
      this.fornecedores = fornecedores;
      this.cdr = cdr;
    }
    ngOnInit() {
      const identifier = this.route.snapshot.params['id']; // pode ser GUID ou slug
      if (identifier) {
        this.fornecedores.getById(identifier).subscribe(f => {
          this.fornecedor = f;
          this.trackPageView();
          // For OnPush change detection, ensure view updates after async data arrives
          this.cdr.markForCheck();
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
    getSiteLink() {
      return this.fornecedor?.website || '#';
    }
    getInstagramLink() {
      const instagram = this.fornecedor?.instagram || '';
      const username = instagram.replace('@', '').trim();
      return username ? `https://instagram.com/${username}` : '#';
    }
    static ɵfac = function FornecedorPageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || FornecedorPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_fornecedores_data__WEBPACK_IMPORTED_MODULE_0__.FornecedoresData), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef));
    };
    static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: FornecedorPageComponent,
      selectors: [["app-fornecedor-page"]],
      decls: 4,
      vars: 2,
      consts: [["notfound", ""], [1, "container", "mx-auto", "px-4", "py-10"], ["class", "grid lg:grid-cols-3 gap-6", 4, "ngIf", "ngIfElse"], [1, "grid", "lg:grid-cols-3", "gap-6"], [1, "lg:col-span-2"], [1, "bg-white", "rounded-2xl", "shadow-lg", "p-8", "mb-6", "border", "border-gray-100"], [1, "flex", "items-start", "gap-6"], [1, "flex-1"], [1, "flex", "items-center", "gap-3", "mb-3"], [1, "text-xs", "bg-rose-500", "text-white", "px-3", "py-1", "rounded-full", "font-semibold", "shadow-sm"], [1, "text-3xl", "md:text-4xl", "font-serif", "font-bold", "text-gray-900", "mb-4"], [1, "text-base", "text-gray-600", "flex", "items-center", "gap-4", "mb-4"], ["class", "flex items-center gap-2", 4, "ngIf"], ["class", "flex items-center gap-1 text-yellow-500 font-semibold", 4, "ngIf"], [1, "text-gray-700", "leading-relaxed"], [1, "bg-white", "rounded-2xl", "shadow-lg", "p-8", "border", "border-gray-100", "mb-6"], [1, "font-serif", "font-bold", "text-2xl", "text-gray-900", "mb-6"], [1, "grid", "grid-cols-2", "gap-4"], [4, "ngFor", "ngForOf"], ["class", "fixed inset-0 z-50 flex items-center justify-center p-4", 4, "ngIf"], [1, "py-12", "px-2", "mb-6", "rounded-2xl", "bg-depoimentos"], [1, "text-3xl", "md:text-4xl", "font-serif", "font-bold", "text-gray-900", "mb-8", "text-center"], [1, "flex", "flex-wrap", "gap-6"], ["class", "bg-white rounded-xl shadow p-6 border border-rose-100 flex-1 min-w-[280px] max-w-[340px]", "style", "box-shadow:0 2px 8px #0001;", 4, "ngFor", "ngForOf"], [1, "bg-white", "rounded-2xl", "shadow-lg", "p-6", "border", "border-gray-100", "sticky", "top-4"], [1, "font-serif", "font-bold", "text-xl", "text-gray-900", "mb-6"], [1, "flex", "flex-col", "gap-3", "mb-6"], ["target", "_blank", "class", "inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-lg py-3 px-4 font-semibold transition-all duration-300 shadow-sm hover:shadow-md", 3, "href", 4, "ngIf"], ["target", "_blank", "class", "inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg py-3 px-4 font-semibold transition-all duration-300 shadow-sm hover:shadow-md", 3, "href", 4, "ngIf"], ["target", "_blank", "class", "inline-flex items-center justify-center gap-2 border border-gray-400 text-gray-700 bg-white hover:bg-gray-50 rounded-lg py-3 px-4 font-semibold transition-all duration-300 shadow-sm hover:shadow-md", 3, "href", 4, "ngIf"], [1, "text-sm", "text-gray-600"], [1, "mb-2", "font-semibold"], ["class", "flex items-center gap-2 mb-2", 4, "ngIf"], [1, "flex", "items-center", "gap-2"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 1111.314-11.314l-4.243 4.243z"], [1, "flex", "items-center", "gap-1", "text-yellow-500", "font-semibold"], ["alt", "imagem", "loading", "lazy", "decoding", "async", "fetchpriority", "low", "width", "320", "height", "160", 1, "w-full", "h-40", "object-cover", "rounded-xl", "cursor-pointer", "hover:shadow-xl", "transition-all", "duration-300", "hover:scale-105", 3, "click", "ngSrc"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "p-4"], [1, "absolute", "inset-0", "bg-black", "bg-opacity-70", 3, "click"], [1, "relative", "max-w-4xl", "max-h-[90vh]", "w-full"], ["aria-label", "Fechar", 1, "absolute", "right-2", "top-2", "z-60", "bg-white", "rounded-full", "p-2", "shadow", 3, "click"], ["alt", "imagem ampliada", "decoding", "async", 1, "w-full", "h-auto", "max-h-[90vh]", "object-contain", "rounded", 3, "src"], [1, "bg-white", "rounded-xl", "shadow", "p-6", "border", "border-rose-100", "flex-1", "min-w-[280px]", "max-w-[340px]", 2, "box-shadow", "0 2px 8px #0001"], [1, "text-rose-400", "text-3xl", "mb-2"], [1, "italic", "text-gray-700", "mb-4"], [1, "font-serif", "font-bold", "text-rose-700", "text-right"], ["target", "_blank", 1, "inline-flex", "items-center", "justify-center", "gap-2", "bg-green-500", "hover:bg-green-600", "text-white", "rounded-lg", "py-3", "px-4", "font-semibold", "transition-all", "duration-300", "shadow-sm", "hover:shadow-md", 3, "href"], ["target", "_blank", 1, "inline-flex", "items-center", "justify-center", "gap-2", "bg-gradient-to-r", "from-purple-600", "to-pink-600", "hover:from-purple-700", "hover:to-pink-700", "text-white", "rounded-lg", "py-3", "px-4", "font-semibold", "transition-all", "duration-300", "shadow-sm", "hover:shadow-md", 3, "href"], ["target", "_blank", 1, "inline-flex", "items-center", "justify-center", "gap-2", "border", "border-gray-400", "text-gray-700", "bg-white", "hover:bg-gray-50", "rounded-lg", "py-3", "px-4", "font-semibold", "transition-all", "duration-300", "shadow-sm", "hover:shadow-md", 3, "href"], [1, "flex", "items-center", "gap-2", "mb-2"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", 1, "w-4", "h-4", "text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"], [1, "bg-white", "rounded-xl", "shadow", "p-6", "border", "border-gray-100", "text-center"]],
      template: function FornecedorPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, FornecedorPageComponent_div_1_Template, 40, 13, "div", 2)(2, FornecedorPageComponent_ng_template_2_Template, 2, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          const notfound_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.fornecedor)("ngIfElse", notfound_r6);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgOptimizedImage],
      styles: [".container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block}\n\n\n\n.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}\n.z-60[_ngcontent-%COMP%]{z-index:60}\n\n\n\n.bg-depoimentos[_ngcontent-%COMP%] {\n\tbackground:\n\t\tlinear-gradient(rgba(244, 63, 94, 0.08), rgba(244, 63, 94, 0.08)), \n\n\t\turl('/assets/bg-depoimentos.jpg') repeat;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm5lY2Vkb3ItcGFnZS5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZSxhQUFhOztBQUU1Qiw0Q0FBNEM7QUFDNUMsZ0JBQWdCLGNBQWM7QUFDOUIsTUFBTSxVQUFVOztBQUVoQix3RUFBd0U7QUFDeEU7Q0FDQzs7MENBRXlDO0FBQzFDIiwiZmlsZSI6ImZvcm5lY2Vkb3ItcGFnZS5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyIGltZ3tkaXNwbGF5OmJsb2NrfVxuXG4vKiBNb2RhbC9vdmVybGF5IHR3ZWFrcyBmb3IgZXhwYW5kZWQgaW1hZ2UgKi9cbi5jdXJzb3ItcG9pbnRlcntjdXJzb3I6cG9pbnRlcn1cbi56LTYwe3otaW5kZXg6NjB9XG5cbi8qIEZ1bmRvIGRlcG9pbWVudG9zIGF1dG9tYXRpemFkbyBjb20gY29yIHByaW5jaXBhbCBkbyBzaXRlIChyb3NlLTYwMCkgKi9cbi5iZy1kZXBvaW1lbnRvcyB7XG5cdGJhY2tncm91bmQ6XG5cdFx0bGluZWFyLWdyYWRpZW50KHJnYmEoMjQ0LCA2MywgOTQsIDAuMDgpLCByZ2JhKDI0NCwgNjMsIDk0LCAwLjA4KSksIC8qIHJvc2UtNjAwICovXG5cdFx0dXJsKCcvYXNzZXRzL2JnLWRlcG9pbWVudG9zLmpwZycpIHJlcGVhdDtcbn1cbiJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZm9ybmVjZWRvcmVzL2Zvcm5lY2Vkb3ItcGFnZS5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZSxhQUFhOztBQUU1Qiw0Q0FBNEM7QUFDNUMsZ0JBQWdCLGNBQWM7QUFDOUIsTUFBTSxVQUFVOztBQUVoQix3RUFBd0U7QUFDeEU7Q0FDQzs7MENBRXlDO0FBQzFDOztBQUVBLDQxQkFBNDFCIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lciBpbWd7ZGlzcGxheTpibG9ja31cblxuLyogTW9kYWwvb3ZlcmxheSB0d2Vha3MgZm9yIGV4cGFuZGVkIGltYWdlICovXG4uY3Vyc29yLXBvaW50ZXJ7Y3Vyc29yOnBvaW50ZXJ9XG4uei02MHt6LWluZGV4OjYwfVxuXG4vKiBGdW5kbyBkZXBvaW1lbnRvcyBhdXRvbWF0aXphZG8gY29tIGNvciBwcmluY2lwYWwgZG8gc2l0ZSAocm9zZS02MDApICovXG4uYmctZGVwb2ltZW50b3Mge1xuXHRiYWNrZ3JvdW5kOlxuXHRcdGxpbmVhci1ncmFkaWVudChyZ2JhKDI0NCwgNjMsIDk0LCAwLjA4KSwgcmdiYSgyNDQsIDYzLCA5NCwgMC4wOCkpLCAvKiByb3NlLTYwMCAqL1xuXHRcdHVybCgnL2Fzc2V0cy9iZy1kZXBvaW1lbnRvcy5qcGcnKSByZXBlYXQ7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
      changeDetection: 0
    });
  }
  return FornecedorPageComponent;
})();

/***/ }),

/***/ 7237:
/*!*********************************************************************!*\
  !*** ./src/app/features/fornecedores/services/fornecedores-data.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FornecedoresData: () => (/* binding */ FornecedoresData)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 271);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 1318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/api.service */ 7981);




let FornecedoresData = /*#__PURE__*/(() => {
  class FornecedoresData {
    api;
    search(nome, page = 1, pageSize = 12, destaque) {
      const params = {
        nome,
        page,
        pageSize
      };
      if (destaque !== undefined) params.destaque = destaque;
      if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO !== null) {
        params.publicado = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO;
      }
      return this.api.get(`/fornecedores/search`, params).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(r => r.data));
    }
    constructor(api) {
      this.api = api;
    }
    getAll(page = 1, pageSize = 12) {
      // Usar /fornecedores/ativos para exibir apenas fornecedores ativos (público)
      const params = {
        page,
        pageSize
      };
      if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO !== null) {
        params.publicado = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO;
      }
      return this.api.get(`/fornecedores/ativos`, params).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(r => r.data));
    }
    getDestaques(page = 1, pageSize = 24) {
      // Destaques: alguns ambientes podem retornar { data: [...] } (wrapper) ou array direto
      const params = {
        page,
        pageSize,
        destaque: true
      };
      if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO !== null) {
        params.publicado = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO;
      }
      return this.api.get(`/fornecedores/ativos`, params).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(r => {
        let list = [];
        if (Array.isArray(r)) list = r;else if (r && Array.isArray(r.data)) list = r.data;else {
          console.warn('[DESTAQUES] formato inesperado da resposta:', r);
        }
        // Se a API ignorou o parâmetro destaque e retornou tudo, filtrar localmente
        if (list.length && list.some(f => f.destaque !== true)) {
          const filtered = list.filter(f => f.destaque);
          if (filtered.length) return filtered;
        }
        return list.filter(f => f.destaque); // garante só destaque
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(list => {
        // Se não houver destaques, retornar lista vazia (não mostrar nada)
        if (list.length === 0) {
          console.warn('[DESTAQUES] nenhum fornecedor com destaque=true encontrado');
        }
        return list;
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(err => {
        console.error('[DESTAQUES] API error:', err);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)([]);
      }));
    }
    getById(identifier) {
      const isGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(identifier);
      const endpoint = isGuid ? `/fornecedores/${identifier}` : `/fornecedores/slug/${identifier}`;
      return this.api.get(endpoint).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(detail => ({
        id: detail.id,
        nome: detail.nome,
        slug: detail.slug,
        descricao: detail.descricao,
        cidade: detail.cidade,
        telefone: detail.telefone,
        email: detail.email,
        website: detail.website,
        instagram: detail.instagram,
        destaque: detail.destaque,
        seloFornecedor: detail.seloFornecedor,
        ativo: detail.ativo,
        rating: detail.rating,
        visitas: detail.visitas,
        categoria: detail.categoria?.nome,
        imagens: detail.imagens?.map(m => m.url) || [],
        depoimentos: detail.testemunhos?.map(t => ({
          texto: t.descricao,
          casal: t.nome
        })) || []
      })), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(err => {
        throw err;
      }));
    }
    getByCategoria(categoriaSlugOrId) {
      // Usar endpoint correto: /fornecedores/ativos/categoria/{categoriaSlugOrId}
      const params = {
        page: 1,
        pageSize: 100
      };
      if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO !== null) {
        params.publicado = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO;
      }
      return this.api.get(`/fornecedores/ativos/categoria/${categoriaSlugOrId}`, params).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(r => r.data));
    }
    getDestaquesByCategoria(categoriaSlugOrId) {
      // Tenta obter somente fornecedores destaque na categoria; se API não suportar param, filtra localmente
      const params = {
        page: 1,
        pageSize: 100,
        destaque: true
      };
      if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO !== null) {
        params.publicado = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO;
      }
      return this.api.get(`/fornecedores/ativos/categoria/${categoriaSlugOrId}`, params).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(r => (r.data || []).filter(f => f.destaque)), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(err => {
        console.warn('[DESTAQUES BY CATEGORIA] falling back filtering local:', err);
        return this.getByCategoria(categoriaSlugOrId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(list => list.filter(f => f.destaque)));
      }));
    }
    static ɵfac = function FornecedoresData_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || FornecedoresData)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_core_api_service__WEBPACK_IMPORTED_MODULE_1__.ApiService));
    };
    static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
      token: FornecedoresData,
      factory: FornecedoresData.ɵfac,
      providedIn: 'root'
    });
  }
  return FornecedoresData;
})();

/***/ }),

/***/ 7981:
/*!*************************************!*\
  !*** ./src/app/core/api.service.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiService: () => (/* binding */ ApiService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 9648);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);




let ApiService = /*#__PURE__*/(() => {
  class ApiService {
    http;
    constructor(http) {
      this.http = http;
    }
    get(url, params) {
      let httpParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpParams();
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          if (v !== undefined && v !== null) httpParams = httpParams.set(k, String(v));
        });
      }
      return this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.API_BASE_URL}${url}`, {
        params: httpParams
      });
    }
    post(url, body) {
      return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.API_BASE_URL}${url}`, body);
    }
    static ɵfac = function ApiService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
    };
    static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: ApiService,
      factory: ApiService.ɵfac,
      providedIn: 'root'
    });
  }
  return ApiService;
})();

/***/ })

}]);
//# sourceMappingURL=451.js.map