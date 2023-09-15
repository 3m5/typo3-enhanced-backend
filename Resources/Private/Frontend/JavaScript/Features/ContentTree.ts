import stringToHTML from "../Utils/stringToHTML";

function buildContentTree() {
  const iframe = document.querySelector('#typo3-contentIframe') as HTMLIFrameElement;

  /**
   * Content tree is only visible if page module is selected,
   * otherwise there is no content in the content area that could be selected
   */
   //TODO: check why this is not working anymore
  /*if(isPageModuleActive()) {
    document.querySelector<HTMLElement>('.t3js-scaffold-content-navigation')?.classList?.remove('content-tree--hidden');
  } else {
    document.querySelector<HTMLElement>('.t3js-scaffold-content-navigation')?.classList?.add('content-tree--hidden');
  }*/

  /**
   * Content tree is build after the content area iframe is loaded and page tree is available
   * the content tree is renderer below the page tree and shows the elements of the content area
   */
  if (iframe === null) {
    window.setTimeout(buildContentTree, 1000);
  } else {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    const $pageNavigation = document.querySelector('.t3js-scaffold-content-navigation');

    if (iframeDoc?.readyState === 'complete' && !!$pageNavigation) {
      createContentTreeHTML();
      watchContentIframe();
    } else {
      window.setTimeout(buildContentTree, 1000);
    }
  }
}

function getContentTreeHeadline(contentArea: Document): string {
  // Check page name including page icon in the top right corner of content area in page path
  const pagePathHeader = contentArea.querySelector<HTMLElement>('.typo3-docheader-pagePath + strong');
  if (pagePathHeader?.innerHTML) {
    return pagePathHeader.innerHTML;
  }

  // If path is not available check for page name in editable headline in content area
  const editableHeader = contentArea.querySelector<HTMLElement>('.t3js-title-inlineedit');
  if (editableHeader?.textContent) {
    return editableHeader.textContent;
  }

  // If page name is not available, show 'Content Tree' label as fallback
  return 'Content Tree';
}

function getElementHeadline(element:HTMLElement): string {
  const isGridContainer = !!element.querySelector('.exampleContent > .t3-grid-container');
  const elementFallbackName = isGridContainer ? 'Container' : (element.querySelector('.t3-page-ce-header-title')?.textContent ?? 'Content element');

  const elementBody = element?.querySelectorAll<HTMLElement>('.t3-page-ce-body')[0];
  const elementContent = elementBody?.querySelectorAll<HTMLElement>('.exampleContent')[0];

  // if element has a strong title, show this in content tree
  if (element.querySelector('.element-preview-header-header')) {
    return element.querySelector('.element-preview-header-header')?.textContent ?? '';
  }

  // if no strong title is found and element is grid container, show fallback name
  if(isGridContainer) {
    return elementFallbackName;
  }

  // if element is no grid container and has no title, show table head as headline
  if(elementContent?.querySelector<HTMLElement>('th:first-of-type')?.firstElementChild?.tagName === 'STRONG') {
    return elementContent?.querySelector<HTMLElement>('th:first-of-type > strong')?.textContent ?? '';
  }

  // if no title is available show fallback name
  return elementFallbackName;
}

/**
 * creates the content tree header, that works as collapse toggle
 * adds the current page title as content tree header
 * adds the content tree data to the content tree body
 */
function createContentTreeHTML() {
  const $pageNavigation = document.querySelector('.t3js-scaffold-content-navigation');
  const iframe = document.getElementById("typo3-contentIframe") as HTMLIFrameElement;
  const contentArea = iframe.contentWindow?.document as Document;

  const contentTree = document.createElement("div");
  contentTree.classList.add('content-tree');

  const contentTreeHeader = document.createElement("div");
  contentTreeHeader.classList.add('content-tree__header');
  contentTreeHeader.innerHTML = '<label class="content-tree__headline">Content tree</label><i class="content-tree__toggle" aria-label="Toggle content tree"></i>';
  contentTreeHeader.onclick = initContentTreeToggle;

  const contentTreeHeadline = getContentTreeHeadline(contentArea);
  const contentTreeData = document.createElement("div");
  contentTreeData.classList.add('content-tree__data');
  contentTreeData.innerHTML = '<ul><li><span class="content-tree__title">' + contentTreeHeadline + '</li></ul>';

  contentTree.appendChild(contentTreeHeader);
  contentTree.appendChild(contentTreeData);
  $pageNavigation?.append(contentTree);

  const rootElement = contentArea?.querySelector<HTMLElement>('#PageLayoutController');
  const classList = ["t3js-page-ce-sortable"];

  const createdTreeLinks : Array<string> = [];
  if(!!rootElement) {
    const nestedList = createNestedList(rootElement, classList, createdTreeLinks);
    if(!!nestedList) {
      document.querySelector<HTMLElement>(".content-tree__data .content-tree__title")?.insertAdjacentElement("afterend", nestedList);
    } else {
      const list = document.createElement("ul");
      list.classList.add('list-style-type--none');
      const listItem = document.createElement("li");
      listItem.innerHTML = 'No content on this page.';
      list.appendChild(listItem);
      document.querySelector<HTMLElement>(".content-tree__data")?.insertAdjacentElement("afterend", list);
    }
  }
}

