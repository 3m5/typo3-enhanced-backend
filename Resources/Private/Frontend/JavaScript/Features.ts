import InitContentTree from "./Features/ContentTree";
import InitUserSettings from "./Features/UserSettings";
import InitEnbaClassNames from "./Features/EnbaClassNames";
import InitContentElementWizard from "./Features/ContentElementWizard";
import InitEnhancedLanguageVisualization from "./Features/EnhancedLanguageVisualization";

if (typeof window !== "undefined") {
  window.addEventListener('DOMContentLoaded', function() {
    // TODO: this if is for testing purpose only and should be removed!
    if(window.top === window) {
      //document.querySelector('html')?.classList.add('enba-global__enhancedFont', 'enba-global__enhancedScrollbars', 'enba-topbar__enhancedSearchWidget', 'enba-topbar__enhancedWidgetOrder', 'enba-sidebar__collapseButtonPosition', 'enba-sidebar__enhancedMenuUI', 'enba-pageTree__enhancedToolbarUI', 'enba-pageTree__enabledContentTree', 'enba-contentArea__enhancedOverviewUI', 'enba-contentArea__enhancedToolbar', 'enba-contentArea__enhancedEditingForm', 'enba-contentArea__enhancedLanguageVisualization', 'enba-contentArea__hideQuickPageTitleEdit', 'enba-contentElementWizard__enhancedToolbar', 'enba-contentElementWizard__enhancedUI');
      document.querySelector('html')?.classList.add('enba-topbar__enhancedSearchWidget', 'enba-topbar__enhancedWidgetOrder', 'enba-sidebar__collapseButtonPosition', 'enba-sidebar__enhancedMenuUI', 'enba-pageTree__enhancedToolbarUI', 'enba-pageTree__enabledContentTree', 'enba-contentArea__enhancedOverviewUI', 'enba-contentArea__enhancedToolbar', 'enba-contentArea__enhancedEditingForm', 'enba-contentArea__enhancedLanguageVisualization', 'enba-contentArea__hideQuickPageTitleEdit', 'enba-contentElementWizard__enhancedToolbar', 'enba-contentElementWizard__enhancedUI');
    }

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

        if(!!document.querySelector('.enba-contentArea__enhancedLanguageVisualization')) {
          InitEnhancedLanguageVisualization();
        }
      }
    }
  });
}
