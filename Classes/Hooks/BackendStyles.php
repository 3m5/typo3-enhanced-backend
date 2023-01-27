<?php
declare(strict_types=1);

namespace DMF\EnhancedBackend\Hooks;

use DMF\EnhancedBackend\Service\ThemeService;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 *
 * This file is part of a 3m5. Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 *  (c) 2022 3m5. Media GmbH <jan.suchandt@3m5.de>
 *
 **/

class BackendStyles
{

    public function addT3EnBeFiles()
    {
        $renderer = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Page\PageRenderer::class);
        $renderer->addJsFile(GeneralUtility::getFileAbsFileName('EXT:enhanced_backend/Resources/Public/JavaScript/Backend.js'), 'text/javascript', false, false, '', true, '|', false, '');

        $themeService = GeneralUtility::makeInstance(ThemeService::class);


    }

}
