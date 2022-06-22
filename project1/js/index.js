const panel = document.querySelectorAll(".panel");

panel.forEach((item) => {
  item.addEventListener("click", () => {
    removeActiveClasses();
    item.classList.add("active");
  });
});

function removeActiveClasses() {
  panel.forEach((item) => {
    item.classList.remove("active");
  });
}
