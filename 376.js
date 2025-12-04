"use strict";
(self["webpackChunkguia_noivas"] = self["webpackChunkguia_noivas"] || []).push([[376],{

/***/ 1376:
/*!**************************************************************!*\
  !*** ./src/app/features/fornecedores/fornecedores-module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FornecedoresModule: () => (/* binding */ FornecedoresModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _fornecedores_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fornecedores-routing-module */ 6305);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);



let FornecedoresModule = /*#__PURE__*/(() => {
  class FornecedoresModule {
    static ɵfac = function FornecedoresModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || FornecedoresModule)();
    };
    static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: FornecedoresModule
    });
    static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _fornecedores_routing_module__WEBPACK_IMPORTED_MODULE_0__.FornecedoresRoutingModule]
    });
  }
  return FornecedoresModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](FornecedoresModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _fornecedores_routing_module__WEBPACK_IMPORTED_MODULE_0__.FornecedoresRoutingModule]
  });
})();

/***/ }),

/***/ 6305:
/*!**********************************************************************!*\
  !*** ./src/app/features/fornecedores/fornecedores-routing-module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FornecedoresRoutingModule: () => (/* binding */ FornecedoresRoutingModule),
/* harmony export */   getPrerenderParams: () => (/* binding */ getPrerenderParams)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);



const routes = [{
  path: ':id',
  loadComponent: () => __webpack_require__.e(/*! import() */ 451).then(__webpack_require__.bind(__webpack_require__, /*! ./fornecedor-page */ 6451)).then(m => m.FornecedorPageComponent)
}];
// Prerender desabilitado para fornecedores dinâmicos (dados vindos da API)
function getPrerenderParams() {
  return Promise.resolve([]);
}
let FornecedoresRoutingModule = /*#__PURE__*/(() => {
  class FornecedoresRoutingModule {
    static ɵfac = function FornecedoresRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || FornecedoresRoutingModule)();
    };
    static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: FornecedoresRoutingModule
    });
    static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
    });
  }
  return FornecedoresRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](FornecedoresRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=376.js.map