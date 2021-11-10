let cirlceLinkList = document.querySelectorAll(".circle-link-btn");
let circleModalImg = document.getElementById("circle-link-modal-img");
let circelModalTitle = document.getElementById("circle-link-title-input");
let circelModalLink = document.getElementById("circle-link-link-input");
let circleTitleLength = document.querySelector(".circle-title-length");
const MAX_LENGTH = 9;
let currentLength = 0;

const CircleLink = [
  {
    imgSrc: "",
    link: "",
    title: "",
    active: false,
  },
  {
    imgSrc: "",
    link: "",
    title: "",
    active: false,
  },
  {
    imgSrc: "",
    link: "",
    title: "",
    active: false,
  },
];

export function circleLinkHandler() {
  getAllCircleValue();
  let selectedCirlceLink = null;
  let circleLinkImg = null;

  let circleImg = {
    src: "",
    index: "",
  };
  cirlceLinkList.forEach((element, index) => {
    element.addEventListener("click", function () {
      selectedCirlceLink = cirlceLinkList[index];

      circleModalImg.src = selectedCirlceLink
        .querySelector("img")
        .getAttribute("src");

      circleImg.src = circleModalImg.src;
      circleImg.index = index;

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
}

function getAllCircleValue() {
  cirlceLinkList.forEach((elm, idx) => {
    let imgSrc = elm.querySelector(`#circle-img-${idx}`);
    let title = elm.querySelector(".cirlce-link-title");
    let link = elm.getAttribute("data-link");
    let active = elm.querySelector("input[type='checkbox']");
    elm.imgSrc = imgSrc;
    elm.title = title;
    elm.link = link;
    elm.active = active.checked;
  });
}
