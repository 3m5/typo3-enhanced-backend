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
    private const FIELD_NAME = 'tx_enhancedbackend_theme';

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
    public function getActiveThemeName():?string {
        $userSettings = $this->getBackendUserSettings();
        if(array_key_exists(self::FIELD_NAME, $userSettings)) {
            return $userSettings[self::FIELD_NAME];
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
