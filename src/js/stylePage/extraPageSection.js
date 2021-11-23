export function extraPageSection() {
  $(document).ready(function () {
    $(".select2").select2({
      tags: true,
    });
  });

  var prevCardSelected = null;
  $(".card").click(function (e) {
    if (!prevCardSelected) {
      prevCardSelected = e.currentTarget;
    } else {
      prevCardSelected.classList.remove("active");
      prevCardSelected = e.currentTarget;
    }
    e.currentTarget.classList.add("active");
  });
}
