const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const nav = document.querySelector("#nav");
const carrusel = document.querySelector(".carrusel-items");

document.addEventListener("DOMContentLoaded", () => {
  abrir.addEventListener("click", () => {
    nav.classList.add("nav-visible");
  });
  cerrar.addEventListener("click", () => {
    nav.classList.remove("nav-visible");
  });

  let maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;
  let intervalo = null;
  let step = 1;
  const start = () => {
    intervalo = setInterval(function () {
      carrusel.scrollLeft = carrusel.scrollLeft + step;
      if (carrusel.scrollLeft == maxScrollLeft) {
        step = step * 1;
      } else if (carrusel.scrollLeft <= 0) {
        step = step * -1;
      }
    }, 10);
  };

  const stop = () => {
    clearInterval(intervalo);
  };

  carrusel.addEventListener("mouseover", () => {
    stop();
  });
  carrusel.addEventListener("mouseout", () => {
    start();
  });
});
