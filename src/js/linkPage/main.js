import { circleLinkHandler } from "./circleLinkHandler.js";
import { inputFormHandler } from "./inputFormHandler.js";
import { rearrangeHandler } from "./rearrangeHandler.js";
import { previewHandler } from "./previewHandler.js";

circleLinkHandler();
inputFormHandler();
rearrangeHandler();
previewHandler();

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
