/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./JavaScript/Features.js":
/*!********************************!*\
  !*** ./JavaScript/Features.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Features_ContentTree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Features/ContentTree */ \"./JavaScript/Features/ContentTree.js\");\n/* harmony import */ var _Features_SaveSettingsListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Features/SaveSettingsListener */ \"./JavaScript/Features/SaveSettingsListener.js\");\n/* harmony import */ var _Features_EnbaClassNames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Features/EnbaClassNames */ \"./JavaScript/Features/EnbaClassNames.js\");\n\n\n\nwindow.addEventListener('load', function (event) {\n  //InitSaveSettingsListener();\n\n  if (window.top === window) {\n    // Code is only executed in main HTML\n    (0,_Features_ContentTree__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  } else {\n    // Code is executed in an iframe\n    (0,_Features_EnbaClassNames__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n  }\n});\n\n//# sourceURL=webpack://enhanced_backend/./JavaScript/Features.js?");

/***/ }),

/***/ "./JavaScript/Features/ContentTree.js":
/*!********************************************!*\
  !*** ./JavaScript/Features/ContentTree.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ InitContentTree)\n/* harmony export */ });\n/* harmony import */ var _Utils_stringToHTML__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/stringToHTML */ \"./JavaScript/Utils/stringToHTML.js\");\n\nfunction buildContentTree() {\n  var iframe = document.querySelector('#typo3-contentIframe');\n  if (iframe == null) {\n    window.setTimeout(buildContentTree, 1000);\n  } else {\n    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;\n    var $pageNavigation = document.querySelector('.t3js-scaffold-content-navigation');\n    if (iframeDoc.readyState === 'complete' && !!$pageNavigation) {\n      createContentTreeHTML();\n      watchContentIframe();\n    } else {\n      window.setTimeout(buildContentTree, 1000);\n    }\n  }\n}\nfunction createContentTreeHTML() {\n  var $pageNavigation = document.querySelector('.t3js-scaffold-content-navigation');\n  var contentArea = document.getElementById(\"typo3-contentIframe\").contentWindow.document;\n  var contentTree = document.createElement(\"div\");\n  contentTree.classList.add('content-tree');\n  var contentTreeHeadline = contentArea.querySelector('.t3js-title-inlineedit') ? contentArea.querySelector('.t3js-title-inlineedit').textContent : 'Content Tree';\n  var contentTreeHeader = document.createElement(\"div\");\n  contentTreeHeader.classList.add('content-tree__header');\n  contentTreeHeader.innerHTML = '<label class=\"content-tree__headline\">' + contentTreeHeadline + '</label><i class=\"fa fa-solid fa-angle-down content-tree__toggle\"></i>';\n  contentTreeHeader.onclick = initContentTreeToggle;\n  var contentTreeData = document.createElement(\"div\");\n  contentTreeData.classList.add('content-tree__data');\n  contentTree.appendChild(contentTreeHeader);\n  contentTree.appendChild(contentTreeData);\n  $pageNavigation.append(contentTree);\n  var rootElement = contentArea.querySelector('#PageLayoutController .t3js-sortable');\n  var classList = [\"t3js-page-ce-sortable\"];\n  if (!!rootElement) {\n    var nestedList = createNestedList(rootElement, classList);\n    document.querySelector(\".content-tree__data\").appendChild(nestedList);\n  }\n}\nfunction createNestedList(rootElement, classList) {\n  // Wähle alle Elemente aus, die mindestens eine der Klassen haben\n  var elements = Array.from(rootElement.querySelectorAll(\"*\")).filter(function (element) {\n    var elementClasses = Array.from(element.classList);\n    return classList.some(function (className) {\n      return elementClasses.includes(className);\n    });\n  });\n  if (elements.length === 0) return null;\n  var list = document.createElement(\"ul\");\n\n  // Iterate over all found elements and create a <li> element for each one\n  for (var i = 0; i < elements.length; i++) {\n    var element = elements[i];\n    var listItem = document.createElement(\"li\");\n    var elementIcon = elements[i].querySelector('.t3-page-ce-header .t3js-icon');\n    var linkInIframe = elements[i].querySelector('.t3-page-ce-dragitem .exampleContent strong') ? (0,_Utils_stringToHTML__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(elements[i].querySelector('.t3-page-ce-dragitem .exampleContent strong').innerHTML) : '';\n    if (!!linkInIframe && linkInIframe.querySelector('a')) {\n      // edit form should open in content area\n      linkInIframe.querySelector('a').setAttribute('target', 'list_frame');\n\n      // add ce icon to tree view\n      if (!!elementIcon) {\n        linkInIframe.querySelector('a').insertAdjacentElement(\"afterbegin\", elementIcon.cloneNode(true));\n      }\n\n      // decrease opacity of disabled tree items\n      if (elements[i].classList.contains('t3-page-ce-hidden')) {\n        linkInIframe.querySelector('a').classList.add('t3-page-ce-hidden');\n      }\n      listItem.innerHTML = linkInIframe.innerHTML;\n\n      // Add the child elements recursively\n      var sublist = createNestedList(element, classList);\n      if (sublist) listItem.appendChild(sublist);\n      list.appendChild(listItem);\n    }\n  }\n  return list;\n}\nfunction watchContentIframe() {\n  document.querySelector('#typo3-contentIframe').addEventListener('load', function (event) {\n    if (window.top !== window) {\n      // Code is executed in an iframe\n    } else {\n      // Code is only executed in main HTML\n      /**\n       * if editForm is opened, we don't want to rebuild the content tree\n       * this way, we create a better user experience, because the user\n       * has the possibility to navigate between content elements on the same page\n       */\n      var contentArea = document.querySelector('#typo3-contentIframe').contentWindow.document;\n      var editForm = contentArea.querySelector('#EditDocumentController');\n      if (!editForm && !!document.querySelector('.content-tree')) {\n        document.querySelector('.content-tree').remove();\n        buildContentTree();\n      }\n    }\n  });\n}\nfunction initContentTreeToggle() {\n  document.querySelector('.t3js-scaffold-content-navigation').classList.toggle('content-tree--collapsed');\n}\nfunction InitContentTree() {\n  if (!!document.querySelector('.enba-contentNavigation__enabledContentTree')) {\n    buildContentTree();\n  }\n}\n\n//# sourceURL=webpack://enhanced_backend/./JavaScript/Features/ContentTree.js?");

