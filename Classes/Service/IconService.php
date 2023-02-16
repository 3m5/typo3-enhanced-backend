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
        if ($GLOBALS['BE_USER']->uc['enba-global__enhancedIcons']) {

            return [
                ### SIDEBAR
                # Sidebar toggle
                'actions-menu' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Caret-double-left.svg',
                ],
                ### TOPBAR
                # bookmark
                'apps-toolbar-menu-shortcut' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Bookmark-simple.svg',
                ],
                # bookmark
                'actions-system-shortcut-new' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Bookmark-simple.svg',
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
                # help
                'apps-toolbar-menu-help' => [
                    // icon provider class
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Question.svg',
                ],
                # system info default
                'system-information-toolbar-item' => [
                    // icon provider class
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Info.svg',
                ],
                # system info open if any log is available
                'actions-system-list-open' => [
                    // icon provider class
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Info.svg',
                ],
                ### TOOLBAR
                # cache on page module
                'actions-system-cache-clear' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Eraser.svg',
                ],
                # view page in new tab
                'actions-view-page' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/ArrowSquareOut.svg',
                ],
                # edit page properties
                'actions-page-open' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/NotePencil.svg',
                ],
                # copy page url
                'actions-link' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Link.svg',
                ],
                ### PAGE TREE
                # create new page
                'apps-pagetree-page-default' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/FilePlus.svg',
                ],
                # create new folder
                'apps-pagetree-folder-default' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/FolderPlus.svg',
                ],
                # add bin
                'apps-pagetree-page-recycler' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Trash.svg',
                ],
                # add menu separator
                'apps-pagetree-spacer' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Divide.svg',
                ],
                # add link to external url
                'apps-pagetree-page-shortcut-external' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/LinkSimple.svg',
                ],
                # add mount point
                'apps-pagetree-page-mountpoint' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/FlagBanner.svg',
                ],
                # add shortcut
                'apps-pagetree-page-shortcut' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/ArrowBendUpRight.svg',
                ],
                # add backend user section
                'apps-pagetree-page-backend-users' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/LockKeyOpen.svg',
                ],
                # edit pencil
                'actions-open' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Pencil.svg',
                ],
                # edit trash
                'actions-edit-delete' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Trash.svg',
                ],
                ### TOOL BAR
                # edit save
                'actions-document-save' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/FloppyDisk.svg',
                ],
                # close
                'actions-close' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/X.svg',
                ],
                # add
                'actions-add' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Plus.svg',
                ],
                # view
                'actions-view' => [
                    'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    'source' => 'EXT:enhanced-backend/Resources/Public/Icons/Eye.svg',
                ],

            ];
        }
        return [];
    }

}