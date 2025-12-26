"use strict";
(self["webpackChunkguia_noivas"] = self["webpackChunkguia_noivas"] || []).push([[716],{

/***/ 2575:
/*!***********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/operators/debounceTime.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounceTime: () => (/* binding */ debounceTime)
/* harmony export */ });
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ 8473);
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ 3200);
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OperatorSubscriber */ 1687);



function debounceTime(dueTime, scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__.asyncScheduler) {
  return (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)((source, subscriber) => {
    let activeTask = null;
    let lastValue = null;
    let lastTime = null;
    const emit = () => {
      if (activeTask) {
        activeTask.unsubscribe();
        activeTask = null;
        const value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    };
    function emitWhenIdle() {
      const targetTime = lastTime + dueTime;
      const now = scheduler.now();
      if (now < targetTime) {
        activeTask = this.schedule(undefined, targetTime - now);
        subscriber.add(activeTask);
        return;
      }
      emit();
    }
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(subscriber, value => {
      lastValue = value;
      lastTime = scheduler.now();
      if (!activeTask) {
        activeTask = scheduler.schedule(emitWhenIdle, dueTime);
        subscriber.add(activeTask);
      }
    }, () => {
      emit();
      subscriber.complete();
    }, undefined, () => {
      lastValue = activeTask = null;
    }));
  });
}

/***/ }),

/***/ 4049:
/*!********************************************************************!*\
  !*** ./src/app/features/home/destaques-semana/destaques-semana.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DestaquesSemanaComponent: () => (/* binding */ DestaquesSemanaComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 271);
/* harmony import */ var _core_cidade_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/cidade.service */ 6735);
/* harmony import */ var _fornecedores_services_fornecedores_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../fornecedores/services/fornecedores-data */ 7237);









