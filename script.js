const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const nav = document.querySelector("#nav");
const carrusel = document.querySelector(".carrusel-items");
const containerCards = document.getElementById("container-Card");

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
        step = step * -1;
      } else if (carrusel.scrollLeft <= 0) {
        step = step * 1;
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
        const productos = data.map((item) => {
          return ({ id, titulo, imagen, categoria, precio } = item);
        });
        mostrarProductosCard(productos);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  cargarProductos();

  function mostrarProductosCard(productos) {
    containerCards.innerHTML = "";
    console.log(productos);
    productos.forEach((item, index) => {
      console.log(index)
      const { id, imagen, titulo, precio, sizes, categoria } = item;
      const divCard = document.createElement("div");
      divCard.classList.add("card");

      const carrusel = document.createElement("div");
      carrusel.id = `carouselExample${index}`;
      carrusel.classList.add("carousel", "slide");

      const carouselInner = document.createElement("div");
      carouselInner.classList.add("carousel-inner");

      imagen.forEach((imgSrc, imageIndex) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");

        if (imageIndex === 0) {
          carouselItem.classList.add("active");
        }

        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = "img";
        img.classList.add("d-block", "w-100", "card-img");
        carouselItem.appendChild(img);

        carouselInner.appendChild(carouselItem);
      });

      carrusel.appendChild(carouselInner);

      const buttonAntes = document.createElement("button");
      buttonAntes.classList.add("carousel-control-prev");
      buttonAntes.type = "button";
      buttonAntes.setAttribute("data-bs-target", `#carouselExample${index}`);
      buttonAntes.setAttribute("data-bs-slide", "prev");
      buttonAntes.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>`;

      const buttonSigiente = document.createElement("button");
      buttonSigiente.classList.add("carousel-control-next");
      buttonSigiente.type = "button";
      buttonSigiente.setAttribute("data-bs-target", `#carouselExample${index}`);
      buttonSigiente.setAttribute("data-bs-slide", "next");
      buttonSigiente.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>`;

      carrusel.appendChild(buttonAntes);
      carrusel.appendChild(buttonSigiente);
      divCard.appendChild(carrusel);

      const titleCard = document.createElement("h3");
      titleCard.classList.add("card-title");
      titleCard.textContent = titulo;

      const priceElement = document.createElement("p");
      priceElement.classList.add("card-precio");
      priceElement.textContent = `$ ${precio}`

      const containerButtonCar = document.createElement("div");
      containerButtonCar.classList.add("container-button-card");

      const buttonComprar = document.createElement("button");
      buttonComprar.classList.add("button-card");
      buttonComprar.textContent = "Comprar";
      // buttonComprar.addEventListener("click", comprarItem()); //CREAR LA FUNCION COMPRA RITEM

      const buttonVer = document.createElement("button");
      buttonVer.classList.add("button-card");
      buttonVer.textContent = "Ver";
      // buttonVer.addEventListener("click", openModal()); // CRERAR LA FUNCION OPEN MODAL

      divCard.appendChild(titleCard);
      divCard.appendChild(priceElement);
      containerButtonCar.appendChild(buttonComprar);
      containerButtonCar.appendChild(buttonVer);
      divCard.appendChild(containerButtonCar);

      containerCards.appendChild(divCard);
    });
  }
});
