[![TYPO3 11](https://img.shields.io/badge/TYPO3-11-orange.svg)](https://get.typo3.org/version/11)

TYPO3 Extension ENHANCED BACKEND
================================

![enhanced_backend_logo](/Resources/Public/Icons/Extension.png)

# What is it?

The Enhanced Backend Extension improves the user experience (UI/UX) in the TYPO3
backend, provides customization options for editors and enhances the look and
feel of TYPO3 so that it represents a modern and intuitive eCMS.

It includes these features:

* Content tree for quick editing content element of a page
* Many UI/UX optimizations you can choose individually
* Three customization presets in user settings, e.g. TYPO3-a-like or a complete
new modern backend
* Possibility to combine features as many optimizations as you want

# Usages

Enhanced backend comes as a TYPO3 extension for the TYPO3 backend. It appears
as new tab "enhanced backend" in user settings. All settings are user specific.

* Install extension via composer
* Login to your TYPO3 backend
* Switch to your personal user settings at the right top corner (profile image)
* A new tab _enhanced backend_ is available
* Choose a preset to quickly activate a collection of helpful features that are right for you
  * **no changes**: TYPO3 default backend
  * **Vanilla+**: Based on the corporate design of TYPO3.
    Functionalities are not changed or added. There are only minor UI optimizations.
  * **Modern**: Activates all available features and optimizations of the Enhanced
    Backend extension. The UI/UX is based on current developments and there is a
    content tree that allows quick navigation over all content on a page.
* Of course, all features can be selected individually

# Installation

With [composer based](https://docs.typo3.org/m/typo3/tutorial-getting-started/main/en-us/Installation/Install.html)
TYPO3 installations, enhanced backend is easily added to the project.

**TYPO3 12**

```
composer require 3m5/typo3-enhanced-backend
```

**TYPO3 12**

_At the moment we are try to upgrade our extension to TYPO3 12. So please be patient._


## TYPO3 Extension Repository
For non-composer projects, the extension is available in TER as extension key `enhanced_backend` and can
be installed using the extension manager.

# Roadmap

**Before stable release 1.0**
- Add planned and stabilize features for TYPO3 v11
- Prepare for TYPO3 v12
- Improve documentation

# Tagging and releasing

[packagist.org](https://packagist.org/packages/3m5/typo3-enhanced-backend) is enabled via the casual GitHub hook.
TER releases are created by the "publish.yml" GitHub workflow when tagging versions
using [tailor](https://github.com/TYPO3/tailor). The commit message of the commit a tag points to is
used as TER upload comment.

|                 | URL                                           |
|-----------------|-----------------------------------------------|
| **Repository:** | https://github.com/3m5/typo3-enhanced-backend |

## Compatibility

| EnBa | TYPO3 | PHP       | Support / Development |
|------|-------|-----------|-----------------------|
| main | 11    | 7.4 - 8.2 | most recent branch    |

# Legal
This project is released under GPLv2 license. See LICENSE.txt for details.

