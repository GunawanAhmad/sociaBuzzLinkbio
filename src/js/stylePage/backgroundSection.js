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
}
