function toggleTooltip(tooltip : HTMLElement) {
  tooltip.classList.toggle('tooltip--active');
}

function addTooltip() {
  window.parent.document.querySelectorAll('.t3js-media-new-content-element-wizard').forEach(function(contentElementButton) {
    let tooltipContent = contentElementButton?.querySelector('.media-body')?.cloneNode(true) as HTMLElement;
    if(!!tooltipContent) {
      tooltipContent.removeChild(tooltipContent.querySelector('br') as ChildNode);
      tooltipContent.removeChild(tooltipContent.querySelector('strong') as ChildNode);
    }

    if(!!tooltipContent && !!tooltipContent.innerText.replace(/\n|\r|\W/g, "").length) {
      tooltipContent.classList.remove('media-body');
      tooltipContent.classList.add('tooltip__content');
      const tooltip = document.createElement('div');
      tooltip.classList.add('enba-tooltip');
      tooltip.insertAdjacentElement('afterbegin', tooltipContent);
      tooltip.insertAdjacentHTML("afterbegin",'<img class="tooltip__icon" src="/typo3conf/ext/enhanced_backend/Resources/Public/Icons/Info.svg" width="18" height="18" />');

      tooltip?.querySelector('.tooltip__icon')?.addEventListener('click', function() {
        toggleTooltip(tooltip);
      });
      contentElementButton.insertAdjacentElement('afterbegin', tooltip);
    }
  });
}

function contentWizardReadyListener() {
  if(window.parent.document.querySelector('.t3-new-content-element-wizard-window')) {
    addTooltip();
  } else {
    window.setTimeout(contentWizardReadyListener, 500);
  }
}

export default function InitContentElementWizard() {
  document.querySelectorAll('typo3-backend-new-content-element-wizard-button').forEach(function(addContentElementButton) {
    addContentElementButton.addEventListener('click', function () {
      contentWizardReadyListener();
    });
  });
}
