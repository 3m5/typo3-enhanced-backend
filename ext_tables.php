<?php

use DMF\EnhancedBackend\Hooks\BackendStyles;
use DMF\EnhancedBackend\Service\BackendUserService;
use TYPO3\CMS\Core\Utility\GeneralUtility;

defined('TYPO3') || die();

(function () {
    // Extend user settings
    $backendUserService = GeneralUtility::makeInstance(BackendUserService::class);
    $backendUserService->addFieldsToUserSettings();

    // Add frontend files and body classes
    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_pagerenderer.php']['render-preProcess'][] = BackendStyles::class . '->addEnBaFrontendFiles';
})();
