<?php

declare(strict_types=1);

namespace DMF\EnhancedBackend\Service;

use DMF\EnhancedBackend\Model\Feature;
use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\Core\Bootstrap;
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

    }

    public function renderUserConfig()
    {
        $featureService = GeneralUtility::makeInstance(FeatureService::class);
        $html = ['<div>'];
        $groupId = '';
        $groupClose = '';
        foreach ($featureService->getAllFeatures() as $feature) {
            if($groupId != $feature->getGroup()->getId())
            {
                $html[] = $groupClose.'<div class="form-group t3js-formengine-field-item">';
                $html[] = '<h3>'.$feature->getGroup()->getTitle().'</h3>';
                if($description = $feature->getGroup()->getDescription())
                {
                    $html[] = '<p>'.$description.'</p>';
                }
                $groupClose = '</div>';
                $groupId = $feature->getGroup()->getId();
            }
            $html [] = $this->renderFeature($feature);
        }
        $html[] = '</div>';

        return implode('', $html);
    }

    private function renderFeature(Feature $feature)
    {
        $html = ['<label class="enba-uc__feature">'];
        switch ($feature->getType())
        {
            case 'check':
                $checked = $feature->isActive() ? 'checked="checked"': '';
                // TODO:  $this->getLanguageService()->sL() nutzen
                $html[] = '<span>'.$feature->getTitle().'</span>';
                $fieldId = 'tx_enhancedbackend_uc_'.$feature->getId();
                $html[] = '<div class="form-check form-switch"><input type="checkbox" id="field_'.$fieldId.'" class="form-check-input" name="data[\'tx_enhancedbackend_uc\'][\''.$feature->getId().'\']" '.$checked.'></div>';
                break;
            default:
                $html[] = '<p>Der Typ wird noch nicht unterstützt</p>';

        }
        $html[] = '</label>';
        return implode('', $html);
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
