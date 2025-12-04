"use strict";
(self["webpackChunkguia_noivas"] = self["webpackChunkguia_noivas"] || []).push([[386],{

/***/ 467:
/*!******************************************************************!*\
  !*** ./src/app/features/categorias/categorias-routing-module.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CategoriasRoutingModule: () => (/* binding */ CategoriasRoutingModule),
/* harmony export */   getPrerenderParams: () => (/* binding */ getPrerenderParams)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var _categorias_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./categorias-page */ 3093);
/* harmony import */ var _categoria_detalhe_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./categoria-detalhe-page */ 2634);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);





const routes = [{
  path: '',
  component: _categorias_page__WEBPACK_IMPORTED_MODULE_0__.CategoriasPageComponent
}, {
  path: ':id',
  component: _categoria_detalhe_page__WEBPACK_IMPORTED_MODULE_1__.CategoriaDetalhePageComponent
}];
// For prerendering dynamic categoria IDs
function getPrerenderParams() {
  // Sem acesso DI/HttpClient aqui; retornamos array vazio (rotas dinâmicas serão resolvidas em runtime)
  return Promise.resolve([]);
}
let CategoriasRoutingModule = /*#__PURE__*/(() => {
  class CategoriasRoutingModule {
    static ɵfac = function CategoriasRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CategoriasRoutingModule)();
    };
    static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
      type: CategoriasRoutingModule
    });
    static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
    });
  }
  return CategoriasRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](CategoriasRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 2386:
/*!**********************************************************!*\
  !*** ./src/app/features/categorias/categorias-module.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CategoriasModule: () => (/* binding */ CategoriasModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _categorias_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./categorias-routing-module */ 467);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);



let CategoriasModule = /*#__PURE__*/(() => {
  class CategoriasModule {
    static ɵfac = function CategoriasModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CategoriasModule)();
    };
    static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: CategoriasModule
    });
    static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _categorias_routing_module__WEBPACK_IMPORTED_MODULE_0__.CategoriasRoutingModule]
    });
  }
  return CategoriasModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](CategoriasModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _categorias_routing_module__WEBPACK_IMPORTED_MODULE_0__.CategoriasRoutingModule]
  });
})();

/***/ }),

/***/ 2634:
/*!***************************************************************!*\
  !*** ./src/app/features/categorias/categoria-detalhe-page.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CategoriaDetalhePageComponent: () => (/* binding */ CategoriaDetalhePageComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 6647);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 9999);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 2596);
/* harmony import */ var _features_fornecedores_services_fornecedores_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../features/fornecedores/services/fornecedores-data */ 7237);
/* harmony import */ var _services_categorias_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/categorias-data */ 589);











