(()=>{"use strict";function e(){var o=document.querySelector("#typo3-contentIframe");if(document.querySelector("#modulemenu .modulemenu-action-active")&&"web_layout"===document.querySelector("#modulemenu .modulemenu-action-active").dataset.modulename?document.querySelector(".t3js-scaffold-content-navigation").classList.remove("content-tree--hidden"):document.querySelector(".t3js-scaffold-content-navigation").classList.add("content-tree--hidden"),null==o)window.setTimeout(e,1e3);else{var r=o.contentDocument||o.contentWindow.document,c=document.querySelector(".t3js-scaffold-content-navigation");"complete"===r.readyState&&c?(function(){var e=document.querySelector(".t3js-scaffold-content-navigation"),o=document.getElementById("typo3-contentIframe").contentWindow.document,r=document.createElement("div");r.classList.add("content-tree");var c=document.createElement("div");c.classList.add("content-tree__header"),c.innerHTML='<label class="content-tree__headline">Content tree</label><i class="fa fa-solid fa-angle-down content-tree__toggle"></i>',c.onclick=n;var a=o.querySelector(".typo3-docheader-pagePath + strong")?o.querySelector(".typo3-docheader-pagePath + strong").innerHTML:o.querySelector(".t3js-title-inlineedit")?o.querySelector(".t3js-title-inlineedit").textContent:"Content Tree",l=document.createElement("div");l.classList.add("content-tree__data"),l.innerHTML='<ul><li><span class="content-tree__title">'+a+"</li></ul>",r.appendChild(c),r.appendChild(l),e.append(r);var i=o.querySelector("#PageLayoutController");if(i){var d=t(i,["t3js-page-ce-sortable"],[]);if(d)document.querySelector(".content-tree__data .content-tree__title").insertAdjacentElement("afterend",d);else{var u=document.createElement("ul");u.classList.add("list-style-type--none");var s=document.createElement("li");s.innerHTML="No content on this page.",u.appendChild(s),document.querySelector(".content-tree__data").insertAdjacentElement("afterend",u)}}}(),document.querySelector("#typo3-contentIframe").addEventListener("load",(function(t){window.top!==window||!document.querySelector("#typo3-contentIframe").contentWindow.document.querySelector("#EditDocumentController")&&document.querySelector(".content-tree")&&(document.querySelector(".content-tree").remove(),e())}))):window.setTimeout(e,1e3)}}function t(e,n,o){var r=Array.from(e.querySelectorAll("*")).filter((function(e){var t=Array.from(e.classList);return n.some((function(e){return t.includes(e)}))}));if(0===r.length)return null;for(var c=document.createElement("ul"),a=0;a<r.length;a++){var l=r[a],i=document.createElement("li"),d=!!l.querySelector(".exampleContent > .t3-grid-container"),u=l.querySelector(".t3-page-ce-header .t3js-contextmenutrigger"),s=d?"Container":"Content element",m=l.querySelector('.t3-page-ce-header [data-identifier="actions-open"]').closest("a")?l.querySelector('.t3-page-ce-header [data-identifier="actions-open"]').closest("a").cloneNode(!0):"<div></div>";if(m&&"A"===m.tagName){m.innerHTML="STRONG"===l.querySelector(".t3-page-ce-body .exampleContent").firstElementChild.tagName?l.querySelector(".t3-page-ce-body").querySelector(".exampleContent > strong").textContent:s,m.classList="",m.setAttribute("target","list_frame"),m.classList.add("link-to-content-element"),u&&m.insertAdjacentElement("afterbegin",u.cloneNode(!0)),l.classList.contains("t3-page-ce-hidden")&&m.classList.add("t3-page-ce-hidden");var f=m.getAttribute("href");if(!o.includes(f)){o.push(f),i.appendChild(m);var y=t(l,n,o);y&&i.appendChild(y),c.appendChild(i)}}}return c}function n(){document.querySelector(".t3js-scaffold-content-navigation").classList.toggle("content-tree--collapsed")}function o(){sessionStorage.setItem("reloadPage","true")}function r(){document.querySelectorAll('[name="data[enba-presets]"]').forEach((function(e){e.addEventListener("click",(function(){!function(e){switch(e){case"custom":break;case"vanilla":document.querySelectorAll('.enba-uc__feature input[type="checkbox"]').forEach((function(e){e.checked=e.dataset.presets.includes("vanilla")}));break;case"modern":document.querySelectorAll('.enba-uc__feature input[type="checkbox"]').forEach((function(e){e.checked=e.dataset.presets.includes("modern")}));break;case"none":document.querySelectorAll('.enba-uc__feature input[type="checkbox"]').forEach((function(e){e.checked=!1}))}}(this.getAttribute("value"))}))})),document.querySelectorAll('.enba-uc__feature input[type="checkbox"]').forEach((function(e){e.addEventListener("change",(function(){document.querySelector('[name="data[enba-presets]"][value="custom"]').checked=!0}))}))}function c(){var e;r(),(e=document.querySelector(".btn[name='data[save]']"))&&(e.onclick=o),document.querySelectorAll(".enba-uc-group__header").forEach((function(e){e.addEventListener("click",(function(){e.closest(".enba-uc-group").classList.toggle("enba-uc-group--collapsed")}))})),sessionStorage.getItem("reloadPage")&&confirm("For all changes to take effect, the page must be reloaded once. Should the page be reloaded now?")&&(sessionStorage.removeItem("reloadPage"),window.parent.location.reload())}function a(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function i(){window.parent.document.querySelector(".t3-new-content-element-wizard-window")?window.parent.document.querySelectorAll(".t3js-media-new-content-element-wizard").forEach((function(e){var t=e.querySelector(".media-body").cloneNode(!0);if(t.removeChild(t.querySelector("br")),t.removeChild(t.querySelector("strong")),t&&t.innerText.replace(/\n|\r|\W/g,"").length){(t=t.cloneNode(!0)).classList.remove("media-body"),t.classList.add("tooltip__content");var n=document.createElement("div");n.classList.add("enba-tooltip"),n.insertAdjacentElement("afterbegin",t),n.insertAdjacentHTML("afterbegin",'<img class="tooltip__icon" src="/typo3conf/ext/enhanced_backend/Resources/Public/Icons/Info.svg" width="18" height="18" />'),n.querySelector(".tooltip__icon").addEventListener("click",(function(){!function(e){e.classList.toggle("tooltip--active")}(n)})),e.insertAdjacentElement("afterbegin",n)}})):window.setTimeout(i,500)}window.addEventListener("load",(function(t){var n,o;window.top===window?document.querySelector(".enba-pageTree__enabledContentTree")&&e():((o=a(window.parent.document.querySelector("html").classList)).filter((function(e){return!e.startsWith("enba")})),(n=document.querySelector("html").classList).add.apply(n,a(o)),"typo3-contentIframe"===window.frameElement.id&&(c(),document.querySelector(".enba-contentElementWizard__enhancedUI")&&document.querySelectorAll("typo3-backend-new-content-element-wizard-button").forEach((function(e){e.addEventListener("click",(function(){i()}))}))))}))})();