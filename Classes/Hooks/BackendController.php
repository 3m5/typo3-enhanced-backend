<?php

declare(strict_types=1);

namespace DMF\EnhancedBackend\Hooks;

use DMF\EnhancedBackend\Service\BackendUserService;
use DMF\EnhancedBackend\Service\ThemeService;
use TYPO3\CMS\Backend\Controller\BackendController as Typo3BackendController;
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

/**
 * Controller for manipulate backend with hooks, e.g. add css body classes
 */
class BackendController
{
    /**
     * Hook after rendering the backend content (html) completely
     *
     * Used to set body classes based on user settings
     *
     * @param array $params
     * @param Typo3BackendController $backendController
     * @return void
     */
    public function renderPostProcess(array &$params, Typo3BackendController &$backendController): void
    {
        $bodyClasses = [];
        $themeService = GeneralUtility::makeInstance(ThemeService::class);
        if($themeService->isAnyThemeSelected())
        {
            $bodyClasses[] = 'enbe';
            if ($themeService->isCustomActive()) {
                $bodyClasses[] = 'enbe-theme';
                $bodyClasses[] = 'enbe-theme--custom';
            }
        }

        // Darkmode(s)
        if($themeService->isDarkModeEnabled()) {
            $bodyClasses[] = 'color-mode--dark';
        }
        if($themeService->isLightModeEnabled()) {
            $bodyClasses[] = 'color-mode--light';
        }
        if($themeService->isLSystemModeEnabled()) {
            $bodyClasses[] = 'color-mode--system';
        }

        // Apply css classes to body
        if(count($bodyClasses) > 0) {
            $params['content'] = preg_replace('~<html~', '<html class="' . implode(' ', $bodyClasses) . '"', $params['content']);
        };



    }
}
