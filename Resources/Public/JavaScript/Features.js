(()=>{"use strict";var e={199:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.featuresThatRequirePageReload=void 0,t.featuresThatRequirePageReload=["enba-global__enhancedIcons"]},892:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=o(n(731)),a=o(n(518)),c=o(n(984)),d=o(n(86)),r=o(n(479));"undefined"!=typeof window&&(window.addEventListener("DOMContentLoaded",(function(){var e;window.top===window&&(null===(e=document.querySelector("html"))||void 0===e||e.classList.add("enba-sidebar__enhancedMenuUI","enba-pageTree__enhancedToolbarUI","enba-contentArea__enhancedOverviewUI","enba-contentArea__enhancedToolbar","enba-contentArea__enhancedEditingForm","enba-contentArea__enhancedLanguageVisualization","enba-contentElementWizard__enhancedToolbar","enba-contentElementWizard__enhancedUI")),window.parent!==window&&(0,c.default)()})),window.addEventListener("load",(e=>{var t;window.top===window?(0,l.default)():"typo3-contentIframe"===(null===(t=window.frameElement)||void 0===t?void 0:t.id)&&((0,a.default)(),document.querySelector(".enba-contentElementWizard__enhancedUI")&&(0,d.default)(),document.querySelector(".enba-contentArea__enhancedLanguageVisualization")&&(0,r.default)())})))},86:(e,t)=>{function n(){window.parent.document.querySelector(".t3-new-content-element-wizard-window")?window.parent.document.querySelectorAll(".t3js-media-new-content-element-wizard").forEach((function(e){var t,n;let o=null===(t=null==e?void 0:e.querySelector(".media-body"))||void 0===t?void 0:t.cloneNode(!0);if(o&&(o.removeChild(o.querySelector("br")),o.removeChild(o.querySelector("strong"))),o&&o.innerText.replace(/\n|\r|\W/g,"").length){o.classList.remove("media-body"),o.classList.add("tooltip__content");const t=document.createElement("div");t.classList.add("enba-tooltip"),t.insertAdjacentElement("afterbegin",o),t.insertAdjacentHTML("afterbegin",'<img class="tooltip__icon" src="/typo3conf/ext/enhanced_backend/Resources/Public/Icons/Info.svg" width="18" height="18" />'),null===(n=null==t?void 0:t.querySelector(".tooltip__icon"))||void 0===n||n.addEventListener("click",(function(){!function(e){e.classList.toggle("tooltip--active")}(t)})),e.insertAdjacentElement("afterbegin",t)}})):window.setTimeout(n,500)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){document.querySelectorAll("typo3-backend-new-content-element-wizard-button").forEach((function(e){e.addEventListener("click",(function(){n()}))}))}},731:(e,t)=>{function n(){var e,t,o,c,d;const r=document.querySelector("#typo3-contentIframe");if(function(){var e;return"web_layout"===(null===(e=document.querySelector("#modulemenu a.modulemenu-action-active"))||void 0===e?void 0:e.dataset.modulemenuIdentifier)}()?null===(t=null===(e=document.querySelector(".t3js-scaffold-content-navigation"))||void 0===e?void 0:e.classList)||void 0===t||t.remove("content-tree--hidden"):null===(c=null===(o=document.querySelector(".t3js-scaffold-content-navigation"))||void 0===o?void 0:o.classList)||void 0===c||c.add("content-tree--hidden"),null===r)window.setTimeout(n,1e3);else{const e=r.contentDocument||(null===(d=r.contentWindow)||void 0===d?void 0:d.document),t=document.querySelector(".t3js-scaffold-content-navigation");"complete"===(null==e?void 0:e.readyState)&&t?(function(){var e,t,n;const o=document.querySelector(".t3js-scaffold-content-navigation"),c=null===(e=document.getElementById("typo3-contentIframe").contentWindow)||void 0===e?void 0:e.document,d=document.createElement("div");d.classList.add("content-tree");const r=document.createElement("div");r.classList.add("content-tree__header"),r.innerHTML='<label class="content-tree__headline">Content tree</label><i class="content-tree__toggle" aria-label="Toggle content tree"></i>',r.onclick=a;const i=function(e){const t=e.querySelector(".typo3-docheader-pagePath + strong");if(null==t?void 0:t.innerHTML)return t.innerHTML;const n=e.querySelector(".t3js-title-inlineedit");return(null==n?void 0:n.textContent)?n.textContent:"Content Tree"}(c),u=document.createElement("div");u.classList.add("content-tree__data"),u.innerHTML='<ul><li><span class="content-tree__title">'+i+"</li></ul>",d.appendChild(r),d.appendChild(u),null==o||o.append(d);const s=null==c?void 0:c.querySelector("#PageLayoutController");if(s){const e=l(s,["t3js-page-ce-sortable"],[]);if(e)null===(t=document.querySelector(".content-tree__data .content-tree__title"))||void 0===t||t.insertAdjacentElement("afterend",e);else{const e=document.createElement("ul");e.classList.add("list-style-type--none");const t=document.createElement("li");t.innerHTML="No content on this page.",e.appendChild(t),null===(n=document.querySelector(".content-tree__data"))||void 0===n||n.insertAdjacentElement("afterend",e)}}}(),function(){var e;null===(e=document.querySelector("#typo3-contentIframe"))||void 0===e||e.addEventListener("load",(e=>{var t,o,l;if(window.top===window){const e=null===(o=null===(t=document.querySelector("#typo3-contentIframe"))||void 0===t?void 0:t.contentWindow)||void 0===o?void 0:o.document;!(null==e?void 0:e.querySelector("#EditDocumentController"))&&document.querySelector(".content-tree")&&(null===(l=document.querySelector(".content-tree"))||void 0===l||l.remove(),n())}}))}()):window.setTimeout(n,1e3)}}function o(e){var t,n,o,l,a,c,d,r;const i=!!e.querySelector(".exampleContent > .t3-grid-container"),u=i?"Container":null!==(n=null===(t=e.querySelector(".t3-page-ce-header-title"))||void 0===t?void 0:t.textContent)&&void 0!==n?n:"Content element",s=null==e?void 0:e.querySelectorAll(".t3-page-ce-body")[0],v=null==s?void 0:s.querySelectorAll(".exampleContent")[0];return e.querySelector(".element-preview-header-header")?null!==(l=null===(o=e.querySelector(".element-preview-header-header"))||void 0===o?void 0:o.textContent)&&void 0!==l?l:"":i?u:"STRONG"===(null===(c=null===(a=null==v?void 0:v.querySelector("th:first-of-type"))||void 0===a?void 0:a.firstElementChild)||void 0===c?void 0:c.tagName)?null!==(r=null===(d=null==v?void 0:v.querySelector("th:first-of-type > strong"))||void 0===d?void 0:d.textContent)&&void 0!==r?r:"":u}function l(e,t,n){var a,c,d,r;const i=Array.from(e.querySelectorAll("*")).filter((e=>{const n=Array.from(e.classList);return t.some((e=>null==n?void 0:n.includes(e)))}));if(0===i.length)return null;const u=document.createElement("ul");for(let e=0;e<i.length;e++){const s=i[e],v=document.createElement("li"),m=s.querySelector('.t3-page-ce-header-left [data-contextmenu-table="tt_content"]'),f=(null===(a=null==s?void 0:s.querySelector('.t3-page-ce-header [data-identifier="actions-open"]'))||void 0===a?void 0:a.closest("a"))?null===(d=null===(c=null==s?void 0:s.querySelector('.t3-page-ce-header [data-identifier="actions-open"]'))||void 0===c?void 0:c.closest("a"))||void 0===d?void 0:d.cloneNode(!0):document.createElement("div");if(f&&"A"===f.tagName){for(f.innerHTML=o(s);f.classList.length>0;)f.classList.remove(f.classList.item(0)||"");f.setAttribute("target","list_frame"),f.classList.add("link-to-content-element"),m&&f.insertAdjacentElement("afterbegin",m.cloneNode(!0)),s.classList.contains("t3-page-ce-hidden")&&f.classList.add("t3-page-ce-hidden");const e=null!==(r=f.getAttribute("href"))&&void 0!==r?r:"";if(!n.includes(e)){n.push(e),v.appendChild(f);const o=l(s,t,n);o&&v.appendChild(o),u.appendChild(v)}}}return u}function a(){var e;null===(e=document.querySelector(".t3js-scaffold-content-navigation"))||void 0===e||e.classList.toggle("content-tree--collapsed")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){document.querySelector(".enba-pageTree__enabledContentTree")&&n()}},984:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e,t,n,o;if("undefined"!=typeof window){const l=null===(n=null===(t=null===(e=null===window||void 0===window?void 0:window.parent)||void 0===e?void 0:e.document)||void 0===t?void 0:t.querySelector("html"))||void 0===n?void 0:n.classList,a=l?Array.from(l):[];a.filter((e=>!e.startsWith("enba"))),null===(o=document.querySelector("html"))||void 0===o||o.classList.add(...a)}}},479:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){document.querySelectorAll(".t3-page-column-lang-name").forEach((e=>{var t;const n=e.getAttribute("data-language-title"),o=document.querySelector('.t3js-flag[title="'+n+'"]');o&&(null===(t=e.querySelector("h2"))||void 0===t||t.prepend(o))}))}},518:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=n(199);function l(){const e=[];o.featuresThatRequirePageReload.forEach((t=>{var n;e.push({name:t,value:!!(null===(n=document.querySelector('[name="data['+t+']"]'))||void 0===n?void 0:n.checked)})}));const t=sessionStorage.getItem("originFeatureValues");(function(e,t){const n=e.sort(((e,t)=>e.name.localeCompare(t.name))),o=t.sort(((e,t)=>e.name.localeCompare(t.name)));for(let e=0;e<n.length;e++)if(n[e].name!==o[e].name||n[e].value!==o[e].value)return!1;return!0})(t?JSON.parse(t):[],e)||sessionStorage.setItem("reloadPage","true")}function a(e){const t=document.querySelector('[name="data[enba-presets]"][value="'+e+'"]');t&&(t.checked=!0)}t.default=function(){sessionStorage.getItem("reloadPage")&&(sessionStorage.removeItem("reloadPage"),confirm("For all changes to take effect, the page must be reloaded once. Should the page be reloaded now?")&&window.parent.location.reload()),document.querySelectorAll('[name="data[enba-presets]"]').forEach((function(e){e.addEventListener("click",(function(){!function(e){let t=new Event("change",{bubbles:!0});switch(e){case"custom":break;case"vanilla":document.querySelectorAll('.enba-uc__feature input[type="checkbox"]').forEach((function(e){var n,o;e.checked=!!(null===(o=null===(n=e.dataset)||void 0===n?void 0:n.presets)||void 0===o?void 0:o.includes("vanilla")),e.dispatchEvent(t)}));break;case"modern":document.querySelectorAll('.enba-uc__feature input[type="checkbox"]').forEach((function(e){var n,o;e.checked=!!(null===(o=null===(n=e.dataset)||void 0===n?void 0:n.presets)||void 0===o?void 0:o.includes("modern")),e.dispatchEvent(t)}));break;case"none":document.querySelectorAll('.enba-uc__feature input[type="checkbox"]').forEach((function(e){e.checked=!1})),document.querySelectorAll('.enba-uc__feature input[type="checkbox"]').forEach((function(e){e.dispatchEvent(t)}))}e&&a(e)}(this.getAttribute("value"))}))})),document.querySelectorAll('.enba-uc__feature input[type="checkbox"]').forEach((function(e){e.addEventListener("change",(function(){a("custom")}))})),document.querySelectorAll(".enba-uc-group__header").forEach((e=>{e.addEventListener("click",(function(){var t;null===(t=e.closest(".enba-uc-group"))||void 0===t||t.classList.toggle("enba-uc-group--collapsed")}))})),document.querySelectorAll('.enba-uc__feature input[type="checkbox"]').forEach((function(e){e.addEventListener("change",(function(){var t,n,l,a,c,d,r,i,u;const s=null===(t=e.getAttribute("name"))||void 0===t?void 0:t.replace(/^data\[|\]$/g,"");s&&!o.featuresThatRequirePageReload.includes(s)&&(e.checked?(null===(n=document.querySelector("html"))||void 0===n||n.classList.add(s),null===(c=null===(a=null===(l=null===window||void 0===window?void 0:window.parent)||void 0===l?void 0:l.document)||void 0===a?void 0:a.querySelector("html"))||void 0===c||c.classList.add(s)):(null===(d=document.querySelector("html"))||void 0===d||d.classList.remove(s),null===(u=null===(i=null===(r=null===window||void 0===window?void 0:window.parent)||void 0===r?void 0:r.document)||void 0===i?void 0:i.querySelector("html"))||void 0===u||u.classList.remove(s)))}))})),function(){const e=[];o.featuresThatRequirePageReload.forEach((t=>{var n;e.push({name:t,value:!!(null===(n=document.querySelector('[name="data['+t+']"]'))||void 0===n?void 0:n.checked)})})),sessionStorage.setItem("originFeatureValues",JSON.stringify(e))}(),function(){const e=document.querySelector(".btn[name='data[save]']");e&&(e.onclick=l)}()}}},t={};!function n(o){var l=t[o];if(void 0!==l)return l.exports;var a=t[o]={exports:{}};return e[o].call(a.exports,a,a.exports,n),a.exports}(892)})();