import InitContentTree from "./Features/ContentTree";
import InitSaveSettingsListener from "./Features/SaveSettingsListener";

window.addEventListener('load', (event) => {
  InitSaveSettingsListener();

  if (window.top !== window) {
    // Code is executed in an iframe
  } else {
    // Code is only executed in main HTML
    InitContentTree();
  }
});
