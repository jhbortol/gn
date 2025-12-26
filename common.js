"use strict";
(self["webpackChunkguia_noivas"] = self["webpackChunkguia_noivas"] || []).push([[76],{

/***/ 589:
/*!*****************************************************************!*\
  !*** ./src/app/features/categorias/services/categorias-data.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CategoriasData: () => (/* binding */ CategoriasData)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/environment */ 5312);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 1318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 9648);





let CategoriasData = /*#__PURE__*/(() => {
  class CategoriasData {
    http;
    // Fallback local (estrutura antiga - remover após backend estável)
    fallback = [{
      id: 'fotografia',
      nome: 'Fotografia',
      slug: 'fotografia',
      descricao: 'Profissionais para registrar seu grande dia.',
      imageId: null,
      imageUrl: 'assets/categorias/fotografia.jpg'
    }, {
      id: 'buffet',
      nome: 'Buffet',
      slug: 'buffet',
      descricao: 'Buffets e serviços de alimentação para eventos.',
      imageId: null,
      imageUrl: 'assets/categorias/buffet.jpg'
    }, {
      id: 'decoracao',
      nome: 'Decoração',
      slug: 'decoracao',
      descricao: 'Decoração e ambientação para casamentos.',
      imageId: null,
      imageUrl: 'assets/categorias/decoracao.jpg'
    }, {
      id: 'musica',
      nome: 'Música',
      slug: 'musica',
      descricao: 'Bandas, DJs e músicos para cerimônia e festa.',
      imageId: null,
      imageUrl: 'assets/categorias/musica.jpg'
    }, {
      id: 'espacos',
      nome: 'Espaços',
      slug: 'espacos',
      descricao: 'Locais para realização de eventos.',
      imageId: null,
      imageUrl: 'assets/categorias/espacos.jpg'
    }, {
      id: 'vestidos',
      nome: 'Vestido de Noiva',
      slug: 'vestidos',
      descricao: 'Estilistas e lojas especializadas.',
      imageId: null,
      imageUrl: 'assets/categorias/vestidos.jpg'
    }];
    getAll() {
      return this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.API_BASE_URL}/categorias`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(response => response.data), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(this.fallback)));
    }
    getBySlug(slug) {
      return this.getAll().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(categorias => categorias.find(c => c.slug === slug || c.id === slug)));
    }
    constructor(http) {
      this.http = http;
    }
    static ɵfac = function CategoriasData_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || CategoriasData)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
    };
    static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
      token: CategoriasData,
      factory: CategoriasData.ɵfac,
      providedIn: 'root'
    });
  }
  return CategoriasData;
})();

/***/ }),

/***/ 1817:
/*!*******************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/operators/distinctUntilChanged.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   distinctUntilChanged: () => (/* binding */ distinctUntilChanged)
/* harmony export */ });
/* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/identity */ 1440);
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ 3200);
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OperatorSubscriber */ 1687);



function distinctUntilChanged(comparator, keySelector = _util_identity__WEBPACK_IMPORTED_MODULE_0__.identity) {
  comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
  return (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)((source, subscriber) => {
    let previousKey;
    let first = true;
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(subscriber, value => {
      const currentKey = keySelector(value);
      if (first || !comparator(previousKey, currentKey)) {
        first = false;
        previousKey = currentKey;
        subscriber.next(value);
      }
    }));
  });
}
function defaultCompare(a, b) {
  return a === b;
}

/***/ }),

/***/ 1962:
/*!**********************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/Scheduler.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Scheduler: () => (/* binding */ Scheduler)
/* harmony export */ });
/* harmony import */ var _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler/dateTimestampProvider */ 5152);

class Scheduler {
  constructor(schedulerActionCtor, now = Scheduler.now) {
    this.schedulerActionCtor = schedulerActionCtor;
    this.now = now;
  }
  schedule(work, delay = 0, state) {
    return new this.schedulerActionCtor(this, work).schedule(state, delay);
  }
}
Scheduler.now = _scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_0__.dateTimestampProvider.now;

/***/ }),

/***/ 2083:
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/scheduler/AsyncAction.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsyncAction: () => (/* binding */ AsyncAction)
/* harmony export */ });
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Action */ 9103);
/* harmony import */ var _intervalProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./intervalProvider */ 8113);
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/arrRemove */ 967);



class AsyncAction extends _Action__WEBPACK_IMPORTED_MODULE_0__.Action {
  constructor(scheduler, work) {
    super(scheduler, work);
    this.scheduler = scheduler;
    this.work = work;
    this.pending = false;
  }
  schedule(state, delay = 0) {
    var _a;
    if (this.closed) {
      return this;
    }
    this.state = state;
    const id = this.id;
    const scheduler = this.scheduler;
    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay);
    }
    this.pending = true;
    this.delay = delay;
    this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
    return this;
  }
  requestAsyncId(scheduler, _id, delay = 0) {
    return _intervalProvider__WEBPACK_IMPORTED_MODULE_1__.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
  }
  recycleAsyncId(_scheduler, id, delay = 0) {
    if (delay != null && this.delay === delay && this.pending === false) {
      return id;
    }
    if (id != null) {
      _intervalProvider__WEBPACK_IMPORTED_MODULE_1__.intervalProvider.clearInterval(id);
    }
    return undefined;
  }
  execute(state, delay) {
    if (this.closed) {
      return new Error('executing a cancelled action');
    }
    this.pending = false;
    const error = this._execute(state, delay);
    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  }
  _execute(state, _delay) {
    let errored = false;
    let errorValue;
    try {
      this.work(state);
    } catch (e) {
      errored = true;
      errorValue = e ? e : new Error('Scheduled action threw falsy error');
    }
    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  }
  unsubscribe() {
    if (!this.closed) {
      const {
        id,
        scheduler
      } = this;
      const {
        actions
      } = scheduler;
      this.work = this.state = this.scheduler = null;
      this.pending = false;
      (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_2__.arrRemove)(actions, this);
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
      this.delay = null;
      super.unsubscribe();
    }
  }
}

/***/ }),

/***/ 2400:
/*!*************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/scheduler/AsyncScheduler.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsyncScheduler: () => (/* binding */ AsyncScheduler)
/* harmony export */ });
/* harmony import */ var _Scheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Scheduler */ 1962);

class AsyncScheduler extends _Scheduler__WEBPACK_IMPORTED_MODULE_0__.Scheduler {
  constructor(SchedulerAction, now = _Scheduler__WEBPACK_IMPORTED_MODULE_0__.Scheduler.now) {
    super(SchedulerAction, now);
    this.actions = [];
    this._active = false;
  }
  flush(action) {
    const {
      actions
    } = this;
    if (this._active) {
      actions.push(action);
      return;
    }
    let error;
    this._active = true;
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());
    this._active = false;
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  }
}

/***/ }),

/***/ 2973:
/*!*****************************************************!*\
  !*** ./src/app/features/blog/services/blog-data.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlogData: () => (/* binding */ BlogData)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/api.service */ 7981);



let BlogData = /*#__PURE__*/(() => {
  class BlogData {
    api;
    constructor(api) {
      this.api = api;
    }
    getAll(page = 1, pageSize = 12, category) {
      const params = {
        page,
        pageSize
      };
      if (category) params.category = category;
      return this.api.get('/blog/posts', params).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(r => r.data || []));
    }
    getBySlug(slug) {
      return this.api.get(`/blog/posts/slug/${slug}`);
    }
    getById(id) {
      return this.api.get(`/blog/posts/${id}`);
    }
    getRelated(postId, limit = 3) {
      return this.api.get(`/blog/posts/${postId}/related`, {
        limit
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(r => r.data || []));
    }
    incrementViews(postId) {
      return this.api.post(`/blog/posts/${postId}/view`, {});
    }
    search(query, page = 1, pageSize = 12) {
      return this.api.get('/blog/posts/search', {
        q: query,
        page,
        pageSize
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(r => r.data || []));
    }
    static ɵfac = function BlogData_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || BlogData)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_core_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService));
    };
    static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: BlogData,
      factory: BlogData.ɵfac,
      providedIn: 'root'
    });
  }
  return BlogData;
})();

/***/ }),

/***/ 5152:
/*!********************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/scheduler/dateTimestampProvider.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dateTimestampProvider: () => (/* binding */ dateTimestampProvider)
/* harmony export */ });
const dateTimestampProvider = {
  now() {
    return (dateTimestampProvider.delegate || Date).now();
  },
  delegate: undefined
};

/***/ }),

/***/ 5889:
/*!**************************************************!*\
  !*** ./src/app/shared/services/toast.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToastService: () => (/* binding */ ToastService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);


let ToastService = /*#__PURE__*/(() => {
  class ToastService {
    toasts = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)([]);
    show(message, type = 'info', duration = 3000) {
      const id = Date.now().toString();
      const toast = {
        id,
        message,
        type,
        duration
      };
      this.toasts.update(current => [...current, toast]);
      if (duration > 0) {
        setTimeout(() => this.remove(id), duration);
      }
      return id;
    }
    success(message, duration = 3000) {
      return this.show(message, 'success', duration);
    }
    error(message, duration = 3000) {
      return this.show(message, 'error', duration);
    }
    info(message, duration = 3000) {
      return this.show(message, 'info', duration);
    }
    warning(message, duration = 3000) {
      return this.show(message, 'warning', duration);
    }
    remove(id) {
      this.toasts.update(current => current.filter(t => t.id !== id));
    }
    clear() {
      this.toasts.set([]);
    }
    static ɵfac = function ToastService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ToastService)();
    };
    static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: ToastService,
      factory: ToastService.ɵfac,
      providedIn: 'root'
    });
  }
  return ToastService;
})();

/***/ }),

/***/ 6972:
/*!**************************************************************!*\
  !*** ./src/app/features/painel/services/supplier.service.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SupplierService: () => (/* binding */ SupplierService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 8764);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 271);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 9648);
/* harmony import */ var _supplier_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./supplier-auth.service */ 5553);





let SupplierService = /*#__PURE__*/(() => {
  class SupplierService {
    http;
    authService;
    apiUrl = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.API_BASE_URL}/supplier`;
    authUrl = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.API_BASE_URL}/auth`;
    constructor(http, authService) {
      this.http = http;
      this.authService = authService;
    }
    // ===== AUTENTICAÇÃO =====
    login(email, password) {
      return this.http.post(`${this.authUrl}/login`, {
        email,
        password
      }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(response => this.authService.storeSession(response)));
    }
    logout() {
      return this.http.post(`${this.authUrl}/logout`, {}).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.authService.clearSession()));
    }
    forgotPassword(email) {
      return this.http.post(`${this.authUrl}/forgot-password`, {
        email
      });
    }
    resetPassword(token, newPassword) {
      return this.http.post(`${this.authUrl}/reset-password`, {
        token,
        newPassword
      });
    }
    changePassword(currentPassword, newPassword) {
      return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.API_BASE_URL}/account/change-password`, {
        currentPassword,
        newPassword
      });
    }
    // ===== FORNECEDOR =====
    getMe() {
      return this.http.get(`${this.apiUrl}/me`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(response => console.log('getMe RAW response:', response, 'type:', typeof response)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(response => {
        console.log('getMe response structure - has data?:', !!response?.data);
        // Handle wrapped response: { data: FornecedorDto }
        if (response && typeof response === 'object' && response.data) {
          console.log('Extracting data from wrapper');
          const extracted = response.data;
          console.log('Extracted data:', extracted);
          return extracted;
        }
        // Handle direct response: FornecedorDto
        console.log('Using response as-is (not wrapped)');
        return response;
      }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(result => console.log('Final mapped result:', result)));
    }
    updateMe(data) {
      return this.http.put(`${this.apiUrl}/me`, data);
    }
    getStats() {
      return this.http.get(`${this.apiUrl}/me/stats`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(response => console.log('getStats RAW response:', response)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(response => {
        if (response && response.data) {
          return response.data;
        }
        return response;
      }));
    }
    // ===== IMAGENS =====
    getImages() {
      return this.http.get(`${this.apiUrl}/me/images`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(response => console.log('Images response:', response)));
    }
    uploadImage(file, isPrimary = false, imageType = 'gallery') {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('isPrimary', isPrimary.toString());
      formData.append('imageType', imageType);
      return this.http.post(`${this.apiUrl}/me/images`, formData);
    }
    setPrimaryImage(imageId) {
      return this.http.patch(`${this.apiUrl}/me/images/${imageId}/primary`, {});
    }
    reorderImages(imageIds) {
      // API espera o array completo na ordem desejada
      return this.http.patch(`${this.apiUrl}/me/images/reorder`, {
        ImageIds: imageIds
      });
    }
    deleteImage(imageId) {
      return this.http.delete(`${this.apiUrl}/me/images/${imageId}`);
    }
    // ===== TESTEMUNHOS =====
    getTestemunhos(page = 1, pageSize = 10) {
      return this.http.get(`${this.apiUrl}/me/testemunhos`, {
        params: {
          page: page.toString(),
          pageSize: pageSize.toString()
        }
      });
    }
    getTestemunho(id) {
      return this.http.get(`${this.apiUrl}/me/testemunhos/${id}`);
    }
    createTestemunho(data) {
      return this.http.post(`${this.apiUrl}/me/testemunhos`, data);
    }
    updateTestemunho(id, data) {
      return this.http.patch(`${this.apiUrl}/me/testemunhos/${id}`, data);
    }
    deleteTestemunho(id) {
      return this.http.delete(`${this.apiUrl}/me/testemunhos/${id}`);
    }
    static ɵfac = function SupplierService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SupplierService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_supplier_auth_service__WEBPACK_IMPORTED_MODULE_1__.SupplierAuthService));
    };
    static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
      token: SupplierService,
      factory: SupplierService.ɵfac,
      providedIn: 'root'
    });
  }
  return SupplierService;
})();

