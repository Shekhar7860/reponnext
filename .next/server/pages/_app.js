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
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.scss */ \"./styles/globals.scss\");\n/* harmony import */ var _styles_globals_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/app */ \"./node_modules/next/app.js\");\n/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _utils_language__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/language */ \"./utils/language.js\");\n/* harmony import */ var _store_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../store/actions */ \"./store/actions/index.js\");\n/* harmony import */ var _utils_agent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/agent */ \"./utils/agent.js\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! nookies */ \"nookies\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);\n\nvar _jsxFileName = \"/Users/mac15/Desktop/amandeep/manamusudemosco/pages/_app.js\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n // import NProgress from 'nprogress'\n\nnext_router__WEBPACK_IMPORTED_MODULE_8___default().events.on('routeChangeStart', url => {\n  console.log(`Loading: ${url}`);\n\n  try {\n    document.getElementById(\"websiteLogo\").classList.add(\"elementToFadeInAndOut\");\n  } catch (error) {}\n});\nnext_router__WEBPACK_IMPORTED_MODULE_8___default().events.on('routeChangeComplete', e => {\n  try {\n    document.getElementById(\"websiteLogo\").classList.remove(\"elementToFadeInAndOut\");\n  } catch (error) {}\n});\nnext_router__WEBPACK_IMPORTED_MODULE_8___default().events.on('routeChangeError', e => {\n  try {\n    document.getElementById(\"websiteLogo\").classList.remove(\"elementToFadeInAndOut\");\n  } catch (error) {}\n}); // When the user scrolls down 20px from the top of the document, show the button\n\nif (false) {}\n\nfunction scrollFunction() {\n  var mybutton = document.getElementById(\"myBtn\");\n\n  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {\n    mybutton.style.display = \"block\";\n  } else {\n    mybutton.style.display = \"none\";\n  }\n} // When the user clicks on the button, scroll to the top of the document\n\n\nfunction topFunction() {\n  document.body.scrollTop = 0;\n  document.documentElement.scrollTop = 0;\n}\n\nfunction MyApp({\n  Component,\n  pageProps\n}) {\n  console.log(\"MyApp props\", pageProps);\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_app__WEBPACK_IMPORTED_MODULE_2__.Container, {\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n        charset: \"utf-8\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 63,\n        columnNumber: 7\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n        name: \"viewport\",\n        content: \"width=device-width, initial-scale=1\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 65,\n        columnNumber: 7\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n        name: \"theme-color\",\n        content: \"#000000\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 66,\n        columnNumber: 7\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n        name: \"robots\",\n        content: \"index, follow\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 67,\n        columnNumber: 7\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n        rel: \"stylesheet\",\n        type: \"text/css\",\n        charset: \"UTF-8\",\n        href: \"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 71,\n        columnNumber: 7\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n        rel: \"stylesheet\",\n        type: \"text/css\",\n        href: \"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 72,\n        columnNumber: 7\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n        rel: \"stylesheet\",\n        href: \"https://pro.fontawesome.com/releases/v5.10.0/css/all.css\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 73,\n        columnNumber: 7\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n        href: \"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css\",\n        rel: \"stylesheet\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 74,\n        columnNumber: 7\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n        children: \"Mana Musu : Start Learn Today\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 76,\n        columnNumber: 7\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"script\", {\n        src: \"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 79,\n        columnNumber: 7\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"noscript\", {\n        children: \"You need to enable JavaScript to run this app.\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 81,\n        columnNumber: 7\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 62,\n      columnNumber: 5\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 84,\n      columnNumber: 5\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n      onClick: () => topFunction(),\n      id: \"myBtn\",\n      title: \"Go to top\",\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        class: \"back-top\",\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"i\", {\n          class: \"fas fa-chevron-up\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 88,\n          columnNumber: 9\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 87,\n        columnNumber: 7\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 86,\n      columnNumber: 5\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 61,\n    columnNumber: 10\n  }, this);\n} // MyApp.getInitialProps = async ctx => {\n//   const staticDataObj = parseCookies(ctx)[actions.GET_STATIC_DATA]\n//   if (staticDataObj) {\n//     return staticDataObj ? JSON.parse(staticDataObj) : {}\n//   } else {\n//     const staticData = await agent.Common.staticData()\n//     setCookie(this, actions.GET_STATIC_DATA, JSON.stringify({ ...staticData }), {\n//       maxAge: 30 * 24 * 60 * 60,\n//       path: \"/\",\n//     });\n//     return { ...staticData }\n//   }\n// };\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MyApp);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5hbXVzdS8uL3BhZ2VzL19hcHAuanM/ZDUzMCJdLCJuYW1lcyI6WyJSb3V0ZXIiLCJ1cmwiLCJjb25zb2xlIiwibG9nIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTGlzdCIsImFkZCIsImVycm9yIiwiZSIsInJlbW92ZSIsInNjcm9sbEZ1bmN0aW9uIiwibXlidXR0b24iLCJib2R5Iiwic2Nyb2xsVG9wIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJkaXNwbGF5IiwidG9wRnVuY3Rpb24iLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0NBRUE7O0FBRUFBLDREQUFBLENBQWlCLGtCQUFqQixFQUFzQ0MsR0FBRCxJQUFTO0FBQzVDQyxTQUFPLENBQUNDLEdBQVIsQ0FBYSxZQUFXRixHQUFJLEVBQTVCOztBQUNBLE1BQUk7QUFDRkcsWUFBUSxDQUFDQyxjQUFULENBQXdCLGFBQXhCLEVBQXVDQyxTQUF2QyxDQUFpREMsR0FBakQsQ0FBcUQsdUJBQXJEO0FBRUQsR0FIRCxDQUdFLE9BQU9DLEtBQVAsRUFBYyxDQUVmO0FBQ0YsQ0FSRDtBQVNBUiw0REFBQSxDQUFpQixxQkFBakIsRUFBeUNTLENBQUQsSUFBTztBQUM3QyxNQUFJO0FBQ0ZMLFlBQVEsQ0FBQ0MsY0FBVCxDQUF3QixhQUF4QixFQUF1Q0MsU0FBdkMsQ0FBaURJLE1BQWpELENBQXdELHVCQUF4RDtBQUVELEdBSEQsQ0FHRSxPQUFPRixLQUFQLEVBQWMsQ0FFZjtBQUNGLENBUEQ7QUFRQVIsNERBQUEsQ0FBaUIsa0JBQWpCLEVBQXNDUyxDQUFELElBQU87QUFDMUMsTUFBSTtBQUNGTCxZQUFRLENBQUNDLGNBQVQsQ0FBd0IsYUFBeEIsRUFBdUNDLFNBQXZDLENBQWlESSxNQUFqRCxDQUF3RCx1QkFBeEQ7QUFF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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUEsK0RBQWVDLEtBQWYiLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5zY3NzJ1xuaW1wb3J0IEFwcCwgeyBDb250YWluZXIgfSBmcm9tICduZXh0L2FwcCdcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCdcbmltcG9ydCB7IGNvbmZpZ3VyZUxhbmd1YWdlIH0gZnJvbSBcIi4uL3V0aWxzL2xhbmd1YWdlXCI7XG5pbXBvcnQgYWN0aW9ucyBmcm9tICcuLi9zdG9yZS9hY3Rpb25zJztcbmltcG9ydCBhZ2VudCBmcm9tICcuLi91dGlscy9hZ2VudCc7XG5pbXBvcnQgeyBwYXJzZUNvb2tpZXMsIHNldENvb2tpZSB9IGZyb20gJ25vb2tpZXMnO1xuaW1wb3J0IFJvdXRlciBmcm9tICduZXh0L3JvdXRlcidcbi8vIGltcG9ydCBOUHJvZ3Jlc3MgZnJvbSAnbnByb2dyZXNzJ1xuXG5Sb3V0ZXIuZXZlbnRzLm9uKCdyb3V0ZUNoYW5nZVN0YXJ0JywgKHVybCkgPT4ge1xuICBjb25zb2xlLmxvZyhgTG9hZGluZzogJHt1cmx9YCk7XG4gIHRyeSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWJzaXRlTG9nb1wiKS5jbGFzc0xpc3QuYWRkKFwiZWxlbWVudFRvRmFkZUluQW5kT3V0XCIpXG5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICB9XG59KVxuUm91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VDb21wbGV0ZScsIChlKSA9PiB7XG4gIHRyeSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWJzaXRlTG9nb1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwiZWxlbWVudFRvRmFkZUluQW5kT3V0XCIpXG5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICB9XG59KVxuUm91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VFcnJvcicsIChlKSA9PiB7XG4gIHRyeSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWJzaXRlTG9nb1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwiZWxlbWVudFRvRmFkZUluQW5kT3V0XCIpXG5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICB9XG59KVxuXG4vLyBXaGVuIHRoZSB1c2VyIHNjcm9sbHMgZG93biAyMHB4IGZyb20gdGhlIHRvcCBvZiB0aGUgZG9jdW1lbnQsIHNob3cgdGhlIGJ1dHRvblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgd2luZG93Lm9uc2Nyb2xsID0gKGV2KSA9PlxuICAgIHNjcm9sbEZ1bmN0aW9uKClcblxufVxuZnVuY3Rpb24gc2Nyb2xsRnVuY3Rpb24oKSB7XG4gIHZhciBteWJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlCdG5cIik7XG5cbiAgaWYgKGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID4gMjAgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA+IDIwKSB7XG4gICAgbXlidXR0b24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgfSBlbHNlIHtcbiAgICBteWJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH1cbn1cblxuLy8gV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGJ1dHRvbiwgc2Nyb2xsIHRvIHRoZSB0b3Agb2YgdGhlIGRvY3VtZW50XG5mdW5jdGlvbiB0b3BGdW5jdGlvbigpIHtcbiAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbn1cblxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gIGNvbnNvbGUubG9nKFwiTXlBcHAgcHJvcHNcIiwgcGFnZVByb3BzKTtcbiAgcmV0dXJuIDxDb250YWluZXI+XG4gICAgPEhlYWQ+XG4gICAgICA8bWV0YSBjaGFyc2V0PVwidXRmLThcIiAvPlxuICAgICAgey8qIDxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiJVBVQkxJQ19VUkwlL2Zhdmljb24uaWNvXCIgLz4gKi99XG4gICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIiAvPlxuICAgICAgPG1ldGEgbmFtZT1cInRoZW1lLWNvbG9yXCIgY29udGVudD1cIiMwMDAwMDBcIiAvPlxuICAgICAgPG1ldGEgbmFtZT1cInJvYm90c1wiIGNvbnRlbnQ9XCJpbmRleCwgZm9sbG93XCIgLz5cblxuICAgICAgey8qIDxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBocmVmPVwiJVBVQkxJQ19VUkwlL2xvZ28xOTIucG5nXCIgLz4gKi99XG4gICAgICB7LyogPGxpbmsgcmVsPVwibWFuaWZlc3RcIiBocmVmPVwiJVBVQkxJQ19VUkwlL21hbmlmZXN0Lmpzb25cIiAvPiAqL31cbiAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBjaGFyc2V0PVwiVVRGLThcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2xpY2stY2Fyb3VzZWwvMS42LjAvc2xpY2subWluLmNzc1wiIC8+IFxuICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zbGljay1jYXJvdXNlbC8xLjYuMC9zbGljay10aGVtZS5taW4uY3NzXCIgLz5cbiAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9wcm8uZm9udGF3ZXNvbWUuY29tL3JlbGVhc2VzL3Y1LjEwLjAvY3NzL2FsbC5jc3NcIiAvPlxuICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vYm9vdHN0cmFwQDUuMC4wLWJldGEzL2Rpc3QvY3NzL2Jvb3RzdHJhcC5taW4uY3NzXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+XG5cbiAgICAgIDx0aXRsZT5NYW5hIE11c3UgOiBTdGFydCBMZWFybiBUb2RheTwvdGl0bGU+XG4gICAgICB7LyogPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cIkxlYXJuIG5ldyBza2lsbHMgb25saW5lIHdpdGggdG9wIEVkdWNhdG9yc1wiIGtleT1cImRlc2NyaXB0aW9uXCIgLz4gKi99XG5cbiAgICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9ib290c3RyYXBANS4wLjAtYmV0YTMvZGlzdC9qcy9ib290c3RyYXAuYnVuZGxlLm1pbi5qc1wiPjwvc2NyaXB0PlxuXG4gICAgICA8bm9zY3JpcHQ+WW91IG5lZWQgdG8gZW5hYmxlIEphdmFTY3JpcHQgdG8gcnVuIHRoaXMgYXBwLjwvbm9zY3JpcHQ+XG5cbiAgICA8L0hlYWQ+XG4gICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuXG4gICAgPGRpdiBvbkNsaWNrPXsoKSA9PiB0b3BGdW5jdGlvbigpfSBpZD1cIm15QnRuXCIgdGl0bGU9XCJHbyB0byB0b3BcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJiYWNrLXRvcFwiPlxuICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1jaGV2cm9uLXVwXCI+PC9pPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvQ29udGFpbmVyPlxuXG59XG5cbi8vIE15QXBwLmdldEluaXRpYWxQcm9wcyA9IGFzeW5jIGN0eCA9PiB7XG5cbi8vICAgY29uc3Qgc3RhdGljRGF0YU9iaiA9IHBhcnNlQ29va2llcyhjdHgpW2FjdGlvbnMuR0VUX1NUQVRJQ19EQVRBXVxuLy8gICBpZiAoc3RhdGljRGF0YU9iaikge1xuLy8gICAgIHJldHVybiBzdGF0aWNEYXRhT2JqID8gSlNPTi5wYXJzZShzdGF0aWNEYXRhT2JqKSA6IHt9XG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgY29uc3Qgc3RhdGljRGF0YSA9IGF3YWl0IGFnZW50LkNvbW1vbi5zdGF0aWNEYXRhKClcbi8vICAgICBzZXRDb29raWUodGhpcywgYWN0aW9ucy5HRVRfU1RBVElDX0RBVEEsIEpTT04uc3RyaW5naWZ5KHsgLi4uc3RhdGljRGF0YSB9KSwge1xuLy8gICAgICAgbWF4QWdlOiAzMCAqIDI0ICogNjAgKiA2MCxcbi8vICAgICAgIHBhdGg6IFwiL1wiLFxuLy8gICAgIH0pO1xuLy8gICAgIHJldHVybiB7IC4uLnN0YXRpY0RhdGEgfVxuLy8gICB9XG4vLyB9O1xuXG5leHBvcnQgZGVmYXVsdCBNeUFwcFxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./utils/language.js":
/*!***************************!*\
  !*** ./utils/language.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fallbackLanguage\": function() { return /* binding */ fallbackLanguage; },\n/* harmony export */   \"languages\": function() { return /* binding */ languages; },\n/* harmony export */   \"validateLanguage\": function() { return /* binding */ validateLanguage; },\n/* harmony export */   \"getLanguage\": function() { return /* binding */ getLanguage; },\n/* harmony export */   \"redirectToLanguage\": function() { return /* binding */ redirectToLanguage; },\n/* harmony export */   \"setLanguageCookie\": function() { return /* binding */ setLanguageCookie; },\n/* harmony export */   \"getLanguageCookie\": function() { return /* binding */ getLanguageCookie; },\n/* harmony export */   \"configureLanguage\": function() { return /* binding */ configureLanguage; }\n/* harmony export */ });\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nookies */ \"nookies\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst fallbackLanguage = \"en\";\nconst languages = [\"en\", \"nl\", \"it\"];\nconst validateLanguage = lang => {\n  return languages.includes(lang) ? lang : fallbackLanguage;\n};\nconst getLanguage = (lang, ctx) => {\n  var _getLanguageCookie;\n\n  let language = lang.match(/[a-zA-Z\\-]{2,10}/g)[0] || fallbackLanguage;\n  language = language.split(\"-\")[0];\n  return (_getLanguageCookie = getLanguageCookie(ctx)) !== null && _getLanguageCookie !== void 0 ? _getLanguageCookie : validateLanguage(language);\n};\nconst redirectToLanguage = (language = fallbackLanguage, res) => {\n  if (res) {\n    res.writeHead(302, {\n      Location: `/${language}/`\n    });\n    return res.end();\n  }\n\n  next_router__WEBPACK_IMPORTED_MODULE_0___default().push(`/${language}/`);\n};\nconst setLanguageCookie = (ctx, language) => {\n  (0,nookies__WEBPACK_IMPORTED_MODULE_1__.setCookie)(ctx, \"language\", language, {\n    maxAge: 30 * 24 * 60 * 60,\n    path: \"/\"\n  });\n};\nconst getLanguageCookie = ctx => {\n  return (0,nookies__WEBPACK_IMPORTED_MODULE_1__.parseCookies)(ctx).language;\n};\nconst configureLanguage = ctx => {\n  const {\n    req,\n    res,\n    asPath,\n    query\n  } = ctx;\n  const language = req ? req.headers[\"accept-language\"] : window.navigator.language;\n  let lang = getLanguage(language, ctx);\n\n  if (asPath === \"/\") {\n    redirectToLanguage(lang, res);\n  } else {\n    lang = validateLanguage(query.lang);\n    setLanguageCookie(ctx, lang);\n  }\n\n  return lang;\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5hbXVzdS8uL3V0aWxzL2xhbmd1YWdlLmpzP2VkNjAiXSwibmFtZXMiOlsiZmFsbGJhY2tMYW5ndWFnZSIsImxhbmd1YWdlcyIsInZhbGlkYXRlTGFuZ3VhZ2UiLCJsYW5nIiwiaW5jbHVkZXMiLCJnZXRMYW5ndWFnZSIsImN0eCIsImxhbmd1YWdlIiwibWF0Y2giLCJzcGxpdCIsImdldExhbmd1YWdlQ29va2llIiwicmVkaXJlY3RUb0xhbmd1YWdlIiwicmVzIiwid3JpdGVIZWFkIiwiTG9jYXRpb24iLCJlbmQiLCJSb3V0ZXIiLCJzZXRMYW5ndWFnZUNvb2tpZSIsInNldENvb2tpZSIsIm1heEFnZSIsInBhdGgiLCJwYXJzZUNvb2tpZXMiLCJjb25maWd1cmVMYW5ndWFnZSIsInJlcSIsImFzUGF0aCIsInF1ZXJ5IiwiaGVhZGVycyIsIndpbmRvdyIsIm5hdmlnYXRvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVPLE1BQU1BLGdCQUFnQixHQUFHLElBQXpCO0FBRUEsTUFBTUMsU0FBUyxHQUFHLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBWSxJQUFaLENBQWxCO0FBRUEsTUFBTUMsZ0JBQWdCLEdBQUlDLElBQUQsSUFBVTtBQUN4QyxTQUFPRixTQUFTLENBQUNHLFFBQVYsQ0FBbUJELElBQW5CLElBQTJCQSxJQUEzQixHQUFrQ0gsZ0JBQXpDO0FBQ0QsQ0FGTTtBQUlBLE1BQU1LLFdBQVcsR0FBRyxDQUFDRixJQUFELEVBQU9HLEdBQVAsS0FBZTtBQUFBOztBQUN4QyxNQUFJQyxRQUFRLEdBQUdKLElBQUksQ0FBQ0ssS0FBTCxDQUFXLG1CQUFYLEVBQWdDLENBQWhDLEtBQXNDUixnQkFBckQ7QUFDQU8sVUFBUSxHQUFHQSxRQUFRLENBQUNFLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLENBQXBCLENBQVg7QUFFQSwrQkFBT0MsaUJBQWlCLENBQUNKLEdBQUQsQ0FBeEIsbUVBQWlDSixnQkFBZ0IsQ0FBQ0ssUUFBRCxDQUFqRDtBQUNELENBTE07QUFPQSxNQUFNSSxrQkFBa0IsR0FBRyxDQUFDSixRQUFRLEdBQUdQLGdCQUFaLEVBQThCWSxHQUE5QixLQUFzQztBQUN0RSxNQUFJQSxHQUFKLEVBQVM7QUFDUEEsT0FBRyxDQUFDQyxTQUFKLENBQWMsR0FBZCxFQUFtQjtBQUNqQkMsY0FBUSxFQUFHLElBQUdQLFFBQVM7QUFETixLQUFuQjtBQUlBLFdBQU9LLEdBQUcsQ0FBQ0csR0FBSixFQUFQO0FBQ0Q7O0FBRURDLHlEQUFBLENBQWEsSUFBR1QsUUFBUyxHQUF6QjtBQUNELENBVk07QUFZQSxNQUFNVSxpQkFBaUIsR0FBRyxDQUFDWCxHQUFELEVBQU1DLFFBQU4sS0FBbUI7QUFDbERXLG9EQUFTLENBQUNaLEdBQUQsRUFBTSxVQUFOLEVBQWtCQyxRQUFsQixFQUE0QjtBQUNuQ1ksVUFBTSxFQUFFLEtBQUssRUFBTCxHQUFVLEVBQVYsR0FBZSxFQURZO0FBRW5DQyxRQUFJLEVBQUU7QUFGNkIsR0FBNUIsQ0FBVDtBQUlELENBTE07QUFPQSxNQUFNVixpQkFBaUIsR0FBSUosR0FBRCxJQUFTO0FBQ3hDLFNBQU9lLHFEQUFZLENBQUNmLEdBQUQsQ0FBWixDQUFrQkMsUUFBekI7QUFDRCxDQUZNO0FBSUEsTUFBTWUsaUJBQWlCLEdBQUloQixHQUFELElBQVM7QUFDeEMsUUFBTTtBQUFFaUIsT0FBRjtBQUFPWCxPQUFQO0FBQVlZLFVBQVo7QUFBb0JDO0FBQXBCLE1BQThCbkIsR0FBcEM7QUFFQSxRQUFNQyxRQUFRLEdBQUdnQixHQUFHLEdBQ2hCQSxHQUFHLENBQUNHLE9BQUosQ0FBWSxpQkFBWixDQURnQixHQUVoQkMsTUFBTSxDQUFDQyxTQUFQLENBQWlCckIsUUFGckI7QUFJQSxNQUFJSixJQUFJLEdBQUdFLFdBQVcsQ0FBQ0UsUUFBRCxFQUFXRCxHQUFYLENBQXRCOztBQUVBLE1BQUlrQixNQUFNLEtBQUssR0FBZixFQUFvQjtBQUNsQmIsc0JBQWtCLENBQUNSLElBQUQsRUFBT1MsR0FBUCxDQUFsQjtBQUNELEdBRkQsTUFFTztBQUNMVCxRQUFJLEdBQUdELGdCQUFnQixDQUFDdUIsS0FBSyxDQUFDdEIsSUFBUCxDQUF2QjtBQUNBYyxxQkFBaUIsQ0FBQ1gsR0FBRCxFQUFNSCxJQUFOLENBQWpCO0FBQ0Q7O0FBRUQsU0FBT0EsSUFBUDtBQUNELENBakJNIiwiZmlsZSI6Ii4vdXRpbHMvbGFuZ3VhZ2UuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUm91dGVyIGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IHsgcGFyc2VDb29raWVzLCBzZXRDb29raWUgfSBmcm9tIFwibm9va2llc1wiO1xuXG5leHBvcnQgY29uc3QgZmFsbGJhY2tMYW5ndWFnZSA9IFwiZW5cIjtcblxuZXhwb3J0IGNvbnN0IGxhbmd1YWdlcyA9IFtcImVuXCIsIFwibmxcIixcIml0XCJdO1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVMYW5ndWFnZSA9IChsYW5nKSA9PiB7XG4gIHJldHVybiBsYW5ndWFnZXMuaW5jbHVkZXMobGFuZykgPyBsYW5nIDogZmFsbGJhY2tMYW5ndWFnZTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRMYW5ndWFnZSA9IChsYW5nLCBjdHgpID0+IHtcbiAgbGV0IGxhbmd1YWdlID0gbGFuZy5tYXRjaCgvW2EtekEtWlxcLV17MiwxMH0vZylbMF0gfHwgZmFsbGJhY2tMYW5ndWFnZTtcbiAgbGFuZ3VhZ2UgPSBsYW5ndWFnZS5zcGxpdChcIi1cIilbMF07XG5cbiAgcmV0dXJuIGdldExhbmd1YWdlQ29va2llKGN0eCkgPz8gdmFsaWRhdGVMYW5ndWFnZShsYW5ndWFnZSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVkaXJlY3RUb0xhbmd1YWdlID0gKGxhbmd1YWdlID0gZmFsbGJhY2tMYW5ndWFnZSwgcmVzKSA9PiB7XG4gIGlmIChyZXMpIHtcbiAgICByZXMud3JpdGVIZWFkKDMwMiwge1xuICAgICAgTG9jYXRpb246IGAvJHtsYW5ndWFnZX0vYCxcbiAgICB9KTtcblxuICAgIHJldHVybiByZXMuZW5kKCk7XG4gIH1cblxuICBSb3V0ZXIucHVzaChgLyR7bGFuZ3VhZ2V9L2ApO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldExhbmd1YWdlQ29va2llID0gKGN0eCwgbGFuZ3VhZ2UpID0+IHtcbiAgc2V0Q29va2llKGN0eCwgXCJsYW5ndWFnZVwiLCBsYW5ndWFnZSwge1xuICAgIG1heEFnZTogMzAgKiAyNCAqIDYwICogNjAsXG4gICAgcGF0aDogXCIvXCIsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldExhbmd1YWdlQ29va2llID0gKGN0eCkgPT4ge1xuICByZXR1cm4gcGFyc2VDb29raWVzKGN0eCkubGFuZ3VhZ2U7XG59O1xuXG5leHBvcnQgY29uc3QgY29uZmlndXJlTGFuZ3VhZ2UgPSAoY3R4KSA9PiB7XG4gIGNvbnN0IHsgcmVxLCByZXMsIGFzUGF0aCwgcXVlcnkgfSA9IGN0eDtcblxuICBjb25zdCBsYW5ndWFnZSA9IHJlcVxuICAgID8gcmVxLmhlYWRlcnNbXCJhY2NlcHQtbGFuZ3VhZ2VcIl1cbiAgICA6IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2U7XG5cbiAgbGV0IGxhbmcgPSBnZXRMYW5ndWFnZShsYW5ndWFnZSwgY3R4KTtcblxuICBpZiAoYXNQYXRoID09PSBcIi9cIikge1xuICAgIHJlZGlyZWN0VG9MYW5ndWFnZShsYW5nLCByZXMpO1xuICB9IGVsc2Uge1xuICAgIGxhbmcgPSB2YWxpZGF0ZUxhbmd1YWdlKHF1ZXJ5LmxhbmcpO1xuICAgIHNldExhbmd1YWdlQ29va2llKGN0eCwgbGFuZyk7XG4gIH1cblxuICByZXR1cm4gbGFuZztcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./utils/language.js\n");

/***/ }),

/***/ "./styles/globals.scss":
/*!*****************************!*\
  !*** ./styles/globals.scss ***!
  \*****************************/
/***/ (function() {



/***/ }),

/***/ "../next-server/lib/utils":
/*!*****************************************************!*\
  !*** external "next/dist/next-server/lib/utils.js" ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/utils.js");;

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/head");;

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

/***/ }),

/***/ "superagent":
/*!*****************************!*\
  !*** external "superagent" ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = require("superagent");;

/***/ }),

/***/ "superagent-promise":
/*!*************************************!*\
  !*** external "superagent-promise" ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = require("superagent-promise");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, ["vendors-node_modules_next_app_js","store_actions_index_js-utils_agent_js"], function() { return __webpack_exec__("./pages/_app.js"); });
module.exports = __webpack_exports__;

})();