/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_error";
exports.ids = ["pages/_error"];
exports.modules = {

/***/ "(pages-dir-node)/./client/src/index.css":
/*!******************************!*\
  !*** ./client/src/index.css ***!
  \******************************/
/***/ (() => {



/***/ }),

/***/ "(pages-dir-node)/./client/src/lib/queryClient.ts":
/*!***************************************!*\
  !*** ./client/src/lib/queryClient.ts ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   queryClient: () => (/* binding */ queryClient)\n/* harmony export */ });\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tanstack/react-query */ \"@tanstack/react-query\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__]);\n_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__.QueryClient({\n    defaultOptions: {\n        queries: {\n            queryFn: async ({ queryKey })=>{\n                // Add cache busting parameter for development\n                const url = /* unsupported import.meta.env.DEV */ undefined.DEV ? `${queryKey[0]}${queryKey[0].includes('?') ? '&' : '?'}_t=${Date.now()}` : queryKey[0];\n                const res = await fetch(url, {\n                    credentials: \"include\",\n                    headers: /* unsupported import.meta.env.DEV */ undefined.DEV ? {\n                        'Cache-Control': 'no-cache, no-store, must-revalidate',\n                        'Pragma': 'no-cache',\n                        'Expires': '0'\n                    } : undefined\n                });\n                if (!res.ok) {\n                    if (res.status >= 500) {\n                        throw new Error(`${res.status}: ${res.statusText}`);\n                    }\n                    throw new Error(`${res.status}: ${await res.text()}`);\n                }\n                return res.json();\n            },\n            refetchInterval: false,\n            refetchOnWindowFocus: /* unsupported import.meta.env.DEV */ undefined.DEV ? true : false,\n            staleTime: /* unsupported import.meta.env.DEV */ undefined.DEV ? 0 : Infinity,\n            retry: false,\n            cacheTime: /* unsupported import.meta.env.DEV */ undefined.DEV ? 0 : 300000\n        },\n        mutations: {\n            retry: false\n        }\n    }\n});\n// Reset cache on HMR updates\nif (/* unsupported import.meta.env.DEV */ undefined.DEV) {\n    const hot = /* unsupported import.meta.hot */ undefined;\n    if (hot) {\n        hot.accept(()=>{\n            queryClient.clear();\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NsaWVudC9zcmMvbGliL3F1ZXJ5Q2xpZW50LnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQW9EO0FBRTdDLE1BQU1DLGNBQWMsSUFBSUQsOERBQVdBLENBQUM7SUFDekNFLGdCQUFnQjtRQUNkQyxTQUFTO1lBQ1BDLFNBQVMsT0FBTyxFQUFFQyxRQUFRLEVBQUU7Z0JBQzFCLDhDQUE4QztnQkFDOUMsTUFBTUMsTUFBTSxtREFBbUIsR0FDM0IsR0FBR0QsUUFBUSxDQUFDLEVBQUUsR0FBR0EsUUFBUSxDQUFDLEVBQUUsQ0FBQ0ksUUFBUSxDQUFDLE9BQU8sTUFBTSxJQUFJLEdBQUcsRUFBRUMsS0FBS0MsR0FBRyxJQUFJLEdBQ3hFTixRQUFRLENBQUMsRUFBRTtnQkFFZixNQUFNTyxNQUFNLE1BQU1DLE1BQU1QLEtBQWU7b0JBQ3JDUSxhQUFhO29CQUNiQyxTQUFTLG1EQUFtQixHQUFHO3dCQUM3QixpQkFBaUI7d0JBQ2pCLFVBQVU7d0JBQ1YsV0FBVztvQkFDYixJQUFJQztnQkFDTjtnQkFFQSxJQUFJLENBQUNKLElBQUlLLEVBQUUsRUFBRTtvQkFDWCxJQUFJTCxJQUFJTSxNQUFNLElBQUksS0FBSzt3QkFDckIsTUFBTSxJQUFJQyxNQUFNLEdBQUdQLElBQUlNLE1BQU0sQ0FBQyxFQUFFLEVBQUVOLElBQUlRLFVBQVUsRUFBRTtvQkFDcEQ7b0JBRUEsTUFBTSxJQUFJRCxNQUFNLEdBQUdQLElBQUlNLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTU4sSUFBSVMsSUFBSSxJQUFJO2dCQUN0RDtnQkFFQSxPQUFPVCxJQUFJVSxJQUFJO1lBQ2pCO1lBQ0FDLGlCQUFpQjtZQUNqQkMsc0JBQXNCLG1EQUFtQixHQUFHLE9BQU87WUFDbkRDLFdBQVcsbURBQW1CLEdBQUcsSUFBSUM7WUFDckNDLE9BQU87WUFDUEMsV0FBVyxtREFBbUIsR0FBRyxJQUFJO1FBQ3ZDO1FBQ0FDLFdBQVc7WUFDVEYsT0FBTztRQUNUO0lBQ0Y7QUFDRixHQUFHO0FBRUgsNkJBQTZCO0FBQzdCLElBQUksbURBQW1CLEVBQUU7SUFDdkIsTUFBTUcsTUFBTSwyQ0FBd0I7SUFDcEMsSUFBSUEsS0FBSztRQUNQQSxJQUFJQyxNQUFNLENBQUM7WUFDVDlCLFlBQVkrQixLQUFLO1FBQ25CO0lBQ0Y7QUFDRiIsInNvdXJjZXMiOlsiL2hvbWUvcnVubmVyL3dvcmtzcGFjZS9jbGllbnQvc3JjL2xpYi9xdWVyeUNsaWVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWVyeUNsaWVudCB9IGZyb20gXCJAdGFuc3RhY2svcmVhY3QtcXVlcnlcIjtcblxuZXhwb3J0IGNvbnN0IHF1ZXJ5Q2xpZW50ID0gbmV3IFF1ZXJ5Q2xpZW50KHtcbiAgZGVmYXVsdE9wdGlvbnM6IHtcbiAgICBxdWVyaWVzOiB7XG4gICAgICBxdWVyeUZuOiBhc3luYyAoeyBxdWVyeUtleSB9KSA9PiB7XG4gICAgICAgIC8vIEFkZCBjYWNoZSBidXN0aW5nIHBhcmFtZXRlciBmb3IgZGV2ZWxvcG1lbnRcbiAgICAgICAgY29uc3QgdXJsID0gaW1wb3J0Lm1ldGEuZW52LkRFViBcbiAgICAgICAgICA/IGAke3F1ZXJ5S2V5WzBdfSR7cXVlcnlLZXlbMF0uaW5jbHVkZXMoJz8nKSA/ICcmJyA6ICc/J31fdD0ke0RhdGUubm93KCl9YFxuICAgICAgICAgIDogcXVlcnlLZXlbMF07XG5cbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsIGFzIHN0cmluZywge1xuICAgICAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbiAgICAgICAgICBoZWFkZXJzOiBpbXBvcnQubWV0YS5lbnYuREVWID8ge1xuICAgICAgICAgICAgJ0NhY2hlLUNvbnRyb2wnOiAnbm8tY2FjaGUsIG5vLXN0b3JlLCBtdXN0LXJldmFsaWRhdGUnLFxuICAgICAgICAgICAgJ1ByYWdtYSc6ICduby1jYWNoZScsXG4gICAgICAgICAgICAnRXhwaXJlcyc6ICcwJ1xuICAgICAgICAgIH0gOiB1bmRlZmluZWRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFyZXMub2spIHtcbiAgICAgICAgICBpZiAocmVzLnN0YXR1cyA+PSA1MDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyZXMuc3RhdHVzfTogJHtyZXMuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7cmVzLnN0YXR1c306ICR7YXdhaXQgcmVzLnRleHQoKX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfSxcbiAgICAgIHJlZmV0Y2hJbnRlcnZhbDogZmFsc2UsXG4gICAgICByZWZldGNoT25XaW5kb3dGb2N1czogaW1wb3J0Lm1ldGEuZW52LkRFViA/IHRydWUgOiBmYWxzZSxcbiAgICAgIHN0YWxlVGltZTogaW1wb3J0Lm1ldGEuZW52LkRFViA/IDAgOiBJbmZpbml0eSxcbiAgICAgIHJldHJ5OiBmYWxzZSxcbiAgICAgIGNhY2hlVGltZTogaW1wb3J0Lm1ldGEuZW52LkRFViA/IDAgOiAzMDAwMDAsIC8vIDUgbWludXRlcyBpbiBwcm9kdWN0aW9uXG4gICAgfSxcbiAgICBtdXRhdGlvbnM6IHtcbiAgICAgIHJldHJ5OiBmYWxzZSxcbiAgICB9XG4gIH0sXG59KTtcblxuLy8gUmVzZXQgY2FjaGUgb24gSE1SIHVwZGF0ZXNcbmlmIChpbXBvcnQubWV0YS5lbnYuREVWKSB7XG4gIGNvbnN0IGhvdCA9IChpbXBvcnQubWV0YSBhcyBhbnkpLmhvdDtcbiAgaWYgKGhvdCkge1xuICAgIGhvdC5hY2NlcHQoKCkgPT4ge1xuICAgICAgcXVlcnlDbGllbnQuY2xlYXIoKTtcbiAgICB9KTtcbiAgfVxufSJdLCJuYW1lcyI6WyJRdWVyeUNsaWVudCIsInF1ZXJ5Q2xpZW50IiwiZGVmYXVsdE9wdGlvbnMiLCJxdWVyaWVzIiwicXVlcnlGbiIsInF1ZXJ5S2V5IiwidXJsIiwiZW52IiwiREVWIiwiaW5jbHVkZXMiLCJEYXRlIiwibm93IiwicmVzIiwiZmV0Y2giLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJ1bmRlZmluZWQiLCJvayIsInN0YXR1cyIsIkVycm9yIiwic3RhdHVzVGV4dCIsInRleHQiLCJqc29uIiwicmVmZXRjaEludGVydmFsIiwicmVmZXRjaE9uV2luZG93Rm9jdXMiLCJzdGFsZVRpbWUiLCJJbmZpbml0eSIsInJldHJ5IiwiY2FjaGVUaW1lIiwibXV0YXRpb25zIiwiaG90IiwiYWNjZXB0IiwiY2xlYXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./client/src/lib/queryClient.ts\n");

