"use strict";
(self["webpackChunkguia_noivas"] = self["webpackChunkguia_noivas"] || []).push([[44],{

/***/ 1044:
/*!**************************************************!*\
  !*** ./src/app/features/painel/painel-module.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PainelModule: () => (/* binding */ PainelModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 9648);
/* harmony import */ var _painel_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./painel-routing-module */ 6069);
/* harmony import */ var _interceptors_supplier_auth_interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interceptors/supplier-auth.interceptor */ 9653);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);






let PainelModule = /*#__PURE__*/(() => {
  class PainelModule {
    static ɵfac = function PainelModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PainelModule)();
    };
    static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
      type: PainelModule
    });
    static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
      providers: [(0,_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.provideHttpClient)((0,_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.withInterceptors)([_interceptors_supplier_auth_interceptor__WEBPACK_IMPORTED_MODULE_1__.supplierAuthInterceptor]))],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _painel_routing_module__WEBPACK_IMPORTED_MODULE_0__.PainelRoutingModule]
    });
  }
  return PainelModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](PainelModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _painel_routing_module__WEBPACK_IMPORTED_MODULE_0__.PainelRoutingModule]
  });
})();

/***/ }),

/***/ 6069:
/*!**********************************************************!*\
  !*** ./src/app/features/painel/painel-routing-module.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PainelRoutingModule: () => (/* binding */ PainelRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var _guards_supplier_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./guards/supplier.guard */ 8020);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);




const routes = [{
  path: 'login',
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e(76), __webpack_require__.e(819)]).then(__webpack_require__.bind(__webpack_require__, /*! ./login/login-page */ 6819)).then(m => m.LoginPageComponent)
}, {
  path: 'forgot-password',
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e(76), __webpack_require__.e(663)]).then(__webpack_require__.bind(__webpack_require__, /*! ./forgot-password/forgot-password-page */ 2663)).then(m => m.ForgotPasswordPage)
}, {
  path: 'reset-password',
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e(76), __webpack_require__.e(607)]).then(__webpack_require__.bind(__webpack_require__, /*! ./reset-password/reset-password-page */ 4607)).then(m => m.ResetPasswordPage)
}, {
  path: 'redefinir-senha',
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e(76), __webpack_require__.e(607)]).then(__webpack_require__.bind(__webpack_require__, /*! ./reset-password/reset-password-page */ 4607)).then(m => m.ResetPasswordPage)
}, {
  path: '',
  canActivate: [_guards_supplier_guard__WEBPACK_IMPORTED_MODULE_0__.SupplierGuard],
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e(76), __webpack_require__.e(29)]).then(__webpack_require__.bind(__webpack_require__, /*! ./layout/painel-layout */ 7029)).then(m => m.PainelLayoutComponent),
  children: [{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }, {
    path: 'dashboard',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e(76), __webpack_require__.e(23)]).then(__webpack_require__.bind(__webpack_require__, /*! ./dashboard/dashboard-page */ 9023)).then(m => m.DashboardPageComponent)
  }, {
    path: 'perfil',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e(76), __webpack_require__.e(193)]).then(__webpack_require__.bind(__webpack_require__, /*! ./perfil/perfil-page */ 5193)).then(m => m.PerfilPageComponent)
  }, {
    path: 'imagens',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e(76), __webpack_require__.e(963)]).then(__webpack_require__.bind(__webpack_require__, /*! ./imagens/imagens-page */ 6963)).then(m => m.ImagensPage)
  }, {
    path: 'testemunhos',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e(76), __webpack_require__.e(71)]).then(__webpack_require__.bind(__webpack_require__, /*! ./testemunhos/testemunhos-page */ 4071)).then(m => m.TestemunhosPage)
  }, {
    path: 'alterar-senha',
    loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e(76), __webpack_require__.e(479)]).then(__webpack_require__.bind(__webpack_require__, /*! ./alterar-senha/alterar-senha-page */ 7479)).then(m => m.AlterarSenhaPage)
  }]
}];
let PainelRoutingModule = /*#__PURE__*/(() => {
  class PainelRoutingModule {
    static ɵfac = function PainelRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PainelRoutingModule)();
    };
    static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: PainelRoutingModule
    });
    static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
    });
  }
  return PainelRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](PainelRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ }),

/***/ 8020:
/*!**********************************************************!*\
  !*** ./src/app/features/painel/guards/supplier.guard.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SupplierGuard: () => (/* binding */ SupplierGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 2596);
/* harmony import */ var _services_supplier_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/supplier-auth.service */ 5553);



let SupplierGuard = /*#__PURE__*/(() => {
  class SupplierGuard {
    router;
    authService;
    constructor(router, authService) {
      this.router = router;
      this.authService = authService;
    }
    canActivate(route, state) {
      if (this.authService.isAuthenticated()) {
        return true;
      }
      // Redirecionar para login, preservando URL de destino
      this.router.navigate(['/painel/login'], {
        queryParams: {
          returnUrl: state.url
        }
      });
      return false;
    }
    static ɵfac = function SupplierGuard_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SupplierGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_supplier_auth_service__WEBPACK_IMPORTED_MODULE_0__.SupplierAuthService));
    };
    static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: SupplierGuard,
      factory: SupplierGuard.ɵfac,
      providedIn: 'root'
    });
  }
  return SupplierGuard;
})();

/***/ })

}]);
//# sourceMappingURL=44.js.map