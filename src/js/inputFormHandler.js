import { regularInputLink } from "./inputFormHTMLSource.js";

let tambahLinkBtn = document.querySelector("#tambahLink-btn");
let formLinkWrapper = document.querySelector(".form-wrapper");
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

function addNewInput() {
  let HTMLString = regularInputLink(regularInputLinkCount);
  let HTMLElm = htmlToElement(HTMLString);
  formLinkWrapper.insertBefore(HTMLElm, formLinkWrapper.firstChild);
  arrOfInputLinks.push(new inputForm(HTMLElm));
}

let regularInputLinkCount = 1;
tambahLinkBtn.addEventListener("click", addNewInput);
addNewInput();

let selectedDeleteInput = null;
let isWantToDelete = false;
function inputForm(elm) {
  let containerElm = elm;
  let deleteBtn = containerElm.querySelector("#del-btn");
  let selectInputFormForDelete = function () {
    selectedDeleteInput = containerElm;
    isWantToDelete = true;
  };

  deleteBtn.addEventListener("click", selectInputFormForDelete);
}

let deleteConfirmation = document.querySelector("#delete-selcted-input");

deleteConfirmation.addEventListener("click", function () {
  if (isWantToDelete) {
    selectedDeleteInput.remove();
  }
});
