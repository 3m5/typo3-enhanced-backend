function buildContentTree() {
  const iframe = document.querySelector('#typo3-contentIframe');

  if (iframe == null) {
    window.setTimeout(buildContentTree, 1000);
  } else {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const $pageNavigation = document.querySelector('.t3js-scaffold-content-navigation');

    if (iframeDoc.readyState === 'complete' && !!$pageNavigation) {
      createContentTreeHTML();
    } else {
      window.setTimeout(buildContentTree, 1000);
    }
  }
}

function createTreeList(elements, treeParent, iterateFurther) {
  // Create an empty string to store the HTML list
  const htmlList = document.createElement("ul");

  for (let i = 0; i < elements.length; i++) {
    const listEntry = document.createElement("li");

    if(iterateFurther) {
      const subList = createTreeList(elements[i].querySelectorAll('.t3-page-ce'), listEntry, false);
      //listEntry.innerHTML = elements[i].querySelector('.t3-page-column-header').textContent;
      listEntry.appendChild(subList);
    } else {
      //listEntry.innerHTML = elements[i].querySelector('.t3-page-column-header').textContent;
    }

    htmlList.append(listEntry);
  }
  treeParent.append(htmlList);

  return treeParent;
}

function createContentTreeHTML() {
  const $pageNavigation = document.querySelector('.t3js-scaffold-content-navigation');
  let contentTree = document.createElement("div");
  contentTree.classList.add('content-tree');
  contentTree.innerHTML = '<label class="content-tree__headline">Content Tree</label>';

  const contentArea = document.getElementById("typo3-contentIframe").contentWindow.document;
  const gridElements = contentArea.querySelectorAll(".t3-grid-cell");
  contentTree = createTreeList(gridElements, contentTree, true);
  $pageNavigation.append(contentTree);
}

function reloadPage() {
  window.parent.location.reload();
}

window.addEventListener('load', (event) => {
  /*const $saveButton = document.querySelector(".btn[name='data[save]']");
  if(!!$saveButton) {
    $saveButton.onclick = reloadPage;
  }*/

  if (window.top !== window) {
    // Code is executed in an iframe
    //console.log('Die Datei wird in einem iFrame ausgeführt.');
  } else {
    // Code is only executed in main HTML
    buildContentTree();
  }
});