/**
 *
 * @param rootElement - the element from which the iteration should be started
 * @param classList - all classnames, that match a content element in the content area
 * @returns {HTMLUListElement|null}
 */
function createNestedList(rootElement : HTMLElement, classList : Array<string>, createdTreeLinks : Array<string>) {
  // Wähle alle Elemente aus, die mindestens eine der Klassen haben
  const elements: Array<HTMLElement> = Array.from<HTMLElement>(rootElement.querySelectorAll("*"))
    .filter((element: HTMLElement) => {
      const elementClasses = Array.from<string>(element.classList);
      return classList.some((className: string) => elementClasses?.includes(className));
    });


  if (elements.length === 0) return null;

  const list = document.createElement("ul");

  // Iterate over all found elements and create a <li> element for each one
  for (let i = 0; i < elements.length; i++) {
    const element : HTMLElement = elements[i];
    const listItem = document.createElement("li");
    const elementIcon: HTMLElement | null = element.querySelector('.t3-page-ce-header-left [data-contextmenu-table="tt_content"]');
    const linkToContentElement : HTMLElement =  element?.querySelector<HTMLElement>('.t3-page-ce-header [data-identifier="actions-open"]')?.closest('a') ? element?.querySelector<HTMLElement>('.t3-page-ce-header [data-identifier="actions-open"]')?.closest('a')?.cloneNode(true) as HTMLElement : document.createElement('div');

    if(!!linkToContentElement && linkToContentElement.tagName === 'A') {
      linkToContentElement.innerHTML = getElementHeadline(element);

      while (linkToContentElement.classList.length > 0) {
        linkToContentElement.classList.remove(linkToContentElement.classList.item(0) || '');
      }
      // edit form should open in content area
      linkToContentElement.setAttribute('target', 'list_frame');
      linkToContentElement.classList.add('link-to-content-element');

      // add ce icon to tree view
      if(!!elementIcon) {
        linkToContentElement.insertAdjacentElement("afterbegin", elementIcon.cloneNode(true) as HTMLElement);
      }

      // decrease opacity of disabled tree items
      if(element.classList.contains('t3-page-ce-hidden')) {
        linkToContentElement.classList.add('t3-page-ce-hidden');
      }

      // Check if element is already in content tree, if yes, don't use it as content root
      const currentElementURL = linkToContentElement.getAttribute('href') ?? '';
      if(!createdTreeLinks.includes(currentElementURL)) {
        createdTreeLinks.push(currentElementURL);

        listItem.appendChild(linkToContentElement);

        // Add the child elements recursively
        const sublist = createNestedList(element, classList, createdTreeLinks);
        if (sublist) listItem.appendChild(sublist);

        list.appendChild(listItem);
      }
    }
  }

  return list;
}

/**
 * watch for changes in content area, because the content tree is only shown when page module is active
 * furthermore, the content tree is rebuilt when the selected page changes
 */
function watchContentIframe() {
  document.querySelector<HTMLIFrameElement>('#typo3-contentIframe')?.addEventListener('load', (event) => {
    if (window.top === window) {
      // Code is only executed in main HTML
      /**
       * if editForm is opened, we don't want to rebuild the content tree
       * this way, we create a better user experience, because the user
       * has the possibility to navigate between content elements on the same page
       */
      const contentArea = document.querySelector<HTMLIFrameElement>('#typo3-contentIframe')?.contentWindow?.document;
      const editForm = contentArea?.querySelector<HTMLElement>('#EditDocumentController');
      if(!editForm && !!document.querySelector('.content-tree')) {
        document.querySelector<HTMLElement>('.content-tree')?.remove();
        buildContentTree();
      }
    }
  });
}

/**
 * makes the content tree collapsible / expandable
 */
function initContentTreeToggle() {
  document.querySelector<HTMLElement>('.t3js-scaffold-content-navigation')?.classList.toggle('content-tree--collapsed');
}

/**
 * checks whether the page module in sidebar is selected
 * @returns {boolean}
 */
function isPageModuleActive() {
  return document.querySelector<HTMLElement>('#modulemenu .modulemenu-action-active')?.dataset.modulename === 'web_layout';
}

/**
 * builds a content tree that shows all available content elements on selected page
 * content tree is located under the page tree and collapsible, so that the full page tree view is still available
 * content tree is only visible in page module and when a content element is edited
 * the content tree contains links for every content element, that allows to edit the content element in a fast way
 * @constructor
 */
export default function InitContentTree() {
  if(!!document.querySelector('.enba-pageTree__enabledContentTree')) {
    buildContentTree();
  }
}
