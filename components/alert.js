function alertNotificacion(titulo) {
  const message = `Se agregó ${titulo} al Carrito`;
  return Toastify({
    text: message,
    duration: 2400,
    destination: "./carrito.html",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#FFFF",
      border: "1px solid black",
      color: "black",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
