<?php

use DMF\EnhancedBackend\Hooks\BackendStyles;
use DMF\EnhancedBackend\Service\BackendUserService;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;

defined('TYPO3') || die();

(function () {

    GeneralUtility::makeInstance(BackendUserService::class)->addFieldsToUserSettings();

    // Add frontend files (javascript, stylesheet)
    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_pagerenderer.php']['render-preProcess'][1678082377] = BackendStyles::class . '->addEnBaFrontendFiles';

    // Add css classes to doc root html element
    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['typo3/backend.php']['renderPostProcess'][1651606722] = BackendStyles::class . '->addEnBaCssClasses';
})();