const _c0 = a0 => ["/fornecedores", a0];
const _c1 = () => [1, 2, 3, 4, 5, 6, 7, 8];
function CategoriaDetalhePageComponent_div_21_div_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "svg", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "path", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, " VERIFICADO ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function CategoriaDetalhePageComponent_div_21_div_1_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "svg", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "path", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const fornecedor_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](fornecedor_r2.cidade);
  }
}
function CategoriaDetalhePageComponent_div_21_div_1_p_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const fornecedor_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](fornecedor_r2.descricao);
  }
}
function CategoriaDetalhePageComponent_div_21_div_1_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "svg", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "path", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "(128)");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const fornecedor_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](fornecedor_r2.rating);
  }
}
function CategoriaDetalhePageComponent_div_21_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 17)(1, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "svg", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "path", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "img", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, CategoriaDetalhePageComponent_div_21_div_1_span_6_Template, 4, 0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 24)(8, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "h3", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, CategoriaDetalhePageComponent_div_21_div_1_div_12_Template, 5, 1, "div", 27)(13, CategoriaDetalhePageComponent_div_21_div_1_p_13_Template, 2, 1, "p", 28)(14, CategoriaDetalhePageComponent_div_21_div_1_div_14_Template, 7, 1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 30)(16, "a", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, " Ver Perfil ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const fornecedor_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("alt", fornecedor_r2.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSrc", (fornecedor_r2.primaryImage == null ? null : fornecedor_r2.primaryImage.url) || "assets/fornecedores/placeholder.jpg");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", fornecedor_r2.seloFornecedor);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"]((fornecedor_r2.categoria == null ? null : fornecedor_r2.categoria.nome) || "FOTOGRAFIA");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](fornecedor_r2.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", fornecedor_r2.cidade);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", fornecedor_r2.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", fornecedor_r2.rating);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](14, _c0, fornecedor_r2.slug));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-event-category", "Navigation")("data-event-action", "Click Ver Perfil - Lista")("data-vendor-id", fornecedor_r2.id)("data-vendor-name", fornecedor_r2.nome)("data-vendor-category", fornecedor_r2.categoria == null ? null : fornecedor_r2.categoria.nome);
  }
}
function CategoriaDetalhePageComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, CategoriaDetalhePageComponent_div_21_div_1_Template, 18, 16, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const fornecedores_r3 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", fornecedores_r3);
  }
}
function CategoriaDetalhePageComponent_ng_template_23_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "div", 47)(2, "div", 48)(3, "div", 49)(4, "div", 50)(5, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function CategoriaDetalhePageComponent_ng_template_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, CategoriaDetalhePageComponent_ng_template_23_div_1_Template, 6, 0, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](1, _c1));
  }
}
let CategoriaDetalhePageComponent = /*#__PURE__*/(() => {
  class CategoriaDetalhePageComponent {
    route;
    fornecedores;
    categorias;
    categoriaId$;
    categoriaNome$;
    fornecedores$;
    destaquesCategoria$;
    sortOrder$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject('relevante');
    sortedFornecedores$;
    constructor(route, fornecedores, categorias) {
      this.route = route;
      this.fornecedores = fornecedores;
      this.categorias = categorias;
      this.categoriaId$ = this.route.paramMap.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(params => params.get('id') || ''));
      this.fornecedores$ = this.categoriaId$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMap)(id => this.fornecedores.getByCategoria(id)));
      this.categoriaNome$ = this.categoriaId$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMap)(slug => this.categorias.getBySlug(slug)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(categoria => categoria?.nome || ''));
      this.destaquesCategoria$ = this.fornecedores$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(list => (list || []).filter(f => f.destaque)));
      this.sortedFornecedores$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.combineLatest)([this.fornecedores$, this.sortOrder$]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(([list, order]) => this.sortFornecedores(list, order)));
    }
    onSortChange(event) {
      const value = event.target.value;
      this.sortOrder$.next(value);
    }
    sortFornecedores(list, order) {
      const sorted = [...list];
      switch (order) {
        case 'relevante':
          return sorted.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
        case 'rating':
          return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        case 'nome':
          return sorted.sort((a, b) => a.nome.localeCompare(b.nome));
        default:
          return sorted;
      }
    }
    getSpecialties(fornecedor) {
      // Mock - ajustar quando backend fornecer tags/especialidades
      const specialties = ['DOCUMENTAL', 'ARTÍSTICO', 'DRONE'];
      return specialties.slice(0, 3);
    }
    static ɵfac = function CategoriaDetalhePageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CategoriaDetalhePageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_features_fornecedores_services_fornecedores_data__WEBPACK_IMPORTED_MODULE_0__.FornecedoresData), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_categorias_data__WEBPACK_IMPORTED_MODULE_1__.CategoriasData));
    };
    static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: CategoriaDetalhePageComponent,
      selectors: [["app-categoria-detalhe-page"]],
      decls: 25,
      vars: 7,
      consts: [["fornecedoresLoading", ""], [1, "container", "mx-auto", "px-4", "py-8"], [1, "mb-4"], ["routerLink", "/", 1, "text-sm", "text-gray-600", "hover:text-rose-600", "transition-colors", "flex", "items-center"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "mr-1"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 19l-7-7 7-7"], [1, "flex", "flex-col", "md:flex-row", "md:items-center", "md:justify-between", "mb-6"], [1, "text-3xl", "font-serif", "font-bold", "text-gray-900", "mb-1"], [1, "text-sm", "text-gray-600"], [1, "mt-4", "md:mt-0"], [1, "px-4", "py-2", "border", "border-gray-300", "rounded-lg", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-rose-500", 3, "change"], ["value", "relevante"], ["value", "rating"], ["value", "nome"], ["class", "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", 4, "ngIf", "ngIfElse"], [1, "grid", "grid-cols-2", "md:grid-cols-3", "lg:grid-cols-4", "gap-4"], ["class", "bg-white rounded-lg shadow-sm hover:shadow-lg border border-gray-200 flex flex-col overflow-hidden transition-all duration-300 group relative", 4, "ngFor", "ngForOf"], [1, "bg-white", "rounded-lg", "shadow-sm", "hover:shadow-lg", "border", "border-gray-200", "flex", "flex-col", "overflow-hidden", "transition-all", "duration-300", "group", "relative"], [1, "absolute", "top-3", "right-3", "z-10", "w-8", "h-8", "bg-white", "rounded-full", "shadow-md", "flex", "items-center", "justify-center", "hover:bg-rose-50", "transition-colors"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-5", "h-5", "text-gray-400", "hover:text-rose-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"], [1, "relative", "h-48", "overflow-hidden"], ["loading", "lazy", "decoding", "async", "width", "300", "height", "220", 1, "w-full", "h-full", "object-cover", 3, "ngSrc", "alt"], ["class", "absolute top-3 left-3 text-[10px] bg-teal-600 text-white px-2 py-1 rounded font-bold shadow-md uppercase flex items-center gap-1", 4, "ngIf"], [1, "p-4", "flex", "flex-col", "flex-1"], [1, "text-[11px]", "text-rose-600", "font-bold", "uppercase", "mb-2"], [1, "font-serif", "font-bold", "text-lg", "text-gray-900", "mb-2"], ["class", "flex items-center gap-1 text-sm text-gray-600 mb-2", 4, "ngIf"], ["class", "text-sm text-gray-600 mb-3 line-clamp-2", 4, "ngIf"], ["class", "flex items-center gap-1 mb-3", 4, "ngIf"], [1, "mt-auto"], [1, "block", "w-full", "px-4", "py-2", "border", "border-rose-400", "text-rose-600", "bg-white", "rounded-md", "text-sm", "font-semibold", "hover:bg-rose-50", "transition-colors", "text-center", 3, "routerLink"], [1, "absolute", "top-3", "left-3", "text-[10px]", "bg-teal-600", "text-white", "px-2", "py-1", "rounded", "font-bold", "shadow-md", "uppercase", "flex", "items-center", "gap-1"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "currentColor", "viewBox", "0 0 20 20", 1, "w-3", "h-3"], ["fill-rule", "evenodd", "d", "M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", "clip-rule", "evenodd"], [1, "flex", "items-center", "gap-1", "text-sm", "text-gray-600", "mb-2"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 1111.314-11.314l-4.243 4.243z"], [1, "text-xs"], [1, "text-sm", "text-gray-600", "mb-3", "line-clamp-2"], [1, "flex", "items-center", "gap-1", "mb-3"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "currentColor", "viewBox", "0 0 20 20", 1, "w-4", "h-4", "text-yellow-500"], ["d", "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z"], [1, "text-sm", "font-semibold", "text-gray-900"], [1, "text-xs", "text-gray-500"], ["class", "bg-white rounded-lg border border-gray-200 p-4 animate-pulse flex flex-col", 4, "ngFor", "ngForOf"], [1, "bg-white", "rounded-lg", "border", "border-gray-200", "p-4", "animate-pulse", "flex", "flex-col"], [1, "h-48", "bg-gray-200", "rounded", "mb-3"], [1, "h-4", "bg-gray-200", "rounded", "w-2/3", "mb-2"], [1, "h-3", "bg-gray-100", "rounded", "w-1/2", "mb-2"], [1, "h-3", "bg-gray-100", "rounded", "w-4/5", "mb-4"], [1, "mt-auto", "h-8", "bg-gray-200", "rounded"]],
      template: function CategoriaDetalhePageComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "section", 1)(1, "div", 2)(2, "a", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "svg", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "path", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " Voltar para Home ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 6)(7, "div")(8, "h1", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](10, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "p", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Mostrando os melhores profissionais para o seu evento.");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 9)(14, "select", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function CategoriaDetalhePageComponent_Template_select_change_14_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.onSortChange($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "option", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Mais Relevantes");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "option", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Melhor Avalia\u00E7\u00E3o");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "option", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Nome A-Z");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](21, CategoriaDetalhePageComponent_div_21_Template, 2, 1, "div", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](22, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](23, CategoriaDetalhePageComponent_ng_template_23_Template, 2, 2, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        }
        if (rf & 2) {
          const fornecedoresLoading_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](24);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](10, 3, ctx.categoriaNome$));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](22, 5, ctx.sortedFornecedores$))("ngIfElse", fornecedoresLoading_r4);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.AsyncPipe, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ɵNgSelectMultipleOption"], _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgOptimizedImage],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYXRlZ29yaWEtZGV0YWxoZS1wYWdlLmNzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvY2F0ZWdvcmlhcy9jYXRlZ29yaWEtZGV0YWxoZS1wYWdlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0tBQXdLIiwic291cmNlUm9vdCI6IiJ9 */"],
      changeDetection: 0
    });
  }
  return CategoriaDetalhePageComponent;
})();

