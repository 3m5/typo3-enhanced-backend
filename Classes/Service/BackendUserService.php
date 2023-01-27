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
     * @return bool
     */
    private function isBackendUserLoggedIn(): bool
    {
        return $GLOBALS['BE_USER'] instanceof BackendUserAuthentication;
    }

}