/***/ }),

/***/ "./JavaScript/Features/EnbaClassNames.js":
/*!***********************************************!*\
  !*** ./JavaScript/Features/EnbaClassNames.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ InitEnbaClassNames)\n/* harmony export */ });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\n/**\r\n * Class names of the extension are only injected in the root document\r\n * we add all enba-* class names to all iframes that are loaded later\r\n */\nfunction InitEnbaClassNames() {\n  var _document$querySelect;\n  var enbaClassNames = _toConsumableArray(window.parent.document.querySelector('html').classList);\n  enbaClassNames.filter(function (className) {\n    return !className.startsWith('enba');\n  });\n  (_document$querySelect = document.querySelector('html').classList).add.apply(_document$querySelect, _toConsumableArray(enbaClassNames));\n}\n\n//# sourceURL=webpack://enhanced_backend/./JavaScript/Features/EnbaClassNames.js?");

/***/ }),

/***/ "./JavaScript/Features/SaveSettingsListener.js":
/*!*****************************************************!*\
  !*** ./JavaScript/Features/SaveSettingsListener.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ InitSaveSettingsListener)\n/* harmony export */ });\nfunction reloadPage() {\n  window.parent.location.reload();\n}\nfunction InitSaveSettingsListener() {\n  var $saveButton = document.querySelector(\".btn[name='data[save]']\");\n  if (!!$saveButton) {\n    $saveButton.onclick = reloadPage;\n  }\n}\n\n//# sourceURL=webpack://enhanced_backend/./JavaScript/Features/SaveSettingsListener.js?");

/***/ }),

/***/ "./JavaScript/Utils/stringToHTML.js":
/*!******************************************!*\
  !*** ./JavaScript/Utils/stringToHTML.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ stringToHTML)\n/* harmony export */ });\nfunction stringToHTML(htmlString) {\n  var dom = document.createElement('div');\n  dom.innerHTML = htmlString;\n  return dom;\n}\n\n//# sourceURL=webpack://enhanced_backend/./JavaScript/Utils/stringToHTML.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./JavaScript/Features.js");
/******/ 	
/******/ })()
;