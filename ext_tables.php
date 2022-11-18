<?php

defined('TYPO3_MODE') || die();

(static function () {
    // Add stylesheet directories to backend (just an example for now)
    $GLOBALS['TBE_STYLES']['skins']['enhanced_backend']['stylesheetDirectories']['basic'] = 'EXT:enhanced_backend/Resources/Public/Styles/';

    // Extend user settings in backend
    // @see https://docs.typo3.org/m/typo3/reference-coreapi/10.4/en-us/Configuration/UserSettingsConfiguration/Extending.html#user-settings-extending
    // @see
    // TODO add items
    // TODO configure image select
    $GLOBALS['TYPO3_USER_SETTINGS']['columns']['tx_enhancedbackend_active'] = [
      'label' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang.xlf:user_settings.active',
      'type' => 'select',
      'renderType' => 'selectSingle',
      'items' => [
          0 => "disabled",
          1 => "enabled"
      ],
    ];
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToUserSettings(
      'tx_enhancedbackend_active',
      'before:edit_RTE'
    );

    if (TYPO3_MODE === 'BE') {
        $renderer = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Page\PageRenderer::class);
        //$renderer->addJsFile('enhanced_backend/Resources/Public/JavaScript/Backend.js', 'text/javascript', false, false, '', true, '|', false, '');
        $renderer->loadRequireJsModule(
            'Backend',
            "function() { document.querySelectorAll('[data-identifier=\"actions-add\"]').forEach(button => {
  button.setAttribute('title', 'Create new content element');
  button.parentNode.innerHTML = button.outerHTML;
}); }"
        );
    }
})();
