export function profileSection() {
  //color input lib
  $(".colorPicker").spectrum({
    showPalette: true,
    showInput: true,
    showAlpha: true,
    allowEmpty: true,
    preferredFormat: "hex",
    palette: [
      ["#000", "#444", "#666", "#999", "#ccc", "#fff"],
      ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f"],
      ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3"],
      ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8"],
      ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc"],
      ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6"],
      ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394"],
      ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763"],
    ],
  });

  //input counter number
  $("#nama-profil-input").keyup(function (e) {
    $("#nama-profil-input-help").html(this.value.length + " / " + 60);
  });
  $("#deskripsi-input").keyup(function (e) {
    $("#deskripsi-input-help").html(this.value.length + " / " + 160);
  });

  //input profile image
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

    $uploadCrop = $("#upload-profile-img").croppie({
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
          $("#profile-img").attr("src", resp);
          fetch(resp)
            .then((res) => res.blob())
            .then((res) => console.log(res));
        });
    });
  }

  uploadProfileImg();

  //delete profile imag
  $(".profile-section #del-btn").click(function (e) {
    deleteConfirmation();
  });

  function deleteConfirmation() {
    document
      .querySelector("#confirm-delete-btn")
      .addEventListener("click", removeAtr);

    document
      .querySelector("#confirm-delete-btn")
      .removeEventListener("click", removeAtr, true);
    function removeAtr() {
      $("#profile-img").attr("src", "");
      $("#upload-profile-img").croppie("destroy");
      $(".file-name").html("No file selected");
      uploadProfileImg();
    }
  }
}