const _c0 = a0 => ["fornecedores", a0];
const _c1 = () => [1, 2, 3, 4];
function DestaquesSemanaComponent_div_5_ng_container_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 9)(1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 12)(4, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "h3", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "svg", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "path", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, " Ver Perfil Completo ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const destaque_r1 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", destaque_r1.imagem, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"])("alt", destaque_r1.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](destaque_r1.categoria);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](destaque_r1.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", destaque_r1.local, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", ctx_r1.buildUrl(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](11, _c0, destaque_r1.slug)));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("data-event-category", "Navigation")("data-event-action", "Click Ver Perfil - Destaque")("data-vendor-id", destaque_r1.id)("data-vendor-name", destaque_r1.nome)("data-vendor-category", destaque_r1.categoria);
  }
}
function DestaquesSemanaComponent_div_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, DestaquesSemanaComponent_div_5_ng_container_1_div_1_Template, 14, 13, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const destaques_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", destaques_r3);
  }
}
function DestaquesSemanaComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, DestaquesSemanaComponent_div_5_ng_container_1_Template, 2, 1, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const destaques_r3 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    const loading_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", destaques_r3.length)("ngIfElse", loading_r4);
  }
}
function DestaquesSemanaComponent_ng_template_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "div", 22)(2, "div", 23)(3, "div", 24)(4, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function DestaquesSemanaComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, DestaquesSemanaComponent_ng_template_7_div_1_Template, 5, 0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Carregando destaques...");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](1, _c1));
  }
}
let DestaquesSemanaComponent = /*#__PURE__*/(() => {
  class DestaquesSemanaComponent {
    fornecedoresData;
    category;
    exclude = [];
    limit = 4;
    displayed = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
    destaques$;
    cidadeService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_core_cidade_service__WEBPACK_IMPORTED_MODULE_0__.CidadeService);
    constructor(fornecedoresData) {
      this.fornecedoresData = fornecedoresData;
    }
    ngOnInit() {
      this.destaques$ = this.fornecedoresData.getDestaques(1, this.limit * 3).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(list => {
        if (!list || !Array.isArray(list)) {
          console.warn('[DESTAQUES] API returned invalid data:', list);
          return [];
        }
        const filtered = list.filter(f => !this.category || (f.categoria?.nome || '').toLowerCase() === this.category.toLowerCase()).filter(f => !this.exclude?.length || !this.exclude.includes(f.id));
        // Randomize order to show different highlights on each page load
        const shuffled = filtered.sort(() => Math.random() - 0.5);
        const result = shuffled.slice(0, this.limit).map(f => ({
          id: f.id,
          slug: f.slug,
          categoria: f.categoria?.nome,
          nome: f.nome,
          local: f.cidade,
          descricao: undefined,
          nota: f.rating || 0,
          imagem: f.primaryImage?.url || 'assets/fornecedores/placeholder.jpg'
        }));
        if (!result.length) {
          console.warn('[DESTAQUES] nenhum resultado após filtragem.');
        }
        this.displayed.emit(result.map(x => x.id));
        return result;
      }));
    }
    buildUrl(path) {
      if (Array.isArray(path)) {
        const [base, ...rest] = path;
        const fullPath = rest.length ? `${base}/${rest.join('/')}` : base;
        return this.cidadeService.buildUrl(fullPath);
      }
      return this.cidadeService.buildUrl(path);
    }
    static ɵfac = function DestaquesSemanaComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || DestaquesSemanaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_fornecedores_services_fornecedores_data__WEBPACK_IMPORTED_MODULE_1__.FornecedoresData));
    };
    static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: DestaquesSemanaComponent,
      selectors: [["app-destaques-semana"]],
      inputs: {
        category: "category",
        exclude: "exclude",
        limit: "limit"
      },
      outputs: {
        displayed: "displayed"
      },
      decls: 9,
      vars: 3,
      consts: [["loading", ""], [1, "bg-rose-50", "py-16", "destaques-grid"], [1, "container", "mx-auto", "px-4"], [1, "text-center", "mb-12"], [1, "text-4xl", "md:text-5xl", "font-serif", "font-bold", "text-gray-900", "mb-3"], ["class", "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 min-h-[450px]", 4, "ngIf"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-4", "gap-6", "min-h-[450px]"], [4, "ngIf", "ngIfElse"], ["class", "bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 flex flex-col transition-all duration-300 hover:-translate-y-2 overflow-hidden group h-full", 4, "ngFor", "ngForOf"], [1, "bg-white", "rounded-2xl", "shadow-md", "hover:shadow-2xl", "border", "border-gray-100", "flex", "flex-col", "transition-all", "duration-300", "hover:-translate-y-2", "overflow-hidden", "group", "h-full"], [1, "h-48", "overflow-hidden", 2, "aspect-ratio", "300/220"], ["loading", "lazy", "decoding", "async", "width", "300", "height", "220", 1, "w-full", "h-full", "object-cover", "group-hover:scale-110", "transition-transform", "duration-500", 3, "src", "alt"], [1, "p-5", "flex", "flex-col", "flex-1"], [1, "bg-rose-500", "text-white", "font-bold", "text-xs", "px-3", "py-1", "rounded-full", "w-fit", "mb-3"], [1, "font-serif", "font-bold", "text-xl", "text-gray-900", "mb-2"], [1, "flex", "items-center", "gap-2", "text-gray-500", "text-sm", "mb-4"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-4", "w-4", "inline"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243M15 11V7a4 4 0 10-8 0v4"], [1, "mt-auto", "block", "px-6", "py-3", "border", "border-rose-400", "text-rose-600", "bg-white", "rounded-lg", "font-semibold", "hover:bg-rose-50", "transition-all", "duration-300", "text-center", "shadow-sm", "hover:shadow-md", 3, "routerLink"], ["class", "bg-white rounded-2xl border border-gray-100 p-5 animate-pulse h-full flex flex-col", 4, "ngFor", "ngForOf"], [1, "text-center", "text-xs", "text-gray-400", "mt-2"], [1, "bg-white", "rounded-2xl", "border", "border-gray-100", "p-5", "animate-pulse", "h-full", "flex", "flex-col"], [1, "mb-4", "bg-gray-200", "w-full", 2, "height", "192px", "aspect-ratio", "300/220"], [1, "h-6", "bg-gray-200", "rounded", "w-2/3", "mb-3"], [1, "h-4", "bg-gray-200", "rounded", "w-1/2", "mb-6"], [1, "mt-auto", "h-10", "bg-gray-200", "rounded", "w-full"]],
      template: function DestaquesSemanaComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "section", 1)(1, "div", 2)(2, "div", 3)(3, "h2", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Destaques da Semana");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, DestaquesSemanaComponent_div_5_Template, 2, 2, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](6, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, DestaquesSemanaComponent_ng_template_7_Template, 4, 2, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](6, 1, ctx.destaques$));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkZXN0YXF1ZXMtc2VtYW5hLmNzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvaG9tZS9kZXN0YXF1ZXMtc2VtYW5hL2Rlc3RhcXVlcy1zZW1hbmEuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxnS0FBZ0siLCJzb3VyY2VSb290IjoiIn0= */"],
      changeDetection: 0
    });
  }
  return DestaquesSemanaComponent;
})();

