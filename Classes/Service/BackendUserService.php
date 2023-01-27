<?php

declare(strict_types=1);

namespace DMF\EnhancedBackend\Service;

use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;

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
class BackendUserService
{
    public const FIELD_NAME_PREFIX = 'tx_enhancedbackend';
    public const FIELD_NAME_THEME = self::FIELD_NAME_PREFIX . '_theme';
    public const FIELD_NAME_ACTIVE = self::FIELD_NAME_PREFIX . '_active';
    public const FIELD_NAME_DARKMODE = self::FIELD_NAME_PREFIX . '_darkmode';
    public const FIELD_VALUE_DARKMODE = 'darkmode';
    public const FIELD_VALUE_LIGHTMODE = 'lightmode';
    public const FIELD_VALUE_SYSTEMMODE = 'systemmode';

    /**
     * @return array|null
     */
    public function getBackendUserSettings(): ?array
    {
        if (!$this->isBackendUserLoggedIn()) {
            return null;
        }

        return $GLOBALS['BE_USER']->uc;
    }

    /**
     * Gets the selected active theme set by user settings of backend user
     *
     * @return string|null
     */
    public function getActiveThemeName(): ?string
    {
        $userSettings = $this->getBackendUserSettings();
        if ($userSettings && array_key_exists(self::FIELD_NAME_THEME, $userSettings)) {
            return $userSettings[self::FIELD_NAME_THEME];
        }
        return null;
    }

    /**
     * Get the selected dark mode set by user settings of the backend user
     *
     * @return string|null
     */
    public function getDarkMode(): ?string
    {
        $userSettings = $this->getBackendUserSettings();
        if ($userSettings && array_key_exists(self::FIELD_NAME_DARKMODE, $userSettings)) {
            return $userSettings[self::FIELD_NAME_DARKMODE];
        }
        return null;
    }

    /**
     * @return bool
     */
    private function isBackendUserLoggedIn(): bool
    {
        return $GLOBALS['BE_USER'] instanceof BackendUserAuthentication;
    }

}
