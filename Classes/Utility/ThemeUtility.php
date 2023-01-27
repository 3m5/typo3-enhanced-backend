<?php
declare(strict_types=1);

namespace DMF\EnhancedBackend\Utility;

use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Service\ImageService;

class ThemeUtility
{
    private const FIELD_NAME = 'tx_enhancedbackend_theme';

    private array $configuration;
    private mixed $value;

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

        $html[] = $this->renderStyle();
        $html[] = '<div class="row">';

        foreach ($this->configuration['items'] as $key => $item) {
            $html[] = '<div class="col-xs-12 col-md-2">';
            $html[] = $this->renderItem($key, $item);
            $html[] = '</div>';
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

    protected function renderStyle(): string
    {
        $style = [];
        $style[] = '<style>';
        $style[] = 'label.user-theme input {display:none;}';
        $style[] = 'label.user-theme img {max-width:100%;}';
        $style[] = 'label.user-theme p {margin-top:15px;}';
        $style[] = 'label.user-theme :checked ~ p {color:red;}'; // TODO
        $style[] = '</style>';

        return implode('', $style);
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

            $content .= '<div class="btn btn-default"><img src="' . $image->getPublicUrl() .'" alt=""></div>';
        }

        $content .= '<p><b>' . $this->getLanguageService()->sL($item['label']) . '</b>';

        if (isset($item['description'])) {
            $content .= '<br>' . $this->getLanguageService()->sL($item['description']);
        }
        $content .= '</p></label>';

        return $content;
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
