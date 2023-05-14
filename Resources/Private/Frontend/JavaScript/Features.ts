import InitContentTree from "./Features/ContentTree";
import InitUserSettings from "./Features/UserSettings";
import InitEnbaClassNames from "./Features/EnbaClassNames";
import InitContentElementWizard from "./Features/ContentElementWizard";

if (typeof window !== "undefined") {
  window.addEventListener('DOMContentLoaded', function() {
    // Code is executed in an iFrame
    if (window.parent !== window) {
      InitEnbaClassNames();
    }
  });


  window.addEventListener('load', (event) => {
    // Code is only executed in main HTML
    if (window.top === window) {
      InitContentTree();
    }
    // Code is executed in an iframe
    else {
      // Code is executed in content area
      if (window.frameElement?.id === 'typo3-contentIframe') {
        InitUserSettings();

        if (!!document.querySelector('.enba-contentElementWizard__enhancedUI')) {
          InitContentElementWizard();
        }
      }
    }
  });
}
