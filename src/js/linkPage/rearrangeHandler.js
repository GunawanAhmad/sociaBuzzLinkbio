export function rearrangeHandler() {
  //for input form
  let inputFormContainer = document.querySelector(".form-wrapper");
  new Sortable(inputFormContainer, {
    animation: 150,
    handle: ".drag-btn",
    ghostClass: "ghost",
    forceFallback: true,
  });

  //for circle link
  let circleLinkContainer = document.querySelector(".rounded-link-wrapper");
  new Sortable(circleLinkContainer, {
    animation: 150,
    handle: ".arrange-btn",
    ghostClass: "ghost",
    forceFallback: true,
  });
}
