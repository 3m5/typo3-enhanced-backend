import stringToHTML from "../Utils/stringToHTML";

function buildContentTree() {
  const iframe = document.querySelector('#typo3-contentIframe');

  if (iframe == null) {
    window.setTimeout(buildContentTree, 1000);
  } else {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const $pageNavigation = document.querySelector('.t3js-scaffold-content-navigation');

    if (iframeDoc.readyState === 'complete' && !!$pageNavigation) {
      if(isPageModuleActive()) {
        createContentTreeHTML();
        document.querySelector('.t3js-scaffold-content-navigation').classList.remove('content-tree--hidden');
      } else {
        hideContentTree();
      }
      watchContentIframe();
    } else {
      window.setTimeout(buildContentTree, 1000);
    }
  }
}

function createContentTreeHTML() {
  const $pageNavigation = document.querySelector('.t3js-scaffold-content-navigation');
  const contentTree = document.createElement("div");
  contentTree.classList.add('content-tree');

  const contentTreeHeader = document.createElement("div");
  contentTreeHeader.classList.add('content-tree__header');
  contentTreeHeader.innerHTML = '<label class="content-tree__headline">Content Tree</label><i class="fa fa-solid fa-angle-down content-tree__toggle"></i>';
  contentTreeHeader.onclick = initContentTreeToggle;

  const contentTreeData = document.createElement("div");
  contentTreeData.classList.add('content-tree__data');

  contentTree.appendChild(contentTreeHeader);
  contentTree.appendChild(contentTreeData);
  $pageNavigation.append(contentTree);

  const contentArea = document.getElementById("typo3-contentIframe").contentWindow.document;
  const rootElement = contentArea.querySelector('#PageLayoutController .t3js-sortable');
  const classList = ["t3js-page-ce-sortable"];

  if(!!rootElement) {
    const nestedList = createNestedList(rootElement, classList);
    document.querySelector(".content-tree__data").appendChild(nestedList);
  }
}

function createNestedList(rootElement, classList) {
  // Wähle alle Elemente aus, die mindestens eine der Klassen haben
  const elements = Array.from(rootElement.querySelectorAll("*"))
    .filter(element => {
      const elementClasses = Array.from(element.classList);
      return classList.some(className => elementClasses.includes(className));
    });

  if (elements.length === 0) return null;

  const list = document.createElement("ul");

  // Iterate over all found elements and create a <li> element for each one
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const listItem = document.createElement("li");

    const elementIcon = elements[i].querySelector('.t3-page-ce-header .t3js-icon');
    let linkInIframe = elements[i].querySelector('.t3-page-ce-dragitem .exampleContent strong') ? stringToHTML(elements[i].querySelector('.t3-page-ce-dragitem .exampleContent strong').innerHTML) : '';
    if(!!linkInIframe && linkInIframe.querySelector('a')) {
      // edit form should open in content area
      linkInIframe.querySelector('a').setAttribute('target', 'list_frame');

      // add ce icon to tree view
      if(!!elementIcon) {
        linkInIframe.querySelector('a').insertAdjacentElement("afterbegin", elementIcon.cloneNode(true));
      }

      // decrease opacity of disabled tree items
      if(elements[i].classList.contains('t3-page-ce-hidden')) {
        linkInIframe.querySelector('a').classList.add('t3-page-ce-hidden');
      }

      listItem.innerHTML = linkInIframe.innerHTML;

      // Add the child elements recursively
      const sublist = createNestedList(element, classList);
      if (sublist) listItem.appendChild(sublist);

      list.appendChild(listItem);
    }
  }

  return list;
}

function hideContentTree() {
  const $contentTree = document.querySelector('.content-tree');
  if(!!$contentTree) {
    $contentTree.remove();
  }

  document.querySelector('.t3js-scaffold-content-navigation').classList.add('content-tree--hidden');
}

function watchContentIframe() {
  document.querySelector('#typo3-contentIframe').addEventListener('load', (event) => {
    if (window.top !== window) {
      // Code is executed in an iframe
    }
    else {
      // Code is only executed in main HTML
      if(isPageModuleActive()) {
        /**
         * if editForm is opened, we don't want to rebuild the content tree
         * this way, we create a better user experience, because the user
         * has the possibility to navigate between content elements on the same page
         */
        const contentArea = document.querySelector('#typo3-contentIframe').contentWindow.document;
        const editForm = contentArea.querySelector('#EditDocumentController');
        if(!editForm) {
          buildContentTree();
        }
      } else {
        hideContentTree();
      }
    }
  });
}

function initContentTreeToggle() {
  document.querySelector('.t3js-scaffold-content-navigation').classList.toggle('content-tree--collapsed');
}

function isPageModuleActive() {
  return !!document.querySelector('#modulemenu .modulemenu-action-active') && document.querySelector('#modulemenu .modulemenu-action-active').dataset.modulename === 'web_layout';
}


export default function InitContentTree() {
  buildContentTree();
}
