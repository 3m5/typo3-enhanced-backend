import {featuresThatRequirePageReload} from "../Constants";

function reloadPage() {
  window.parent.location.reload();
}

/**
 * the dialog informs the user, that a page reload is necessary so that he knows what is going on here
 */
function showPageReloadDialog() {
  const dialog = confirm("For all changes to take effect, the page must be reloaded once. Should the page be reloaded now?");
  if (dialog) {
    reloadPage();
  }
}

function initSaveSettings() {
  const $saveButton = document.querySelector(".btn[name='data[save]']") as HTMLElement;
  if(!!$saveButton) {
    $saveButton.onclick = checkIfReloadIsNecessary;
  }
}

/**
 * compare origin feature values with new user settings and returns whether there is a change
 * @param a
 * @param b
 */
function compareFeatureArrays(a: { name: string, value: boolean }[], b: { name: string, value: boolean }[]): boolean {
  // sort arrays by name
  const sortedA = a.sort((x, y) => x.name.localeCompare(y.name));
  const sortedB = b.sort((x, y) => x.name.localeCompare(y.name));

  // compare each value for each name
  for (let i = 0; i < sortedA.length; i++) {
    if (sortedA[i].name !== sortedB[i].name || sortedA[i].value !== sortedB[i].value) {
      return false;
    }
  }

  return true;
}

/**
 * checks if a feature, that requires page reload, is changed
 * if yes, the page reload dialog is shown
 */
function checkIfReloadIsNecessary() {
  const newFeatureValues: {name: string, value: boolean}[] = [];
  featuresThatRequirePageReload.forEach(featureClassName => {
    newFeatureValues.push({name: featureClassName, value: !!document.querySelector<HTMLInputElement>('[name="data[' + featureClassName + ']"]')?.checked});
  });

  const originFeatureValues = sessionStorage.getItem('originFeatureValues');
  const parsedOriginFeatureValues = originFeatureValues ? JSON.parse(originFeatureValues) : [];
  if(!compareFeatureArrays(parsedOriginFeatureValues, newFeatureValues)) {
    setReloadTrigger();
  }
}

/**
 * to store all user settings correctly, we need to wait for TYPO3 saving everything and reload the settings iframe
 * then we can reload the page, if the trigger is set
 * if we would reload the page directly without this trigger, the user settings will not be stored correctly
 */
function setReloadTrigger() {
  sessionStorage.setItem('reloadPage', 'true');
}

/**
 * features are grouped in backend area groups for a better structure of the user settings
 * the user can toggle this backend area groups for a better focus
 */
function initSettingsGroupToggle() {
  document.querySelectorAll<HTMLElement>('.enba-uc-group__header').forEach(groupHeader => {
    groupHeader.addEventListener('click', function() {
      groupHeader.closest('.enba-uc-group')?.classList.toggle('enba-uc-group--collapsed');
    });
  });
}

/**
 * disables all features and shows the Original TYPO3 backend
 */
function uncheckAllFeatures() {
  document.querySelectorAll<HTMLInputElement>('.enba-uc__feature input[type="checkbox"]').forEach(function(featureCheckbox) {
    featureCheckbox.checked = false
  });
}

/**
 * if user chooses a preset, all features are toggled as defined in the Features.yaml
 * @param selectedPreset
 */
function updateFeatures(selectedPreset : string | null) {
  switch(selectedPreset) {
    case 'custom':
      break;
    case 'vanilla':
      document.querySelectorAll<HTMLInputElement>('.enba-uc__feature input[type="checkbox"]').forEach(function(featureCheckbox) {
        featureCheckbox.checked = !!featureCheckbox.dataset?.presets?.includes('vanilla');
      });
      break;
    case 'modern':
      document.querySelectorAll<HTMLInputElement>('.enba-uc__feature input[type="checkbox"]').forEach(function(featureCheckbox) {
        featureCheckbox.checked = !!featureCheckbox.dataset?.presets?.includes('modern');
      });
      break;
    case 'none':
      uncheckAllFeatures();
      break;
  }
}

function setPreset(presetValue : string) {
  const checkbox = document.querySelector<HTMLInputElement>('[name="data[enba-presets]"][value="' + presetValue + '"]');
  if (checkbox) {
    checkbox.checked = true;
  }
}

/**
 * if user chooses a preset, all features are toggled as defined in the Features.yaml
 * if user changes a feature, the preset is automatically set to 'Custom'
 */
function initPresets() {
  document.querySelectorAll<HTMLInputElement>('[name="data[enba-presets]"]').forEach(function(radioButton) {
    radioButton.addEventListener('click', function() {
      updateFeatures(this.getAttribute('value'));
    });
  });

  document.querySelectorAll<HTMLInputElement>('.enba-uc__feature input[type="checkbox"]').forEach(function(featureCheckbox) {
    featureCheckbox.addEventListener('change', function () {
      setPreset('custom');
    });
  });
}

/**
 * Classnames are set on every iframe immediately when a feature checkbox is toggled.
 * This way, the user gets faster feedback on what has changed.
 */
function initFeatureListener() {
  document.querySelectorAll<HTMLInputElement>('.enba-uc__feature input[type="checkbox"]').forEach(function(featureCheckbox) {
    featureCheckbox.addEventListener('change', function () {
      const featureClassName = featureCheckbox.getAttribute('name')?.replace(/^data\[|\]$/g, '');
      if(!!featureClassName && !featuresThatRequirePageReload.includes(featureClassName)) {
        if(featureCheckbox.checked) {
          document.querySelector('html')?.classList.add(featureClassName);
          window?.parent?.document?.querySelector('html')?.classList.add(featureClassName);
        } else {
          document.querySelector('html')?.classList.remove(featureClassName);
          window?.parent?.document?.querySelector('html')?.classList.remove(featureClassName);
        }
      }
    });
  });
}

/**
 * store initial values of every feature that requires page reload in session storage
 * if user saves his changes, initial values are compared to the new ones to check if page reload is necessary
 */
function storeInitialFeatureValues() {
  const featureValues: {name: string, value: boolean}[] = [];
  featuresThatRequirePageReload.forEach(featureClassName => {
    featureValues.push({name: featureClassName, value: !!document.querySelector<HTMLInputElement>('[name="data[' + featureClassName + ']"]')?.checked});
  });
  sessionStorage.setItem('originFeatureValues', JSON.stringify(featureValues))
}

export default function InitUserSettings() {
  if(!!sessionStorage.getItem('reloadPage')) {
    sessionStorage.removeItem('reloadPage')
    showPageReloadDialog();
  }
  initPresets();
  initSettingsGroupToggle();
  initFeatureListener();
  storeInitialFeatureValues();
  initSaveSettings();
}
