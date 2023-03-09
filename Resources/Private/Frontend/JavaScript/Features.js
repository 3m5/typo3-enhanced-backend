import InitContentTree from "./Features/ContentTree";
import InitSaveSettingsListener from "./Features/SaveSettingsListener";
import InitEnbaClassNames from "./Features/EnbaClassNames";

window.addEventListener('load', (event) => {
  if (window.top === window) {
    // Code is only executed in main HTML
    InitContentTree();
    InitSaveSettingsListener();

  } else {
    // Code is executed in an iframe
    InitEnbaClassNames();
  }
});
