[![TYPO3 11](https://img.shields.io/badge/TYPO3-11-orange.svg)](https://get.typo3.org/version/11)

TYPO3 Extension ENHANCED BACKEND
================================

![enhanced_backend_logo](/Resources/Public/Icons/Extension.png)

# What is it?

Enhanced Backend is an extension developed by 3m5. to make the work of editors in the TYPO3 backend more pleasant.
There are features that visually change the backend and also functionalities that are added to the backend.

Created by:[3m5.de - The TYPO3 Agency](https://www.3m5.de/digitalagentur/typo3-agentur)

## Presets

The primary goal of the extension is individuality, which is why each feature can be enabled or disabled individually.
If this is too complex for you, you can choose between 3 predefined sets:

1. **No changes**: Original TYPO3 backend (default setting)
2. **Vanilla⁺**: This preset is based on the corporate design of TYPO3. Functionalities are not changed or added. There are only minor UI optimizations.
3. **Modern**: This preset activates all available functions and optimizations of the "Enhanced Backend" extension. The UI/UX is based on current developments and there is a content tree that enables quick navigation across all content on a page.
4. In addition to these sets, there is also the "User-defined" setting: This preset adopts the last selected settings (from the other presets) and allows individual deactivation/activation of individual functions and optimizations.

## Which functions does Enhanced Backend offer?
The functions in the backend are grouped according to areas in the backend to ensure a better overview. The following functions are available:

### Global
These settings affect all areas of the TYPO3 backend.

| Feature                  | Description                                                                                    |
|:-------------------------|:-----------------------------------------------------------------------------------------------|
| **Enhanced Icons**       | Replace the default TYPO3 icons with a modern and user-friendly icon set.                      |
 | **Enhanced Font**        | Use the optimized "Inter" font for better display of elements and texts.                       |
 | **Enhanced Scrollbars**  | Use this option to make scrollbars more discreet and move them visually into the background.   |

### Header area
These settings affect the top bar, where your login is located, for example.

| Feature                   | Description                                                                                    |
|:--------------------------|:-----------------------------------------------------------------------------------------------|
| **Enhanced Search Field** | The search field is brought more into focus and given a more modern design.                    |
| **Reorder icons on the right** | The username is moved to the upper right corner, as users are used to from other applications. |

### Sidebar
These settings affect the sidebar on the left side of the screen where the different modules are located.

| Feature                   | Description                                                                                 |
|:--------------------------|:--------------------------------------------------------------------------------------------|
| **Move sidebar collapse toggle to bottom edge** | Positions the sidebar collapse toggle from the upper left corner to the end of the sidebar. |
| **Enhanced Menu UI** | Improves the color design of module entries, spacing and visual separation of groups.       |

### Page tree
These settings affect the page tree, located to the right of the sidebar.

| Feature                            | Description                                                                                         |
|:-----------------------------------|:----------------------------------------------------------------------------------------------------|
| **Enhance toolbar over page tree** | Buttons get more spacing to be more clickable. The search field is displayed in a more modern way.  |
| **Enable content tree**            | Inserts a tree below the page tree that maps the content elements of the currently selected page.      |

### Content area
The content area is the area where the contents of the respective modules are shown from the sidebar.

| Feature                             | Description                                                                                                                                                                |
|:------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Enhanced content area**           | Content element frames are moved to the background to focus on the content. Buttons and titles are repositioned for a better overview.                                     |
| **Enhanced Toolbar**                | Spacing is consistent with the page tree toolbar. Larger click areas make the work easier.                                                                                 |
| **Enhanced "Edit" Form**            | Form elements are aligned using a grid. Frames are visually placed in the background so editors can focus on content.                                                      |
| **Enhanced language visualization** | Displays the respective language flag only once per column and makes the language sticky at the top, so that it is also recognizable when elements are edited further down. |
| **Hide quick page title editing** | Displays the icon for quick editing of the page title only when the mouse is hovered over it. |

### Content element wizard
This dialog becomes visible when creating a new content element.

| Feature                        | Description                                                                                    |
|:-------------------------------|:-----------------------------------------------------------------------------------------------|
| **Enhanced Toolbar**           | The search box and tabs are provided in a more modern design.                    |
| **Tile view** | Description texts are available as tooltips, icons and headlines are in focus. |

# Usages
Enhanced backend comes as a TYPO3 extension for the TYPO3 backend. It appears
as new tab "enhanced backend" in user settings. All settings are user specific.

* Install extension via composer
* Login to your TYPO3 backend
* Switch to your personal user settings at the right top corner (profile image)
* A new tab _enhanced backend_ is available
* Choose a preset to quickly activate a collection of helpful features that are right for you

# Installation

With [composer based](https://docs.typo3.org/m/typo3/tutorial-getting-started/main/en-us/Installation/Install.html)
TYPO3 installations, enhanced backend is easily added to the project.

```
composer require 3m5/typo3-enhanced-backend
```

## TYPO3 Extension Repository
For non-composer projects, the extension is available in TER as extension key `enhanced_backend` and can
be installed using the extension manager.

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
| main | 12    | 7.4 - 8.2 | most recent branch    |
| v11   | 11    | 7.4 - 8.2 | branch for TYPO3 v11  |

# Legal
This project is released under GPLv2 license. See LICENSE.txt for details.

