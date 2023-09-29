<?php

declare(strict_types=1);

namespace DMF\EnhancedBackend\Utility;

use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Core\Http\ApplicationType;
use TYPO3\CMS\Core\Utility\VersionNumberUtility;

/**
 * Different utility functions for backend, like version comparison
 *
 * This file is part of a 3m5. Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 *  (c) 2023 3m5. Media GmbH <jan.suchandt@3m5.de>
 *
 **/
class BackendUtility
{
    private const EXTENSION_KEY = 'enhanced_backend';

    /**
     * Determine, depending on TYPO3 version, if this request is a backend request
     *
     * TYPO3 10 https://docs.typo3.org/c/typo3/cms-core/main/en-us/Changelog/11.0/Deprecation-92947-DeprecateTYPO3_MODEAndTYPO3_REQUESTTYPEConstants.html
     * TYPO3 11 https://docs.typo3.org/m/typo3/reference-coreapi/11.5/en-us/ApiOverview/RequestLifeCycle/RequestAttributes/ApplicationType.html
     *
     * @return bool
     */
    static function isBackendRequest(): bool
    {
        $currentVersionNumber = self::getCurrentTypo3VersionNumberInt();
        if ($currentVersionNumber >= 11000000) {
            return ApplicationType::fromRequest($GLOBALS['TYPO3_REQUEST'])->isBackend();
        }
        return false;
    }

    /**
     * @return bool
     */
    static function isCliRequest(): bool
    {
        return Environment::isCli();
    }

    static function getCurrentTypo3VersionNumberInt(): int
    {
        return VersionNumberUtility::convertVersionNumberToInteger(VersionNumberUtility::getCurrentTypo3Version());
    }

    /**
     * Get the extension key for enhanced backend
     *
     * @return string
     */
    static function getExtensionKey():string {
        return self::EXTENSION_KEY;
    }
}
