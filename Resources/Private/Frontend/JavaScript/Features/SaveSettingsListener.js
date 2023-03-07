function reloadPage() {
  window.parent.location.reload();
}

export default function InitSaveSettingsListener() {
  const $saveButton = document.querySelector(".btn[name='data[save]']");
  if(!!$saveButton) {
    $saveButton.onclick = reloadPage;
  }
}
