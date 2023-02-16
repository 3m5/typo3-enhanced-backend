<?php

declare(strict_types=1);

namespace DMF\EnhancedBackend\Factory;

use DMF\EnhancedBackend\Model\Feature;
use DMF\EnhancedBackend\Model\Group;
use DMF\EnhancedBackend\Service\BackendUserService;
use TYPO3\CMS\Core\Configuration\Loader\YamlFileLoader;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Persistence\ObjectStorage;

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
 * Generates Feature models based on user settings and configuration
 */
class FeatureFactory
{
    public function __construct() {

    }

    /**
     * @return void
     */
    public function create():array {
        $features = [];
        if ($groups = $this->getConfigByYaml()['groups']) {
            foreach ($groups as $groupId => $groupConfig) {
                $group = new Group();
                // TODO add to construct
                $group->setId($groupId);
                if($groupTitle = $groupConfig['title']) {
                    $group->setTitle($groupTitle);
                }
                if($groupDescription = $groupConfig['description']) {
                    $group->setDescription($groupDescription);
                }

                if ($featuresConfig = $groupConfig['features']) {
                    foreach ($featuresConfig as $featureConfig) {
                        // TODO add to construct
                        $feature = new Feature();
                        $featureId = BackendUserService::FIELD_NAME_PREFIX . '-' . $groupId . '__' . $featureConfig['id'];
                        $feature->setId($featureId);
                        $feature->setGroup($group);
                        $feature->setTitle($featureConfig['title']);
                        $feature->setDescription($featureConfig['description']);
                        $feature->setPresets($featureConfig['preset']);
                        $feature->setType($featureConfig['type']);
                        $features[$featureId] = $feature;
                    }
                }
            }
        }

        return $features;
    }

    /**
     * TODO add custom service for parsing configurations
     *
     * @return array
     */
    private function getConfigByYaml():array {
        $yamlFileLoader = GeneralUtility::makeInstance(YamlFileLoader::class);
        return $yamlFileLoader->load(BackendUserService::YAML_CONFIG_FILE);
    }

}