/***/ }),

/***/ 7237:
/*!*********************************************************************!*\
  !*** ./src/app/features/fornecedores/services/fornecedores-data.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FornecedoresData: () => (/* binding */ FornecedoresData)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 271);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 1318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _core_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/api.service */ 7981);




let FornecedoresData = /*#__PURE__*/(() => {
  class FornecedoresData {
    api;
    search(term, page = 1, pageSize = 12, destaque) {
      const trimmed = (term || '').trim();
      const params = {
        page,
        pageSize
      };
      // Enviar q/nome/descricao para permitir busca por nome e descrição (compatibilidade com backend)
      if (trimmed.length) {
        params.q = trimmed;
        params.nome = trimmed;
        params.descricao = trimmed;
      }
      if (destaque !== undefined) params.destaque = destaque;
      if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO !== null) {
        params.publicado = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO;
      }
      return this.api.get(`/fornecedores/search`, params).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(r => r.data));
    }
    constructor(api) {
      this.api = api;
    }
    getAll(page = 1, pageSize = 12) {
      // Usar /fornecedores/ativos para exibir apenas fornecedores ativos (público)
      const params = {
        page,
        pageSize
      };
      if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO !== null) {
        params.publicado = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO;
      }
      return this.api.get(`/fornecedores/ativos`, params).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(r => r.data));
    }
    getDestaques(page = 1, pageSize = 24) {
      // Destaques: alguns ambientes podem retornar { data: [...] } (wrapper) ou array direto
      const params = {
        page,
        pageSize,
        destaque: true
      };
      if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO !== null) {
        params.publicado = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO;
      }
      return this.api.get(`/fornecedores/ativos`, params).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(r => {
        let list = [];
        if (Array.isArray(r)) list = r;else if (r && Array.isArray(r.data)) list = r.data;else {
          console.warn('[DESTAQUES] formato inesperado da resposta:', r);
        }
        // Se a API ignorou o parâmetro destaque e retornou tudo, filtrar localmente
        if (list.length && list.some(f => f.destaque !== true)) {
          const filtered = list.filter(f => f.destaque);
          if (filtered.length) return filtered;
        }
        return list.filter(f => f.destaque); // garante só destaque
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(list => {
        // Se não houver destaques, retornar lista vazia (não mostrar nada)
        if (list.length === 0) {
          console.warn('[DESTAQUES] nenhum fornecedor com destaque=true encontrado');
        }
        return list;
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(err => {
        console.error('[DESTAQUES] API error:', err);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)([]);
      }));
    }
    getById(identifier, preview = false) {
      const isGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(identifier);
      const endpoint = isGuid ? `/fornecedores/${identifier}` : `/fornecedores/slug/${identifier}`;
      // If preview mode, add query param to bypass publicado filter
      const params = {};
      if (preview) {
        params.preview = 'true';
      }
      return this.api.get(endpoint, params).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(detail => ({
        id: detail.id,
        nome: detail.nome,
        slug: detail.slug,
        descricao: detail.descricao,
        publicado: detail.publicado,
        cidade: detail.cidade,
        endereco: detail.endereco,
        horarioFuncionamento: detail.horarioFuncionamento,
        telefone: detail.telefone,
        email: detail.email,
        website: detail.website,
        instagram: detail.instagram,
        facebook: detail.facebook,
        destaque: detail.destaque,
        seloFornecedor: detail.seloFornecedor,
        ativo: detail.ativo,
        rating: detail.rating,
        visitas: detail.visitas,
        categoria: detail.categoria?.nome,
        imagens: (detail.imagens || []).filter(m => m.url) // Filtrar imagens sem URL
        .map(m => ({
          url: m.url,
          orderIndex: m.orderIndex || 0
        })).sort((a, b) => a.orderIndex - b.orderIndex),
        depoimentos: detail.testemunhos?.map(t => ({
          texto: t.descricao,
          casal: t.nome
        })) || []
      })), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(err => {
        throw err;
      }));
    }
    getByCategoria(categoriaSlugOrId) {
      // Usar endpoint correto: /fornecedores/ativos/categoria/{categoriaSlugOrId}
      const params = {
        page: 1,
        pageSize: 100
      };
      if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO !== null) {
        params.publicado = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO;
      }
      return this.api.get(`/fornecedores/ativos/categoria/${categoriaSlugOrId}`, params).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(r => r.data));
    }
    getDestaquesByCategoria(categoriaSlugOrId) {
      // Tenta obter somente fornecedores destaque na categoria; se API não suportar param, filtra localmente
      const params = {
        page: 1,
        pageSize: 100,
        destaque: true
      };
      if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO !== null) {
        params.publicado = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.FORNECEDOR_PUBLICADO;
      }
      return this.api.get(`/fornecedores/ativos/categoria/${categoriaSlugOrId}`, params).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(r => (r.data || []).filter(f => f.destaque)), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(err => {
        console.warn('[DESTAQUES BY CATEGORIA] falling back filtering local:', err);
        return this.getByCategoria(categoriaSlugOrId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(list => list.filter(f => f.destaque)));
      }));
    }
    static ɵfac = function FornecedoresData_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || FornecedoresData)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_core_api_service__WEBPACK_IMPORTED_MODULE_1__.ApiService));
    };
    static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
      token: FornecedoresData,
      factory: FornecedoresData.ɵfac,
      providedIn: 'root'
    });
  }
  return FornecedoresData;
})();

