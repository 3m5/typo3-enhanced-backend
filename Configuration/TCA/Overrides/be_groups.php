<?php
defined('TYPO3') || die();

$tmpColumns = [
    'tx_enhancedbackend_themes' => [
        'label' => 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:be_groups.tx_enhancedbackend_themes',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectCheckBox',
            'items' => [],
            'itemsProcFunc' => \DMF\EnhancedBackend\Utility\ThemeUtility::class . '->itemsForBeGroup'
        ]
    ],
];

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('be_groups', $tmpColumns);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
    'be_groups',
    'tx_enhancedbackend_themes',
    '',
    'after:explicit_allowdeny'
);