/***/ }),

/***/ 7165:
/*!******************************************************!*\
  !*** ./src/app/features/home/home-page/home-page.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePageComponent: () => (/* binding */ HomePageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _shared_icon_icon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/icon/icon */ 7701);
/* harmony import */ var _destaques_semana_destaques_semana__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../destaques-semana/destaques-semana */ 4049);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 271);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 2575);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 1817);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 6647);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 9999);
/* harmony import */ var _core_cidade_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/cidade.service */ 6735);
/* harmony import */ var _categorias_services_categorias_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../categorias/services/categorias-data */ 589);
/* harmony import */ var _fornecedores_services_fornecedores_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../fornecedores/services/fornecedores-data */ 7237);
/* harmony import */ var _core_tracking_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../core/tracking.service */ 5050);















const _c0 = a0 => ["fornecedores", a0];
const _c1 = a0 => ["categorias", a0];
const _c2 = () => [1, 2, 3, 4, 5, 6];
function HomePageComponent_div_14_div_2_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const pages_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("P\u00E1gina ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 2, ctx_r3.currentPage$) + 1, " de ", pages_r3.length, "");
  }
}
function HomePageComponent_div_14_div_2_div_13_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const fornecedor_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](fornecedor_r5.categoria == null ? null : fornecedor_r5.categoria.nome);
  }
}
function HomePageComponent_div_14_div_2_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 34)(1, "a", 35)(2, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "img", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 38)(5, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, HomePageComponent_div_14_div_2_div_13_div_7_Template, 2, 1, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const fornecedor_r5 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("routerLink", ctx_r3.buildUrl(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](10, _c0, fornecedor_r5.slug)));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("data-event-category", "Navigation")("data-event-action", "Click Card - Busca")("data-vendor-id", fornecedor_r5.id)("data-vendor-name", fornecedor_r5.nome)("data-vendor-category", fornecedor_r5.categoria == null ? null : fornecedor_r5.categoria.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSrc", (fornecedor_r5.primaryImage == null ? null : fornecedor_r5.primaryImage.url) || "assets/fornecedores/placeholder.jpg")("alt", fornecedor_r5.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](fornecedor_r5.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", fornecedor_r5.categoria == null ? null : fornecedor_r5.categoria.nome);
  }
}
function HomePageComponent_div_14_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 19)(1, "div", 20)(2, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Fornecedores encontrados");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, HomePageComponent_div_14_div_2_div_5_Template, 3, 4, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HomePageComponent_div_14_div_2_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r3.closeResults());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "Fechar");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 25)(9, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HomePageComponent_div_14_div_2_Template_button_click_9_listener() {
      const pages_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2).ngIf;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r3.prevPage(pages_r3.length));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "svg", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](11, "path", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, HomePageComponent_div_14_div_2_div_13_Template, 8, 12, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](14, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HomePageComponent_div_14_div_2_Template_button_click_15_listener() {
      const pages_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2).ngIf;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r3.nextPage(pages_r3.length));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "svg", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](17, "path", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const pages_r3 = ctx.ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", pages_r3 == null ? null : pages_r3.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](14, 2, ctx_r3.currentPageItems$));
  }
}
function HomePageComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](1, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, HomePageComponent_div_14_div_2_Template, 18, 4, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("has-results", ((tmp_2_0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](1, 3, ctx_r3.resultPages$)) == null ? null : tmp_2_0.length) && ctx_r3.showResults);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 5, ctx_r3.resultPages$));
  }
}
function HomePageComponent_div_22_ng_container_1_p_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const cat_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](cat_r6.descricao);
  }
}
function HomePageComponent_div_22_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "a", 44)(2, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "img", 46)(4, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 48)(6, "h3", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, HomePageComponent_div_22_ng_container_1_p_8_Template, 2, 1, "p", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "Ver fornecedores");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const cat_r6 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("routerLink", ctx_r3.buildUrl(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](5, _c1, cat_r6.slug)));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSrc", cat_r6.imageUrl || "assets/categorias/placeholder.jpg")("alt", cat_r6.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](cat_r6.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", cat_r6.descricao);
  }
}
function HomePageComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, HomePageComponent_div_22_ng_container_1_Template, 11, 7, "ng-container", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const cats_r7 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", cats_r7);
  }
}
function HomePageComponent_ng_template_24_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "div", 55)(4, "div", 56)(5, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function HomePageComponent_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, HomePageComponent_ng_template_24_div_1_Template, 6, 0, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](1, _c2));
  }
}
let HomePageComponent = /*#__PURE__*/(() => {
  class HomePageComponent {
    categoriasData;
    fornecedoresData;
    tracking;
    categorias$;
    buscaTerm$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__.BehaviorSubject('');
    fornecedoresBusca$;
    resultPages$;
    currentPage$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__.BehaviorSubject(0);
    currentPageItems$;
    buscaTerm = '';
    showResults = true;
    cidadeService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(_core_cidade_service__WEBPACK_IMPORTED_MODULE_2__.CidadeService);
    constructor(categoriasData, fornecedoresData, tracking) {
      this.categoriasData = categoriasData;
      this.fornecedoresData = fornecedoresData;
      this.tracking = tracking;
      this.categorias$ = this.categoriasData.getAll().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.map)(cats => cats.slice().sort((a, b) => (a.nome || '').localeCompare(b.nome || ''))));
      this.fornecedoresBusca$ = this.buscaTerm$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.debounceTime)(250), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.map)(term => term.trim()), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.switchMap)(term => {
        if (term.length > 0) {
          return this.fornecedoresData.search(term).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.map)(results => {
            // Track search
            this.tracking.trackSearch(term, results.length);
            return results;
          }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.of)([]);
      }));
      // chunk results into pages of 3
      this.resultPages$ = this.fornecedoresBusca$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.map)(results => {
        const pages = [];
        for (let i = 0; i < results.length; i += 3) {
          pages.push(results.slice(i, i + 3));
        }
        // reset to first page when new results arrive
        this.currentPage$.next(0);
        return pages;
      }));
      // combine current page index with pages to produce items to display
      this.currentPageItems$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.combineLatest)([this.resultPages$, this.currentPage$]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.map)(([pages, idx]) => pages.length > 0 ? pages[Math.min(Math.max(idx, 0), pages.length - 1)] : []));
    }
    buildUrl(path) {
      if (Array.isArray(path)) {
        const [base, ...rest] = path;
        const fullPath = rest.length ? `${base}/${rest.join('/')}` : base;
        return this.cidadeService.buildUrl(fullPath);
      }
      return this.cidadeService.buildUrl(path);
    }
    buscar() {
      this.buscaTerm$.next(this.buscaTerm);
      this.showResults = true;
    }
    prevPage(totalPages) {
      const idx = this.currentPage$.getValue();
      this.currentPage$.next(idx > 0 ? idx - 1 : totalPages - 1);
    }
    nextPage(totalPages) {
      const idx = this.currentPage$.getValue();
      this.currentPage$.next(idx + 1 < totalPages ? idx + 1 : 0);
    }
    closeResults() {
      this.showResults = false;
    }
    shuffleArray(array) {
      return array.map(value => ({
        value,
        sort: Math.random()
      })).sort((a, b) => a.sort - b.sort).map(({
        value
      }) => value);
    }
    static ɵfac = function HomePageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || HomePageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_categorias_services_categorias_data__WEBPACK_IMPORTED_MODULE_3__.CategoriasData), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_fornecedores_services_fornecedores_data__WEBPACK_IMPORTED_MODULE_4__.FornecedoresData), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_tracking_service__WEBPACK_IMPORTED_MODULE_5__.TrackingService));
    };
    static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
      type: HomePageComponent,
      selectors: [["app-home-page"]],
      decls: 26,
      vars: 9,
      consts: [["catsLoading", ""], [1, "animate-fade-in"], [1, "relative", "h-[400px]", "flex", "items-center", "justify-center", "bg-rose-900", "text-white", "hero-wrapper"], [1, "absolute", "inset-0", "overflow-hidden", "hero-bg"], [1, "relative", "z-10", "container", "mx-auto", "px-4", "flex", "flex-col", "items-center", "justify-center", "h-full", "text-center", "gap-4"], [1, "text-4xl", "md:text-6xl", "font-serif", "font-bold", "mb-4", "hero-title"], [1, "text-xl", "md:text-2xl", "text-rose-100", "mb-8", "font-light", "hero-subtitle"], [1, "w-full", "sm:max-w-2xl", "md:max-w-3xl", "lg:max-w-5xl", "mx-auto", "bg-white", "rounded-full", "px-4", "py-2", "flex", "shadow-2xl", "hero-search-block", "mt-4", "gap-2"], [1, "flex-grow", "flex", "items-center", "px-4", "border-r", "border-gray-200", "text-gray-500"], ["name", "search", 3, "size"], ["type", "text", "placeholder", "O que voc\u00EA procura? (ex: Buffet, Foto...)", 1, "w-full", "p-2", "outline-none", "text-gray-700", "search-input", 3, "ngModelChange", "keydown.enter", "ngModel"], [1, "bg-rose-600", "text-white", "px-8", "py-3", "rounded-full", "font-bold", "hover:bg-rose-700", "transition", 3, "click"], ["class", "hero-results-slot relative mx-auto max-w-5xl px-4 mt-4", 3, "has-results", 4, "ngIf"], [1, "py-16", "container", "mx-auto", "px-4"], [1, "text-3xl", "font-serif", "font-bold", "text-gray-800", "text-center", "mb-2"], [1, "text-gray-500", "text-center", "mb-10"], ["class", "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 categorias-grid", 4, "ngIf", "ngIfElse"], [1, "hero-results-slot", "relative", "mx-auto", "max-w-5xl", "px-4", "mt-4"], ["class", "hero-results-panel bg-white rounded-2xl shadow-xl p-6 border border-gray-100", 4, "ngIf"], [1, "hero-results-panel", "bg-white", "rounded-2xl", "shadow-xl", "p-6", "border", "border-gray-100"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "font-serif", "font-bold", "text-lg", "text-rose-700"], [1, "flex", "items-center", "gap-2"], ["class", "text-sm text-gray-500", 4, "ngIf"], [1, "px-3", "py-1", "rounded-full", "border", "border-rose-600", "text-rose-600", "hover:bg-rose-50", "font-semibold", 3, "click"], [1, "flex", "items-center", "gap-3"], ["aria-label", "Anterior", 1, "px-3", "py-2", "rounded-full", "border", "border-rose-600", "text-rose-600", "hover:bg-rose-50", "font-semibold", "bg-white", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "fill-current"], ["d", "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "gap-4", "flex-1"], ["class", "border border-gray-100 rounded-lg overflow-hidden shadow-sm", 4, "ngFor", "ngForOf"], ["aria-label", "Pr\u00F3xima", 1, "px-3", "py-2", "rounded-full", "border", "border-rose-600", "text-rose-600", "hover:bg-rose-50", "font-semibold", "bg-white", 3, "click"], ["d", "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"], [1, "text-sm", "text-gray-500"], [1, "border", "border-gray-100", "rounded-lg", "overflow-hidden", "shadow-sm"], [1, "block", 3, "routerLink"], [1, "h-32", "bg-gray-50", 2, "aspect-ratio", "300/220"], ["loading", "lazy", "decoding", "async", "width", "300", "height", "220", 1, "w-full", "h-full", "object-cover", 3, "ngSrc", "alt"], [1, "p-3"], [1, "font-semibold", "text-gray-800"], ["class", "text-xs text-gray-500", 4, "ngIf"], [1, "text-xs", "text-gray-500"], [1, "grid", "grid-cols-2", "md:grid-cols-3", "lg:grid-cols-6", "gap-4", "categorias-grid"], [4, "ngFor", "ngForOf"], [1, "group", "flex", "flex-col", "bg-white", "rounded-xl", "shadow-sm", "hover:shadow-xl", "transition-all", "duration-300", "border", "border-gray-100", "overflow-hidden", "hover:-translate-y-1", "cat-card", 3, "routerLink"], [1, "relative", "w-full", "overflow-hidden", "img-wrap", "aspect-[4/3]"], ["loading", "lazy", "decoding", "async", "width", "400", "height", "300", 1, "w-full", "h-full", "object-cover", "group-hover:scale-110", "transition-transform", "duration-500", 3, "ngSrc", "alt"], [1, "absolute", "inset-0", "bg-gradient-to-t", "from-black/50", "via-black/20", "to-transparent"], [1, "p-4", "text-center", "flex", "flex-col", "gap-1"], [1, "font-bold", "text-gray-800", "group-hover:text-rose-600", "transition-colors"], [1, "text-xs", "text-gray-400"], ["class", "bg-white rounded-xl border border-gray-100 p-4 animate-pulse cat-card-skeleton", 4, "ngFor", "ngForOf"], [1, "bg-white", "rounded-xl", "border", "border-gray-100", "p-4", "animate-pulse", "cat-card-skeleton"], [1, "img-wrap", "bg-gray-200", "rounded", "mb-3"], [1, "text-wrap"], [1, "h-4", "bg-gray-200", "rounded", "w-3/4", "mb-2"], [1, "h-3", "bg-gray-100", "rounded", "w-1/2", "mb-1"], [1, "h-3", "bg-gray-100", "rounded", "w-2/3"]],
      template: function HomePageComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 1)(1, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 4)(4, "h1", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "O Casamento dos seus Sonhos");
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "p", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "Come\u00E7a aqui, em Piracicaba.");
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 7)(9, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](10, "app-icon", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "input", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayListener"]("ngModelChange", function HomePageComponent_Template_input_ngModelChange_11_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayBindingSet"](ctx.buscaTerm, $event) || (ctx.buscaTerm = $event);
            return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"]($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("keydown.enter", function HomePageComponent_Template_input_keydown_enter_11_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.buscar());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "button", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function HomePageComponent_Template_button_click_12_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx.buscar());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13, "BUSCAR");
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, HomePageComponent_div_14_Template, 4, 7, "div", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](15, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](16, "app-destaques-semana");
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "section", 13)(18, "h2", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19, "Navegue por Categorias");
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "p", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](21, "Encontre os melhores profissionais de Piracicaba");
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](22, HomePageComponent_div_22_Template, 2, 1, "div", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](23, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](24, HomePageComponent_ng_template_24_Template, 2, 2, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          let tmp_3_0;
          const catsLoading_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](25);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](10);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("size", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtwoWayProperty"]("ngModel", ctx.buscaTerm);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ((tmp_3_0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](15, 5, ctx.resultPages$)) == null ? null : tmp_3_0.length) && ctx.showResults);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](23, 7, ctx.categorias$))("ngIfElse", catsLoading_r8);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_14__.AsyncPipe, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgModel, _shared_icon_icon__WEBPACK_IMPORTED_MODULE_0__.IconComponent, _destaques_semana_destaques_semana__WEBPACK_IMPORTED_MODULE_1__.DestaquesSemanaComponent, _angular_router__WEBPACK_IMPORTED_MODULE_16__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_16__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgOptimizedImage],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob21lLXBhZ2UuY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvaG9tZS9ob21lLXBhZ2UvaG9tZS1wYWdlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esd0pBQXdKIiwic291cmNlUm9vdCI6IiJ9 */"],
      changeDetection: 0
    });
  }
  return HomePageComponent;
})();