/***/ }),

/***/ "(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F_error&preferredRegion=&absolutePagePath=private-next-pages%2F_error&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F_error&preferredRegion=&absolutePagePath=private-next-pages%2F_error&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   getServerSideProps: () => (/* binding */ getServerSideProps),\n/* harmony export */   getStaticPaths: () => (/* binding */ getStaticPaths),\n/* harmony export */   getStaticProps: () => (/* binding */ getStaticProps),\n/* harmony export */   reportWebVitals: () => (/* binding */ reportWebVitals),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   unstable_getServerProps: () => (/* binding */ unstable_getServerProps),\n/* harmony export */   unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),\n/* harmony export */   unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),\n/* harmony export */   unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),\n/* harmony export */   unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/pages/module.compiled */ \"(pages-dir-node)/./node_modules/next/dist/server/route-modules/pages/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(pages-dir-node)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(pages-dir-node)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! private-next-pages/_document */ \"(pages-dir-node)/./node_modules/next/dist/pages/_document.js\");\n/* harmony import */ var private_next_pages_document__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! private-next-pages/_app */ \"(pages-dir-node)/./pages/_app.tsx\");\n/* harmony import */ var private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! private-next-pages/_error */ \"(pages-dir-node)/./node_modules/next/dist/pages/_error.js\");\n/* harmony import */ var private_next_pages_error__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__]);\nprivate_next_pages_app__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n// Import the app and document modules.\n\n\n// Import the userland code.\n\n// Re-export the component (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'default'));\n// Re-export methods.\nconst getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'getStaticProps');\nconst getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'getStaticPaths');\nconst getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'getServerSideProps');\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'config');\nconst reportWebVitals = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'reportWebVitals');\n// Re-export legacy methods.\nconst unstable_getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticProps');\nconst unstable_getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticPaths');\nconst unstable_getStaticParams = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticParams');\nconst unstable_getServerProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerProps');\nconst unstable_getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerSideProps');\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES,\n        page: \"/_error\",\n        pathname: \"/_error\",\n        // The following aren't used in production.\n        bundlePath: '',\n        filename: ''\n    },\n    components: {\n        // default export might not exist when optimized for data only\n        App: private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n        Document: (private_next_pages_document__WEBPACK_IMPORTED_MODULE_3___default())\n    },\n    userland: private_next_pages_error__WEBPACK_IMPORTED_MODULE_5__\n});\n\n//# sourceMappingURL=pages.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtcm91dGUtbG9hZGVyL2luZGV4LmpzP2tpbmQ9UEFHRVMmcGFnZT0lMkZfZXJyb3ImcHJlZmVycmVkUmVnaW9uPSZhYnNvbHV0ZVBhZ2VQYXRoPXByaXZhdGUtbmV4dC1wYWdlcyUyRl9lcnJvciZhYnNvbHV0ZUFwcFBhdGg9cHJpdmF0ZS1uZXh0LXBhZ2VzJTJGX2FwcCZhYnNvbHV0ZURvY3VtZW50UGF0aD1wcml2YXRlLW5leHQtcGFnZXMlMkZfZG9jdW1lbnQmbWlkZGxld2FyZUNvbmZpZ0Jhc2U2ND1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF3RjtBQUNoQztBQUNFO0FBQzFEO0FBQ3lEO0FBQ1Y7QUFDL0M7QUFDc0Q7QUFDdEQ7QUFDQSxpRUFBZSx3RUFBSyxDQUFDLHFEQUFRLFlBQVksRUFBQztBQUMxQztBQUNPLHVCQUF1Qix3RUFBSyxDQUFDLHFEQUFRO0FBQ3JDLHVCQUF1Qix3RUFBSyxDQUFDLHFEQUFRO0FBQ3JDLDJCQUEyQix3RUFBSyxDQUFDLHFEQUFRO0FBQ3pDLGVBQWUsd0VBQUssQ0FBQyxxREFBUTtBQUM3Qix3QkFBd0Isd0VBQUssQ0FBQyxxREFBUTtBQUM3QztBQUNPLGdDQUFnQyx3RUFBSyxDQUFDLHFEQUFRO0FBQzlDLGdDQUFnQyx3RUFBSyxDQUFDLHFEQUFRO0FBQzlDLGlDQUFpQyx3RUFBSyxDQUFDLHFEQUFRO0FBQy9DLGdDQUFnQyx3RUFBSyxDQUFDLHFEQUFRO0FBQzlDLG9DQUFvQyx3RUFBSyxDQUFDLHFEQUFRO0FBQ3pEO0FBQ08sd0JBQXdCLGtHQUFnQjtBQUMvQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBYSw4REFBVztBQUN4QixrQkFBa0Isb0VBQWdCO0FBQ2xDLEtBQUs7QUFDTCxZQUFZO0FBQ1osQ0FBQzs7QUFFRCxpQyIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhZ2VzUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL3BhZ2VzL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgaG9pc3QgfSBmcm9tIFwibmV4dC9kaXN0L2J1aWxkL3RlbXBsYXRlcy9oZWxwZXJzXCI7XG4vLyBJbXBvcnQgdGhlIGFwcCBhbmQgZG9jdW1lbnQgbW9kdWxlcy5cbmltcG9ydCAqIGFzIGRvY3VtZW50IGZyb20gXCJwcml2YXRlLW5leHQtcGFnZXMvX2RvY3VtZW50XCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInByaXZhdGUtbmV4dC1wYWdlcy9fYXBwXCI7XG4vLyBJbXBvcnQgdGhlIHVzZXJsYW5kIGNvZGUuXG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwicHJpdmF0ZS1uZXh0LXBhZ2VzL19lcnJvclwiO1xuLy8gUmUtZXhwb3J0IHRoZSBjb21wb25lbnQgKHNob3VsZCBiZSB0aGUgZGVmYXVsdCBleHBvcnQpLlxuZXhwb3J0IGRlZmF1bHQgaG9pc3QodXNlcmxhbmQsICdkZWZhdWx0Jyk7XG4vLyBSZS1leHBvcnQgbWV0aG9kcy5cbmV4cG9ydCBjb25zdCBnZXRTdGF0aWNQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCAnZ2V0U3RhdGljUHJvcHMnKTtcbmV4cG9ydCBjb25zdCBnZXRTdGF0aWNQYXRocyA9IGhvaXN0KHVzZXJsYW5kLCAnZ2V0U3RhdGljUGF0aHMnKTtcbmV4cG9ydCBjb25zdCBnZXRTZXJ2ZXJTaWRlUHJvcHMgPSBob2lzdCh1c2VybGFuZCwgJ2dldFNlcnZlclNpZGVQcm9wcycpO1xuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IGhvaXN0KHVzZXJsYW5kLCAnY29uZmlnJyk7XG5leHBvcnQgY29uc3QgcmVwb3J0V2ViVml0YWxzID0gaG9pc3QodXNlcmxhbmQsICdyZXBvcnRXZWJWaXRhbHMnKTtcbi8vIFJlLWV4cG9ydCBsZWdhY3kgbWV0aG9kcy5cbmV4cG9ydCBjb25zdCB1bnN0YWJsZV9nZXRTdGF0aWNQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCAndW5zdGFibGVfZ2V0U3RhdGljUHJvcHMnKTtcbmV4cG9ydCBjb25zdCB1bnN0YWJsZV9nZXRTdGF0aWNQYXRocyA9IGhvaXN0KHVzZXJsYW5kLCAndW5zdGFibGVfZ2V0U3RhdGljUGF0aHMnKTtcbmV4cG9ydCBjb25zdCB1bnN0YWJsZV9nZXRTdGF0aWNQYXJhbXMgPSBob2lzdCh1c2VybGFuZCwgJ3Vuc3RhYmxlX2dldFN0YXRpY1BhcmFtcycpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFNlcnZlclByb3BzID0gaG9pc3QodXNlcmxhbmQsICd1bnN0YWJsZV9nZXRTZXJ2ZXJQcm9wcycpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFNlcnZlclNpZGVQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCAndW5zdGFibGVfZ2V0U2VydmVyU2lkZVByb3BzJyk7XG4vLyBDcmVhdGUgYW5kIGV4cG9ydCB0aGUgcm91dGUgbW9kdWxlIHRoYXQgd2lsbCBiZSBjb25zdW1lZC5cbmV4cG9ydCBjb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBQYWdlc1JvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5QQUdFUyxcbiAgICAgICAgcGFnZTogXCIvX2Vycm9yXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9fZXJyb3JcIixcbiAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBhcmVuJ3QgdXNlZCBpbiBwcm9kdWN0aW9uLlxuICAgICAgICBidW5kbGVQYXRoOiAnJyxcbiAgICAgICAgZmlsZW5hbWU6ICcnXG4gICAgfSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIC8vIGRlZmF1bHQgZXhwb3J0IG1pZ2h0IG5vdCBleGlzdCB3aGVuIG9wdGltaXplZCBmb3IgZGF0YSBvbmx5XG4gICAgICAgIEFwcDogYXBwLmRlZmF1bHQsXG4gICAgICAgIERvY3VtZW50OiBkb2N1bWVudC5kZWZhdWx0XG4gICAgfSxcbiAgICB1c2VybGFuZFxufSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhZ2VzLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F_error&preferredRegion=&absolutePagePath=private-next-pages%2F_error&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ \"@tanstack/react-query\");\n/* harmony import */ var _client_src_lib_queryClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../client/src/lib/queryClient */ \"(pages-dir-node)/./client/src/lib/queryClient.ts\");\n/* harmony import */ var _client_src_index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../client/src/index.css */ \"(pages-dir-node)/./client/src/index.css\");\n/* harmony import */ var _client_src_index_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_client_src_index_css__WEBPACK_IMPORTED_MODULE_3__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__, _client_src_lib_queryClient__WEBPACK_IMPORTED_MODULE_2__]);\n([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__, _client_src_lib_queryClient__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.QueryClientProvider, {\n        client: _client_src_lib_queryClient__WEBPACK_IMPORTED_MODULE_2__.queryClient,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/home/runner/workspace/pages/_app.tsx\",\n            lineNumber: 10,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/home/runner/workspace/pages/_app.tsx\",\n        lineNumber: 9,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQzREO0FBQ0E7QUFDM0I7QUFHbEIsU0FBU0UsSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBWTtJQUM1RCxxQkFDRSw4REFBQ0osc0VBQW1CQTtRQUFDSyxRQUFRSixvRUFBV0E7a0JBQ3RDLDRFQUFDRTtZQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O0FBRzlCIiwic291cmNlcyI6WyIvaG9tZS9ydW5uZXIvd29ya3NwYWNlL3BhZ2VzL19hcHAudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgUXVlcnlDbGllbnRQcm92aWRlciB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XG5pbXBvcnQgeyBxdWVyeUNsaWVudCB9IGZyb20gJy4uL2NsaWVudC9zcmMvbGliL3F1ZXJ5Q2xpZW50JztcbmltcG9ydCAnLi4vY2xpZW50L3NyYy9pbmRleC5jc3MnO1xuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8UXVlcnlDbGllbnRQcm92aWRlciBjbGllbnQ9e3F1ZXJ5Q2xpZW50fT5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8L1F1ZXJ5Q2xpZW50UHJvdmlkZXI+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiUXVlcnlDbGllbnRQcm92aWRlciIsInF1ZXJ5Q2xpZW50IiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwiY2xpZW50Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.tsx\n");

/***/ }),

/***/ "@tanstack/react-query":
/*!****************************************!*\
  !*** external "@tanstack/react-query" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F_error&preferredRegion=&absolutePagePath=private-next-pages%2F_error&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();