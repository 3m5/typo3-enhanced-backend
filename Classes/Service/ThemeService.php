<?php

declare(strict_types=1);

namespace DMF\EnhancedBackend\Service;

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
 * Service for handling theme, e.g. check is theme is active or getting list of all available themes
 */
class ThemeService
{
    public const THEME_NAME_VANILLA = 'vanilla';
    public const THEME_NAME_MODERN = 'modern';
    public const THEME_NAME_CUSTOM = 'custom';

    /**
     * @var BackendUserService
     */
    private BackendUserService $backendUserService;

    public function __construct(BackendUserService $backendUserService)
    {
        $this->backendUserService = $backendUserService;
    }

    /**
     * @return bool
     */
    public function isModernActive(): bool
    {
        return $this->isThemeActiveByName(self::THEME_NAME_MODERN);
    }

    /**
     * @return bool
     */
    public function isVanillaActive(): bool
    {
        return $this->isThemeActiveByName(self::THEME_NAME_VANILLA);
    }

    /**
     * @return bool
     */
    public function isCustomActive(): bool
    {
        return $this->isThemeActiveByName(self::THEME_NAME_CUSTOM);
    }

    public function isAnyThemeSelected(): bool
    {
        return false;
    }

    /**
     * @param string $themeName
     * @return bool
     */
    private function isThemeActiveByName(string $themeName): bool
    {
        $backendUserSettings = $this->backendUserService->getBackendUserSettings();

        return false;
    }

    /**
     * @return string[]
     */
    public static function getThemeList(): array
    {
        return [
            self::THEME_NAME_VANILLA,
            self::THEME_NAME_MODERN,
            self::THEME_NAME_CUSTOM
        ];
    }
}
