import { circleLinkHandler } from "./circleLinkHandler.js";
import { inputFormHandler } from "./inputFormHandler.js";
import { rearrangeHandler } from "./rearrangeHandler.js";
import { previewHandler } from "../globalHandler/previewHandler.js";
import {
    uploadThumbnailImg,
    searchIcons,
} from "../linkPage/thumbnailHandler.js";

circleLinkHandler();
inputFormHandler();
rearrangeHandler();
previewHandler();
uploadThumbnailImg();
searchIcons();

//activate tooltip

function isTouchDevice() {
    return (
        true ==
        ("ontouchstart" in window ||
            (window.DocumentTouch && document instanceof DocumentTouch))
    );
}

if (isTouchDevice() === false) {
    $('[data-tooltip="tooltip"]').tooltip({ trigger: "hover" });
}
