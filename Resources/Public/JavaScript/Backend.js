function checkIframeLoaded() {
  const iframe = document.querySelector('#typo3-contentIframe');

  if (iframe == null) {
    window.setTimeout(checkIframeLoaded, 1000);
  } else {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const $pageNavigation = document.querySelector('.t3js-scaffold-content-navigation');

    if (iframeDoc.readyState == 'complete' && !!$pageNavigation) {
      buildContentTree();
    } else {
      window.setTimeout(checkIframeLoaded, 1000);
    }
  }
}

function buildContentTree() {
  const $pageNavigation = document.querySelector('.t3js-scaffold-content-navigation');
  const contentTree = document.createElement("div");
  contentTree.classList.add('content-tree');
  contentTree.innerHTML = '<div class="headline">Content Tree</div>';

  // Create an empty string to store the HTML list
  const htmlList = document.createElement("ul");

  const contentArea = document.getElementById("typo3-contentIframe").contentWindow.document;
  const gridElements = contentArea.querySelectorAll(".t3-grid-cell");
  console.log(gridElements);
  for (let i = 0; i < gridElements.length; i++) {
    const listEntry = document.createElement("li");
    console.log(gridElements[i]);
    listEntry.innerHTML = gridElements[i].find('.t3-page-column-header').textContent;
    htmlList.append(listEntry);
  }

  contentTree.append(htmlList);
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
    // Code is exectuted in an iframe
    //console.log('Die Datei wird in einem iFrame ausgeführt.');
  } else {
    // Code is only executed in main HTML
    checkIframeLoaded();
  }

});



