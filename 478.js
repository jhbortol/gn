"use strict";
(self["webpackChunkguia_noivas"] = self["webpackChunkguia_noivas"] || []).push([[478],{

/***/ 478:
/*!**********************************************!*\
  !*** ./src/app/features/blog/blog-module.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlogModule: () => (/* binding */ BlogModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _blog_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blog-routing-module */ 8831);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);



let BlogModule = /*#__PURE__*/(() => {
  class BlogModule {
    static ɵfac = function BlogModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || BlogModule)();
    };
    static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: BlogModule
    });
    static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _blog_routing_module__WEBPACK_IMPORTED_MODULE_0__.BlogRoutingModule]
    });
  }
  return BlogModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](BlogModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _blog_routing_module__WEBPACK_IMPORTED_MODULE_0__.BlogRoutingModule]
  });
})();

/***/ }),

/***/ 8831:
/*!******************************************************!*\
  !*** ./src/app/features/blog/blog-routing-module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlogRoutingModule: () => (/* binding */ BlogRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);



const routes = [{
  path: '',
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e(76), __webpack_require__.e(220)]).then(__webpack_require__.bind(__webpack_require__, /*! ./blog-list/blog-list-page */ 4220)).then(m => m.BlogListPage)
}, {
  path: ':slug',
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e(76), __webpack_require__.e(852)]).then(__webpack_require__.bind(__webpack_require__, /*! ./blog-detail/blog-detail-page */ 2852)).then(m => m.BlogDetailPage)
}];
let BlogRoutingModule = /*#__PURE__*/(() => {
  class BlogRoutingModule {
    static ɵfac = function BlogRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || BlogRoutingModule)();
    };
    static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: BlogRoutingModule
    });
    static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
    });
  }
  return BlogRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](BlogRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=478.js.map