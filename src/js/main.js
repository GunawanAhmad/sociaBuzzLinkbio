let cirlceLinkList = document.querySelectorAll(".circle-link-btn");
let circleModalImg = document.getElementById("circle-link-modal-img");
let circelModalTitle = document.getElementById("circle-link-title-input");
let circelModalLink = document.getElementById("circle-link-link-input");
let circleTitleLength = document.querySelector(".circle-title-length");
const MAX_LENGTH = 9;
let currentLength = 0;

let selectedCirlceLink = null;
let circleLinkImg = null;

let circleImg = "";
cirlceLinkList.forEach((element, index) => {
  element.addEventListener("click", function () {
    selectedCirlceLink = cirlceLinkList[index];

    circleModalImg.src = selectedCirlceLink
      .querySelector("img")
      .getAttribute("src");

    circleImg = circleModalImg.src;

    circelModalTitle.value =
      selectedCirlceLink.querySelector(".cirlce-link-title").innerText;
    currentLength = circelModalTitle.value.length;
    circleTitleLength.textContent = currentLength + " / " + MAX_LENGTH;

    circelModalLink.value = selectedCirlceLink.getAttribute("data-link");
  });
});

circleTitleLength.textContent = currentLength + " / " + MAX_LENGTH;
circelModalTitle.addEventListener("keyup", function (e) {
  currentLength = e.target.value.length;
  circleTitleLength.textContent = currentLength + " / " + MAX_LENGTH;
});

let tempImgSrc = "";
document
  .getElementById("circle-link-img-input")
  .addEventListener("change", function () {
    if (this.files[0].size > 1048576) {
      alert("Max 1MB");
      this.value = "";
    }
    tempImgSrc = window.URL.createObjectURL(this.files[0]);
    circleModalImg.src = tempImgSrc;
    this.value = "";
  });

document
  .getElementById("circle-link-save-btn")
  .addEventListener("click", function () {
    if (tempImgSrc) {
      selectedCirlceLink.querySelector("img").setAttribute("src", tempImgSrc);
      tempImgSrc = "";
    }

    selectedCirlceLink.querySelector(".cirlce-link-title").innerText =
      circelModalTitle.value;

    selectedCirlceLink.setAttribute("data-link", circelModalLink.value);
  });

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
