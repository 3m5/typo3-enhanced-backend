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
  const $saveButton = document.querySelector(".btn[name='data[save]']") as HTMLElement;
  if(!!$saveButton) {
    $saveButton.onclick = setReloadTrigger;
  }
}

function setReloadTrigger() {
  sessionStorage.setItem('reloadPage', 'true');
}

function initSettingsGroupToggle() {
  document.querySelectorAll<HTMLElement>('.enba-uc-group__header').forEach(groupHeader => {
    groupHeader.addEventListener('click', function() {
      groupHeader.closest('.enba-uc-group')?.classList.toggle('enba-uc-group--collapsed');
    });
  });
}

function uncheckAllFeatures() {
  document.querySelectorAll<HTMLInputElement>('.enba-uc__feature input[type="checkbox"]').forEach(function(featureCheckbox) {
    featureCheckbox.checked = false
  });
}

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
      if(!!featureClassName) {
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

export default function InitUserSettings() {
  initPresets();
  initSaveSettings();
  initSettingsGroupToggle();
  initFeatureListener();
  if(!!sessionStorage.getItem('reloadPage')) {
    showPageReloadDialog();
  }
}
