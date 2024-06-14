const mainContainer = document.getElementById("main-carrito");
let productos = localStorage.getItem("productosCarrito");
productos = JSON.parse(productos);

mostrarProductosCarrito(productos);

function mostrarProductosCarrito(productos) {
  mainContainer.innerHTML = "";
  console.log(productos);

  productos.forEach((item) => {
    console.log(item);
    const div = document.createElement("div");
    div.classList.add("container-carrito");

    const img = document.createElement("img");
    img.classList.add("img-carrito");
    img.src = item.imagen;
    img.alt = item.titulo;

    const divInformacion = document.createElement("div");
    divInformacion.className = "info-carrito";

    const nombreProducto = document.createElement("h2");
    nombreProducto.className = "nombre-producto-carrito";
    nombreProducto.textContent = item.titulo;

    const cantidad = document.createElement("p");
    cantidad.className = "cantidad";
    cantidad.textContent = `Cantidad: ${item.cantidad}`;

    const precio = document.createElement("p");
    precio.className = "price-carrito";
    precio.textContent = `Precio Total: $ ${item.precio * item.cantidad}`;

    divInformacion.appendChild(nombreProducto);
    divInformacion.appendChild(cantidad);
    divInformacion.appendChild(precio);

    div.appendChild(img);
    div.appendChild(divInformacion);

    mainContainer.appendChild(div);
  });

  const containerFinalizarCarrito = document.createElement("div");
  containerFinalizarCarrito.className = "finalizar-carrito";

  const total = document.createElement("p");
  total.className = "price-carrito";
  //   total.textContent = `Total : ${totalProductos()}`;

  const buttonFinalizarCompra = document.createElement("button");
  buttonFinalizarCompra.className = "finalizar-compra";
  buttonFinalizarCompra.innerText = "Finalizar Compra";

  containerFinalizarCarrito.appendChild(total);
  containerFinalizarCarrito.appendChild(buttonFinalizarCompra);

  mainContainer.appendChild(containerFinalizarCarrito);
}
