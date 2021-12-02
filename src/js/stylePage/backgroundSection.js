import { deleteHandler } from "../globalHandler/deleteHandler.js";

export function backgroundSection() {
  var prevCardSelected = null;
  $(".background-section .card").click(function (e) {
    if (!prevCardSelected) {
      prevCardSelected = e.currentTarget;
    } else {
      prevCardSelected.classList.remove("active");
      prevCardSelected = e.currentTarget;
    }
    e.currentTarget.classList.add("active");
  });

  $("#colorPicker-background-flat").change(function (e) {
    $("#flat-background").css(
      "background-color",
      $("#colorPicker-background-flat").spectrum("get")
    );
    e.preventDefault();
  });

  var colorPickGradient1 = $("#colorPicker-background-grad1");
  var colorPickGradient2 = $("#colorPicker-background-grad2");
  var rotateGradientBtn = $("#rotate-gradient-btn");
  var gradientRotationAngle = 0;
  $(colorPickGradient1).change(changeGradientBackground);
  $(colorPickGradient2).change(changeGradientBackground);

  function changeGradientBackground() {
    $("#gradient-background").css(
      "background",
      "linear-gradient(" +
        gradientRotationAngle +
        "deg," +
        $(colorPickGradient2).spectrum("get") +
        ", " +
        $(colorPickGradient1).spectrum("get") +
        ")"
    );
  }

  $(rotateGradientBtn).click(function (e) {
    if (gradientRotationAngle == 360) {
      gradientRotationAngle = 0;
    }
    gradientRotationAngle += 45;
    changeGradientBackground();
    e.preventDefault();
  });

  var backgroundImageInput = $("#background-image-input");
  var backgroundVideoInput = $("#background-video-input");
  var backgroundImage = $(".card.image-background .content img");
  var backgroundVideo = $(".card.video-background .content video");
  var backgroundImageDelBtn = $("#delete-image-background");
  var backgroundVideoDelBtn = $("#delete-video-background");

  $("#edit-image-background").click(function (e) {
    backgroundImageInput.click();
    e.preventDefault();
  });

  $("#edit-video-background").click(function (e) {
    backgroundVideoInput.click();
    e.preventDefault();
  });

  $(backgroundVideoInput).change(changeBackgroundVideo);

  $(backgroundImageInput).change(changeBackgroundImage);

  function changeBackgroundImage() {
    if (this.files) {
      let imgSrc = URL.createObjectURL(this.files[0]);
      $(backgroundImage).attr("src", imgSrc);
    }
  }

  function changeBackgroundVideo() {
    if (this.files) {
      let vidSrc = URL.createObjectURL(this.files[0]);
      $(backgroundVideo).attr("src", vidSrc);
    }
  }

  $(backgroundImageDelBtn).click(function (e) {
    deleteHandler(backgroundImage, "background");
    e.preventDefault();
  });

  $(backgroundVideoDelBtn).click(function (e) {
    deleteHandler(backgroundVideo, "background");
    e.preventDefault();
  });
}
