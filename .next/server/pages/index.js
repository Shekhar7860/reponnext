/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function() {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nookies */ \"nookies\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _store_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/actions */ \"./store/actions/index.js\");\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (() => {\n  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {\n    const lang = localStorage.getItem(\"lang\");\n    const currency = localStorage.getItem(\"currency\");\n\n    if (!currency) {\n      (0,nookies__WEBPACK_IMPORTED_MODULE_3__.setCookie)(undefined, _store_actions__WEBPACK_IMPORTED_MODULE_4__.default.GET_USER_CURRENCY, \"usd\", {\n        maxAge: 30 * 24 * 60 * 60,\n        path: \"/\"\n      });\n      localStorage.setItem(\"currency\", \"usd\");\n    }\n\n    router.push({\n      pathname: '/[lang]',\n      query: {\n        lang: lang ? lang : \"en\",\n        currency: currency ? currency : \"usd\"\n      }\n    });\n  });\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5hbXVzdS8uL3BhZ2VzL2luZGV4LmpzPzQ0ZDgiXSwibmFtZXMiOlsicm91dGVyIiwidXNlUm91dGVyIiwidXNlRWZmZWN0IiwibGFuZyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJjdXJyZW5jeSIsInNldENvb2tpZSIsImFjdGlvbnMiLCJtYXhBZ2UiLCJwYXRoIiwic2V0SXRlbSIsInB1c2giLCJwYXRobmFtZSIsInF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLCtEQUFlLE1BQU07QUFDbkIsUUFBTUEsTUFBTSxHQUFHQyxzREFBUyxFQUF4QjtBQUNBQyxrREFBUyxDQUFDLE1BQU07QUFDZCxVQUFNQyxJQUFJLEdBQUdDLFlBQVksQ0FBQ0MsT0FBYixDQUFxQixNQUFyQixDQUFiO0FBQ0EsVUFBTUMsUUFBUSxHQUFHRixZQUFZLENBQUNDLE9BQWIsQ0FBcUIsVUFBckIsQ0FBakI7O0FBQ0EsUUFBSSxDQUFDQyxRQUFMLEVBQWU7QUFDYkMsd0RBQVMsQ0FBQyxTQUFELEVBQU9DLHFFQUFQLEVBQWtDLEtBQWxDLEVBQXlDO0FBQ2hEQyxjQUFNLEVBQUUsS0FBSyxFQUFMLEdBQVUsRUFBVixHQUFlLEVBRHlCO0FBRWhEQyxZQUFJLEVBQUU7QUFGMEMsT0FBekMsQ0FBVDtBQUlBTixrQkFBWSxDQUFDTyxPQUFiLENBQXFCLFVBQXJCLEVBQWlDLEtBQWpDO0FBQ0Q7O0FBQ0RYLFVBQU0sQ0FBQ1ksSUFBUCxDQUFZO0FBQ1ZDLGNBQVEsRUFBRSxTQURBO0FBRVZDLFdBQUssRUFBRTtBQUFFWCxZQUFJLEVBQUVBLElBQUksR0FBR0EsSUFBSCxHQUFVLElBQXRCO0FBQTRCRyxnQkFBUSxFQUFFQSxRQUFRLEdBQUdBLFFBQUgsR0FBYztBQUE1RDtBQUZHLEtBQVo7QUFLRCxHQWZRLENBQVQ7QUFpQkEsc0JBQ0UsNklBREY7QUFJRCxDQXZCRCIsImZpbGUiOiIuL3BhZ2VzL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcidcbmltcG9ydCB7IHNldENvb2tpZSB9IGZyb20gJ25vb2tpZXMnXG5pbXBvcnQgYWN0aW9ucyBmcm9tICcuLi9zdG9yZS9hY3Rpb25zJ1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbGFuZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGFuZ1wiKVxuICAgIGNvbnN0IGN1cnJlbmN5ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW5jeVwiKVxuICAgIGlmICghY3VycmVuY3kpIHtcbiAgICAgIHNldENvb2tpZSh0aGlzLCBhY3Rpb25zLkdFVF9VU0VSX0NVUlJFTkNZLCBcInVzZFwiLCB7XG4gICAgICAgIG1heEFnZTogMzAgKiAyNCAqIDYwICogNjAsXG4gICAgICAgIHBhdGg6IFwiL1wiLFxuICAgICAgfSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbmN5XCIsIFwidXNkXCIpXG4gICAgfVxuICAgIHJvdXRlci5wdXNoKHtcbiAgICAgIHBhdGhuYW1lOiAnL1tsYW5nXScsXG4gICAgICBxdWVyeTogeyBsYW5nOiBsYW5nID8gbGFuZyA6IFwiZW5cIiwgY3VycmVuY3k6IGN1cnJlbmN5ID8gY3VycmVuY3kgOiBcInVzZFwiIH0sXG4gICAgfSlcblxuICB9KVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICA8Lz5cbiAgKVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "./store/actions/index.js":
/*!********************************!*\
  !*** ./store/actions/index.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  INITIALISE_USER: \"INITIALISE_USER\",\n  SET_STUDENT_POST: \"SET_STUDENT_POST\",\n  SET_STUDENT_USERS: \"SET_STUDENT_USERS\",\n  SET_STUDENT_USER: \"SET_STUDENT_USER\",\n  SET_TEACHER_POST: \"SET_TEACHER_POST\",\n  SET_TEACHER_USERS: \"SET_TEACHER_USERS\",\n  SET_TEACHER_USER: \"SET_TEACHER_USER\",\n  GET_LAST_CHAT_BOOKING_ID: \"GET_LAST_CHAT_BOOKING_ID\",\n  GET_USER_CURRENCY: \"GET_USER_CURRENCY\",\n  GET_USER_INFO: \"GET_USER_INFO\",\n  GET_STATIC_DATA: \"GET_STATIC_DATA\",\n  GET_USER_DETAILS: \"GET_USER_DETAILS\",\n  ALLOW_BACK: \"ALLOW_BACK\"\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5hbXVzdS8uL3N0b3JlL2FjdGlvbnMvaW5kZXguanM/NWU5ZiJdLCJuYW1lcyI6WyJJTklUSUFMSVNFX1VTRVIiLCJTRVRfU1RVREVOVF9QT1NUIiwiU0VUX1NUVURFTlRfVVNFUlMiLCJTRVRfU1RVREVOVF9VU0VSIiwiU0VUX1RFQUNIRVJfUE9TVCIsIlNFVF9URUFDSEVSX1VTRVJTIiwiU0VUX1RFQUNIRVJfVVNFUiIsIkdFVF9MQVNUX0NIQVRfQk9PS0lOR19JRCIsIkdFVF9VU0VSX0NVUlJFTkNZIiwiR0VUX1VTRVJfSU5GTyIsIkdFVF9TVEFUSUNfREFUQSIsIkdFVF9VU0VSX0RFVEFJTFMiLCJBTExPV19CQUNLIl0sIm1hcHBpbmdzIjoiO0FBQUEsK0RBQWU7QUFDYkEsaUJBQWUsRUFBRSxpQkFESjtBQUdiQyxrQkFBZ0IsRUFBRSxrQkFITDtBQUliQyxtQkFBaUIsRUFBRSxtQkFKTjtBQUtiQyxrQkFBZ0IsRUFBRSxrQkFMTDtBQU9iQyxrQkFBZ0IsRUFBRSxrQkFQTDtBQVFiQyxtQkFBaUIsRUFBRSxtQkFSTjtBQVNiQyxrQkFBZ0IsRUFBRSxrQkFUTDtBQVliQywwQkFBd0IsRUFBRSwwQkFaYjtBQWFiQyxtQkFBaUIsRUFBRSxtQkFiTjtBQWNiQyxlQUFhLEVBQUUsZUFkRjtBQWViQyxpQkFBZSxFQUFFLGlCQWZKO0FBZ0JiQyxrQkFBZ0IsRUFBRSxrQkFoQkw7QUFpQmJDLFlBQVUsRUFBRTtBQWpCQyxDQUFmIiwiZmlsZSI6Ii4vc3RvcmUvYWN0aW9ucy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgSU5JVElBTElTRV9VU0VSOiBcIklOSVRJQUxJU0VfVVNFUlwiLFxuXG4gIFNFVF9TVFVERU5UX1BPU1Q6IFwiU0VUX1NUVURFTlRfUE9TVFwiLFxuICBTRVRfU1RVREVOVF9VU0VSUzogXCJTRVRfU1RVREVOVF9VU0VSU1wiLFxuICBTRVRfU1RVREVOVF9VU0VSOiBcIlNFVF9TVFVERU5UX1VTRVJcIixcblxuICBTRVRfVEVBQ0hFUl9QT1NUOiBcIlNFVF9URUFDSEVSX1BPU1RcIixcbiAgU0VUX1RFQUNIRVJfVVNFUlM6IFwiU0VUX1RFQUNIRVJfVVNFUlNcIixcbiAgU0VUX1RFQUNIRVJfVVNFUjogXCJTRVRfVEVBQ0hFUl9VU0VSXCIsXG5cblxuICBHRVRfTEFTVF9DSEFUX0JPT0tJTkdfSUQ6IFwiR0VUX0xBU1RfQ0hBVF9CT09LSU5HX0lEXCIsXG4gIEdFVF9VU0VSX0NVUlJFTkNZOiBcIkdFVF9VU0VSX0NVUlJFTkNZXCIsXG4gIEdFVF9VU0VSX0lORk86IFwiR0VUX1VTRVJfSU5GT1wiLFxuICBHRVRfU1RBVElDX0RBVEE6IFwiR0VUX1NUQVRJQ19EQVRBXCIsXG4gIEdFVF9VU0VSX0RFVEFJTFM6IFwiR0VUX1VTRVJfREVUQUlMU1wiLFxuICBBTExPV19CQUNLOiBcIkFMTE9XX0JBQ0tcIixcblxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./store/actions/index.js\n");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/router");;

/***/ }),

/***/ "nookies":
/*!**************************!*\
  !*** external "nookies" ***!
  \**************************/
/***/ (function(module) {

"use strict";
module.exports = require("nookies");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();