<?php
return [
    ### TOOLBAR
    # Sidebar toggle
    'actions-menu' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Caret-double-left.svg',
    ],
    # bookmark
    'apps-toolbar-menu-shortcut' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Bookmark.svg',
    ],
    # cache
    'apps-toolbar-menu-cache' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Eraser.svg',
    ],
    # help
    'apps-toolbar-menu-help' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Question.svg',
    ],
    # system info default
    'system-information-toolbar-item' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Info.svg',
    ],
    # system info open if any log is available
    'actions-system-list-open' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Info.svg',
    ],
];
