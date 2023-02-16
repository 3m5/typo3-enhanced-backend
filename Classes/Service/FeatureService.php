<?php

declare(strict_types=1);

namespace DMF\EnhancedBackend\Service;

use DMF\EnhancedBackend\Factory\FeatureFactory;
use DMF\EnhancedBackend\Model\Feature;

/**
 *
 * This file is part of a 3m5. Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 *  (c) 2023 3m5. Media GmbH <jan.suchandt@3m5.de>
 *
 **/

/**
 * Managing features collected by configuration and user settings
 */
class FeatureService
{

    /**
     * @var FeatureFactory
     */
    protected FeatureFactory $featureFactory;

    /**
     * @var BackendUserService
     */
    protected BackendUserService $backendUserService;

    /**
     * @var Feature[]
     */
    protected array $features = [];

    public function __construct(FeatureFactory $featureFactory, BackendUserService $backendUserService)
    {
        $this->featureFactory = $featureFactory;
        $this->backendUserService = $backendUserService;
        $this->features = $featureFactory->create();
        $this->setActiveStatesByBackendUser();
    }

    private function setActiveStatesByBackendUser(): void
    {
        if (count($this->features) === 0) {
            return;
        }
        $userSettings = $this->backendUserService->getFeatureSettings();
        if (count($userSettings) === 0) {
            return;
        }
        foreach ($userSettings as $userSettingId => $userSettingValue) {
            $feature = $this->getFeatureById($userSettingId);
            if (!$feature) {
                continue;
            }
            $feature->setActive(
                $this->isActiveByType($feature, $userSettingValue)
            );
            if ($feature->isActive()) {
                $this->features[$feature->getId()] = $feature;
            }
        }
    }

    /**
     * Checks a feature by value to determine if is active
     *
     * @param Feature $feature
     * @param $value
     * @return bool
     */
    private function isActiveByType(Feature $feature, $value): bool
    {
        if ($feature->getType() === 'check' and $value === 1) {
            return true;
        }
        if ($feature->getType() === 'text' and $value !== '') {
            return true;
        }
        return false;
    }

    /**
     * Checks if a feature exists by id
     *
     * @param $featureId
     * @return bool
     */
    private function featureExists($featureId): bool
    {
        return array_key_exists($featureId, $this->features);
    }

    private function getFeatureById(string $id): ?Feature
    {
        if (!$this->featureExists($id)) {
            return null;
        }
        return $this->features[$id];
    }

    /**
     * Get all features which are active by user settings
     *
     * @return Feature[]
     */
    public function getAllActiveFeatures(): array
    {
        $activeFeatures = [];
        foreach ($this->features as $feature) {
            if ($feature->isActive()) {
                $activeFeatures[$feature->getId()] = $feature;
            }
        }

        return $activeFeatures;
    }

    /**
     * Get all available features
     *
     * @return array
     */
    public function getAllFeatures(): array
    {
        return $this->features;
    }

    /**
     * @param string $id
     * @return bool
     */
    public function isActiveFeatureById(string $id): bool
    {
        $feature = $this->getFeatureById($id);
        if (!$feature) {
            return false;
        }
        return $feature->isActive();
    }

}
