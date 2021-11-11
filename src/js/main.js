import { circleLinkHandler } from "./circleLinkHandler.js";

circleLinkHandler();

$(document).ready(function () {
  $("select.flexselect").flexselect({
    allowMismatch: true,
    inputNameTransform: function (name) {
      return "new_" + name;
    },
  });
});

let previewBtn = document.querySelector(".preview-btn");
let phoneWrapper = document.querySelector(".phone-wrapper");
let closePreviewBtn = document.querySelector(".close-preview-btn");

function togglePreview() {
  phoneWrapper.classList.toggle("show");
}

phoneWrapper.addEventListener("click", function (element) {
  if (element.target == this) togglePreview();
});
previewBtn.addEventListener("click", togglePreview);
closePreviewBtn.addEventListener("click", togglePreview);

function reOrderHandler() {
  let inputFormContainer = document.querySelector(".form-wrapper");
  new Sortable(inputFormContainer, {
    animation: 150,
    handle: ".drag-btn",
    ghostClass: "ghost",
    forceFallback: true,
  });

  let circleLinkContainer = document.querySelector(".rounded-link-wrapper");
  new Sortable(circleLinkContainer, {
    animation: 150,
    handle: ".arrange-btn",
    ghostClass: "ghost",
    forceFallback: true,
  });
}

reOrderHandler();
