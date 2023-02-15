<?php
defined('TYPO3') || die();

$iconService = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\DMF\EnhancedBackend\Service\IconService::class);
return $iconService->setIcons();
