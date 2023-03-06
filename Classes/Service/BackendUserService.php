<?php

declare(strict_types=1);

namespace DMF\EnhancedBackend\Service;

use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\SingletonInterface;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use Psr\Log\LoggerInterface;

/**
 * Service for handling backend user settings
 *
 * This file is part of a 3m5. Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 *  (c) 2023 3m5. Media GmbH <jan.suchandt@3m5.de>
 *
 **/
class BackendUserService implements SingletonInterface
{
    private LoggerInterface $logger;

    protected array $userSettings = [];

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    /**
     * Checks if a user settings belongs to EnBa by convention
     *
     * @param string $userSettingsId
     * @return bool
     */
    public static function isEnBaUserSettingById(string $userSettingsId): bool
    {
        return (preg_match('~' . FeatureService::FIELD_NAME_PREFIX . '-[A-Za-z_]+$~', $userSettingsId) === 1);
    }

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
     * Get all backend user settings
     *
     * @return array|null
     */
    public function getBackendUserSettings(): ?array
    {
        if (count($this->userSettings) > 0) {
            return $this->userSettings;
        }

        if (!$this->isBackendUserAvailable()) {
            $this->logger->warning('Try to get user settings without existing backend user');
            return [];
        }
        if (!$GLOBALS['BE_USER']->uc) {
            $this->logger->warning('Current backend user does not have any user settings in his UC');
            return [];
        }
        $this->userSettings = $GLOBALS['BE_USER']->uc;
        return $this->userSettings;
    }

    /**
     * @return bool
     */
    private function isBackendUserAvailable(): bool
    {
        return $GLOBALS['BE_USER'] instanceof BackendUserAuthentication;
    }

}
