function reloadPage() {
  sessionStorage.removeItem('reloadPage');
  window.parent.location.reload();
}

function showPageReloadDialog() {
  //const dialog = top.TYPO3.Modal.confirm("For all changes to take effect, the page must be reloaded once. Should the page be reloaded now?");
  const dialog = confirm("For all changes to take effect, the page must be reloaded once. Should the page be reloaded now?");
  if (dialog) {
    reloadPage();
  }
}

function initSaveSettings() {
  const $saveButton = document.querySelector(".btn[name='data[save]']");
  if(!!$saveButton) {
    $saveButton.onclick = setReloadTrigger;
  }
}

function setReloadTrigger() {
  sessionStorage.setItem('reloadPage', 'true');
}

function initSettingsGroupToggle() {
  document.querySelectorAll('.enba-uc-group__header').forEach(groupHeader => {
    groupHeader.addEventListener('click', function() {
      groupHeader.closest('.enba-uc-group').classList.toggle('enba-uc-group--collapsed');
    });
  });
}

export default function InitUserSettings() {
  initSaveSettings();
  initSettingsGroupToggle();

  if(!!sessionStorage.getItem('reloadPage')) {
    showPageReloadDialog();
  }
}
