import { profileSection } from "./profileSection.js";
import { extraPageSection } from "./extraPageSection.js";
import { backgroundSection } from "./backgroundSection.js";

//color input lib
$(".colorPicker").spectrum({
  showPalette: true,
  showInput: true,
  showAlpha: true,
  allowEmpty: true,
  preferredFormat: "hex",
  palette: [
    ["#000", "#444", "#666", "#999", "#ccc", "#fff"],
    ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f"],
    ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3"],
    ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8"],
    ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc"],
    ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6"],
    ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394"],
    ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763"],
  ],
});

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
