let previewBtn = document.querySelector(".preview-btn");
let phoneWrapper = document.querySelector(".phone-wrapper");
let closePreviewBtn = document.querySelector(".close-preview-btn");
export function previewHandler() {
  function togglePreview() {
    phoneWrapper.classList.toggle("show");
  }

  phoneWrapper.addEventListener("click", function (element) {
    if (element.target == this) togglePreview();
  });
  previewBtn.addEventListener("click", togglePreview);
  closePreviewBtn.addEventListener("click", togglePreview);

  (function () {
    var _overlay = document.getElementById("overlay");
    var _clientY = null; // remember Y position on touch start

    _overlay.addEventListener(
      "touchstart",
      function (event) {
        if (event.targetTouches.length === 1) {
          // detect single touch
          _clientY = event.targetTouches[0].clientY;
        }
      },
      false
    );

    _overlay.addEventListener(
      "touchmove",
      function (event) {
        if (event.targetTouches.length === 1) {
          // detect single touch
          disableRubberBand(event);
        }
      },
      false
    );

    function disableRubberBand(event) {
      var clientY = event.targetTouches[0].clientY - _clientY;

      if (_overlay.scrollTop === 0 && clientY > 0) {
        // element is at the top of its scroll
        event.preventDefault();
      }

      if (isOverlayTotallyScrolled() && clientY < 0) {
        //element is at the top of its scroll
        event.preventDefault();
      }
    }

    function isOverlayTotallyScrolled() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
      return (
        _overlay.scrollHeight - _overlay.scrollTop <= _overlay.clientHeight
      );
    }
  })();
}
