import { profileSection } from "./profileSection.js";
import { extraPageSection } from "./extraPageSection.js";
import { backgroundSection } from "./backgroundSection.js";

profileSection();
extraPageSection();
backgroundSection();

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
