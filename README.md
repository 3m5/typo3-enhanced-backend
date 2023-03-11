[![TYPO3 11](https://img.shields.io/badge/TYPO3-11-orange.svg)](https://get.typo3.org/version/11)

TYPO3 Extension ENHANCED BACKEND
================================

![enhanced_backend_logo](/Resources/Public/Icons/Extension.png)

# What is it?

The Enhanced Backend Extension improves the user experience (UI/UX) in the TYPO3
backend, provides customization options for editors and enhances the look and
feel of TYPO3 so that it represents a modern and intuitive eCMS.

It includes these features:

* Content tree
* UI / UX optimizations
* 3 customization presets in user settings
* possibility to combine as many optimizations as you want

# Usages

* ...coming soon

# Installation

Enhanced backend comes as a TYPO3 extension for the TYPO3 backend. It appears
as new tab "enhanced backend" in user settings. All settings are user specific.

## Composer
With [composer based](https://docs.typo3.org/m/typo3/tutorial-getting-started/main/en-us/Installation/Install.html)
TYPO3 installations, styleguide is easily added to the project.

TYPO3 v11 based project:

```
composer require --dev 3m5/typo3-enhanced-backend
```

TYPO3 v10 based project:

...coming soon

```
...
```

## TYPO3 Extension Repository
For non-composer projects, the extension is available in TER as extension key `enhanced_backend` and can
be installed using the extension manager.

# Tagging and releasing

[packagist.org](https://packagist.org/packages/typo3/cms-styleguide) is enabled via the casual github hook.
TER releases are created by the "publish.yml" github workflow when tagging versions
using [tailor](https://github.com/TYPO3/tailor). The commit message of the commit a tag points to is
used as TER upload comment.

|                 | URL                                           |
|-----------------|-----------------------------------------------|
| **Repository:** | https://github.com/3m5/typo3-enhanced-backend |

## Compatibility

| EnBa | TYPO3 | PHP       | Support / Development |
|------|------|-----------|-----------------------|
| main | 11   | 7.4 - 8.2 | most recent branch    |

# Legal
This project is released under GPLv2 license. See LICENSE.txt for details.

