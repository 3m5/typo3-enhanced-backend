<?php

namespace DMF\EnhancedBackend\Hooks;

use DMF\EnhancedBackend\Service\FeatureService;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class EnhancedSvgIconProvider extends \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider
{
    private ?FeatureService $featureService =null;

    public function prepareIconMarkup(Icon $icon, array $options = []): void
    {
        if($this->isUsingEnhancedIcons($icon->getIdentifier()))
        {
            $options['source'] = $this->featureService->getEnhancedIconById($icon->getIdentifier());
        }
        parent::prepareIconMarkup($icon, $options);
    }

    private function isUsingEnhancedIcons(string $iconId)
    {
            if(!$this->featureService instanceof FeatureService)
            {
                $this->featureService = GeneralUtility::makeInstance(FeatureService::class);
            }
            return $this->featureService->isActiveFeatureById('enba-global__enhancedIcons') &&
                        $this->featureService->isEnhancedIconAvalibleById($iconId);
    }

}
