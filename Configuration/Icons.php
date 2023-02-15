<?php
return [
    ### SIDEBAR
    # Sidebar toggle
    'actions-menu' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Caret-double-left.svg',
    ],
    ### TOPBAR
    # bookmark
    'apps-toolbar-menu-shortcut' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Bookmark-simple.svg',
    ],
    # bookmark
    'actions-system-shortcut-new' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Bookmark-simple.svg',
    ],
    # cache
    'apps-toolbar-menu-cache' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Eraser.svg',
    ],
    # cache frontend in toolbar
    'actions-system-cache-clear-impact-low' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Eraser.svg',
    ],
    # cache frontend in toolbar
    'actions-system-cache-clear-impact-high' => [
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
    ### TOOLBAR
    # cache on page module
    'actions-system-cache-clear' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Eraser.svg',
    ],
    # view page in new tab
    'actions-view-page' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/ArrowSquareOut.svg',
    ],
    # edit page properties
    'actions-page-open' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/NotePencil.svg',
    ],
    # copy page url
    'actions-link' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Link.svg',
    ],
    ### PAGE TREE
    # create new page
    'apps-pagetree-page-default' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/FilePlus.svg',
    ],
    # create new folder
    'apps-pagetree-folder-default' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/FolderPlus.svg',
    ],
    # add bin
    'apps-pagetree-page-recycler' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Trash.svg',
    ],
    # add menu separator
    'apps-pagetree-spacer' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Divide.svg',
    ],
    # add link to external url
    'apps-pagetree-page-shortcut-external' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/LinkSimple.svg',
    ],
    # add mount point
    'apps-pagetree-page-mountpoint' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/FlagBanner.svg',
    ],
    # add shortcut
    'apps-pagetree-page-shortcut' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/ArrowBendUpRight.svg',
    ],
    # add backend user section
    'apps-pagetree-page-backend-users' => [
        // icon provider class
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        // the source SVG for the SvgIconProvider
        'source' => 'EXT:enhanced-backend/Resources/Public/Icons/LockKeyOpen.svg',
    ],
];
