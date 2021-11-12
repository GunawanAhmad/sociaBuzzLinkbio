export function deleteHandler(elm, inputType, obj, cb) {
  let deleteConfirmation = document.querySelector("#confirm-delete-btn");
  let cancelDeleteBtn = document.querySelector("#cancel-delete-btn");
  let selected = elm;
  deleteConfirmation.addEventListener("click", function () {
    selected = elm;
    if (inputType == "circle") {
      obj.title = "";
      obj.imgSrc = "";
      obj.link = "";
      cb(obj.index);
    } else if (inputType == "form-link") {
      elm.remove();
    }
  });

  cancelDeleteBtn.addEventListener("click", function () {
    selected = null;
  });
}
