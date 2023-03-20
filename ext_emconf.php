<?php
$EM_CONF[$_EXTKEY] = [
    'title' => 'Enhanced backend',
    'description' => 'Improves the user experience (UI/UX), provides customization options for editors and enhances the look and feel of TYPO3 backend.',
    'category' => 'be',
    'author' => 'Jan Suchandt',
    'author_email' => 'jan.suchandt@3m5.de',
    'state' => 'alpha',
    # Deprecated since version 12.1
    'clearCacheOnLoad' => 0,
    'version' => '0.0.4',
    'constraints' => [
        'depends' => [
            'php' => '7.4.0-8.2.99',
            'typo3' => '11.5.0-11.99.99',
            'sys_note' => '11.5.0-11.99.99'
        ],
        'conflicts' => [],
        'suggests' => [
            'styleguide' => '11.5.0-11.99.99'
        ],
    ],
    'autoload' => [
        'psr-4' => [
            'DMF\\EnhancedBackend\\' => 'Classes'
        ]
    ],
];
