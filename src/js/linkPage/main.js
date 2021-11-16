import { circleLinkHandler } from "./circleLinkHandler.js";
import { inputFormHandler } from "./inputFormHandler.js";
import { rearrangeHandler } from "./rearrangeHandler.js";
import { previewHandler } from "./previewHandler.js";

circleLinkHandler();
inputFormHandler();
rearrangeHandler();
previewHandler();

//activate tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
