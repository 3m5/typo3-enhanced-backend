window.addEventListener('load', (event) => {
  const $pageNavigation = document.querySelector('.t3js-scaffold-content-navigation');
  if(!!$pageNavigation) {

    const contentTree = document.createElement("div");
    contentTree.classList.add('content-tree');
    contentTree.innerHTML = 'Content Tree';

    // Get elements with class "example"
    let gridElements = document.getElementsByClassName(".t3-grid-cell");
    // Create an empty string to store the HTML list
    let htmlList = "<ul>";
    // Loop through the elements
    for (let i = 0; i < gridElements.length; i++) {
      console.log(gridElements[i].find('.t3-page-column-header'));
      htmlList += "<li>" + gridElements[i].find('.t3-page-column-header').textContent + "</li>";
    }
    htmlList += "</ul>";

    contentTree.append(htmlList);
    $pageNavigation.append(contentTree);
  }
});
