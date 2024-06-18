const mainContainer = document.getElementById("main-carrito");
const tituloCarritoVacio = document.getElementById("carrito-vacio");
let productosEnCarrit = localStorage.getItem("productosCarrito");
productosEnCarrit = JSON.parse(productosEnCarrit) || [];

document.addEventListener("DOMContentLoaded", () => {
  if (!productosEnCarrit || productosEnCarrit.length === 0) {
    tituloCarritoVacio.classList.add("carrito-vacio");
  } else {
    tituloCarritoVacio.classList.remove("carrito-vacio");
    mostrarProductosCarrito();
  }
});

function mostrarProductosCarrito() {
  mainContainer.innerHTML = " ";

  if (productosEnCarrit && productosEnCarrit.length > 0) {
    productosEnCarrit.forEach((item) => {
      const { cantidad, imagen, precio, titulo, id } = item;

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
      precioTotal.textContent = `Total: $ ${precio * cantidad}`;

      const eliminarProducto = document.createElement("button");
      eliminarProducto.className = "eliminar-producto-delcarrito";
      eliminarProducto.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
      eliminarProducto.id = id;
      eliminarProducto.addEventListener("click", eliminarItemCarrito);

      divInformacion.appendChild(nombreProducto);
      divInformacion.appendChild(cantidadProducto);
      divInformacion.appendChild(precioTotal);
      divInformacion.appendChild(eliminarProducto);
      div.appendChild(divInformacion);

      mainContainer.appendChild(div);
    });

    const containerFinalizarCarrito = document.createElement("div");
    containerFinalizarCarrito.className = "finalizar-carrito";

    const total = document.createElement("p");
    total.className = "total-carrito";
    total.textContent = `Total : $ ${calcularTotal()}`;
    const buttonFinalizarCompra = document.createElement("button");
    buttonFinalizarCompra.className = "finalizar-compra";
    buttonFinalizarCompra.innerText = "Finalizar Compra";
    buttonFinalizarCompra.addEventListener("click", finalizarCompra);

    containerFinalizarCarrito.appendChild(total);
    containerFinalizarCarrito.appendChild(buttonFinalizarCompra);

    mainContainer.appendChild(containerFinalizarCarrito);
  }

  tituloCarritoVacio.style.display = "block";
}

function calcularTotal() {
  return productosEnCarrit.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
}

function eliminarItemCarrito(e) {
  const itemId = e.currentTarget.id;
  const itemIndex = productosEnCarrit.findIndex(
    (producto) => producto.id === itemId
  );

  productosEnCarrit.splice(itemIndex, 1);

  localStorage.setItem("productosCarrito", JSON.stringify(productosEnCarrit));
  mostrarProductosCarrito();
}

function finalizarCompra() {
  Swal.fire({
    title: "Compra realizada con éxito!!",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__bounceOutDown",
    },
    width: "400px",
    customClass: {
      confirmButton: "swal2-confirm",
    },
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      localStorage.removeItem("productosCarrito");
      productosEnCarrit = [];
      mostrarProductosCarrito();
    }
  });
}