/***/ }),

/***/ 8716:
/*!**********************************************!*\
  !*** ./src/app/features/home/home-module.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeModule: () => (/* binding */ HomeModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home-routing-module */ 9853);
/* harmony import */ var _home_page_home_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home-page/home-page */ 7165);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);




let HomeModule = /*#__PURE__*/(() => {
  class HomeModule {
    static ɵfac = function HomeModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || HomeModule)();
    };
    static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
      type: HomeModule
    });
    static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _home_routing_module__WEBPACK_IMPORTED_MODULE_0__.HomeRoutingModule, _home_page_home_page__WEBPACK_IMPORTED_MODULE_1__.HomePageComponent]
    });
  }
  return HomeModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](HomeModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _home_routing_module__WEBPACK_IMPORTED_MODULE_0__.HomeRoutingModule, _home_page_home_page__WEBPACK_IMPORTED_MODULE_1__.HomePageComponent]
  });
})();

/***/ }),

/***/ 9853:
/*!******************************************************!*\
  !*** ./src/app/features/home/home-routing-module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeRoutingModule: () => (/* binding */ HomeRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var _home_page_home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home-page/home-page */ 7165);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);




const routes = [{
  path: '',
  component: _home_page_home_page__WEBPACK_IMPORTED_MODULE_0__.HomePageComponent
}];
let HomeRoutingModule = /*#__PURE__*/(() => {
  class HomeRoutingModule {
    static ɵfac = function HomeRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || HomeRoutingModule)();
    };
    static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: HomeRoutingModule
    });
    static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
    });
  }
  return HomeRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](HomeRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=716.js.map