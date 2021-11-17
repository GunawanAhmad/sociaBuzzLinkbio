import {
  regularInputLink,
  headerInputLink,
  donasiInputLink,
  digitalAksesInputLink,
  kontenInputLink,
  paketJasaInputLink,
  kerjasamaInputLink,
  embedInputLink,
  whatsappInputLink,
  emailInputLink,
  emailColletionInputLink,
  videoRequestInputLink,
} from "./inputFormHTMLSource.js";

import { deleteHandler } from "./deleteHandler.js";

let tambahLinkBtn = document.querySelector("#tambahLink-btn");
let formLinkWrapper = document.querySelector(".form-wrapper");
let tambahFiturSpesialBtn = document.querySelectorAll(".add-fitur-spesial-btn");
let arrOfInputLinks = [];

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
  let template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

function reloadCustomSelect(elm) {
  if (elm) {
    $(document).ready(function () {
      $(elm).select2({
        tags: true,
      });
    });
  }
}

function inputForm(elm) {
  this.containerElm = elm;
  this.deleteBtn = this.containerElm.querySelector("#del-btn");
  this.tombolInput = this.containerElm.querySelector("#tombol-input");
  this.selectInputFormForDelete = function () {
    deleteHandler(elm, "form-link");
  };
  $(this.deleteBtn).click(this.selectInputFormForDelete);
}

export function inputFormHandler() {
  let regularInputLinkCount = 0;
  let headerInputLinkCount = 0;
  let donasiInputLinkCount = 0;
  let kontenInputLinkCount = 0;
  let digitalAksesInputLinkCount = 0;
  let paketJasaInputLinkCount = 0;
  let kerjasamaInputLinkCount = 0;
  let embedInputLinkCount = 0;
  let whatsappInputLinkCount = 0;
  let emailInputLinkCount = 0;
  let emailColletionInputLinkCount = 0;
  let videoRequestInputLinkCount = 0;

  function addNewInput(type, isNewElm = false) {
    let HTMLString = null;
    switch (type) {
      case "regular":
        HTMLString = regularInputLink(regularInputLinkCount);
        regularInputLinkCount++;
        break;
      case "header":
        HTMLString = headerInputLink(headerInputLinkCount);
        headerInputLinkCount++;
        break;
      case "donasi":
        HTMLString = donasiInputLink(donasiInputLinkCount);
        donasiInputLinkCount++;
        break;
      case "digital-akses":
        HTMLString = digitalAksesInputLink(digitalAksesInputLinkCount);
        digitalAksesInputLinkCount++;
        break;
      case "konten":
        HTMLString = kontenInputLink(kontenInputLinkCount);
        kontenInputLinkCount++;
        break;
      case "paket-jasa":
        HTMLString = paketJasaInputLink(paketJasaInputLinkCount);
        paketJasaInputLinkCount++;
        break;
      case "kerjasama":
        HTMLString = kerjasamaInputLink(kerjasamaInputLinkCount);
        kerjasamaInputLinkCount++;
        break;
      case "embed":
        HTMLString = embedInputLink(embedInputLinkCount);
        embedInputLinkCount++;
        break;
      case "whatsapp":
        HTMLString = whatsappInputLink(whatsappInputLinkCount);
        whatsappInputLinkCount++;
        break;
      case "email":
        HTMLString = emailInputLink(emailInputLinkCount);
        emailInputLinkCount++;
        break;
      case "email-collection":
        HTMLString = emailColletionInputLink(emailColletionInputLinkCount);
        emailColletionInputLinkCount++;
        break;
      case "video-request":
        HTMLString = videoRequestInputLink(videoRequestInputLinkCount);
        videoRequestInputLinkCount++;
        break;
      default:
        HTMLString = regularInputLink(regularInputLinkCount);
        regularInputLinkCount++;
        break;
    }
    let HTMLElm = htmlToElement(HTMLString);
    formLinkWrapper.insertBefore(HTMLElm, formLinkWrapper.firstChild);
    let HTMLObj = new inputForm(HTMLElm);

    reloadCustomSelect(HTMLElm.querySelector("select"));
    arrOfInputLinks.push(HTMLObj);

    if (isNewElm) {
      scrollToElm(HTMLObj.containerElm);
      focusInput(HTMLObj.tombolInput);
    }
  }

  function scrollToElm(elm) {
    window.scrollTo(0, $(elm).offset().top / 2);
  }

  function focusInput(elm) {
    setTimeout(() => {
      $(elm).focus();
    }, 10);
  }

  $(tambahLinkBtn).click(function () {
    addNewInput("regular", true);
  });

  tambahFiturSpesialBtn.forEach((btn) => {
    $(btn).click(function () {
      let type = btn.getAttribute("data-type");
      $("#specialFeatureModal").on("hide.bs.modal", function () {
        addNewInput(type, true);
      });
    });
  });

  addNewInput("email-collection");
  addNewInput("whatsapp");
  addNewInput("embed");
  addNewInput("video-request");
  addNewInput("kerjasama");
  addNewInput("paket-jasa");
  addNewInput("konten");
  addNewInput("digital-akses");
  addNewInput("donasi");
  addNewInput("header");
  addNewInput("regular");
}
