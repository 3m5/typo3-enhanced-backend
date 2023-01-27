<?php

use DMF\EnhancedBackend\Service\ThemeService;

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
      'label' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.active',
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
    $GLOBALS['TYPO3_USER_SETTINGS']['columns']['tx_enhancedbackend_theme'] = [
        'label' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme',
        'description' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.description',
        'type' => 'user',
        'userFunc' => \DMF\EnhancedBackend\Utility\ThemeUtility::class . '->render',
        'items' => [
            'default' => [
                'label' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.default',
                'description' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.default.description',
                'image' => 'EXT:enhanced_backend/Resources/Public/Images/default.png',
            ],
            ThemeService::THEME_NAME_VANILLA => [
                'label' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.vanilla',
                'description' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.vanilla.description',
                'image' => 'EXT:enhanced_backend/Resources/Public/Images/vanilla.png',
            ],
            ThemeService::THEME_NAME_MODERN => [
                'label' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.modern',
                'description' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.modern.description',
                'image' => 'EXT:enhanced_backend/Resources/Public/Images/modern.png',
            ],
            ThemeService::THEME_NAME_CUSTOM => [
                'label' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.modern',
                'description' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.modern.description',
                'image' => 'EXT:enhanced_backend/Resources/Public/Images/modern.png',
            ],
        ],
    ];
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToUserSettings(
        'tx_enhancedbackend_theme',
        'after:avatar'
    );
})();
