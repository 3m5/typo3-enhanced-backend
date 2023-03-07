<?php

defined('TYPO3') || die();

$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['backend']['avatarProviders']['defaultAvatarProvider']['provider'] = \DMF\EnhancedBackend\Backend\DefaultAvatarProvider::class;

$GLOBALS['TYPO3_CONF_VARS']['SYS']['Objects'][\TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class] = [
    'className' => \DMF\EnhancedBackend\Hooks\EnhancedSvgIconProvider::class
];

$GLOBALS['TYPO3_CONF_VARS']['SYS']['Objects'][\TYPO3\CMS\Core\Imaging\IconProvider\SvgSpriteIconProvider::class] = [
    'className' => \DMF\EnhancedBackend\Hooks\EnhancedSvgSpriteIconProvider::class
];
