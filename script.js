const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const nav = document.querySelector("#nav");
const containerCards = document.getElementById("container-Card");
const numeroCarrito = document.getElementById("numCarrito");

document.addEventListener("DOMContentLoaded", () => {
  abrir.addEventListener("click", () => {
    nav.classList.add("nav-visible");
  });
  cerrar.addEventListener("click", () => {
    nav.classList.remove("nav-visible");
  });
});
let productos = [];
const productosEnCarrito = [];

function cargarProductos() {
  fetch("./productos.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo obtener el archivo");
      }
      return response.json();
    })
    .then((data) => {
      productos = data;
      mostrarProductosCard(productos);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
}

cargarProductos();

function mostrarProductosCard(productos) {
  containerCards.innerHTML = "";

  productos.forEach((item, index) => {
    const { id, imagen, titulo, precio, sizes, descripcion } = item;
    const divCard = document.createElement("div");
    divCard.classList.add("card");

    const carrusel = document.createElement("div");
    carrusel.id = `carouselExample${index}`;
    carrusel.classList.add("carousel", "slide");

    const carouselInner = document.createElement("div");
    carouselInner.classList.add("carousel-inner");

    const imgCard = item.imagen;
    imgCard.forEach((imgsrc, imageIndex) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");

      if (imageIndex === 0) {
        carouselItem.classList.add("active");
      }

      const img = document.createElement("img");
      img.src = imgsrc.url;
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
    priceElement.textContent = `$ ${precio}`;

    const containerButtonCar = document.createElement("div");
    containerButtonCar.classList.add("container-button-card");

    const buttonComprar = document.createElement("button");
    buttonComprar.classList.add("button-card");
    buttonComprar.textContent = "Comprar";
    buttonComprar.id = id;

    const buttonVer = document.createElement("button");
    buttonVer.classList.add("button-card");
    buttonVer.textContent = "Ver";
    buttonVer.id = id;

    divCard.appendChild(titleCard);
    divCard.appendChild(priceElement);
    containerButtonCar.appendChild(buttonComprar);
    containerButtonCar.appendChild(buttonVer);
    divCard.appendChild(containerButtonCar);

    containerCards.appendChild(divCard);

    buttonComprar.addEventListener("click", comprarItem);

    buttonVer.addEventListener("click", () => {
      abrirModal(imagen, titulo, precio, descripcion, sizes);
    });
  });
}

function comprarItem(e) {
  const idBoton = e.currentTarget.id;

  const productosAgregados = productos.find((item) => item.id === idBoton);

  const productoExistente = productosEnCarrito.find(
    (product) => product.id === idBoton
  );

  if (productoExistente) {
    productoExistente.cantidad++;
    alertNotificacion(productosAgregados.titulo);
  } else {
    const productoPushCarrito = {
      id: productosAgregados.id,
      titulo: productosAgregados.titulo,
      precio: productosAgregados.precio,
      imagen: productosAgregados.imagen[0],
      cantidad: 1,
    };
    productosEnCarrito.push(productoPushCarrito);
    alertNotificacion(productosAgregados.titulo);
  }
  actualizarNumeroCarrito();
  const setearLocalStorage = JSON.stringify(productosEnCarrito);
  saveLocalStorage(setearLocalStorage);
}

function actualizarNumeroCarrito() {
  let numero = productosEnCarrito.reduce((a, item) => a + item.cantidad, 0);
  numeroCarrito.innerText = numero;
}

function saveLocalStorage(array) {
  localStorage.setItem("productosCarrito", array);
}

function abrirModal(imagenes, titulo, precio, descripcion, sizes) {
  const bodyContainer = document.createElement("div");
  bodyContainer.classList.add("totalContainer");

  if (document.querySelector(".totalContainer")) {
    document.querySelector(".totalContainer").remove();
  }

  const containerModal = document.createElement("div");
  containerModal.classList.add("contenedor-modal");

  const carousel = document.createElement("div");
  carousel.classList.add("carousel", "slide", "carousel-modal");
  carousel.id = "modalCarousel";

  const carouselIndicators = document.createElement("div");
  carouselIndicators.classList.add("carousel-indicators");

  const carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");

  imagenes.forEach((imagen, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");

    if (index === 0) {
      carouselItem.classList.add("active");
    }

    const img = document.createElement("img");
    img.classList.add("d-block", "w-100", "modal-img");
    img.src = imagen.url;
    img.alt = "imagenDetalle";

    carouselItem.appendChild(img);
    carouselInner.appendChild(carouselItem);

    const indicator = document.createElement("button");
    indicator.type = "button";
    indicator.setAttribute("data-bs-target", "#modalCarousel");
    indicator.setAttribute("data-bs-slide-to", index.toString());
    if (index === 0) {
      indicator.classList.add("active");
    }
    carouselIndicators.appendChild(indicator);
  });

  const prevButton = document.createElement("button");
  prevButton.classList.add("carousel-control-prev");
  prevButton.type = "button";
  prevButton.setAttribute("data-bs-target", "#modalCarousel");
  prevButton.setAttribute("data-bs-slide", "prev");
  prevButton.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>`;

  const nextButton = document.createElement("button");
  nextButton.classList.add("carousel-control-next");
  nextButton.type = "button";
  nextButton.setAttribute("data-bs-target", "#modalCarousel");
  nextButton.setAttribute("data-bs-slide", "next");
  nextButton.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>`;

  carousel.appendChild(carouselIndicators);
  carousel.appendChild(carouselInner);
  carousel.appendChild(prevButton);
  carousel.appendChild(nextButton);

  const sectionModal = document.createElement("section");
  sectionModal.classList.add("section-modal");

  const botonCerrar = document.createElement("button");
  botonCerrar.classList.add("cerrar-modal");
  botonCerrar.innerHTML = `<i class="bi bi-x-lg"></i>`;
  botonCerrar.addEventListener("click", () => {
    bodyContainer.remove();
  });

  const tituloModal = document.createElement("h2");
  tituloModal.classList.add("titulo-modal");
  tituloModal.textContent = titulo;

  const descripcionModal = document.createElement("p");
  descripcionModal.classList.add("modal-description");
  descripcionModal.textContent = descripcion;

  const talle = document.createElement("ul");
  talle.classList.add("modal-sizes");
  sizes.forEach((size) => {
    const sizeItem = document.createElement("li");
    sizeItem.textContent = size;
    talle.appendChild(sizeItem);
  });

  const precioModal = document.createElement("h3");
  precioModal.classList.add("modal-price");
  precioModal.textContent = `$ ${precio}`;

  sectionModal.appendChild(botonCerrar);
  sectionModal.appendChild(tituloModal);
  sectionModal.appendChild(descripcionModal);
  sectionModal.appendChild(talle);
  sectionModal.appendChild(precioModal);

  containerModal.appendChild(carousel);
  containerModal.appendChild(sectionModal);

  bodyContainer.appendChild(containerModal);

  document.body.appendChild(bodyContainer);
  bodyContainer.style.display = "flex";
}
