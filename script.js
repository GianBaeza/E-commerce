const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const nav = document.querySelector("#nav");

document.addEventListener("DOMContentLoaded", () => {
  abrir.addEventListener("click", () => {
    nav.classList.add("nav-visible");
  });
  cerrar.addEventListener("click", () => {
    nav.classList.remove("nav-visible");
  });
});
