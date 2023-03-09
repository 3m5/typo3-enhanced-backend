function reloadPage() {
  sessionStorage.removeItem('reloadPage');
  window.parent.location.reload();
}

function showPageReloadDialog() {
  const dialog = confirm("For all changes to take effect, the page must be reloaded once. Should the page be reloaded now?");
  if (dialog) {
    reloadPage();
  }
}

function initSaveSettings() {
  const iframe = document.querySelector('#typo3-contentIframe');
  const $saveButton = iframe.contentWindow.document.querySelector(".btn[name='data[save]']");
  if(!!$saveButton) {
    $saveButton.onclick = setReloadTrigger();
  }

  document.querySelector('#typo3-contentIframe').addEventListener('load', (event) => {
    if(!!sessionStorage.getItem('reloadPage')) {
      showPageReloadDialog();
    }
  });
}

function setReloadTrigger() {
  sessionStorage.setItem('reloadPage', 'true');
}

function toggleGroup() {

}

function initSettingsGroupToggle() {
  const contentArea = document.querySelector('#typo3-contentIframe');
  contentArea.contentWindow.document.querySelectorAll('.enba-uc-group__header').forEach(groupHeader => {
    console.log(groupHeader);
    groupHeader.addEventListener('click', function() {
      groupHeader.closest('.enba-uc-group').classList.toggle('enba-uc-group--collapsed');
    });
  });
}

export default function InitUserSettings() {
  const iframe = document.querySelector('#typo3-contentIframe');
  if (iframe == null) {
    window.setTimeout(InitUserSettings, 500);
  } else {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    if (iframeDoc.readyState === 'complete') {
      initSaveSettings();
      initSettingsGroupToggle();
    } else {
      window.setTimeout(InitUserSettings, 500);
    }
  }
}
