const contenedorCarrusel = document.querySelector(".carrusel-items");


let maxDesplazamientoIzquierda =
  contenedorCarrusel.scrollWidth - contenedorCarrusel.clientWidth;
let intervalo = null;
let paso = 1;

const iniciarDesplazamiento = () => {
  intervalo = setInterval(function () {
    contenedorCarrusel.scrollLeft = contenedorCarrusel.scrollLeft + paso;
    if (
      contenedorCarrusel.scrollLeft >= maxDesplazamientoIzquierda ||
      contenedorCarrusel.scrollLeft <= 0
    ) {
      paso = -paso;
    }
  }, 10);
};

const detenerDesplazamiento = () => {
  clearInterval(intervalo);
};

contenedorCarrusel.addEventListener("mouseover", () => {
  detenerDesplazamiento();
});

contenedorCarrusel.addEventListener("mouseout", () => {
  iniciarDesplazamiento();
});
