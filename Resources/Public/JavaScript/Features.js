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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Features_ContentTree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Features/ContentTree */ \"./JavaScript/Features/ContentTree.js\");\n/* harmony import */ var _Features_SaveSettingsListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Features/SaveSettingsListener */ \"./JavaScript/Features/SaveSettingsListener.js\");\n/* harmony import */ var _Features_EnbaClassNames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Features/EnbaClassNames */ \"./JavaScript/Features/EnbaClassNames.js\");\n/* harmony import */ var _Features_ContentElementWizard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Features/ContentElementWizard */ \"./JavaScript/Features/ContentElementWizard.js\");\n\n\n\n\nwindow.addEventListener('load', function (event) {\n  if (window.top === window) {\n    // Code is only executed in main HTML\n    (0,_Features_ContentTree__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  } else {\n    // Code is executed in an iframe\n    (0,_Features_EnbaClassNames__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n\n    // Code is executed in content area\n    if (window.frameElement.id === 'typo3-contentIframe') {\n      (0,_Features_SaveSettingsListener__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n      if (!!document.querySelector('.enba-contentElementWizard__enhancedUI')) {\n        (0,_Features_ContentElementWizard__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack://enhanced_backend/./JavaScript/Features.js?");

/***/ }),

/***/ "./JavaScript/Features/ContentElementWizard.js":
/*!*****************************************************!*\
  !*** ./JavaScript/Features/ContentElementWizard.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ InitContentElementWizard)\n/* harmony export */ });\nfunction toggleTooltip(tooltip) {\n  tooltip.classList.toggle('tooltip--active');\n}\nfunction addTooltip() {\n  window.parent.document.querySelectorAll('.t3js-media-new-content-element-wizard').forEach(function (contentElementButton) {\n    var tooltipContent = contentElementButton.querySelector('.media-body');\n    if (!!tooltipContent) {\n      tooltipContent = tooltipContent.cloneNode(true);\n      tooltipContent.classList.remove('media-body');\n      tooltipContent.classList.add('tooltip__content');\n      var tooltip = document.createElement('div');\n      tooltip.classList.add('enba-tooltip');\n      tooltip.insertAdjacentElement('afterbegin', tooltipContent);\n      tooltip.insertAdjacentHTML(\"afterbegin\", '<img class=\"tooltip__icon\" src=\"/typo3conf/ext/enhanced_backend/Resources/Public/Icons/Info.svg\" width=\"20\" height=\"20\" />');\n      tooltip.querySelector('.tooltip__icon').addEventListener('click', function () {\n        toggleTooltip(tooltip);\n      });\n      contentElementButton.insertAdjacentElement('afterbegin', tooltip);\n    }\n  });\n}\nfunction InitContentElementWizard() {\n  document.querySelectorAll('typo3-backend-new-content-element-wizard-button').forEach(function (addContentElementButton) {\n    addContentElementButton.addEventListener('click', function () {\n      // TODO: Timer is a workaround for aplpha, it would be better to listen if contentelement wizard is loaed instead\n      window.setTimeout(addTooltip, 1000);\n    });\n  });\n}\n\n//# sourceURL=webpack://enhanced_backend/./JavaScript/Features/ContentElementWizard.js?");

/***/ }),

/***/ "./JavaScript/Features/ContentTree.js":
/*!********************************************!*\
  !*** ./JavaScript/Features/ContentTree.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ InitContentTree)\n/* harmony export */ });\n/* harmony import */ var _Utils_stringToHTML__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/stringToHTML */ \"./JavaScript/Utils/stringToHTML.js\");\n\nfunction buildContentTree() {\n  var iframe = document.querySelector('#typo3-contentIframe');\n\n  /**\n   * Content tree is only visible if page module is selected,\n   * otherwise there is no content in the content area that could be selected\n   */\n  if (isPageModuleActive()) {\n    document.querySelector('.t3js-scaffold-content-navigation').classList.remove('content-tree--hidden');\n  } else {\n    document.querySelector('.t3js-scaffold-content-navigation').classList.add('content-tree--hidden');\n  }\n\n  /**\n   * Content tree is build after the content area iframe is loaded and page tree is available\n   * the content tree is renderer below the page tree and shows the elements of the content area\n   */\n  if (iframe == null) {\n    window.setTimeout(buildContentTree, 1000);\n  } else {\n    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;\n    var $pageNavigation = document.querySelector('.t3js-scaffold-content-navigation');\n    if (iframeDoc.readyState === 'complete' && !!$pageNavigation) {\n      createContentTreeHTML();\n      watchContentIframe();\n    } else {\n      window.setTimeout(buildContentTree, 1000);\n    }\n  }\n}\n\n/**\n * creates the content tree header, that works as collapse toggle\n * adds the current page title as content tree header\n * adds the content tree data to the content tree body\n */\nfunction createContentTreeHTML() {\n  var $pageNavigation = document.querySelector('.t3js-scaffold-content-navigation');\n  var contentArea = document.getElementById(\"typo3-contentIframe\").contentWindow.document;\n  var contentTree = document.createElement(\"div\");\n  contentTree.classList.add('content-tree');\n  var contentTreeHeader = document.createElement(\"div\");\n  contentTreeHeader.classList.add('content-tree__header');\n  contentTreeHeader.innerHTML = '<label class=\"content-tree__headline\">Content tree</label><i class=\"fa fa-solid fa-angle-down content-tree__toggle\"></i>';\n  contentTreeHeader.onclick = initContentTreeToggle;\n  var contentTreeHeadline = contentArea.querySelector('.typo3-docheader-pagePath + strong') ? contentArea.querySelector('.typo3-docheader-pagePath + strong').innerHTML : contentArea.querySelector('.t3js-title-inlineedit') ? contentArea.querySelector('.t3js-title-inlineedit').textContent : 'Content Tree';\n  var contentTreeData = document.createElement(\"div\");\n  contentTreeData.classList.add('content-tree__data');\n  contentTreeData.innerHTML = '<ul><li><span class=\"content-tree__title\">' + contentTreeHeadline + '</li></ul>';\n  contentTree.appendChild(contentTreeHeader);\n  contentTree.appendChild(contentTreeData);\n  $pageNavigation.append(contentTree);\n  var rootElement = contentArea.querySelector('#PageLayoutController');\n  var classList = [\"t3js-page-ce-sortable\"];\n  var createdTreeLinks = [];\n  if (!!rootElement) {\n    var nestedList = createNestedList(rootElement, classList, createdTreeLinks);\n    if (!!nestedList) {\n      document.querySelector(\".content-tree__data .content-tree__title\").insertAdjacentElement(\"afterend\", nestedList);\n    } else {\n      var list = document.createElement(\"ul\");\n      list.classList.add('list-style-type--none');\n      var listItem = document.createElement(\"li\");\n      listItem.innerHTML = 'No content on this page.';\n      list.appendChild(listItem);\n      document.querySelector(\".content-tree__data\").insertAdjacentElement(\"afterend\", list);\n    }\n  }\n}\n\n/**\n *\n * @param rootElement - the element from which the iteration should be started\n * @param classList - all classnames, that match a content element in the content area\n * @returns {HTMLUListElement|null}\n */\nfunction createNestedList(rootElement, classList, createdTreeLinks) {\n  // Wähle alle Elemente aus, die mindestens eine der Klassen haben\n  var elements = Array.from(rootElement.querySelectorAll(\"*\")).filter(function (element) {\n    var elementClasses = Array.from(element.classList);\n    return classList.some(function (className) {\n      return elementClasses.includes(className);\n    });\n  });\n  if (elements.length === 0) return null;\n  var list = document.createElement(\"ul\");\n\n  // Iterate over all found elements and create a <li> element for each one\n  for (var i = 0; i < elements.length; i++) {\n    var element = elements[i];\n    var listItem = document.createElement(\"li\");\n    var isGridContainer = !!element.querySelector('.exampleContent > .t3-grid-container');\n    var elementIcon = element.querySelector('.t3-page-ce-header .t3js-contextmenutrigger');\n    var linkToContentElement = '';\n    if (isGridContainer) {\n      linkToContentElement = element.querySelector('.t3-page-ce-header a[title=\"Edit\"]').cloneNode(true);\n      linkToContentElement.innerHTML = element.querySelector('.t3-page-ce-body .exampleContent').firstElementChild.tagName === 'STRONG' ? element.querySelector('.t3-page-ce-body').querySelector('.exampleContent > strong').textContent : 'Container';\n      linkToContentElement.classList = '';\n    } else {\n      linkToContentElement = element.querySelector('.t3-page-ce-dragitem .exampleContent strong') ? (0,_Utils_stringToHTML__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(element.querySelector('.t3-page-ce-dragitem .exampleContent strong').innerHTML) : '';\n      if (!!linkToContentElement && linkToContentElement.querySelector('a')) {\n        linkToContentElement = linkToContentElement.querySelector('a').cloneNode(true);\n      }\n    }\n    if (!!linkToContentElement && linkToContentElement.tagName === 'A') {\n      // edit form should open in content area\n      linkToContentElement.setAttribute('target', 'list_frame');\n      linkToContentElement.classList.add('link-to-content-element');\n\n      // add ce icon to tree view\n      if (!!elementIcon) {\n        linkToContentElement.insertAdjacentElement(\"afterbegin\", elementIcon.cloneNode(true));\n      }\n\n      // decrease opacity of disabled tree items\n      if (element.classList.contains('t3-page-ce-hidden')) {\n        linkToContentElement.classList.add('t3-page-ce-hidden');\n      }\n\n      // Check if element is already in content tree, if yes, don't use it as content root\n      var currentElementURL = linkToContentElement.getAttribute('href');\n      if (!createdTreeLinks.includes(currentElementURL)) {\n        createdTreeLinks.push(currentElementURL);\n        listItem.appendChild(linkToContentElement);\n\n        // Add the child elements recursively\n        var sublist = createNestedList(element, classList, createdTreeLinks);\n        if (sublist) listItem.appendChild(sublist);\n        list.appendChild(listItem);\n      }\n    }\n  }\n  return list;\n}\n\n/**\n * watch for changes in content area, because the content tree is only shown when page module is active\n * furthermore, the content tree is rebuilt when the selected page changes\n */\nfunction watchContentIframe() {\n  document.querySelector('#typo3-contentIframe').addEventListener('load', function (event) {\n    if (window.top !== window) {\n      // Code is executed in an iframe\n    } else {\n      // Code is only executed in main HTML\n      /**\n       * if editForm is opened, we don't want to rebuild the content tree\n       * this way, we create a better user experience, because the user\n       * has the possibility to navigate between content elements on the same page\n       */\n      var contentArea = document.querySelector('#typo3-contentIframe').contentWindow.document;\n      var editForm = contentArea.querySelector('#EditDocumentController');\n      if (!editForm && !!document.querySelector('.content-tree')) {\n        document.querySelector('.content-tree').remove();\n        buildContentTree();\n      }\n    }\n  });\n}\n\n/**\n * makes the content tree collapsible / expandable\n */\nfunction initContentTreeToggle() {\n  document.querySelector('.t3js-scaffold-content-navigation').classList.toggle('content-tree--collapsed');\n}\n\n/**\n * checks whether the page module in sidebar is selected\n * @returns {boolean}\n */\nfunction isPageModuleActive() {\n  return !!document.querySelector('#modulemenu .modulemenu-action-active') && document.querySelector('#modulemenu .modulemenu-action-active').dataset.modulename === 'web_layout';\n}\n\n/**\n * builds a content tree that shows all available content elements on selected page\n * content tree is located under the page tree and collapsible, so that the full page tree view is still available\n * content tree is only visible in page module and when a content element is edited\n * the content tree contains links for every content element, that allows to edit the content element in a fast way\n * @constructor\n */\nfunction InitContentTree() {\n  if (!!document.querySelector('.enba-pageTree__enabledContentTree')) {\n    buildContentTree();\n  }\n}\n\n//# sourceURL=webpack://enhanced_backend/./JavaScript/Features/ContentTree.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ InitUserSettings)\n/* harmony export */ });\nfunction reloadPage() {\n  sessionStorage.removeItem('reloadPage');\n  window.parent.location.reload();\n}\nfunction showPageReloadDialog() {\n  var dialog = confirm(\"For all changes to take effect, the page must be reloaded once. Should the page be reloaded now?\");\n  if (dialog) {\n    reloadPage();\n  }\n}\nfunction initSaveSettings() {\n  var $saveButton = document.querySelector(\".btn[name='data[save]']\");\n  if (!!$saveButton) {\n    $saveButton.onclick = setReloadTrigger;\n  }\n}\nfunction setReloadTrigger() {\n  sessionStorage.setItem('reloadPage', 'true');\n}\nfunction initSettingsGroupToggle() {\n  document.querySelectorAll('.enba-uc-group__header').forEach(function (groupHeader) {\n    groupHeader.addEventListener('click', function () {\n      groupHeader.closest('.enba-uc-group').classList.toggle('enba-uc-group--collapsed');\n    });\n  });\n}\nfunction InitUserSettings() {\n  initSaveSettings();\n  initSettingsGroupToggle();\n  if (!!sessionStorage.getItem('reloadPage')) {\n    showPageReloadDialog();\n  }\n}\n\n//# sourceURL=webpack://enhanced_backend/./JavaScript/Features/SaveSettingsListener.js?");

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