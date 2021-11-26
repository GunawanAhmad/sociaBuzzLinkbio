(function (modules) {
  function require(id) {
    const [fn, mapping] = modules[id];

    function localRequire(name) {
      return require(mapping[name]);
    }

    const module = { exports: {} };

    fn(localRequire, module, module.exports);

    return module.exports;
  }

  require(0);
})({
  0: [
    function (require, module, exports) {
      "use strict";

      var _circleLinkHandler = require("./circleLinkHandler.js");

      var _inputFormHandler = require("./inputFormHandler.js");

      var _rearrangeHandler = require("./rearrangeHandler.js");

      var _previewHandler = require("./previewHandler.js");

      (0, _circleLinkHandler.circleLinkHandler)();
      (0, _inputFormHandler.inputFormHandler)();
      (0, _rearrangeHandler.rearrangeHandler)();
      (0, _previewHandler.previewHandler)();

      //activate tooltip
      $(function () {
        $('[data-tooltip="tooltip"]').tooltip();
      });
    },
    {
      "./circleLinkHandler.js": 1,
      "./inputFormHandler.js": 2,
      "./rearrangeHandler.js": 3,
      "./previewHandler.js": 4,
    },
  ],
  1: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.circleLinkHandler = circleLinkHandler;

      var _deleteHandler = require("./deleteHandler.js");

      var cirlceLinkList = document.querySelectorAll(".circle-link-btn");
      var circleModalImg = document.getElementById("circle-link-modal-img");
      var circelModalTitle = document.getElementById("circle-link-title-input");
      var circelModalLink = document.getElementById("circle-link-link-input");
      var circleTitleLength = document.querySelector(".circle-title-length");
      var MAX_LENGTH = 9;
      var currentLength = 0;

      var ArrOfCircleLinkObj = [];

      function circleLinkHandler() {
        getAllCircleValue();
        var selectedCirlceLink = null;
        var circleImg = {
          src: "",
          index: "",
        };

        cirlceLinkList.forEach(function (element, index) {
          element.addEventListener("click", function () {
            selectedCirlceLink = cirlceLinkList[index];

            circleModalImg.src = selectedCirlceLink
              .querySelector("img")
              .getAttribute("src");

            circleImg.src = circleModalImg.src;
            circleImg.index = index;

            circelModalTitle.value =
              selectedCirlceLink.querySelector(".cirlce-link-title").innerText;
            currentLength = circelModalTitle.value.length;
            circleTitleLength.textContent = currentLength + " / " + MAX_LENGTH;

            circelModalLink.value =
              selectedCirlceLink.getAttribute("data-link");
          });
        });

        circleTitleLength.textContent = currentLength + " / " + MAX_LENGTH;
        circelModalTitle.addEventListener("keyup", function (e) {
          currentLength = e.target.value.length;
          circleTitleLength.textContent = currentLength + " / " + MAX_LENGTH;
        });

        var tempImgSrc = "";
        document
          .getElementById("circle-link-img-input")
          .addEventListener("change", function () {
            if (this.files[0].size > 1048576) {
              alert("Max 1MB");
              this.value = "";
            }
            tempImgSrc = window.URL.createObjectURL(this.files[0]);
            circleModalImg.src = tempImgSrc;
            this.value = "";
          });

        document
          .getElementById("circle-link-save-btn")
          .addEventListener("click", function () {
            if (tempImgSrc) {
              selectedCirlceLink
                .querySelector("img")
                .setAttribute("src", tempImgSrc);
              tempImgSrc = "";
            }

            selectedCirlceLink.querySelector(".cirlce-link-title").innerText =
              circelModalTitle.value;

            selectedCirlceLink.setAttribute("data-link", circelModalLink.value);
          });
      }

      function getAllCircleValue() {
        cirlceLinkList.forEach(function (elm, idx) {
          var img = elm
            .querySelector("#circle-img-" + (idx + 1))
            .getAttribute("src");
          var title = elm.querySelector(".cirlce-link-title").innerHTML;
          var link = elm.getAttribute("data-link");
          var active = elm.querySelector("input[type='checkbox']").checked;

          ArrOfCircleLinkObj.push(
            new CircleLinkObj(active, title, img, link, elm, idx)
          );
        });
      }

      function CircleLinkObj(active, title, imgSrc, link, elm, index) {
        this.link = link;
        this.title = title;
        this.imgSrc = imgSrc;
        this.active = active;
        this.elm = elm;
        this.index = index;
        var _this = this;

        this.deleteBtn = elm.querySelector("#del-btn");
        this.deleteBtn.addEventListener("click", function () {
          (0,
          _deleteHandler.deleteHandler)(_this.elm, "circle", _this, updateCircleLinkElm);
        });
      }

      function updateCircleLinkElm(index) {
        cirlceLinkList[index].querySelector(".cirlce-link-title").innerHTML =
          "";
        cirlceLinkList[index].querySelector(
          "input[type='checkbox']"
        ).checked = false;
        cirlceLinkList[index]
          .querySelector("#circle-img-" + (index + 1))
          .setAttribute("src", "");
        cirlceLinkList[index].setAttribute("data-link", "");
      }
    },
    { "./deleteHandler.js": 5 },
  ],
  2: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.inputFormHandler = inputFormHandler;

      var _inputFormHTMLSource = require("./inputFormHTMLSource.js");

      var _deleteHandler = require("./deleteHandler.js");

      var tambahLinkBtn = document.querySelector("#tambahLink-btn");
      var formLinkWrapper = document.querySelector(".form-wrapper");
      var tambahFiturSpesialBtn = document.querySelectorAll(
        ".add-fitur-spesial-btn"
      );
      var arrOfInputLinks = [];

      /**
       * @param {String} HTML representing a single element
       * @return {Element}
       */
      function htmlToElement(html) {
        var template = document.createElement("template");
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
      }

      function reloadFlexSelect(elm) {
        if (elm) {
          $(document).ready(function () {
            $(elm).select2({
              tags: true,
            });
          });
        }
      }

      function inputForm(elm) {
        var containerElm = elm;
        var deleteBtn = containerElm.querySelector("#del-btn");
        var selectInputFormForDelete = function selectInputFormForDelete() {
          (0, _deleteHandler.deleteHandler)(containerElm, "form-link");
        };
        deleteBtn.addEventListener("click", selectInputFormForDelete);
      }

      function inputFormHandler() {
        var regularInputLinkCount = 0;
        var headerInputLinkCount = 0;
        var donasiInputLinkCount = 0;
        var kontenInputLinkCount = 0;
        var digitalAksesInputLinkCount = 0;
        var paketJasaInputLinkCount = 0;
        var kerjasamaInputLinkCount = 0;
        var embedInputLinkCount = 0;
        var whatsappInputLinkCount = 0;
        var emailInputLinkCount = 0;
        var emailColletionInputLinkCount = 0;
        var videoRequestInputLinkCount = 0;
        function addNewInput(type) {
          var HTMLString = null;
          switch (type) {
            case "regular":
              HTMLString = (0, _inputFormHTMLSource.regularInputLink)(
                regularInputLinkCount
              );
              regularInputLinkCount++;
              break;
            case "header":
              HTMLString = (0, _inputFormHTMLSource.headerInputLink)(
                headerInputLinkCount
              );
              headerInputLinkCount++;
              break;
            case "donasi":
              HTMLString = (0, _inputFormHTMLSource.donasiInputLink)(
                donasiInputLinkCount
              );
              donasiInputLinkCount++;
              break;
            case "digital-akses":
              HTMLString = (0, _inputFormHTMLSource.digitalAksesInputLink)(
                digitalAksesInputLinkCount
              );
              digitalAksesInputLinkCount++;
              // reloadFlexSelect();
              break;
            case "konten":
              HTMLString = (0, _inputFormHTMLSource.kontenInputLink)(
                kontenInputLinkCount
              );
              kontenInputLinkCount++;
              // reloadFlexSelect();
              break;
            case "paket-jasa":
              HTMLString = (0, _inputFormHTMLSource.paketJasaInputLink)(
                paketJasaInputLinkCount
              );
              paketJasaInputLinkCount++;
              // reloadFlexSelect();
              break;
            case "kerjasama":
              HTMLString = (0, _inputFormHTMLSource.kerjasamaInputLink)(
                kerjasamaInputLinkCount
              );
              kerjasamaInputLinkCount++;
              // reloadFlexSelect();
              break;
            case "embed":
              HTMLString = (0, _inputFormHTMLSource.embedInputLink)(
                embedInputLinkCount
              );
              embedInputLinkCount++;
              break;
            case "whatsapp":
              HTMLString = (0, _inputFormHTMLSource.whatsappInputLink)(
                whatsappInputLinkCount
              );
              whatsappInputLinkCount++;
              break;
            case "email":
              HTMLString = (0, _inputFormHTMLSource.emailInputLink)(
                emailInputLinkCount
              );
              emailInputLinkCount++;
              break;
            case "email-collection":
              HTMLString = (0, _inputFormHTMLSource.emailColletionInputLink)(
                emailColletionInputLinkCount
              );
              emailColletionInputLinkCount++;
              break;
            case "video-request":
              HTMLString = (0, _inputFormHTMLSource.videoRequestInputLink)(
                videoRequestInputLinkCount
              );
              videoRequestInputLinkCount++;
              break;
            default:
              HTMLString = (0, _inputFormHTMLSource.regularInputLink)(
                regularInputLinkCount
              );
              regularInputLinkCount++;
              break;
          }
          var HTMLElm = htmlToElement(HTMLString);
          formLinkWrapper.insertBefore(HTMLElm, formLinkWrapper.firstChild);
          reloadFlexSelect(HTMLElm.querySelector("select"));
          arrOfInputLinks.push(new inputForm(HTMLElm));
        }

        tambahLinkBtn.addEventListener("click", function () {
          addNewInput("regular");
        });

        tambahFiturSpesialBtn.forEach(function (btn) {
          btn.addEventListener("click", function () {
            var type = btn.getAttribute("data-type");
            addNewInput(type);
          });
        });
        addNewInput("email-collection");
        addNewInput("whatsapp");
        addNewInput("embed");
        addNewInput("video-request");
        addNewInput("kerjasama");
        addNewInput("paket-jasa");
        addNewInput("konten");
        addNewInput("digital-akses");
        addNewInput("donasi");
        addNewInput("header");
        addNewInput("regular");
      }
    },
    { "./inputFormHTMLSource.js": 6, "./deleteHandler.js": 7 },
  ],
  3: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.rearrangeHandler = rearrangeHandler;
      function rearrangeHandler() {
        //for input form
        var inputFormContainer = document.querySelector(".form-wrapper");
        new Sortable(inputFormContainer, {
          animation: 150,
          handle: ".drag-btn",
          ghostClass: "ghost",
          forceFallback: true,
        });

        //for circle link
        var circleLinkContainer = document.querySelector(
          ".rounded-link-wrapper"
        );
        new Sortable(circleLinkContainer, {
          animation: 150,
          handle: ".arrange-btn",
          ghostClass: "ghost",
          forceFallback: true,
        });
      }
    },
    {},
  ],
  4: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.previewHandler = previewHandler;
      var previewBtn = document.querySelector(".preview-btn");
      var phoneWrapper = document.querySelector(".phone-wrapper");
      var closePreviewBtn = document.querySelector(".close-preview-btn");
      function previewHandler() {
        function togglePreview() {
          phoneWrapper.classList.toggle("show");
        }

        phoneWrapper.addEventListener("click", function (element) {
          if (element.target == this) togglePreview();
        });
        previewBtn.addEventListener("click", togglePreview);
        closePreviewBtn.addEventListener("click", togglePreview);
      }
    },
    {},
  ],
  5: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.deleteHandler = deleteHandler;
      function deleteHandler(elm, inputType, obj, cb) {
        var deleteConfirmation = document.querySelector("#confirm-delete-btn");
        var cancelDeleteBtn = document.querySelector("#cancel-delete-btn");
        var selected = elm;
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
    },
    {},
  ],
  6: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.regularInputLink = regularInputLink;
      exports.headerInputLink = headerInputLink;
      exports.donasiInputLink = donasiInputLink;
      exports.digitalAksesInputLink = digitalAksesInputLink;
      exports.kontenInputLink = kontenInputLink;
      exports.paketJasaInputLink = paketJasaInputLink;
      exports.kerjasamaInputLink = kerjasamaInputLink;
      exports.embedInputLink = embedInputLink;
      exports.whatsappInputLink = whatsappInputLink;
      exports.emailInputLink = emailInputLink;
      exports.emailColletionInputLink = emailColletionInputLink;
      exports.videoRequestInputLink = videoRequestInputLink;
      function regularInputLink(count) {
        return (
          '<div class="container d-flex form-group mb-4" id="regular-link-' +
          count +
          '">\n    <div >   \n      <button class="drag-btn" data-toggle="tooltip" data-placement="left" title="Drag to reorder">\n        <i class="fas fa-ellipsis-v"></i>\n      </button>\n    </div>\n    <div class="d-flex flex-column input-container p-3">\n      <input class="form-control  mb-3 tenpx" type="text" placeholder="Tulisan pada tombol">\n      <input class="form-control  mb-3 tenpx" type="text" placeholder="Link">\n      <div class="icon-container d-flex align-items-center">\n        <div class="switch mr-3 mr-sm-4">\n          <input type="checkbox" id="switch-1" /><label for="switch-1">Toggle</label>\n        </div>\n        <button class="mr-3 mr-sm-4" id="del-btn" data-toggle="modal" data-target="#deleteModal">\n          <i class="fas fa-trash-alt"></i>\n        </button>\n        <button class="mr-3 mr-sm-4">\n          <i class="fas fa-image"></i>\n        </button>\n        <button class="mr-3 mr-sm-4 chart">\n          <i class="fa fa-chart-bar" aria-hidden="true"></i>\n        </button>\n      </div>\n    </div>\n  </div>'
        );
      }

      function headerInputLink(count) {
        return (
          ' <div class="container d-flex form-group mb-4" id="header-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-toggle="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Header / Section Title\n    </p>\n    <input class="form-control mb-3 tenpx" type="text" placeholder="Tulisan pada tombol">\n    \n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-2" /><label for="switch-2">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" data-target="#deleteModal" id="del-btn">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function donasiInputLink(count) {
        return (
          '<div class="container d-flex form-group mb-4" id="donasi-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-toggle="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Terima Dukungan / Donasi <a class="font-weight-light text-primary" href=""><u>Settings</u></a>\n    </p>\n    <input class="form-control mb-3 tenpx" type="text" placeholder="Tulisan pada tombol">\n    \n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-3" /><label for="switch-3">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4">\n        <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function digitalAksesInputLink(count) {
        return (
          '<div class="container d-flex form-group mb-4" id="akses-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-toggle="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Jual Produk Digital / Akses  <a class="font-weight-light text-primary" href=""><u>Edit/Add\n      </u></a>\n    </p>\n    <div class="form-group">\n      <div class="select-container">\n        <select id="akses-' +
          count +
          '" class="select2" name="akses-' +
          count +
          '"  tabindex="2" data-placeholder="Pilih yang ingin ditampilkan\n        ">\n          <option value=""></option>\n          <option value="1">George Washington</option>\n          <option value="2">John Adams</option>\n          <option value="3">Thomas Jefferson</option>\n          <option value="4">James Madison</option>\n          <option value="5">James Monroe</option>\n          <option value="6">John Quincy Adams</option>\n          <option value="7">Andrew Jackson</option>\n          <option value="8">Martin Van Buren</option>\n          <option value="9">William Henry Harrison</option>\n        </select>\n        <span class="arrow-icon">\n          <i class="fas fa-chevron-down"></i>\n        </span>\n      </div>\n    </div>\n    <input class="form-control mb-3 tenpx" type="text" placeholder="Tulisan pada tombol">\n    \n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-4" /><label for="switch-4">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4">\n        <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function kontenInputLink(count) {
        return (
          '<div class="container d-flex form-group mb-4" id="konten-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-toggle="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Konten <a class="font-weight-light text-primary" href=""><u>Edit/Add\n      </u></a>\n    </p>\n    <div class="form-group">\n      <div class="select-container">\n        <div class="select-container">\n          <select id="konten-' +
          count +
          '" class="select2" name="konten-' +
          count +
          '"  tabindex="2" data-placeholder="Pilih yang ingin ditampilkan\n          ">\n            <option value=""></option>\n            <option value="1">George Washington</option>\n            <option value="2">John Adams</option>\n            <option value="3">Thomas Jefferson</option>\n            <option value="4">James Madison</option>\n            <option value="5">James Monroe</option>\n            <option value="6">John Quincy Adams</option>\n            <option value="7">Andrew Jackson</option>\n            <option value="8">Martin Van Buren</option>\n            <option value="9">William Henry Harrison</option>\n          </select>\n          <span class="arrow-icon">\n            <i class="fas fa-chevron-down"></i>\n          </span>\n        </div>\n        \n      </div>\n    </div>\n    <input class="form-control mb-3 tenpx" type="text" placeholder="Tulisan pada tombol">\n    \n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-5" /><label for="switch-5">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4">\n        <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function paketJasaInputLink(count) {
        return (
          '<div class="container d-flex form-group mb-4" id="paketJasa-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-toggle="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Paket Jasa  <a class="font-weight-light text-primary" href=""><u>Edit/Add\n      </u></a>\n    </p>\n    <div class="form-group">\n      <div class="select-container">\n        <select id="jasa-' +
          count +
          '" class="select2" name="jasa-' +
          count +
          '"  tabindex="2" data-placeholder="Pilih yang ingin ditampilkan\n        ">\n          <option value=""></option>\n          <option value="1">George Washington</option>\n          <option value="2">John Adams</option>\n          <option value="3">Thomas Jefferson</option>\n          <option value="4">James Madison</option>\n          <option value="5">James Monroe</option>\n          <option value="6">John Quincy Adams</option>\n          <option value="7">Andrew Jackson</option>\n          <option value="8">Martin Van Buren</option>\n          <option value="9">William Henry Harrison</option>\n        </select>\n        <span class="arrow-icon">\n          <i class="fas fa-chevron-down"></i>\n        </span>\n      </div>\n    </div>\n    <input class="form-control mb-3 tenpx" type="text" placeholder="Tulisan pada tombol">\n    \n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-6" /><label for="switch-6">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4">\n        <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function kerjasamaInputLink(count) {
        return (
          '<div class="container d-flex form-group mb-4"  id="kerjasama-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-toggle="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Terima Request Kerjasama   <a class="font-weight-light text-primary" href=""><u>Edit Profesi\n      </u></a>\n    </p>\n    <div class="form-group">\n      <div class="select-container">\n        <select id="requestKerjasama-' +
          count +
          '" class="select2" name="requestKerjasama-' +
          count +
          '"  tabindex="2" data-placeholder="Pilih yang ingin ditampilkan\n        ">\n          <option value=""></option>\n          <option value="1">George Washington</option>\n          <option value="2">John Adams</option>\n          <option value="3">Thomas Jefferson</option>\n          <option value="4">James Madison</option>\n          <option value="5">James Monroe</option>\n          <option value="6">John Quincy Adams</option>\n          <option value="7">Andrew Jackson</option>\n          <option value="8">Martin Van Buren</option>\n          <option value="9">William Henry Harrison</option>\n        </select>\n        <span class="arrow-icon">\n          <i class="fas fa-chevron-down"></i>\n        </span>\n      </div>\n    </div>\n    <input class="form-control mb-3 tenpx" type="text" placeholder="Tulisan pada tombol">\n    \n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-7" /><label for="switch-7">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4">\n        <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function embedInputLink(count) {
        return (
          '<div class="container d-flex form-group mb-4" id="embed-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-toggle="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Embed Video/Musik\n    </p>\n    <input class="form-control mb-3 tenpx" type="text" placeholder="Tulisan pada tombol">\n    <div class="mb-3">\n      <input class="form-control tenpx" type="text" placeholder="Link">\n      <span class="eightpx help-text">Masukkan link YouTube / Spotify\n      </span>\n    </div>\n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-8" /><label for="switch-8">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4">\n      <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function whatsappInputLink(count) {
        return (
          '<div class="container d-flex form-group mb-4" id="whatsapp-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-toggle="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Whatsapp\n    </p>\n    <input class="form-control mb-3 tenpx" type="text" placeholder="Tulisan pada tombol">\n    <div class="mb-3">\n      <input class="form-control tenpx" type="text" placeholder="Nomor Whatsapp">\n      <span class="eightpx help-text">Awali dengan kode negara | Contoh: <span class="text-primary" >62</span>87528371029\n      </span>\n    </div>\n    <div class="mb-3">\n      <input class="form-control tenpx" type="text" placeholder="Template pesan">\n      <span class="eightpx help-text">Optional\n\n      </span>\n    </div>\n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-9" /><label for="switch-9">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4">\n      <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function emailInputLink(count) {
        return (
          '<div class="container d-flex form-group mb-4" id="email-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-toggle="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Email\n    </p>\n    <input class="form-control mb-3 tenpx" type="text" placeholder="Tulisan pada tombol">\n    <input class="form-control mb-3 tenpx" type="text" placeholder="Alamat email">\n    \n    <div class="mb-3">\n      <input class="form-control tenpx" type="text" placeholder="Template judul email">\n      <span class="eightpx help-text">Optional\n      </span>\n    </div>\n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-10" /><label for="switch-10">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function emailColletionInputLink(count) {
        return (
          '<div class="container d-flex form-group mb-4" id="emailCollection-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-toggle="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Email Collection\n     \n    </p>\n    <input class="form-control mb-3 tenpx" type="text" placeholder="Tulisan pada tombol">\n    <input class="form-control mb-3 tenpx" type="text" placeholder="Tulisan pada tombol subscribe\n    ">\n    \n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-11" /><label for="switch-11">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4">\n        <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function videoRequestInputLink(count) {
        return (
          '<div class="container d-flex form-group mb-4" id="videoUcapan-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-toggle="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Terima Request Video Ucapan  <a class="font-weight-light text-primary" href=""><u>Settings</u></a>\n    </p>\n    <input class="form-control mb-3 tenpx" type="text" placeholder="Tulisan pada tombol">\n    \n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-3" /><label for="switch-3">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4">\n        <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }
    },
    {},
  ],
  7: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.deleteHandler = deleteHandler;
      function deleteHandler(elm, inputType, obj, cb) {
        var deleteConfirmation = document.querySelector("#confirm-delete-btn");
        var cancelDeleteBtn = document.querySelector("#cancel-delete-btn");
        var selected = elm;
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
    },
    {},
  ],
});
