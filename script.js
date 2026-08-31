const menuToggle = document.querySelector(".menu-toggle");
const setMenu = (open) => {
  document.body.classList.toggle("sidebar-open", open);
  menuToggle?.setAttribute("aria-expanded", String(open));
};
menuToggle?.addEventListener("click", () => setMenu(true));
document.querySelector(".sidebar-close")?.addEventListener("click", () => setMenu(false));
document.querySelector(".sidebar-overlay")?.addEventListener("click", () => setMenu(false));
document.querySelector(".course-sidebar")?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});
