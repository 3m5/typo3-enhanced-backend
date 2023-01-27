<?php

defined('TYPO3_MODE') || die();

(static function () {

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
            \DMF\EnhancedBackend\Service\ThemeService::THEME_NAME_VANILLA => [
                'label' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.vanilla',
                'description' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.vanilla.description',
                'image' => 'EXT:enhanced_backend/Resources/Public/Images/vanilla.png',
            ],
            \DMF\EnhancedBackend\Service\ThemeService::THEME_NAME_MODERN => [
                'label' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.modern',
                'description' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.modern.description',
                'image' => 'EXT:enhanced_backend/Resources/Public/Images/modern.png',
            ],
            \DMF\EnhancedBackend\Service\ThemeService::THEME_NAME_CUSTOM => [
                'label' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.custom',
                'description' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.custom.description',
                'image' => 'EXT:enhanced_backend/Resources/Public/Images/custom.png',
            ],
        ],
    ];
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToUserSettings(
        'tx_enhancedbackend_theme',
        'after:avatar'
    );

    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_pagerenderer.php']['render-preProcess'][] = \DMF\EnhancedBackend\Hooks\BackendStyles::class.'->addT3EnBeFiles';

})();
