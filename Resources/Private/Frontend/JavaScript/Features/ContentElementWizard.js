function addTooltip() {
  window.parent.document.querySelectorAll('.t3js-media-new-content-element-wizard').forEach(function(contentElementButton) {
    let tooltipContent = contentElementButton.querySelector('.media-body');
    if(!!tooltipContent) {
      tooltipContent = tooltipContent.cloneNode(true);
      tooltipContent.classList.remove('media-body');
      tooltipContent.classList.add('tooltip__content');
      const tooltip = document.createElement('div');
      tooltip.classList.add('enba-tooltip');
      tooltip.insertAdjacentHTML("afterbegin",'<img class="tooltip__icon" src="/typo3conf/ext/enhanced_backend/Resources/Public/Icons/Info.svg" width="20" height="20" />');
      tooltip.insertAdjacentElement('afterend', tooltipContent);
      contentElementButton.insertAdjacentElement('afterbegin', tooltip);
    }
  });
}

export default function InitContentElementWizard() {
  document.querySelectorAll('typo3-backend-new-content-element-wizard-button').forEach(function(addContentElementButton) {
    addContentElementButton.addEventListener('click', function () {
      // TODO: Timer is a workaround for aplpha, it would be better to listen if contentelement wizard is loaed instead
      window.setTimeout(addTooltip, 1000);
    });
  });
}
