const mainContainer = document.getElementById("main-carrito");
const tituloCarritoVacio = document.getElementById("titulocarrito");
let productos = localStorage.getItem("productosCarrito");
productos = JSON.parse(productos);

document.addEventListener(
  "DOMContentLoaded",
  mostrarProductosCarrito(productos)
);

function mostrarProductosCarrito(productos) {
  mainContainer.innerHTML = "";

  productos.forEach((item) => {
    const { cantidad, imagen, precio, titulo } = item;

    const div = document.createElement("div");
    div.classList.add("container-carrito");

    const img = document.createElement("img");
    img.className = "img-carrito ";
    img.src = imagen.url;
    img.alt = "producto";
    div.appendChild(img);

    const divInformacion = document.createElement("div");
    divInformacion.className = "info-carrito";

    const nombreProducto = document.createElement("h2");
    nombreProducto.className = "nombre-producto-carrito";
    nombreProducto.textContent = titulo;

    const cantidadProducto = document.createElement("p");
    cantidadProducto.className = "cantidad";
    cantidadProducto.textContent = `Cantidad: ${cantidad}`;

    const precioTotal = document.createElement("p");
    precioTotal.className = "price-carrito";
    precioTotal.textContent = `Precio Total: $ ${precio * cantidad}`;

    divInformacion.appendChild(nombreProducto);
    divInformacion.appendChild(cantidadProducto);
    divInformacion.appendChild(precioTotal);
    div.appendChild(divInformacion);

    mainContainer.appendChild(div);
  });

  const containerFinalizarCarrito = document.createElement("div");
  containerFinalizarCarrito.className = "finalizar-carrito";

  const total = document.createElement("p");
  total.className = "total-carrito";
  //   total.textContent = `Total : $ ${calcularTotal(productos)}`;
  const buttonFinalizarCompra = document.createElement("button");
  buttonFinalizarCompra.className = "finalizar-compra";
  buttonFinalizarCompra.innerText = "Finalizar Compra";

  containerFinalizarCarrito.appendChild(total);
  containerFinalizarCarrito.appendChild(buttonFinalizarCompra);

  mainContainer.appendChild(containerFinalizarCarrito);
}
