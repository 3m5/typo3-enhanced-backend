function reloadPage() {
  sessionStorage.removeItem('reloadPage');
  window.parent.location.reload();
}

function initContentAreaListener() {
  const iframe = document.querySelector('#typo3-contentIframe');

  if (iframe == null) {
    window.setTimeout(initContentAreaListener, 500);
  } else {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    if (iframeDoc.readyState === 'complete') {
      const $saveButton = iframe.contentWindow.document.querySelector(".btn[name='data[save]']");
      if(!!$saveButton) {
        $saveButton.onclick = setReloadTrigger();
      }

      document.querySelector('#typo3-contentIframe').addEventListener('load', (event) => {
        if(!!sessionStorage.getItem('reloadPage')) {
          window.setTimeout(reloadPage, 5000);
        }
      });
    } else {
      window.setTimeout(initContentAreaListener, 500);
    }
  }
}

function setReloadTrigger() {
  sessionStorage.setItem('reloadPage', 'true');
}

// TODO: show a dialog for reloading the page to inform user what is going on
export default function InitSaveSettingsListener() {
  initContentAreaListener();
}
