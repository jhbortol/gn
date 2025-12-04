"use strict";
(self["webpackChunkguia_noivas"] = self["webpackChunkguia_noivas"] || []).push([[988],{

/***/ 461:
/*!************************************************************************!*\
  !*** ./src/app/features/institucional/institucional-routing-module.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InstitucionalRoutingModule: () => (/* binding */ InstitucionalRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);



const routes = [{
  path: 'sobre',
  loadComponent: () => __webpack_require__.e(/*! import() */ 95).then(__webpack_require__.bind(__webpack_require__, /*! ./sobre-nos */ 3095)).then(m => m.SobreNosPageComponent)
}, {
  path: 'termos',
  loadComponent: () => __webpack_require__.e(/*! import() */ 247).then(__webpack_require__.bind(__webpack_require__, /*! ./termos */ 247)).then(m => m.TermosPageComponent)
}, {
  path: '',
  redirectTo: 'sobre',
  pathMatch: 'full'
}];
let InstitucionalRoutingModule = /*#__PURE__*/(() => {
  class InstitucionalRoutingModule {
    static ɵfac = function InstitucionalRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || InstitucionalRoutingModule)();
    };
    static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: InstitucionalRoutingModule
    });
    static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
    });
  }
  return InstitucionalRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](InstitucionalRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
})();

/***/ }),

/***/ 988:
/*!****************************************************************!*\
  !*** ./src/app/features/institucional/institucional-module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InstitucionalModule: () => (/* binding */ InstitucionalModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _institucional_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./institucional-routing-module */ 461);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);



let InstitucionalModule = /*#__PURE__*/(() => {
  class InstitucionalModule {
    static ɵfac = function InstitucionalModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || InstitucionalModule)();
    };
    static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: InstitucionalModule
    });
    static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _institucional_routing_module__WEBPACK_IMPORTED_MODULE_0__.InstitucionalRoutingModule]
    });
  }
  return InstitucionalModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](InstitucionalModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _institucional_routing_module__WEBPACK_IMPORTED_MODULE_0__.InstitucionalRoutingModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=988.js.map