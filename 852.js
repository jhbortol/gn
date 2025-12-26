"use strict";
(self["webpackChunkguia_noivas"] = self["webpackChunkguia_noivas"] || []).push([[852],{

/***/ 2852:
/*!***************************************************************!*\
  !*** ./src/app/features/blog/blog-detail/blog-detail-page.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlogDetailPage: () => (/* binding */ BlogDetailPage)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 4460);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 2596);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 8431);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _services_blog_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/blog-data */ 2973);
/* harmony import */ var _core_cidade_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/cidade.service */ 6735);
/* harmony import */ var _core_tracking_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/tracking.service */ 5050);










const _c0 = a0 => ["blog", a0];
function BlogDetailPage_div_0_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "img", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngSrc", ctx_r1.post().featuredImage)("alt", ctx_r1.post().title);
  }
}
function BlogDetailPage_div_0_span_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", (tmp_3_0 = ctx_r1.post()) == null ? null : tmp_3_0.category, " ");
  }
}
function BlogDetailPage_div_0_span_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", (tmp_3_0 = ctx_r1.post()) == null ? null : tmp_3_0.views, " visualiza\u00E7\u00F5es");
  }
}
function BlogDetailPage_div_0_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30)(1, "div", 31)(2, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div")(5, "p", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Autor");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.post().author[0]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"]((tmp_4_0 = ctx_r1.post()) == null ? null : tmp_4_0.author);
  }
}
function BlogDetailPage_div_0_div_34_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const tag_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" #", tag_r3, " ");
  }
}
function BlogDetailPage_div_0_div_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 34)(1, "h3", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Tags:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, BlogDetailPage_div_0_div_34_span_4_Template, 2, 1, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", (tmp_3_0 = ctx_r1.post()) == null ? null : tmp_3_0.tags);
  }
}
function BlogDetailPage_div_0_div_35_article_4_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "img", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const related_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngSrc", related_r4.featuredImage)("alt", related_r4.title);
  }
}
function BlogDetailPage_div_0_div_35_article_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "article", 43)(1, "a", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, BlogDetailPage_div_0_div_35_article_4_div_2_Template, 2, 2, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 46)(4, "h3", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "p", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const related_r4 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", ctx_r1.buildUrl(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](4, _c0, related_r4.slug)));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", related_r4.featuredImage);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", related_r4.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](related_r4.excerpt);
  }
}
function BlogDetailPage_div_0_div_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 39)(1, "h2", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Artigos Relacionados");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, BlogDetailPage_div_0_div_35_article_4_Template, 8, 6, "article", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.relatedPosts());
  }
}
function BlogDetailPage_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 2)(1, "nav", 3)(2, "a", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "In\u00EDcio");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "\u203A");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "a", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Blog");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "\u203A");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "article", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, BlogDetailPage_div_0_div_13_Template, 2, 2, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "header", 9)(15, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, BlogDetailPage_div_0_span_16_Template, 2, 1, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "time", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](19, BlogDetailPage_div_0_span_19_Template, 2, 1, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "h1", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](25, BlogDetailPage_div_0_div_25_Template, 9, 2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "div", 18)(27, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BlogDetailPage_div_0_Template_button_click_27_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.shareOnFacebook());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "svg", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](29, "path", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function BlogDetailPage_div_0_Template_button_click_30_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.shareOnWhatsApp());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "svg", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](32, "path", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](33, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](34, BlogDetailPage_div_0_div_34_Template, 5, 1, "div", 25)(35, BlogDetailPage_div_0_div_35_Template, 5, 1, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    let tmp_13_0;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", ctx_r1.buildUrl(""));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", ctx_r1.buildUrl("blog"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"]((tmp_4_0 = ctx_r1.post()) == null ? null : tmp_4_0.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (tmp_5_0 = ctx_r1.post()) == null ? null : tmp_5_0.featuredImage);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (tmp_6_0 = ctx_r1.post()) == null ? null : tmp_6_0.category);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.formatDate(ctx_r1.post().publishedAt));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (tmp_8_0 = ctx_r1.post()) == null ? null : tmp_8_0.views);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"]((tmp_9_0 = ctx_r1.post()) == null ? null : tmp_9_0.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"]((tmp_10_0 = ctx_r1.post()) == null ? null : tmp_10_0.excerpt);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (tmp_11_0 = ctx_r1.post()) == null ? null : tmp_11_0.author);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("innerHTML", ctx_r1.safeContent(), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ((tmp_13_0 = ctx_r1.post()) == null ? null : tmp_13_0.tags) && ctx_r1.post().tags.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.relatedPosts().length > 0);
  }
}
function BlogDetailPage_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 2)(1, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "div", 52)(3, "div", 53)(4, "div", 54)(5, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
let BlogDetailPage = /*#__PURE__*/(() => {
  class BlogDetailPage {
    post = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.signal)(undefined);
    relatedPosts = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.signal)([]);
    isLoading = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.signal)(true);
    // Safe HTML content
    safeContent = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.computed)(() => {
      const content = this.post()?.content;
      return content ? this.sanitizer.bypassSecurityTrustHtml(content) : undefined;
    });
    meta = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.Meta);
    title = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.Title);
    route = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute);
    blogData = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_services_blog_data__WEBPACK_IMPORTED_MODULE_0__.BlogData);
    cidadeService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_core_cidade_service__WEBPACK_IMPORTED_MODULE_1__.CidadeService);
    tracking = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_core_tracking_service__WEBPACK_IMPORTED_MODULE_2__.TrackingService);
    sanitizer = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.DomSanitizer);
    ngOnInit() {
      // Subscribe to route params to reload when navigating between articles
      this.route.params.subscribe(params => {
        const slug = params['slug'];
        if (slug) {
          this.loadPost(slug);
          // Scroll to top when navigating to a new article
          if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
          }
        }
      });
    }
    loadPost(slug) {
      this.isLoading.set(true);
      this.blogData.getBySlug(slug).subscribe({
        next: post => {
          this.post.set(post);
          this.isLoading.set(false);
          this.setSEOMeta(post);
          this.addStructuredData(post);
          this.blogData.incrementViews(post.id).subscribe();
          this.loadRelated(post.id);
          // Track blog view
          if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'ViewContent', {
              content_type: 'blog_post',
              content_name: post.title,
              content_id: post.id
            });
          }
        },
        error: () => {
          this.isLoading.set(false);
        }
      });
    }
    loadRelated(postId) {
      this.blogData.getRelated(postId, 3).subscribe({
        next: posts => {
          this.relatedPosts.set(posts);
        }
      });
    }
    setSEOMeta(post) {
      // Set page title
      const pageTitle = post.metaTitle || `${post.title} | Blog Guia Noivas`;
      this.title.setTitle(pageTitle);
      // Set meta description
      const description = post.metaDescription || post.excerpt;
      this.meta.updateTag({
        name: 'description',
        content: description
      });
      // Open Graph tags
      this.meta.updateTag({
        property: 'og:title',
        content: post.title
      });
      this.meta.updateTag({
        property: 'og:description',
        content: description
      });
      this.meta.updateTag({
        property: 'og:type',
        content: 'article'
      });
      if (post.featuredImage) {
        this.meta.updateTag({
          property: 'og:image',
          content: post.featuredImage
        });
      }
      // Twitter Card
      this.meta.updateTag({
        name: 'twitter:card',
        content: 'summary_large_image'
      });
      this.meta.updateTag({
        name: 'twitter:title',
        content: post.title
      });
      this.meta.updateTag({
        name: 'twitter:description',
        content: description
      });
      if (post.featuredImage) {
        this.meta.updateTag({
          name: 'twitter:image',
          content: post.featuredImage
        });
      }
      // Article tags
      this.meta.updateTag({
        property: 'article:published_time',
        content: post.publishedAt
      });
      if (post.updatedAt) {
        this.meta.updateTag({
          property: 'article:modified_time',
          content: post.updatedAt
        });
      }
      if (post.author) {
        this.meta.updateTag({
          property: 'article:author',
          content: post.author
        });
      }
    }
    addStructuredData(post) {
      if (typeof document === 'undefined') return;
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': post.title,
        'description': post.excerpt,
        'image': post.featuredImage || '',
        'datePublished': post.publishedAt,
        'dateModified': post.updatedAt || post.publishedAt,
        'author': {
          '@type': 'Person',
          'name': post.author || 'Guia Noivas'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Guia Noivas Piracicaba',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://guianoivas.com/assets/logo.png'
          }
        }
      };
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
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
    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
    }
    shareOnWhatsApp() {
      const text = encodeURIComponent(`${this.post()?.title} - ${window.location.href}`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
    }
    static ɵfac = function BlogDetailPage_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || BlogDetailPage)();
    };
    static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: BlogDetailPage,
      selectors: [["app-blog-detail"]],
      decls: 3,
      vars: 2,
      consts: [["loading", ""], ["class", "container mx-auto px-4 py-12", 4, "ngIf", "ngIfElse"], [1, "container", "mx-auto", "px-4", "py-12"], [1, "mb-8", "text-sm", "text-gray-600"], [1, "hover:text-rose-600", 3, "routerLink"], [1, "mx-2"], [1, "text-gray-900"], [1, "max-w-4xl", "mx-auto"], ["class", "relative w-full h-96 mb-8 rounded-2xl overflow-hidden", 4, "ngIf"], [1, "mb-8"], [1, "flex", "items-center", "gap-3", "mb-4"], ["class", "text-sm bg-rose-100 text-rose-600 px-4 py-1 rounded-full font-semibold", 4, "ngIf"], [1, "text-sm", "text-gray-500"], ["class", "text-sm text-gray-500", 4, "ngIf"], [1, "text-4xl", "md:text-5xl", "font-serif", "font-bold", "text-gray-900", "mb-4"], [1, "text-xl", "text-gray-600", "mb-6"], [1, "flex", "items-center", "justify-between", "border-t", "border-b", "border-gray-200", "py-4"], ["class", "flex items-center gap-3", 4, "ngIf"], [1, "flex", "gap-2"], ["aria-label", "Compartilhar no Facebook", 1, "p-2", "rounded-full", "bg-blue-50", "text-blue-600", "hover:bg-blue-100", "transition", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["d", "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"], ["aria-label", "Compartilhar no WhatsApp", 1, "p-2", "rounded-full", "bg-green-50", "text-green-600", "hover:bg-green-100", "transition", 3, "click"], ["d", "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"], [1, "prose", "prose-lg", "max-w-none", "mb-12", 3, "innerHTML"], ["class", "mb-12", 4, "ngIf"], ["class", "border-t border-gray-200 pt-12", 4, "ngIf"], [1, "relative", "w-full", "h-96", "mb-8", "rounded-2xl", "overflow-hidden"], ["width", "1200", "height", "630", "priority", "", 1, "w-full", "h-full", "object-cover", 3, "ngSrc", "alt"], [1, "text-sm", "bg-rose-100", "text-rose-600", "px-4", "py-1", "rounded-full", "font-semibold"], [1, "flex", "items-center", "gap-3"], [1, "w-12", "h-12", "bg-rose-100", "rounded-full", "flex", "items-center", "justify-center"], [1, "text-rose-600", "font-bold", "text-lg"], [1, "font-semibold", "text-gray-900"], [1, "mb-12"], [1, "text-sm", "font-semibold", "text-gray-500", "mb-3"], [1, "flex", "flex-wrap", "gap-2"], ["class", "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm", 4, "ngFor", "ngForOf"], [1, "px-3", "py-1", "bg-gray-100", "text-gray-700", "rounded-full", "text-sm"], [1, "border-t", "border-gray-200", "pt-12"], [1, "text-3xl", "font-serif", "font-bold", "text-gray-900", "mb-8"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-6"], ["class", "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition", 4, "ngFor", "ngForOf"], [1, "bg-white", "rounded-lg", "shadow-md", "overflow-hidden", "hover:shadow-xl", "transition"], [3, "routerLink"], ["class", "relative h-40 bg-gray-200", 4, "ngIf"], [1, "p-4"], [1, "font-serif", "font-bold", "text-gray-900", "mb-2", "hover:text-rose-600", "transition", "line-clamp-2"], [1, "text-sm", "text-gray-600", "line-clamp-2"], [1, "relative", "h-40", "bg-gray-200"], ["width", "400", "height", "300", "loading", "lazy", 1, "w-full", "h-full", "object-cover", 3, "ngSrc", "alt"], [1, "max-w-4xl", "mx-auto", "animate-pulse"], [1, "h-96", "bg-gray-200", "rounded-2xl", "mb-8"], [1, "h-8", "bg-gray-200", "rounded", "w-3/4", "mb-4"], [1, "h-4", "bg-gray-200", "rounded", "w-full", "mb-2"], [1, "h-4", "bg-gray-200", "rounded", "w-5/6"]],
      template: function BlogDetailPage_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, BlogDetailPage_div_0_Template, 36, 13, "div", 1)(1, BlogDetailPage_ng_template_1_Template, 6, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
        }
        if (rf & 2) {
          const loading_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isLoading() && ctx.post())("ngIfElse", loading_r5);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgOptimizedImage],
      styles: [".prose[_ngcontent-%COMP%] {\n  color: #374151;\n  line-height: 1.75;\n}\n\n.prose[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: 'Playfair Display', serif;\n  font-weight: 700;\n  font-size: 1.875rem;\n  margin-top: 2rem;\n  margin-bottom: 1rem;\n  color: #111827;\n}\n\n.prose[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: 'Playfair Display', serif;\n  font-weight: 700;\n  font-size: 1.5rem;\n  margin-top: 1.5rem;\n  margin-bottom: 0.75rem;\n  color: #111827;\n}\n\n.prose[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 1.25rem;\n}\n\n.prose[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%], \n.prose[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] {\n  margin-bottom: 1.25rem;\n  padding-left: 1.5rem;\n}\n\n.prose[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n\n.prose[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #e11d48;\n  text-decoration: underline;\n}\n\n.prose[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #be123c;\n}\n\n.prose[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  margin: 2rem 0;\n}\n\n.prose[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  border-left: 4px solid #e11d48;\n  padding-left: 1rem;\n  font-style: italic;\n  color: #6b7280;\n  margin: 1.5rem 0;\n}\n\n.line-clamp-2[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2ctZGV0YWlsLXBhZ2UuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBYztFQUNkLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLHNDQUFzQztFQUN0QyxnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLHNDQUFzQztFQUN0QyxnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTs7RUFFRSxzQkFBc0I7RUFDdEIsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsY0FBYztFQUNkLDBCQUEwQjtBQUM1Qjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLDhCQUE4QjtFQUM5QixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIscUJBQXFCO0VBQ3JCLGFBQWE7RUFDYiw0QkFBNEI7RUFDNUIsZ0JBQWdCO0FBQ2xCIiwiZmlsZSI6ImJsb2ctZGV0YWlsLXBhZ2UuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnByb3NlIHtcbiAgY29sb3I6ICMzNzQxNTE7XG4gIGxpbmUtaGVpZ2h0OiAxLjc1O1xufVxuXG4ucHJvc2UgaDIge1xuICBmb250LWZhbWlseTogJ1BsYXlmYWlyIERpc3BsYXknLCBzZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgZm9udC1zaXplOiAxLjg3NXJlbTtcbiAgbWFyZ2luLXRvcDogMnJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgY29sb3I6ICMxMTE4Mjc7XG59XG5cbi5wcm9zZSBoMyB7XG4gIGZvbnQtZmFtaWx5OiAnUGxheWZhaXIgRGlzcGxheScsIHNlcmlmO1xuICBmb250LXdlaWdodDogNzAwO1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgbWFyZ2luLXRvcDogMS41cmVtO1xuICBtYXJnaW4tYm90dG9tOiAwLjc1cmVtO1xuICBjb2xvcjogIzExMTgyNztcbn1cblxuLnByb3NlIHAge1xuICBtYXJnaW4tYm90dG9tOiAxLjI1cmVtO1xufVxuXG4ucHJvc2UgdWwsXG4ucHJvc2Ugb2wge1xuICBtYXJnaW4tYm90dG9tOiAxLjI1cmVtO1xuICBwYWRkaW5nLWxlZnQ6IDEuNXJlbTtcbn1cblxuLnByb3NlIGxpIHtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xufVxuXG4ucHJvc2UgYSB7XG4gIGNvbG9yOiAjZTExZDQ4O1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cblxuLnByb3NlIGE6aG92ZXIge1xuICBjb2xvcjogI2JlMTIzYztcbn1cblxuLnByb3NlIGltZyB7XG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbiAgbWFyZ2luOiAycmVtIDA7XG59XG5cbi5wcm9zZSBibG9ja3F1b3RlIHtcbiAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjZTExZDQ4O1xuICBwYWRkaW5nLWxlZnQ6IDFyZW07XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgY29sb3I6ICM2YjcyODA7XG4gIG1hcmdpbjogMS41cmVtIDA7XG59XG5cbi5saW5lLWNsYW1wLTIge1xuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgLXdlYmtpdC1saW5lLWNsYW1wOiAyO1xuICBsaW5lLWNsYW1wOiAyO1xuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYmxvZy9ibG9nLWRldGFpbC9ibG9nLWRldGFpbC1wYWdlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQWM7RUFDZCxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxzQ0FBc0M7RUFDdEMsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxzQ0FBc0M7RUFDdEMsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7O0VBRUUsc0JBQXNCO0VBQ3RCLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGNBQWM7RUFDZCwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSw4QkFBOEI7RUFDOUIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixjQUFjO0VBQ2QsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLHFCQUFxQjtFQUNyQixhQUFhO0VBQ2IsNEJBQTRCO0VBQzVCLGdCQUFnQjtBQUNsQjs7QUFFQSw0dkVBQTR2RSIsInNvdXJjZXNDb250ZW50IjpbIi5wcm9zZSB7XG4gIGNvbG9yOiAjMzc0MTUxO1xuICBsaW5lLWhlaWdodDogMS43NTtcbn1cblxuLnByb3NlIGgyIHtcbiAgZm9udC1mYW1pbHk6ICdQbGF5ZmFpciBEaXNwbGF5Jywgc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGZvbnQtc2l6ZTogMS44NzVyZW07XG4gIG1hcmdpbi10b3A6IDJyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGNvbG9yOiAjMTExODI3O1xufVxuXG4ucHJvc2UgaDMge1xuICBmb250LWZhbWlseTogJ1BsYXlmYWlyIERpc3BsYXknLCBzZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgZm9udC1zaXplOiAxLjVyZW07XG4gIG1hcmdpbi10b3A6IDEuNXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMC43NXJlbTtcbiAgY29sb3I6ICMxMTE4Mjc7XG59XG5cbi5wcm9zZSBwIHtcbiAgbWFyZ2luLWJvdHRvbTogMS4yNXJlbTtcbn1cblxuLnByb3NlIHVsLFxuLnByb3NlIG9sIHtcbiAgbWFyZ2luLWJvdHRvbTogMS4yNXJlbTtcbiAgcGFkZGluZy1sZWZ0OiAxLjVyZW07XG59XG5cbi5wcm9zZSBsaSB7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbn1cblxuLnByb3NlIGEge1xuICBjb2xvcjogI2UxMWQ0ODtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG59XG5cbi5wcm9zZSBhOmhvdmVyIHtcbiAgY29sb3I6ICNiZTEyM2M7XG59XG5cbi5wcm9zZSBpbWcge1xuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG4gIG1hcmdpbjogMnJlbSAwO1xufVxuXG4ucHJvc2UgYmxvY2txdW90ZSB7XG4gIGJvcmRlci1sZWZ0OiA0cHggc29saWQgI2UxMWQ0ODtcbiAgcGFkZGluZy1sZWZ0OiAxcmVtO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGNvbG9yOiAjNmI3MjgwO1xuICBtYXJnaW46IDEuNXJlbSAwO1xufVxuXG4ubGluZS1jbGFtcC0yIHtcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gIC13ZWJraXQtbGluZS1jbGFtcDogMjtcbiAgbGluZS1jbGFtcDogMjtcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
      changeDetection: 0
    });
  }
  return BlogDetailPage;
})();

/***/ })

}]);
//# sourceMappingURL=852.js.map