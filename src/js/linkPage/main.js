import { circleLinkHandler } from "./circleLinkHandler.js";
import { inputFormHandler } from "./inputFormHandler.js";
import { rearrangeHandler } from "./rearrangeHandler.js";
import { previewHandler } from "../globalHandler/previewHandler.js";

circleLinkHandler();
inputFormHandler();
rearrangeHandler();
previewHandler();

//activate tooltip

function isTouchDevice() {
    return (
        true ==
        ("ontouchstart" in window ||
            (window.DocumentTouch && document instanceof DocumentTouch))
    );
}

if (isTouchDevice() === false) {
    $('[data-tooltip="tooltip"]').tooltip({ trigger: "hover" });
}

let $uploadCrop;
function uploadProfileImg() {
    var isValidSize = true;
    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            if (input.files[0].size > 1048576) {
                isValidSize = false;
                $(".modal .image-error-msg").html("Max 1MB");
                return;
            }
            isValidSize = true;
            reader.onload = function (e) {
                $(".upload-profile-img").addClass("ready");
                $uploadCrop
                    .croppie("bind", {
                        url: e.target.result,
                    })
                    .then(function () {
                        console.log("jQuery bind complete");
                    });
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            return false;
        }
    }

    $uploadCrop = $("#upload-thumbnail-img").croppie({
        viewport: {
            width: 250,
            height: 250,
            type: "circle",
        },
        enableExif: true,
    });

    $("#upload").on("change", function (e) {
        var _this = this;
        if (this.files) {
            var file, img;
            img = new Image();
            var objectUrl = URL.createObjectURL(this.files[0]);
            img.onload = function () {
                if (this.height > 300 && this.width > 300) {
                    readFile(_this);
                    URL.revokeObjectURL(objectUrl);
                    if (isValidSize && this.height > 300 && this.width > 300) {
                        $(".file-name").html(_this.files[0].name);
                        $(".modal .image-error-msg").html("");
                    }
                } else {
                    $(".modal .image-error-msg").html(
                        "Min height 300px dan min width 300px"
                    );
                }
            };
            img.src = objectUrl;
        }
    });

    $(".get-cropped-img").on("click", function (ev) {
        $uploadCrop
            .croppie("result", {
                type: "canvas",
                size: "viewport",
            })
            .then(function (resp) {
                fetch(resp)
                    .then((res) => res.blob())
                    .then((res) => console.log(res));
            });
    });
}

uploadProfileImg();
