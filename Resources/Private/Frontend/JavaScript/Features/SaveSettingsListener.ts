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
  document.querySelectorAll('.enba-uc-group__header').forEach(groupHeader => {
    groupHeader.addEventListener('click', function() {
      groupHeader.closest('.enba-uc-group').classList.toggle('enba-uc-group--collapsed');
    });
  });
}

function uncheckAllFeatures() {
  document.querySelectorAll('.enba-uc__feature input[type="checkbox"]').forEach(function(featureCheckbox : HTMLInputElement) {
    featureCheckbox.checked = false
  });
}

function updateFeatures(selectedPreset) {
  switch(selectedPreset) {
    case 'custom':
      break;
    case 'vanilla':
      document.querySelectorAll('.enba-uc__feature input[type="checkbox"]').forEach(function(featureCheckbox : HTMLInputElement) {
        featureCheckbox.checked = featureCheckbox.dataset.presets.includes('vanilla');
      });
      break;
    case 'modern':
      document.querySelectorAll('.enba-uc__feature input[type="checkbox"]').forEach(function(featureCheckbox : HTMLInputElement) {
        featureCheckbox.checked = featureCheckbox.dataset.presets.includes('modern');
      });
      break;
    case 'none':
      uncheckAllFeatures();
      break;
  }
}

function setPreset(presetValue) {
  const checkbox = document.querySelector<HTMLInputElement>('[name="data[enba-presets]"][value="' + presetValue + '"]');
  if (checkbox) {
    checkbox.checked = true;
  }
}

function initPresets() {
  document.querySelectorAll('[name="data[enba-presets]"]').forEach(function(radioButton) {
    radioButton.addEventListener('click', function() {
      updateFeatures(this.getAttribute('value'));
    });
  });

  document.querySelectorAll('.enba-uc__feature input[type="checkbox"]').forEach(function(featureCheckbox) {
    featureCheckbox.addEventListener('change', function () {
      setPreset('custom');
    });
  });
}

export default function InitUserSettings() {
  initPresets();
  initSaveSettings();
  initSettingsGroupToggle();
  if(!!sessionStorage.getItem('reloadPage')) {
    showPageReloadDialog();
  }
}