/***/ }),

/***/ 3093:
/*!********************************************************!*\
  !*** ./src/app/features/categorias/categorias-page.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CategoriasPageComponent: () => (/* binding */ CategoriasPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 271);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 6647);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 1873);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_categorias_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/categorias-data */ 589);
/* harmony import */ var _fornecedores_services_fornecedores_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fornecedores/services/fornecedores-data */ 7237);








const _c0 = a0 => ["/categorias", a0];
const _c1 = a0 => ["/fornecedores", a0];
const _c2 = () => [1, 2, 3, 4, 5, 6];
function CategoriasPageComponent_div_6_div_1_p_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r1.categoria.descricao);
  }
}
function CategoriasPageComponent_div_6_div_1_div_7_li_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "a", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const fornecedor_r2 = ctx.$implicit;
    const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](7, _c1, fornecedor_r2.slug));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-event-category", "Navigation")("data-event-action", "Click Destaque - Categoria")("data-vendor-id", fornecedor_r2.id)("data-vendor-name", fornecedor_r2.nome)("data-vendor-category", item_r1.categoria.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](fornecedor_r2.nome);
  }
}
function CategoriasPageComponent_div_6_div_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 17)(1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "svg", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "path", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, " DESTAQUES ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "ul", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, CategoriasPageComponent_div_6_div_1_div_7_li_6_Template, 4, 9, "li", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", item_r1.fornecedores);
  }
}
function CategoriasPageComponent_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 8)(1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "img", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 11)(4, "h2", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, CategoriasPageComponent_div_6_div_1_p_6_Template, 2, 1, "p", 13)(7, CategoriasPageComponent_div_6_div_1_div_7_Template, 7, 1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, " Ver todos fornecedores ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSrc", item_r1.categoria.imageUrl || "assets/categorias/placeholder.jpg")("alt", item_r1.categoria.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r1.categoria.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", item_r1.categoria.descricao);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", item_r1.fornecedores.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](6, _c0, item_r1.categoria.slug));
  }
}
function CategoriasPageComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, CategoriasPageComponent_div_6_div_1_Template, 10, 8, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const items_r3 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", items_r3);
  }
}
function CategoriasPageComponent_ng_template_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "div", 28)(2, "div", 29)(3, "div", 30)(4, "div", 31)(5, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function CategoriasPageComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, CategoriasPageComponent_ng_template_8_div_1_Template, 6, 0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](1, _c2));
  }
}
let CategoriasPageComponent = /*#__PURE__*/(() => {
  class CategoriasPageComponent {
    categoriasData;
    fornecedoresData;
    categoriasComFornecedores$;
    constructor(categoriasData, fornecedoresData) {
      this.categoriasData = categoriasData;
      this.fornecedoresData = fornecedoresData;
      this.categoriasComFornecedores$ = this.categoriasData.getAll().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(cats => this.shuffleArray(cats)), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(cats => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.forkJoin)(cats.map(cat => this.fornecedoresData.getDestaquesByCategoria(cat.slug).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(destaques => ({
        categoria: cat,
        fornecedores: this.shuffleArray(destaques).slice(0, 6)
      })))))));
    }
    shuffleArray(array) {
      return array.map(value => ({
        value,
        sort: Math.random()
      })).sort((a, b) => a.sort - b.sort).map(({
        value
      }) => value);
    }
    static ɵfac = function CategoriasPageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CategoriasPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_categorias_data__WEBPACK_IMPORTED_MODULE_0__.CategoriasData), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_fornecedores_services_fornecedores_data__WEBPACK_IMPORTED_MODULE_1__.FornecedoresData));
    };
    static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: CategoriasPageComponent,
      selectors: [["app-categorias-page"]],
      decls: 10,
      vars: 4,
      consts: [["categoriasLoading", ""], [1, "container", "mx-auto", "px-4", "py-12"], [1, "text-center", "mb-12"], [1, "text-4xl", "md:text-5xl", "font-serif", "font-bold", "text-gray-900", "mb-3"], [1, "text-gray-600", "text-lg"], ["class", "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8", 4, "ngIf", "ngIfElse"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "gap-8"], ["class", "bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 flex flex-col transition-all duration-300 hover:-translate-y-2 overflow-hidden group h-full", 4, "ngFor", "ngForOf"], [1, "bg-white", "rounded-2xl", "shadow-md", "hover:shadow-2xl", "border", "border-gray-100", "flex", "flex-col", "transition-all", "duration-300", "hover:-translate-y-2", "overflow-hidden", "group", "h-full"], [1, "h-48", "overflow-hidden"], ["loading", "lazy", "decoding", "async", "width", "240", "height", "180", 1, "w-full", "h-full", "object-cover", "group-hover:scale-110", "transition-transform", "duration-500", 3, "ngSrc", "alt"], [1, "p-6", "flex", "flex-col", "flex-1"], [1, "font-serif", "font-bold", "text-2xl", "text-rose-700", "mb-2"], ["class", "text-gray-600 mb-4 flex-grow", 4, "ngIf"], ["class", "mb-4 min-h-[80px]", 4, "ngIf"], [1, "mt-auto", "block", "px-6", "py-3", "border", "border-rose-400", "text-rose-600", "bg-white", "rounded-lg", "font-semibold", "hover:bg-rose-50", "transition-all", "duration-300", "text-center", "shadow-sm", "hover:shadow-md", 3, "routerLink"], [1, "text-gray-600", "mb-4", "flex-grow"], [1, "mb-4", "min-h-[80px]"], [1, "flex", "items-center", "font-semibold", "text-[13px]", "tracking-wide", "text-amber-500", "uppercase", "mb-2"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 20 20", "fill", "currentColor", 1, "w-4", "h-4", "mr-1"], ["d", "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z"], [1, "space-y-1"], ["class", "flex items-start text-sm", 4, "ngFor", "ngForOf"], [1, "flex", "items-start", "text-sm"], [1, "mt-[6px]", "w-2", "h-2", "rounded-full", "bg-rose-500", "inline-block", "mr-2"], [1, "text-gray-800", "hover:text-rose-600", "transition-colors", 3, "routerLink"], ["class", "bg-white rounded-2xl border border-gray-100 p-6 animate-pulse h-full", 4, "ngFor", "ngForOf"], [1, "bg-white", "rounded-2xl", "border", "border-gray-100", "p-6", "animate-pulse", "h-full"], [1, "h-48", "bg-gray-200", "rounded", "mb-4"], [1, "h-6", "bg-gray-200", "rounded", "w-3/4", "mb-3"], [1, "h-4", "bg-gray-100", "rounded", "w-full", "mb-2"], [1, "h-4", "bg-gray-100", "rounded", "w-5/6", "mb-4"], [1, "mt-auto", "h-10", "bg-gray-200", "rounded"]],
      template: function CategoriasPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "section", 1)(1, "div", 2)(2, "h1", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Categorias");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "p", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Encontre os melhores profissionais para o seu casamento");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, CategoriasPageComponent_div_6_Template, 2, 1, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, CategoriasPageComponent_ng_template_8_Template, 2, 2, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        }
        if (rf & 2) {
          const categoriasLoading_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](7, 2, ctx.categoriasComFornecedores$))("ngIfElse", categoriasLoading_r4);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.AsyncPipe, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgOptimizedImage],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYXRlZ29yaWFzLXBhZ2UuY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvY2F0ZWdvcmlhcy9jYXRlZ29yaWFzLXBhZ2UuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxnS0FBZ0siLCJzb3VyY2VSb290IjoiIn0= */"],
      changeDetection: 0
    });
  }
  return CategoriasPageComponent;
})();

/***/ })

}]);
//# sourceMappingURL=386.js.map