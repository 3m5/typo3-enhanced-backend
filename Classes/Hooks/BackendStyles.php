<?php

declare(strict_types=1);

namespace DMF\EnhancedBackend\Hooks;

use DMF\EnhancedBackend\Service\FeatureService;
use DMF\EnhancedBackend\Utility\BackendUtility;
use TYPO3\CMS\Backend\Controller\BackendController as Typo3BackendController;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Add frontend relevant features to the backend, e.g. adding css classes or assets
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
    /**
     * Add assets to page renderer
     *
     * @return void
     */
    public function addEnBaFrontendFiles()
    {
        if (!BackendUtility::isBackendRequest()) {
            return;
        }
        if (BackendUtility::isCliRequest()) {
            return;
        }

        $pageRenderer = GeneralUtility::makeInstance(PageRenderer::class);
        $pageRenderer->addCssFile($this->getDefaultCssFile());
        $pageRenderer->addJsFile(
            GeneralUtility::getFileAbsFileName($this->getDefaultJsFile()),
            'text/javascript',
            false,
            true,
            '',
            true,
        );
    }

    private function getDefaultCssFile(): string
    {
        return GeneralUtility::getFileAbsFileName('EXT:enhanced_backend/Resources/Public/Styles/Features.css');
    }

    private function getDefaultJsFile(): string
    {
        return GeneralUtility::getFileAbsFileName('EXT:enhanced_backend/Resources/Public/JavaScript/Features.js');
    }
}
