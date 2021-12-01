export function buttonSection() {
  var prevButtonSelected = null;
  $(".button-section .btn-style").click(function (e) {
    if (!prevButtonSelected) {
      prevButtonSelected = this;
    } else {
      prevButtonSelected.classList.remove("active");
      prevButtonSelected = this;
    }
    prevButtonSelected.classList.add("active");
    e.preventDefault();
  });
}
