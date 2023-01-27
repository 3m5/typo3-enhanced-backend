<?php
// Prevent Script from being called directly
use DMF\EnhancedBackend\Hooks\BackendController;

defined('TYPO3_MODE') || die();

// Hook for adding css classes to the html tag in backend like modernizr does
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['typo3/backend.php']['renderPostProcess'][1651606722] =
    BackendController::class . '->renderPostProcess';


