<?php
defined('TYPO3_MODE') || die();

(static function() {
    // Add stylesheet directories to backend (just an example for now)
    $GLOBALS['TBE_STYLES']['skins']['enhanced_backend']['stylesheetDirectories']['basic'] = 'EXT:enhanced_backend/Resources/Public/Styles/';
})();
