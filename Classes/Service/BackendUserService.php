<?php

declare(strict_types=1);

namespace DMF\EnhancedBackend\Service;

use DMF\EnhancedBackend\Model\Feature;
use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\Core\Bootstrap;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Resource\Exception\InvalidFileException;
use TYPO3\CMS\Core\SingletonInterface;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use Psr\Log\LoggerInterface;
use TYPO3\CMS\Core\Utility\PathUtility;
use TYPO3\CMS\Extbase\Service\ImageService;

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
    const PRESET_KEY = 'enba-presets';
    const LANG_FILE = 'LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf';

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
            'label' => self::LANG_FILE.':presets',
            'type' => 'user',
            'userFunc' => BackendUserService::class.'->renderUserConfig'
        ];
        ExtensionManagementUtility::addFieldsToUserSettings(
            '--div--;LLL:EXT:enhanced_backend/Resources/Private/Language/locallang_be.xlf:user_settings.enba.tab_label, tx_enhancedbackend_uc'
        );

        $featureService = GeneralUtility::makeInstance(FeatureService::class);

        // we need this only to save the user setting
        $GLOBALS['TYPO3_USER_SETTINGS']['columns'][self::PRESET_KEY] = [
            'access' => 'none',
            'type' => 'radio'
        ];
        ExtensionManagementUtility::addFieldsToUserSettings(self::PRESET_KEY);

        foreach ($featureService->getAllFeatures() as $feature) {
            $GLOBALS['TYPO3_USER_SETTINGS']['columns'][$feature->getId()] = [
                'access' => 'none',
                'type' => $feature->getType()
            ];
            ExtensionManagementUtility::addFieldsToUserSettings($feature->getId());
        }

    }

    /**
     * Renders custom user settings for enhanced backend
     *
     * @throws InvalidFileException
     */
    public function renderUserConfig(): string
    {
        $featureService = GeneralUtility::makeInstance(FeatureService::class);
        $html = ['<div class="enba-settings">'];
        $html[] = $this->renderPresetChoice();
        $groupId = '';
        $groupClose = '';
        foreach ($featureService->getAllFeatures() as $feature) {
            if($groupId != $feature->getGroup()->getId())
            {
                $groupTitle =  $this->getLanguageService()->sL(self::LANG_FILE.':'.$feature->getGroup()->getTitle());
                $groupIcon = '<span class="enba-uc-group__header-icon"><img src="'.PathUtility::getPublicResourceWebPath('EXT:enhanced_backend/Resources/Public/Icons/' . $feature->getGroup()->getIcon()).'" width="20" height="20" /></span>';
                $groupToggleIcon = '<img src="'.PathUtility::getPublicResourceWebPath('EXT:enhanced_backend/Resources/Public/Icons/Caret-left.svg" width="24" class="enba-uc-group__header-toggle').'" />';

                $html[] = $groupClose.'<div class="form-group t3js-formengine-field-item enba-uc-group">';
                $html[] = '<div class="enba-uc-group__header"><h3>'.$groupIcon.$groupTitle.'</h3>'.$groupToggleIcon.'</div>';
                $html[] = '<div class="enba-uc-group__content"><div class="enba-uc-group__description">';
                if($description =  $this->getLanguageService()->sL(self::LANG_FILE.':'.$feature->getGroup()->getDescription()))
                {
                    $html[] = '<p>'.$description.'</p>';
                }
                if($image = $feature->getGroup()->getImage())
                {
                    $html[] = '<img src="'
                        . PathUtility::getPublicResourceWebPath('EXT:enhanced_backend/Resources/Public/Images/' . $image)
                        . '" width="300" /></div><div class="enba-uc-group__featurelist">';
                }


                $groupClose = '</div></div></div>';
                $groupId = $feature->getGroup()->getId();
            }
            $html[] = $this->renderFeature($feature);
        }
        $html[] = '</div>';

        return implode('', $html);
    }

    /**
     * Renders preset selection in user settings
     *
     * @return string
     */
    public function renderPresetChoice(): string
    {
        $presets = [
            'none',
            'vanilla',
            'modern',
            'custom'
        ];

        $html = ['<div class="enba-presets-container">'];

        $html[] = '<div class="row">';

        foreach ($presets as $key) {
                $html[] = '<div class="col-xs-12 col-md-3">';
                $html[] = $this->renderPreset($key);
                $html[] = '</div>';
        }
        $html[] = '</div>';
        $html[] = '</div>';

        return implode('', $html);

    }

    protected function renderPreset(string $key): string
    {
        $content = '<input type="radio" id="field_tx_enhancedbackend_uc_' .self::PRESET_KEY.
            '_' . $key . '" name="data['.self::PRESET_KEY.']" value="' . $key . '"' .
            ($this->getPresetFromUser() === $key ? ' checked="checked"' : '') . '/>';

        $content .= '<label class="enba-presets" for="field_tx_enhancedbackend_uc_' .self::PRESET_KEY.
            '_' . $key . '"><b>' . $this->getLanguageService()->sL(self::LANG_FILE.':presets.'.$key.'.label') . '</b>';
        $content .= '<br>' . $this->getLanguageService()->sL(self::LANG_FILE.':presets.'.$key.'.description');

        $content .= '</label>';

        return $content;
    }

    protected function getPresetFromUser(): string
    {
        if($this->isBackendUserAvailable())
        {
            $value = $GLOBALS['BE_USER']->uc[self::PRESET_KEY] ?? false;
        }
        if (!$value) {
            $value = 'none';
        }
        return $value;
    }


    private function renderFeature(Feature $feature)
    {
        $html = ['<label class="enba-uc__feature">'];
        // TODO: aktuell wird nur check unterstützt text kommt später
        switch ($feature->getType())
        {
            case 'check':
                $checked = $feature->isActive() ? 'checked="checked"': '';
                $fieldId = 'tx_enhancedbackend_uc_'.$feature->getId();
                $html[] = '<div class="form-check form-switch"><input type="checkbox" id="field_'.$fieldId.'" class="form-check-input" name="data['.$feature->getId().']" '.$checked.' data-presets="'.implode(',',$feature->getPresets()).'" /></div>';
                $html[] = '<div class="feature__text"><span class="feature__title">'.$this->getLanguageService()->sL(self::LANG_FILE.':'.$feature->getTitle()).'</span><br/>';
                $html[] = '<span class="feature__description">'.$this->getLanguageService()->sL(self::LANG_FILE.':'.$feature->getDescription()).'</span></div>';
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

    protected function getLanguageService(): LanguageService
    {
        return $GLOBALS['LANG'];
    }

}
