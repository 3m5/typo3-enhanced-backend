<?php

declare(strict_types=1);

namespace DMF\EnhancedBackend\Service;

use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\Core\Bootstrap;
use TYPO3\CMS\Core\SingletonInterface;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
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
 * Service for handling backend user settings
 */
class BackendUserService implements SingletonInterface
{
    // TODO move to more central place
    public const FIELD_NAME_PREFIX = 'enba';
    public const FIELD_NAME_PRESET = self::FIELD_NAME_PREFIX . '_preset';
    public const YAML_CONFIG_FILE = 'EXT:enhanced-backend/Configuration/Yaml/Features.yaml';

    protected array $userSettings = [];

    /**
     * Add custom EnBa user settings
     *
     * @return void
     */
    public function addFieldsToUserSettings()
    {
        $featureService = GeneralUtility::makeInstance(FeatureService::class);
        $featureIds = [];
        foreach ($featureService->getAllFeatures() as $feature) {
            $GLOBALS['TYPO3_USER_SETTINGS']['columns'][$feature->getId()] = [
                'label' => $feature->getTitle(),
                // Not available at the moment in TCA user settings (Allowed values: button, check, password, select, text, user)
                //  https://docs.typo3.org/m/typo3/reference-coreapi/main/en-us/Configuration/UserSettingsConfiguration/Columns.html
                'description' => $feature->getDescription(),
                'type' => $feature->getType()
            ];
            $featureIds[] = $feature->getId();
        }
        ExtensionManagementUtility::addFieldsToUserSettings(
            '--div--;LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.enba.tab_label,' . implode(',', $featureIds)
        );
    }

    /**
     * Get all active features by user settings of backend user for EnBa
     *
     * @return array
     */
    public function getFeatureSettings(): array
    {
        $allBeUserSettings = $this->getBackendUserSettings();
        if (!$allBeUserSettings || count($allBeUserSettings) === 0) {
            return [];
        }

        $featureSettings = [];
        foreach ($allBeUserSettings as $userSettingIdentifier => $userSetting) {
            if (!$this->isEnbaUserSettingById($userSettingIdentifier)) {
                $featureSettings[$userSettingIdentifier] = $userSetting;
            }
        }

        return $featureSettings;
    }

    /**
     * Get all backend user settings
     *
     * @return array|null
     */
    private function getBackendUserSettings(): ?array
    {

        if(count($this->userSettings) > 0) {
            return $this->userSettings;
        }
        if (!$this->isBackendUserAvailable()) {
            // TODO THIS IS AN WORKAROUND because the at some point the be user is not initialized
            Bootstrap::initializeBackendUser();
            if (!$this->isBackendUserAvailable()) {
                return [];
            }
        }
        $this->userSettings = $GLOBALS['BE_USER']->uc;
        return $this->uc;
    }

    /**
     * @return bool
     */
    private function isBackendUserAvailable(): bool
    {
        return $GLOBALS['BE_USER'] instanceof BackendUserAuthentication;
    }

    /**
     * Checks if a user settings belongs to EnBa by convention
     *
     * @param string $userSettingsId
     * @return bool
     */
    private function isEnBaUserSettingById(string $userSettingsId): bool
    {
        return (preg_match('~' . self::FIELD_NAME_PREFIX . '-[A-Za-z_]+$~', $userSettingsId) !== 1);
    }

}
