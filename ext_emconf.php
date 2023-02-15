<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'Enhanced backend',
    'description' => 'The Enhanced Backend Extension improves the user experience (UX) in the TYPO3 backend, provides customization options for editors and improves the look\'n\'feel of TYPO3 so that it represents a modern and intuitive eCMS.',
    'category' => 'be',
    'author' => 'Jan Suchandt, Steffen Thiele, Nicole Schneider',
    'author_email' => 'jan@suchandt.de, steffen.thiele@3m5.de, nicole.schneider@3m5.de',
    'state' => 'alpha',
    'clearCacheOnLoad' => 0,
    'version' => '10.0.1',
    'constraints' => [
        'depends' => [
            'typo3' => '10.0.0-10.99.99',
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
];
