let elm_global;
let obj_global;
let inputType_global;
let updateCircleElm_global;
let toggleCheckboxAndDelBtn_global;
export function deleteHandler(
  elm,
  inputType,
  obj,
  updateCirlceElm,
  toggleCheckboxAndDelBtn
) {
  elm_global = elm;
  inputType_global = inputType;
  obj_global = obj;
  updateCircleElm_global = updateCirlceElm;
  toggleCheckboxAndDelBtn_global = toggleCheckboxAndDelBtn;
  let deleteConfirmation = document.querySelector("#confirm-delete-btn");
  deleteConfirmation.addEventListener("click", deleteFunc);

  deleteConfirmation.removeEventListener("click", deleteFunc, true);
}

function deleteFunc() {
  if (inputType_global == "circle") {
    obj_global.title = "";
    obj_global.imgSrc = "";
    obj_global.link = "";
    toggleCheckboxAndDelBtn_global(obj_global.deleteBtn, obj_global.switch);
    updateCircleElm_global(obj_global.index);
  } else if (inputType_global == "form-link") {
    elm_global.remove();
  }
}
