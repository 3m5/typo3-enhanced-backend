import InitContentTree from "./Features/ContentTree";
import InitUserSettings from "./Features/SaveSettingsListener";
import InitEnbaClassNames from "./Features/EnbaClassNames";
import InitContentElementWizard from "./Features/ContentElementWizard";

window.addEventListener('load', (event) => {
  if (window.top === window) {
    // Code is only executed in main HTML
    InitContentTree();

  } else {
    // Code is executed in an iframe
    InitEnbaClassNames();

    // Code is executed in content area
    if(window.frameElement.id === 'typo3-contentIframe') {
      InitUserSettings();

      if(!!document.querySelector('.enba-contentElementWizard__enhancedUI')) {
        InitContentElementWizard();
      }
    }
  }
});
