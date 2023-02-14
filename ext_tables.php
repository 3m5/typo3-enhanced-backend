<?php

use DMF\EnhancedBackend\Service\BackendUserService;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3_MODE') || die();

(static function () {

    BackendUserService::addFieldsToUsersettings();


    /**
     * Theme selection
     * Add custom theme selection to backend
     *
     * @see https://docs.typo3.org/m/typo3/reference-coreapi/10.4/en-us/Configuration/UserSettingsConfiguration/Extending.html#user-settings-extending
     */
    $GLOBALS['TYPO3_USER_SETTINGS']['columns']['tx_enhancedbackend_theme'] = [
        'label' => 'LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme',
        'description' => 'LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.description',
        'type' => 'user',
        'userFunc' => \DMF\EnhancedBackend\Utility\ThemeUtility::class . '->render',
        'items' => [
            'default' => [
                'label' => 'LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.default',
                'description' => 'LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.default.description',
                'image' => 'EXT:enhanced-backend/Resources/Public/Images/default.png',
            ],
            \DMF\EnhancedBackend\Service\ThemeService::THEME_NAME_VANILLA => [
                'label' => 'LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.vanilla',
                'description' => 'LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.vanilla.description',
                'image' => 'EXT:enhanced-backend/Resources/Public/Images/vanilla.png',
            ],
            \DMF\EnhancedBackend\Service\ThemeService::THEME_NAME_MODERN => [
                'label' => 'LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.modern',
                'description' => 'LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.modern.description',
                'image' => 'EXT:enhanced-backend/Resources/Public/Images/modern.png',
            ],
            \DMF\EnhancedBackend\Service\ThemeService::THEME_NAME_CUSTOM => [
                'label' => 'LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.custom',
                'description' => 'LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.custom.description',
                'image' => 'EXT:enhanced-backend/Resources/Public/Images/custom.png',
            ],
        ],
    ];



    /**
     * Dark mode
     *
     * Add dark mode single select
     */
    $GLOBALS['TYPO3_USER_SETTINGS']['columns'][BackendUserService::FIELD_NAME_DARKMODE] = [
        'label' => 'LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.darkmode',
        'type' => 'select',
        'renderType' => 'selectSingle',
        'items' => [
            BackendUserService::FIELD_VALUE_LIGHTMODE => "Light",
            BackendUserService::FIELD_VALUE_DARKMODE => "Darkmode",
            BackendUserService::FIELD_VALUE_SYSTEMMODE => 'System'
        ],
    ];

    ExtensionManagementUtility::addFieldsToUserSettings(
        'tx_enhancedbackend_active, tx_enhancedbackend_theme, '. BackendUserService::FIELD_NAME_DARKMODE,
        'after:avatar'
    );

    // TODO add comment what this thing is doing :D
    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_pagerenderer.php']['render-preProcess'][] = \DMF\EnhancedBackend\Hooks\BackendStyles::class.'->addT3EnBeFiles';

})();
