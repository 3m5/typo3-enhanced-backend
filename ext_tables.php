<?php

use DMF\EnhancedBackend\Hooks\BackendStyles;
use DMF\EnhancedBackend\Service\BackendUserService;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;

defined('TYPO3') || die();

(function () {
    // Extend user settings
    $GLOBALS['TYPO3_USER_SETTINGS']['columns']['tx_enhancedbackend_uc'] = [
        'label' => 'LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme',
        'description' => 'LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.description',
        'type' => 'user',
        'userFunc' => BackendUserService::class.'->renderUserConfig'
        ];

    ExtensionManagementUtility::addFieldsToUserSettings(
        '--div--;LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.enba.tab_label, tx_enhancedbackend_uc'
    );

    // Add frontend files (javascript, stylesheet)
    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_pagerenderer.php']['render-preProcess'][1678082377] = BackendStyles::class . '->addEnBaFrontendFiles';

    // Add css classes to doc root html element
    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['typo3/backend.php']['renderPostProcess'][1651606722] = BackendStyles::class . '->addEnBaCssClasses';
})();
