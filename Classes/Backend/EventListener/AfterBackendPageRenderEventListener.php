<?php

declare(strict_types = 1);

namespace DMF\EnhancedBackend\Backend\EventListener;

use DMF\EnhancedBackend\Service\FeatureService;
use TYPO3\CMS\Backend\Controller\Event\AfterBackendPageRenderEvent;
use TYPO3\CMS\Core\Utility\GeneralUtility;

final class AfterBackendPageRenderEventListener
{
    public function __invoke(AfterBackendPageRenderEvent $event): void
    {
        $featureService = GeneralUtility::makeInstance(FeatureService::class);
        $features = $featureService->getAllActiveFeatures();
        $bodyClasses = implode(' ', array_keys($features));
        $content = '<div class="'.$bodyClasses.'">'.  $event->getContent() . '</div>';
        $event->setContent($content);
    }
}