/***/ }),

/***/ 8113:
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/scheduler/intervalProvider.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   intervalProvider: () => (/* binding */ intervalProvider)
/* harmony export */ });
const intervalProvider = {
  setInterval(handler, timeout, ...args) {
    const {
      delegate
    } = intervalProvider;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
      return delegate.setInterval(handler, timeout, ...args);
    }
    return setInterval(handler, timeout, ...args);
  },
  clearInterval(handle) {
    const {
      delegate
    } = intervalProvider;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
  },
  delegate: undefined
};

/***/ }),

/***/ 8473:
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/scheduler/async.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   async: () => (/* binding */ async),
/* harmony export */   asyncScheduler: () => (/* binding */ asyncScheduler)
/* harmony export */ });
/* harmony import */ var _AsyncAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncAction */ 2083);
/* harmony import */ var _AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsyncScheduler */ 2400);


const asyncScheduler = new _AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__.AsyncScheduler(_AsyncAction__WEBPACK_IMPORTED_MODULE_1__.AsyncAction);
const async = asyncScheduler;

/***/ }),

/***/ 9103:
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/scheduler/Action.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Action: () => (/* binding */ Action)
/* harmony export */ });
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Subscription */ 2510);

class Action extends _Subscription__WEBPACK_IMPORTED_MODULE_0__.Subscription {
  constructor(scheduler, work) {
    super();
  }
  schedule(state, delay = 0) {
    return this;
  }
}

/***/ })

}]);
//# sourceMappingURL=common.js.map