<?php

use DMF\EnhancedBackend\Hooks\BackendStyles;
use DMF\EnhancedBackend\Service\BackendUserService;

defined('TYPO3') || die();

(static function () {

    // Extend user settings
    BackendUserService::addFieldsToUserSettings();

    // Add frontend files and body classes
    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_pagerenderer.php']['render-preProcess'][] = BackendStyles::class.'->addEnBaFrontendFiles';

})();
