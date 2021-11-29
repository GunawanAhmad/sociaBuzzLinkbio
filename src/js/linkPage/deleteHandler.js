let elm_global;
let obj_global;
let inputType_global;
let updateCircleElm_global;
let toggleTitleAndIconBtn_global;
export function deleteHandler(
  elm,
  inputType,
  obj,
  updateCirlceElm,
  toggleTitleAndIconBtn
) {
  elm_global = elm;
  inputType_global = inputType;
  obj_global = obj;
  updateCircleElm_global = updateCirlceElm;
  toggleTitleAndIconBtn_global = toggleTitleAndIconBtn;
  let deleteConfirmation = document.querySelector("#confirm-delete-btn");
  deleteConfirmation.addEventListener("click", deleteFunc);
  deleteConfirmation.removeEventListener("click", deleteFunc, true);
}

function deleteFunc() {
  if (inputType_global == "circle") {
    obj_global.title = "";
    obj_global.imgSrc = "";
    obj_global.link = "";
    toggleTitleAndIconBtn_global(obj_global.elm);
    updateCircleElm_global(obj_global.index);
  } else if (inputType_global == "form-link") {
    elm_global.remove();
  }
}
