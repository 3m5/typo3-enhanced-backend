<?php

defined('TYPO3_MODE') || die();

(static function () {
    // Add stylesheet directories to backend (just an example for now)
    $GLOBALS['TBE_STYLES']['skins']['enhanced_backend']['stylesheetDirectories']['basic'] = 'EXT:enhanced_backend/Resources/Public/Styles/';

    // Extend user settings in backend
    // TODO add items
    // TODO configure image select
    $GLOBALS['TYPO3_USER_SETTINGS']['columns']['tx_enhancedbackend_theme'] = [
      'label' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang.xlf:theme',
      'type' => 'select',
      'renderType' => 'selectSingle',
      'items' => [

      ],
    ];
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToUserSettings(
      'tx_enhancedbackend_theme',
      'before:edit_RTE'
    );
})();
