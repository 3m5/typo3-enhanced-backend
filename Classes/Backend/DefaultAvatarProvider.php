<?php

declare(strict_types=1);

namespace DMF\EnhancedBackend\Backend;

use TYPO3\CMS\Backend\Backend\Avatar\Image;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\PathUtility;

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
 *
 */
class DefaultAvatarProvider extends \TYPO3\CMS\Backend\Backend\Avatar\DefaultAvatarProvider
{
    public function getImage(array $backendUser, $size)
    {
        $avatarImage = parent::getImage($backendUser, $size);
        if($avatarImage) {
            return $avatarImage;
        }
        // No image is set at this point, we add our custom avatar
        return GeneralUtility::makeInstance(
            Image::class,
            GeneralUtility::getFileAbsFileName('EXT:enhanced-backend/Resources/Public/Icons/User.svg'),
            $size,
            $size
        );

    }

}
