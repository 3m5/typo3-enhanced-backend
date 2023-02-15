<?php

declare(strict_types=1);

namespace DMF\EnhancedBackend\Hooks;

use DMF\EnhancedBackend\Service\ThemeService;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 *
 * This file is part of a 3m5. Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 *  (c) 2022 3m5. Media GmbH <jan.suchandt@3m5.de>
 *
 **/
class BackendStyles
{

    public function addT3EnBeFiles()
    {
        $renderer = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Page\PageRenderer::class);
        $renderer->addJsFile(GeneralUtility::getFileAbsFileName('EXT:enhanced-backend/Resources/Public/JavaScript/Backend.js'), 'text/javascript', false, false, '', true, '|', false, '');

        $themeService = GeneralUtility::makeInstance(ThemeService::class);
        $bodyCssClasses = ['enbe'];
        $renderer->addCssFile(GeneralUtility::getFileAbsFileName('EXT:enhanced-backend/Resources/Public/Styles/Vanilla.css'));
        if ($themeService->isAnyThemeSelected()) {
            $bodyCssClasses[] = 'enbe-theme';
            switch ($themeService->getActiveThemeName()) {
                case ThemeService::THEME_NAME_VANILLA:
                    $renderer->addCssFile(GeneralUtility::getFileAbsFileName('EXT:enhanced-backend/Resources/Public/Styles/Vanilla.css'));
                    $bodyCssClasses[] = 'enbe-theme--vanilla';
                    break;
                case ThemeService::THEME_NAME_CUSTOM:
                    $renderer->addCssFile(GeneralUtility::getFileAbsFileName('EXT:enhanced-backend/Resources/Public/Styles/Custom.css'));
                    $bodyCssClasses[] = 'enbe-theme--custom';
                    break;
            }
        }

        $renderer->addCssFile(GeneralUtility::getFileAbsFileName('EXT:enhanced-backend/Resources/Public/Styles/Dark.css'));
        if ($themeService->isDarkModeEnabled()) {
            $bodyCssClasses[] = 'color-mode--dark';
        }
        if ($themeService->isLightModeEnabled()) {
            $bodyCssClasses[] = 'color-mode--light';
        }
        if ($themeService->isLSystemModeEnabled()) {
            $bodyCssClasses[] = 'color-mode--system';
        }

        $renderer->setHtmlTag($this->addClasstoHtml($renderer->getHtmlTag(), implode(' ', $bodyCssClasses)));
    }

    private function addClasstoHtml($htmltag, $class)
    {
        return str_replace($htmltag, '<html ', '<html class="' . $class . '" ');
    }

}
