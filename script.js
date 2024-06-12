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

  let productos = [];

  const url = "productos.json";
  function cargarProductos() {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo obtener el archivo");
        }
        return response.json();
      })
      .then((data) => {
        productos = data.products;
        mostrarProductosCard(productos);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  cargarProductos();

  //las creao para depsues mostrarlas

  function mostrarProductosCard(productos) {
    const containerCards = document.getElementById("container-Card");
    productos.forEach((item) => {
      const divCard = document.createElement("div");
      divCard.classList.add("card");

      const carrusel = document.createElement("div");
      carrusel.id = "carouselExample";
      carrusel.classList.add("carousel", "slide");

      const contenedorIntertoCarrusel = document.createElement("div");
      contenedorIntertoCarrusel.classList.add("carousel-inner");
      console.log(item.image)
      item.image.forEach((image, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (index === 0) {
          carouselItem.classList.add("activo");
        }
        const img = document.createElement("img");
        img.src = image;
        img.alt = "img";
        img.classList.add("card-img");
        carouselItem.appendChild(img);
        contenedorIntertoCarrusel.appendChild(carouselItem);
      });
      carrusel.appendChild(contenedorIntertoCarrusel);

      const buttonAntes = document.createElement("button");
      buttonAntes.classList.add("carousel-control-prev");
      buttonAntes.type = "button";
      buttonAntes.setAttribute("data-bs-target", "#carouselExample");
      buttonAntes.setAttribute("data-bs-slide", "prev");
      buttonAntes.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>`;

      const buttonSigiente = document.createElement("button");
      buttonSigiente.classList.add("carousel-control-next");
      buttonSigiente.type = "button";
      buttonSigiente.setAttribute("data-bs-target", "#carouselExample");
      buttonSigiente.setAttribute("data-bs-slide", "next");

      buttonSigiente.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>`;
      carrusel.appendChild(buttonAntes);
      carrusel.appendChild(buttonSigiente);
      divCard.appendChild(carrusel);

      const titleCard = document.createElement("h3");
      titleCard.classList.add("card-title");
      titleCard.textContent = item.name;

      const price = document.createElement("p");
      price.classList.add("card-precio");
      price.textContent = item.price;

      const containerButtonCar = document.createElement("div");
      containerButtonCar.classList.add("container-button-card");

      const buttonComprar = document.createElement("button");
      buttonComprar.classList.add("button-card");
      buttonComprar.textContent = "Comprar";
      buttonComprar.addEventListener("click", comprarItem()); //CREAR LA FUINCION COMPRA RITEM

      const buttonVer = document.createElement("button");
      buttonVer.classList.add("button-card");
      buttonVer.textContent = "Ver";
      buttonVer.addEventListener("click", openModal()); // CRERAR LA FUNCION OPEN MODAL

      containerCards.appendChild(divCard);
    });
  }
});
