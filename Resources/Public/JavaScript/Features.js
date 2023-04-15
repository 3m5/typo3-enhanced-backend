"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContentTree_1 = __importDefault(require("./Features/ContentTree"));
const SaveSettingsListener_1 = __importDefault(require("./Features/SaveSettingsListener"));
const EnbaClassNames_1 = __importDefault(require("./Features/EnbaClassNames"));
const ContentElementWizard_1 = __importDefault(require("./Features/ContentElementWizard"));
if (typeof window !== "undefined") {
    window.addEventListener('load', (event) => {
        var _a;
        if (window.top === window) {
            // Code is only executed in main HTML
            (0, ContentTree_1.default)();
        }
        else {
            // Code is executed in an iframe
            (0, EnbaClassNames_1.default)();
            // Code is executed in content area
            if (((_a = window.frameElement) === null || _a === void 0 ? void 0 : _a.id) === 'typo3-contentIframe') {
                (0, SaveSettingsListener_1.default)();
                if (!!document.querySelector('.enba-contentElementWizard__enhancedUI')) {
                    (0, ContentElementWizard_1.default)();
                }
            }
        }
    });
}
