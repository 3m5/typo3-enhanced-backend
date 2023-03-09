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
        $GLOBALS['TYPO3_USER_SETTINGS']['columns']['tx_enhancedbackend_uc'] = [
            'label' => 'LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme',
            'description' => 'LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.theme.description',
            'type' => 'user',
            'userFunc' => BackendUserService::class.'->renderUserConfig'
        ];
        ExtensionManagementUtility::addFieldsToUserSettings(
            '--div--;LLL:EXT:enhanced-backend/Resources/Private/Language/locallang_be.xlf:user_settings.enba.tab_label, tx_enhancedbackend_uc'
        );

        $featureService = GeneralUtility::makeInstance(FeatureService::class);

        // we need this only to save the user setting
        foreach ($featureService->getAllFeatures() as $feature) {
            $GLOBALS['TYPO3_USER_SETTINGS']['columns'][$feature->getId()] = [
                'access' => 'none',
                'type' => $feature->getType()
            ];
            ExtensionManagementUtility::addFieldsToUserSettings($feature->getId());
        }

    }

    public function renderUserConfig()
    {
        $featureService = GeneralUtility::makeInstance(FeatureService::class);
        $html = ['<div class="enba-settings">'];
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
        // TODO: aktuell wird nur check unterstützt text kommt später
        switch ($feature->getType())
        {
            case 'check':
                $checked = $feature->isActive() ? 'checked="checked"': '';
                // TODO:  $this->getLanguageService()->sL() nutzen
                $fieldId = 'tx_enhancedbackend_uc_'.$feature->getId();
                $html[] = '<div class="form-check form-switch"><input type="checkbox" id="field_'.$fieldId.'" class="form-check-input" name="data['.$feature->getId().']" '.$checked.'></div>';
                $html[] = '<div class="feature__text"><span class="feature__title">'.$feature->getTitle().'</span><br/>';
                $html[] = '<span class="feature__description">'.$feature->getDescription().'</span></div>';
                break;
            default:
                $this->logger->warning('Try to render unsupported type for feature');
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
