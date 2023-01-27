function buildContentTree($pageNavigation) {
  const contentTree = document.createElement("div");
  contentTree.classList.add('content-tree');
  contentTree.innerHTML = '<div class="headline">Content Tree</div>';

  // Create an empty string to store the HTML list
  const htmlList = document.createElement("ul");
  const gridElements = document.getElementsByClassName("t3-grid-cell");
  console.log(gridElements);
  for (let i = 0; i < gridElements.length; i++) {
    const listEntry = document.createElement("li");
    listEntry.innerHTML = gridElements[i].find('.t3-page-column-header').textContent;
    htmlList.append(listEntry);
  }

  contentTree.append(htmlList);
  $pageNavigation.append(contentTree);
}

/*window.addEventListener('load', (event) => {
  const typo3ContentLoadedWatcher = setInterval(isContentLoaded, 1000);
  function isContentLoaded() {
    const $pageNavigation = document.querySelector('.t3js-scaffold-content-navigation');
    const $contentEditor = document.getElementById('PageLayoutController');
    console.log(!!$pageNavigation && !!$contentEditor);
    if ($pageNavigation) {
      stopWatcher();
      buildContentTree($pageNavigation);
    }
  }
  function stopWatcher() {
    clearInterval(typo3ContentLoadedWatcher);
  }

});*/

function reloadPage() {
  window.parent.location.reload(); 
}

window.addEventListener('load', (event) => {
  const $saveButton = document.querySelector(".btn[name='data[save]']");
  if(!!$saveButton) {
    $saveButton.onclick = reloadPage;
  }
});


