"use strict";
(self["webpackChunkguia_noivas"] = self["webpackChunkguia_noivas"] || []).push([[332],{

/***/ 1015:
/*!**************************************************!*\
  !*** ./src/app/features/contato/contato-page.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContatoPageComponent: () => (/* binding */ ContatoPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);



function ContatoPageComponent_div_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Obrigado! Sua mensagem foi enviada com sucesso. Responderemos em breve. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function ContatoPageComponent_div_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou envie um e-mail para ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "contato@guianoivas.com.br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, ". ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
let ContatoPageComponent = /*#__PURE__*/(() => {
  class ContatoPageComponent {
    submitted = false;
    error = false;
    onSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const data = new FormData(form);
      fetch('https://formspree.io/f/myzdrpea', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      }).then(res => {
        if (res.ok) {
          this.submitted = true;
          this.error = false;
          form.reset();
        } else {
          this.submitted = false;
          this.error = true;
        }
      }).catch(() => {
        this.submitted = false;
        this.error = true;
      });
    }
    static ɵfac = function ContatoPageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ContatoPageComponent)();
    };
    static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: ContatoPageComponent,
      selectors: [["app-contato-page"]],
      decls: 45,
      vars: 2,
      consts: [[1, "container", "mx-auto", "px-4", "py-12"], [1, "text-3xl", "font-serif", "font-bold", "text-gray-900", "mb-6"], [1, "text-gray-700", "mb-4"], [1, "bg-white", "rounded-xl", "shadow", "p-6", "border", "border-gray-100", "max-w-lg", "mx-auto", "mb-8"], [1, "text-gray-800", "text-base", "space-y-4"], [1, "flex", "items-center", "gap-3"], [1, "inline-flex", "items-center", "justify-center", "w-8", "h-8", "bg-rose-50", "rounded-full"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke-width", "1.5", "stroke", "#e11d48", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M21.75 7.5v9A2.25 2.25 0 0 1 19.5 18.75h-15A2.25 2.25 0 0 1 2.25 16.5v-9m19.5 0A2.25 2.25 0 0 0 19.5 5.25h-15A2.25 2.25 0 0 0 2.25 7.5m19.5 0v.243a2.25 2.25 0 0 1-1.125 1.927l-7.5 4.5a2.25 2.25 0 0 1-2.25 0l-7.5-4.5A2.25 2.25 0 0 1 2.25 7.743"], [1, "font-semibold"], ["href", "mailto:contato@guianoivas.com.br", 1, "text-rose-600", "hover:underline", "font-medium"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M2.25 6.75c0 8.284 6.716 15 15 15h0a.75.75 0 0 0 .75-.75v-3.068a.75.75 0 0 0-.633-.743l-3.317-.553a.75.75 0 0 0-.82.342l-.7 1.12a12.042 12.042 0 0 1-5.292-5.292l1.12-.7a.75.75 0 0 0 .342-.82l-.553-3.317a.75.75 0 0 0-.743-.633H3a.75.75 0 0 0-.75.75v0z"], ["href", "https://wa.me/5519989786156", "target", "_blank", 1, "text-rose-600", "hover:underline", "font-medium"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75h15a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 19.5 5.25h-15A2.25 2.25 0 0 0 2.25 7.5zm3.75 0V5.25m0 2.25h12.75m-12.75 0v9m0-9h12.75m-12.75 9h12.75"], ["href", "https://instagram.com/guianoivaspiracicaba", "target", "_blank", 1, "text-rose-600", "hover:underline", "font-medium"], [1, "bg-white", "rounded-xl", "shadow", "p-6", "border", "border-gray-100", "max-w-lg", "mx-auto", "flex", "flex-col", "gap-4", 3, "submit"], ["name", "nome", "type", "text", "placeholder", "Seu nome", "required", "", 1, "rounded", "px-3", "py-2", "border", "border-gray-300"], ["name", "email", "type", "email", "placeholder", "Seu e-mail", "required", "", 1, "rounded", "px-3", "py-2", "border", "border-gray-300"], ["name", "mensagem", "placeholder", "Sua mensagem", "required", "", 1, "rounded", "px-3", "py-2", "border", "border-gray-300"], ["type", "submit", 1, "bg-rose-600", "text-white", "px-6", "py-2", "rounded", "font-semibold", "hover:bg-rose-700", "transition"], ["class", "mt-4 text-green-700 bg-green-50 border border-green-200 rounded p-3 text-center font-medium", 4, "ngIf"], ["class", "mt-4 text-red-700 bg-red-50 border border-red-200 rounded p-3 text-center font-medium", 4, "ngIf"], [1, "mt-4", "text-green-700", "bg-green-50", "border", "border-green-200", "rounded", "p-3", "text-center", "font-medium"], [1, "mt-4", "text-red-700", "bg-red-50", "border", "border-red-200", "rounded", "p-3", "text-center", "font-medium"], ["href", "mailto:contato@guianoivas.com.br", 1, "text-rose-600", "hover:underline"]],
      template: function ContatoPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0)(1, "h1", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Contato");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Se preferir, pode nos contatar diretamente atrav\u00E9s dos nossos canais. Teremos todo o prazer em ajudar!");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3)(6, "ul", 4)(7, "li", 5)(8, "span", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "svg", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "path", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div")(12, "span", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Email");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "a", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "contato@guianoivas.com.br");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "li", 5)(18, "span", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "svg", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "path", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div")(22, "span", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "WhatsApp");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "a", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "(19) 98978-6156");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "li", 5)(28, "span", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "svg", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "path", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div")(32, "span", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Instagram");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "a", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "@guianoivaspiracicaba");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "form", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function ContatoPageComponent_Template_form_submit_37_listener($event) {
            return ctx.onSubmit($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "input", 16)(39, "input", 17)(40, "textarea", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "button", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Enviar");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](43, ContatoPageComponent_div_43_Template, 2, 0, "div", 20)(44, ContatoPageComponent_div_44_Template, 5, 0, "div", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](43);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.submitted);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.error);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb250YXRvLXBhZ2UuY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvY29udGF0by9jb250YXRvLXBhZ2UuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSw0SkFBNEoiLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
  return ContatoPageComponent;
})();

