import { regularInputLink } from "./inputFormHTMLSource.js";

let tambahLinkBtn = document.querySelector("#tambahLink-btn");
let formLinkWrapper = document.querySelector(".form-wrapper");

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

let regularInputLinkCount = 1;
tambahLinkBtn.addEventListener("click", function () {
  let HTMLString = regularInputLink(regularInputLinkCount);
  let HTMLElm = htmlToElement(HTMLString);
  formLinkWrapper.insertBefore(HTMLElm, formLinkWrapper.firstChild);
});
