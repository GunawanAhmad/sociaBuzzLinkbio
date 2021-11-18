let previewBtn = document.querySelector(".preview-btn");
let phoneWrapper = document.querySelector(".phone-wrapper");
let closePreviewBtn = document.querySelector(".close-preview-btn");
export function previewHandler() {
  function togglePreview() {
    phoneWrapper.classList.toggle("show");
  }

  phoneWrapper.addEventListener("click", function (element) {
    if (element.target == this) togglePreview();
  });
  previewBtn.addEventListener("click", togglePreview);
  closePreviewBtn.addEventListener("click", togglePreview);
  var fixed = document.getElementById("fixed");

  fixed.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();
    },
    false
  );
}