/***/ }),

/***/ 8332:
/*!****************************************************!*\
  !*** ./src/app/features/contato/contato-module.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContatoModule: () => (/* binding */ ContatoModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _contato_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contato-routing-module */ 9165);
/* harmony import */ var _contato_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contato-page */ 1015);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);




let ContatoModule = /*#__PURE__*/(() => {
  class ContatoModule {
    static ɵfac = function ContatoModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ContatoModule)();
    };
    static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
      type: ContatoModule
    });
    static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _contato_routing_module__WEBPACK_IMPORTED_MODULE_0__.ContatoRoutingModule, _contato_page__WEBPACK_IMPORTED_MODULE_1__.ContatoPageComponent]
    });
  }
  return ContatoModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ContatoModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _contato_routing_module__WEBPACK_IMPORTED_MODULE_0__.ContatoRoutingModule, _contato_page__WEBPACK_IMPORTED_MODULE_1__.ContatoPageComponent]
  });
})();

/***/ }),

/***/ 9165:
/*!************************************************************!*\
  !*** ./src/app/features/contato/contato-routing-module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContatoRoutingModule: () => (/* binding */ ContatoRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var _contato_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contato-page */ 1015);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);




const routes = [{
  path: '',
  component: _contato_page__WEBPACK_IMPORTED_MODULE_0__.ContatoPageComponent
}];
let ContatoRoutingModule = /*#__PURE__*/(() => {
  class ContatoRoutingModule {
    static ɵfac = function ContatoRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ContatoRoutingModule)();
    };
    static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: ContatoRoutingModule
    });
    static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
    });
  }
  return ContatoRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ContatoRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=332.js.map