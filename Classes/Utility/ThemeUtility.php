<?php

declare(strict_types=1);

namespace DMF\EnhancedBackend\Utility;

use DMF\EnhancedBackend\Service\BackendUserService;
use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Service\ImageService;

class ThemeUtility
{
    /**
     * TODO delete, because moved to {@link BackendUserService}
     * @var string
     */
    private const FIELD_NAME = 'tx_enhancedbackend_theme';
    private const DEFAULT_THEME = 'default';

    private array $configuration;
    private $value;

    public function itemsForBeGroup(array &$conf): void
    {
        $items = $conf['items'];
        $themes = $GLOBALS['TYPO3_USER_SETTINGS']['columns']['tx_enhancedbackend_theme']['items'];
        foreach($themes as $key => $theme) {
            if($key !== self::DEFAULT_THEME) {
                $items[] = [
                    $theme['label'],
                    $key,
                    $theme['image'],
                ];
            }
        }

        $conf['items'] = $items;
    }

    public function render(array $conf): string
    {
        $this->configuration = $conf;
        $this->getValueFromUser();

        $html = ['<div>'];

        if ($conf['description']) {
            $html[] = '<div class="row"><div class="col-xs-12 col-md-6">';
            $html[] = '<p>' . $this->getLanguageService()->sL($conf['description']) . '</p>';
            $html[] = '</div></div>';
        }

        $html[] = '<div class="row">';

        foreach ($this->configuration['items'] as $key => $item) {
            if ($this->isAllowedTheme($key)) {
                $html[] = '<div class="col-xs-12 col-md-2">';
                $html[] = $this->renderItem($key, $item);
                $html[] = '</div>';
            }
        }

        $html[] = '</div>';
        $html[] = '</div>';

        return implode('', $html);
    }

    protected function getValueFromUser(): void
    {
        $backendUser = $this->getBackendUser();
        $isBeUsersTable = ($this->configuration['table'] ?? false) === 'be_users';
        $value = $isBeUsersTable ? ($backendUser->user[self::FIELD_NAME] ?? false) : ($backendUser->uc[self::FIELD_NAME] ?? false);
        if (!$value && isset($this->configuration['default'])) {
            $value = $this->configuration['default'];
        }

        $this->value = $value;
    }

    protected function renderItem(string $key, array $item): string
    {
        $content = '<label class="user-theme"><input type="radio" id="field_' .
            self::FIELD_NAME . '_' . $key . '" name="data[' .
            self::FIELD_NAME . ']" value="' . $key . '"' .
            ($this->value === $key ? ' checked="checked"' : '') . '>';

        if (isset($item['image'])) {
            $imageService = GeneralUtility::makeInstance(ImageService::class);

            $image = $imageService->getImage($item['image'], null, false);
            $image = $imageService->applyProcessingInstructions($image, ['width' => 200]);

            $content .= '<div class="btn btn-default"><img src="' . $image->getPublicUrl() . '" alt=""></div>';
        }

        $content .= '<p><b>' . $this->getLanguageService()->sL($item['label']) . '</b>';

        if (isset($item['description'])) {
            $content .= '<br>' . $this->getLanguageService()->sL($item['description']);
        }
        $content .= '</p></label>';

        return $content;
    }

    protected function isAllowedTheme($theme): bool
    {
        if($theme === self::DEFAULT_THEME) {
            return true;
        }

        $backendUser = $this->getBackendUser();
        if($backendUser->isAdmin()) {
            return true;
        }

        $themeGroups = array_map(
            function($group) {
                return GeneralUtility::trimExplode(',', $group['tx_enhancedbackend_themes']);
            }, $backendUser->userGroups
        );

        foreach($themeGroups as $themes) {
            if (in_array($theme, $themes)) {
                return true;
            }
        }

        return false;
    }

    protected function getBackendUser(): BackendUserAuthentication
    {
        return $GLOBALS['BE_USER'];
    }

    protected function getLanguageService(): LanguageService
    {
        return $GLOBALS['LANG'];
    }
}
