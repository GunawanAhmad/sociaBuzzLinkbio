export function deleteHandler(
  elm,
  inputType,
  obj = null,
  cb_1 = null,
  cb_2 = null
) {
  let deleteConfirmation = document.querySelector("#confirm-delete-btn");
  deleteConfirmation.addEventListener("click", deleteFunc);
  deleteConfirmation.removeEventListener("click", deleteFunc, true);

  function deleteFunc() {
    if (inputType == "circle") {
      obj.title = "";
      obj.imgSrc = "";
      obj.link = "";
      cb_1(obj.elm);
      cb_2(obj.index);
    } else if (inputType == "form-link") {
      elm_global.remove();
    } else if (inputType == "background") {
      $(elm).attr("src", "");
      cb_1();
    }
  }
}
