<?php

namespace DMF\EnhancedBackend\Service;

class IconService
{
    public function __construct()
    {
        if (!$GLOBALS['BE_USER']) {
            \TYPO3\CMS\Core\Core\Bootstrap::initializeBackendUser();
        }
    }

    public function setIcons(): array
    {
        //TODO: ersetze direkte Prüfung durch FeatureService
        if ($GLOBALS['BE_USER']->uc['enba_global__enhancedIcons']) {
            return [
                ### TOOLBAR
                # Sidebar toggle
                'actions-menu' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Caret-double-left.svg',
                ],
                # bookmark
                'apps-toolbar-menu-shortcut' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Bookmark.svg',
                ],
                # bookmark
                'actions-system-shortcut-new' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Bookmark.svg',
                ],
                # cache
                'apps-toolbar-menu-cache' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Eraser.svg',
                ],
                # cache frontend in toolbar
                'actions-system-cache-clear-impact-low' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Eraser.svg',
                ],
                # cache frontend in toolbar
                'actions-system-cache-clear-impact-high' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Eraser.svg',
                ],
                # cache on page module
                'actions-system-cache-clear' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Eraser.svg',
                ],
                # help
                'apps-toolbar-menu-help' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Question.svg',
                ],
                # system info default
                'system-information-toolbar-item' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Info.svg',
                ],
                # system info open if any log is available
                'actions-system-list-open' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Info.svg',
                ],
            ];
        }
        return [];
    }

}
