import InitContentTree from "./Features/ContentTree";

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
  } else {
    // Code is only executed in main HTML
    InitContentTree();
  }
});
