<?php

declare(strict_types=1);

namespace DMF\EnhancedBackend\Service;

use DMF\EnhancedBackend\Factory\FeatureFactory;
use DMF\EnhancedBackend\Model\Feature;
use Psr\Log\LoggerAwareInterface;
use Psr\Log\LoggerAwareTrait;
use Psr\Log\LoggerInterface;
use TYPO3\CMS\Core\Configuration\Loader\YamlFileLoader;
use TYPO3\CMS\Core\SingletonInterface;
use TYPO3\CMS\Core\Utility\GeneralUtility;

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
class FeatureService implements SingletonInterface , LoggerAwareInterface
{
    use LoggerAwareTrait;
    public const FIELD_NAME_PREFIX = 'enba';
    public const YAML_CONFIG_FILE = 'EXT:enhanced-backend/Configuration/Yaml/Features.yaml';

    const YAML_ENHANCED_ICONS_FILE = 'EXT:enhanced-backend/Configuration/Yaml/Icons.yaml';
    /**
     * @var FeatureFactory
     */
    protected FeatureFactory $featureFactory;

    /**
     * @var BackendUserService|null
     */
    protected ?BackendUserService $backendUserService = null;

    /**
     * @var Feature[]
     */
    protected array $features = [];

    protected array $enhancedIcons = [];
    /**
     * @var bool
     */
    protected bool $activeByUserSettings = false;

    public function __construct()
    {
        $this->featureFactory = GeneralUtility::makeInstance(FeatureFactory::class);
        $this->features = $this->featureFactory->create();
    }

    /**
     * @return void
     */
    private function setActiveFeaturesByBackendUserSettings(): void
    {
        if (count($this->features) === 0) {
            $this->logger->debug('No Enba features available or not set');
            return;
        }

        $backendUserService = $this->getBackendUserService();
        $userSettings = $backendUserService->getBackendUserSettings();
        if (count($userSettings) === 0) {
            $this->logger->warning('Try to set active feature without backend user or user settings');
            return;
        }
        foreach ($userSettings as $userSettingId => $userSettingValue) {
            if (!BackendUserService::isEnBaUserSettingById($userSettingId)) {
                $this->logger->debug('UserSetting is not a enba-setting', [
                    'userSettingId' => $userSettingId,
                    'userSettingValue' => $userSettingValue,
                ]);
                continue;
            }
            $feature = $this->getFeatureById($userSettingId);
            if (!$feature) {
                $this->logger->warning('Try to get an feature by userSettingsId that not exists', [
                    'userSettingsId' => $userSettingId
                ]);
                continue;
            }
            // JSU I guess this can be shorter, better, more impressive ;)
            $feature->setActive(
                $this->isActiveByType($feature, $userSettingValue)
            );
            $this->features[$feature->getId()] = $feature;
        }
        // At end, mark as set active features by user settings
        $this->activeByUserSettings = true;
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
        // Check if features set to active by user settings of backend user
        if (!$this->activeByUserSettings) {
            $this->setActiveFeaturesByBackendUserSettings();
        }
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
        // Check if features set to active by user settings of backend user
        if (!$this->activeByUserSettings) {
            $this->setActiveFeaturesByBackendUserSettings();
        }
        $feature = $this->getFeatureById($id);
        if (!$feature) {
            return false;
        }
        return $feature->isActive();
    }

    /**
     * @return BackendUserService
     */
    private function getBackendUserService(): BackendUserService
    {
        if (!$this->backendUserService) {
            $this->backendUserService = GeneralUtility::makeInstance(BackendUserService::class);
        }
        return $this->backendUserService;
    }
    public function isEnhancedIconAvalibleById(string $id)
    {
        $this->logger->debug('IconId: '.$id);
        return array_key_exists($id,$this->getEnhancedIcons());
    }

    /**
     * @return array
     */
    public function getEnhancedIcons(): array
    {
        if(!count($this->enhancedIcons))
        {
            $this->enhancedIcons = $this->getEnhancedIconsByYaml();
        }

        return $this->enhancedIcons;
    }

    public function getEnhancedIconById(string $id)
    {
        return $this->getEnhancedIcons()[$id];
    }

    private function getEnhancedIconsByYaml():array {
        $yamlFileLoader = GeneralUtility::makeInstance(YamlFileLoader::class);
        return $yamlFileLoader->load(self::YAML_ENHANCED_ICONS_FILE);
    }



}
