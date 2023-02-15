<?php

declare(strict_types=1);

namespace DMF\EnhancedBackend\Hooks;

use DMF\EnhancedBackend\Service\BackendUserService;
use DMF\EnhancedBackend\Service\FeatureService;
use DMF\EnhancedBackend\Utility\BackendUtility;
use TYPO3\CMS\Core\Page\PageRenderer;
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
    protected FeatureService $featureService;

    public function addEnBaFrontendFiles()
    {
        // Apply css/js and body classes only for backend
        if(!BackendUtility::isBackendRequest()) {
            return;
        }

        $this->featureService = GeneralUtility::makeInstance(FeatureService::class);
        $pageRenderer = GeneralUtility::makeInstance(PageRenderer::class);
        $pageRenderer->addCssFile($this->getDefaultCssFile());
        $pageRenderer->addJsFile(
            GeneralUtility::getFileAbsFileName($this->getDefaultJsFile()),
            'text/javascript',
            false,
            false,
            '',
            true,
            '|',
            false,
            ''
        );
        $bodyCssClasses = $this->getCssBodyClasses();
        $htmlTag = $pageRenderer->getHtmlTag();
        $newHtmlTag = $this->addClassestoHtml(
            $htmlTag,
            implode(' ', $bodyCssClasses)
        );
        $pageRenderer->setHtmlTag($newHtmlTag);
    }

    private function getDefaultCssFile()
    {
        return GeneralUtility::getFileAbsFileName('EXT:enhanced-backend/Resources/Public/Styles/Vanilla.css');
    }

    private function getDefaultJsFile()
    {
        return GeneralUtility::getFileAbsFileName('EXT:enhanced-backend/Resources/Public/JavaScript/Features.js');
    }

    private function getCssBodyClasses(): array
    {
        // Default body class
        $bodyCssClasses = [
            BackendUserService::FIELD_NAME_PREFIX
        ];

        // Feature based body classes
        foreach ($this->featureService->getAllActiveFeatures() as $feature) {
            $bodyCssClasses[] = $feature->getId();
        }
        return $bodyCssClasses;
    }

    /**
     * @param $htmlTag
     * @param $bodyCssClasses
     * @return array|string|string[]
     */
    private function addClassestoHtml($htmlTag, $bodyCssClasses)
    {
        return str_replace('<html ', '<html class="' . $bodyCssClasses . '" ', $htmlTag);
    }
}
