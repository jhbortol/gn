"use strict";
(self["webpackChunkguia_noivas"] = self["webpackChunkguia_noivas"] || []).push([[220],{

/***/ 4220:
/*!***********************************************************!*\
  !*** ./src/app/features/blog/blog-list/blog-list-page.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlogListPage: () => (/* binding */ BlogListPage)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _services_blog_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/blog-data */ 2973);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2596);
/* harmony import */ var _core_cidade_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/cidade.service */ 6735);










const _c0 = a0 => ["blog", a0];
const _c1 = () => [1, 2, 3, 4, 5, 6];
function BlogListPage_div_20_article_1_img_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "img", 28);
  }
  if (rf & 2) {
    const post_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngSrc", post_r2.featuredImage)("alt", post_r2.title);
  }
}
function BlogListPage_div_20_article_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const post_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", post_r2.category, " ");
  }
}
function BlogListPage_div_20_article_1_span_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const post_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Por ", post_r2.author, "");
  }
}
function BlogListPage_div_20_article_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "article", 15)(1, "a", 16)(2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, BlogListPage_div_20_article_1_img_3_Template, 1, 2, "img", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 19)(5, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, BlogListPage_div_20_article_1_span_6_Template, 2, 1, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "h2", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "p", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, BlogListPage_div_20_article_1_span_14_Template, 2, 1, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Ler mais \u2192");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const post_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", ctx_r2.buildUrl(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](7, _c0, post_r2.slug)));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", post_r2.featuredImage);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", post_r2.category);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.formatDate(post_r2.publishedAt));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", post_r2.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](post_r2.excerpt);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", post_r2.author);
  }
}
function BlogListPage_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, BlogListPage_div_20_article_1_Template, 17, 9, "article", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.posts());
  }
}
function BlogListPage_ng_template_21_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "div", 34)(4, "div", 35)(5, "div", 36)(6, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function BlogListPage_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, BlogListPage_ng_template_21_div_1_Template, 7, 0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](1, _c1));
  }
}
function BlogListPage_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 38)(1, "p", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Nenhum artigo encontrado.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
let BlogListPage = /*#__PURE__*/(() => {
  class BlogListPage {
    blogData;
    route;
    cidadeService;
    posts = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.signal)([]);
    isLoading = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.signal)(true);
    searchTerm = '';
    selectedCategory = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.signal)(undefined);
    constructor(blogData, route, cidadeService) {
      this.blogData = blogData;
      this.route = route;
      this.cidadeService = cidadeService;
    }
    ngOnInit() {
      const category = this.route.snapshot.queryParamMap.get('categoria');
      if (category) {
        this.selectedCategory.set(category);
      }
      this.loadPosts();
    }
    loadPosts() {
      this.isLoading.set(true);
      this.blogData.getAll(1, 12, this.selectedCategory()).subscribe({
        next: posts => {
          this.posts.set(posts);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        }
      });
    }
    search() {
      if (this.searchTerm.trim()) {
        this.isLoading.set(true);
        this.blogData.search(this.searchTerm).subscribe({
          next: posts => {
            this.posts.set(posts);
            this.isLoading.set(false);
          },
          error: () => {
            this.isLoading.set(false);
          }
        });
      } else {
        this.loadPosts();
      }
    }
    filterByCategory(category) {
      this.selectedCategory.set(category);
      this.loadPosts();
    }
    buildUrl(path) {
      if (Array.isArray(path)) {
        return this.cidadeService.buildUrl(path.join('/'));
      }
      return this.cidadeService.buildUrl(path);
    }
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    static ɵfac = function BlogListPage_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || BlogListPage)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_blog_data__WEBPACK_IMPORTED_MODULE_0__.BlogData), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_core_cidade_service__WEBPACK_IMPORTED_MODULE_1__.CidadeService));
    };
    static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: BlogListPage,
      selectors: [["app-blog-list"]],
      decls: 24,
      vars: 36,
      consts: [["loading", ""], [1, "container", "mx-auto", "px-4", "py-12"], [1, "text-center", "mb-12"], [1, "text-4xl", "md:text-5xl", "font-serif", "font-bold", "text-gray-900", "mb-4"], [1, "text-xl", "text-gray-600"], [1, "max-w-2xl", "mx-auto", "mb-12"], [1, "flex", "gap-2"], ["type", "text", "placeholder", "Buscar artigos...", 1, "flex-1", "px-4", "py-3", "border", "border-gray-300", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-rose-500", 3, "ngModelChange", "keydown.enter", "ngModel"], [1, "bg-rose-600", "text-white", "px-6", "py-3", "rounded-lg", "font-semibold", "hover:bg-rose-700", "transition", 3, "click"], [1, "flex", "flex-wrap", "gap-2", "justify-center", "mb-12"], [1, "px-4", "py-2", "rounded-full", "font-semibold", "hover:bg-rose-700", "hover:text-white", "transition", 3, "click"], ["class", "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", 4, "ngIf", "ngIfElse"], ["class", "text-center py-12", 4, "ngIf"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-8"], ["class", "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1", 4, "ngFor", "ngForOf"], [1, "bg-white", "rounded-xl", "shadow-lg", "overflow-hidden", "hover:shadow-2xl", "transition-all", "duration-300", "hover:-translate-y-1"], [3, "routerLink"], [1, "relative", "h-48", "bg-gray-200"], ["width", "400", "height", "300", "loading", "lazy", "class", "w-full h-full object-cover", 3, "ngSrc", "alt", 4, "ngIf"], [1, "p-6"], [1, "flex", "items-center", "gap-2", "mb-3"], ["class", "text-xs bg-rose-100 text-rose-600 px-3 py-1 rounded-full font-semibold", 4, "ngIf"], [1, "text-xs", "text-gray-500"], [1, "text-xl", "font-serif", "font-bold", "text-gray-900", "mb-3", "hover:text-rose-600", "transition"], [1, "text-gray-600", "line-clamp-3", "mb-4"], [1, "flex", "items-center", "justify-between"], ["class", "text-sm text-gray-500", 4, "ngIf"], [1, "text-rose-600", "font-semibold", "text-sm"], ["width", "400", "height", "300", "loading", "lazy", 1, "w-full", "h-full", "object-cover", 3, "ngSrc", "alt"], [1, "text-xs", "bg-rose-100", "text-rose-600", "px-3", "py-1", "rounded-full", "font-semibold"], [1, "text-sm", "text-gray-500"], ["class", "bg-white rounded-xl shadow-lg overflow-hidden animate-pulse", 4, "ngFor", "ngForOf"], [1, "bg-white", "rounded-xl", "shadow-lg", "overflow-hidden", "animate-pulse"], [1, "h-48", "bg-gray-200"], [1, "h-4", "bg-gray-200", "rounded", "w-20", "mb-3"], [1, "h-6", "bg-gray-200", "rounded", "w-full", "mb-3"], [1, "h-4", "bg-gray-200", "rounded", "w-full", "mb-2"], [1, "h-4", "bg-gray-200", "rounded", "w-3/4"], [1, "text-center", "py-12"], [1, "text-xl", "text-gray-500"]],
      template: function BlogListPage_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "h1", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Blog Guia Noivas");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "p", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Dicas, inspira\u00E7\u00F5es e guias para o seu casamento perfeito");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 5)(7, "div", 6)(8, "input", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BlogListPage_Template_input_ngModelChange_8_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.searchTerm, $event) || (ctx.searchTerm = $event);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keydown.enter", function BlogListPage_Template_input_keydown_enter_8_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.search());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "button", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BlogListPage_Template_button_click_9_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.search());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, " Buscar ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 9)(12, "button", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BlogListPage_Template_button_click_12_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.filterByCategory(""));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, " Todos ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "button", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BlogListPage_Template_button_click_14_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.filterByCategory("dicas"));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, " Dicas ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "button", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BlogListPage_Template_button_click_16_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.filterByCategory("inspiracao"));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, " Inspira\u00E7\u00E3o ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "button", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BlogListPage_Template_button_click_18_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.filterByCategory("guias"));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, " Guias ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](20, BlogListPage_div_20_Template, 2, 1, "div", 11)(21, BlogListPage_ng_template_21_Template, 2, 2, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"])(23, BlogListPage_div_23_Template, 3, 0, "div", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          const loading_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](22);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.searchTerm);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("bg-rose-600", !ctx.selectedCategory())("text-white", !ctx.selectedCategory())("bg-gray-100", ctx.selectedCategory())("text-gray-700", ctx.selectedCategory());
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("bg-rose-600", ctx.selectedCategory() === "dicas")("text-white", ctx.selectedCategory() === "dicas")("bg-gray-100", ctx.selectedCategory() !== "dicas")("text-gray-700", ctx.selectedCategory() !== "dicas");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("bg-rose-600", ctx.selectedCategory() === "inspiracao")("text-white", ctx.selectedCategory() === "inspiracao")("bg-gray-100", ctx.selectedCategory() !== "inspiracao")("text-gray-700", ctx.selectedCategory() !== "inspiracao");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("bg-rose-600", ctx.selectedCategory() === "guias")("text-white", ctx.selectedCategory() === "guias")("bg-gray-100", ctx.selectedCategory() !== "guias")("text-gray-700", ctx.selectedCategory() !== "guias");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isLoading())("ngIfElse", loading_r4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isLoading() && ctx.posts().length === 0);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgOptimizedImage],
      styles: [".line-clamp-3[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2ctbGlzdC1wYWdlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9CQUFvQjtFQUNwQixxQkFBcUI7RUFDckIsYUFBYTtFQUNiLDRCQUE0QjtFQUM1QixnQkFBZ0I7QUFDbEIiLCJmaWxlIjoiYmxvZy1saXN0LXBhZ2UuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxpbmUtY2xhbXAtMyB7XG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAtd2Via2l0LWxpbmUtY2xhbXA6IDM7XG4gIGxpbmUtY2xhbXA6IDM7XG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYmxvZy9ibG9nLWxpc3QvYmxvZy1saXN0LXBhZ2UuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usb0JBQW9CO0VBQ3BCLHFCQUFxQjtFQUNyQixhQUFhO0VBQ2IsNEJBQTRCO0VBQzVCLGdCQUFnQjtBQUNsQjs7QUFFQSxvZkFBb2YiLCJzb3VyY2VzQ29udGVudCI6WyIubGluZS1jbGFtcC0zIHtcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gIC13ZWJraXQtbGluZS1jbGFtcDogMztcbiAgbGluZS1jbGFtcDogMztcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
      changeDetection: 0
    });
  }
  return BlogListPage;
})();

/***/ })

}]);
//# sourceMappingURL=220.js.map