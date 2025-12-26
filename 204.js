"use strict";
(self["webpackChunkguia_noivas"] = self["webpackChunkguia_noivas"] || []).push([[204],{

/***/ 1204:
/*!****************************************************!*\
  !*** ./src/app/features/anuncie/anuncie-module.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnuncieModule: () => (/* binding */ AnuncieModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _anuncie_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./anuncie-routing-module */ 8149);
/* harmony import */ var _anuncie_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./anuncie-page */ 8095);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);




let AnuncieModule = /*#__PURE__*/(() => {
  class AnuncieModule {
    static ɵfac = function AnuncieModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AnuncieModule)();
    };
    static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
      type: AnuncieModule
    });
    static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _anuncie_routing_module__WEBPACK_IMPORTED_MODULE_0__.AnuncieRoutingModule, _anuncie_page__WEBPACK_IMPORTED_MODULE_1__.AnunciePageComponent]
    });
  }
  return AnuncieModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AnuncieModule, {
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _anuncie_routing_module__WEBPACK_IMPORTED_MODULE_0__.AnuncieRoutingModule, _anuncie_page__WEBPACK_IMPORTED_MODULE_1__.AnunciePageComponent]
  });
})();

/***/ }),

/***/ 8095:
/*!**************************************************!*\
  !*** ./src/app/features/anuncie/anuncie-page.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnunciePageComponent: () => (/* binding */ AnunciePageComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);



function AnunciePageComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Obrigado! Sua mensagem foi enviada com sucesso. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AnunciePageComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Ocorreu um erro ao enviar. Tente novamente ou entre em contato diretamente. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
let AnunciePageComponent = /*#__PURE__*/(() => {
  class AnunciePageComponent {
    submitted = false;
    error = false;
    /**
     * Permite apenas números para telefone
     */
    onlyNumbers(event) {
      const char = String.fromCharCode(event.which);
      if (!/[0-9]/.test(char)) {
        event.preventDefault();
      }
    }
    onSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const data = new FormData(form);
      fetch('https://formspree.io/f/xovnglda', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
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
    static ɵfac = function AnunciePageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AnunciePageComponent)();
    };
    static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AnunciePageComponent,
      selectors: [["app-anuncie-page"]],
      decls: 14,
      vars: 2,
      consts: [[1, "container", "mx-auto", "px-4", "py-12"], [1, "text-3xl", "font-serif", "font-bold", "text-gray-900", "mb-6"], [1, "text-gray-700", "mb-4"], [1, "bg-white", "rounded-xl", "shadow", "p-6", "border", "border-gray-100", "max-w-lg", "mx-auto", "flex", "flex-col", "gap-4", 3, "submit"], ["name", "nome", "type", "text", "placeholder", "Nome do fornecedor", "required", "", 1, "rounded", "px-3", "py-2", "border", "border-gray-300"], ["name", "email", "type", "email", "placeholder", "E-mail de contato", "required", "", 1, "rounded", "px-3", "py-2", "border", "border-gray-300"], ["name", "telefone", "type", "tel", "placeholder", "Telefone", 1, "rounded", "px-3", "py-2", "border", "border-gray-300", 3, "keypress"], ["name", "descricao", "placeholder", "Descri\u00E7\u00E3o dos servi\u00E7os", "required", "", 1, "rounded", "px-3", "py-2", "border", "border-gray-300"], [1, "bg-rose-600", "text-white", "px-6", "py-2", "rounded", "font-semibold", "hover:bg-rose-700", "transition"], ["class", "mt-4 text-green-700 bg-green-50 border border-green-200 rounded p-3 text-center font-medium", 4, "ngIf"], ["class", "mt-4 text-red-700 bg-red-50 border border-red-200 rounded p-3 text-center font-medium", 4, "ngIf"], [1, "mt-4", "text-green-700", "bg-green-50", "border", "border-green-200", "rounded", "p-3", "text-center", "font-medium"], [1, "mt-4", "text-red-700", "bg-red-50", "border", "border-red-200", "rounded", "p-3", "text-center", "font-medium"]],
      template: function AnunciePageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0)(1, "h1", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Anuncie no Guia Noivas");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Se voc\u00EA \u00E9 fornecedor e deseja divulgar seus servi\u00E7os para noivas de Piracicaba e regi\u00E3o, preencha o formul\u00E1rio abaixo ou entre em contato conosco.");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "form", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("submit", function AnunciePageComponent_Template_form_submit_5_listener($event) {
            return ctx.onSubmit($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "input", 4)(7, "input", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "input", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keypress", function AnunciePageComponent_Template_input_keypress_8_listener($event) {
            return ctx.onlyNumbers($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "textarea", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Enviar");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, AnunciePageComponent_div_12_Template, 2, 0, "div", 9)(13, AnunciePageComponent_div_13_Template, 2, 0, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.submitted);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.error);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf],
      styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhbnVuY2llLXBhZ2UuY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYW51bmNpZS9hbnVuY2llLXBhZ2UuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSw0SkFBNEoiLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
  return AnunciePageComponent;
})();

/***/ }),

/***/ 8149:
/*!************************************************************!*\
  !*** ./src/app/features/anuncie/anuncie-routing-module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnuncieRoutingModule: () => (/* binding */ AnuncieRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var _anuncie_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./anuncie-page */ 8095);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);




const routes = [{
  path: '',
  component: _anuncie_page__WEBPACK_IMPORTED_MODULE_0__.AnunciePageComponent
}];
let AnuncieRoutingModule = /*#__PURE__*/(() => {
  class AnuncieRoutingModule {
    static ɵfac = function AnuncieRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AnuncieRoutingModule)();
    };
    static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: AnuncieRoutingModule
    });
    static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
    });
  }
  return AnuncieRoutingModule;
})();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AnuncieRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=204.js.map