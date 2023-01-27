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
     * Add inline css if needed
     *
     * todo remove
     *
     * @param array $params
     * @param Typo3BackendController $backendController
     * @return void
     */
    public function renderPreProcess(array &$params, Typo3BackendController &$backendController): void
    {
    }

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
        $themeService = GeneralUtility::makeInstance(ThemeService::class);
        if ($themeService->isCustomActive()) {
            $bodyClasses = implode('', [
                'enbe-theme enbe-theme--custom'
            ]);
            // TODO add existence check of replaceable html tag for adding class
            $params['content'] = preg_replace('~<html~', '<html class="' . $bodyClasses . '"', $params['content']);
        }
        // TODO Add Service for getting classes of user-settings

    }
}
