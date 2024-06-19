const form = document.querySelector("#form");
const items = document.querySelectorAll(".item");
const name = document.querySelector("#name");
const mail = document.querySelector("#email");
const mensaje = document.querySelector("#comentarios");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (checkInputs(items)) return enviarmail();
});

function checkInputs(items) {
  let isValid = true;

  items.forEach((item) => {
    if (
      item.tagName.toLocaleLowerCase() === "input" ||
      item.tagName.toLocaleLowerCase() === "textarea"
    ) {
      if (item.value === "" || item.value.length === 0) {
        isValid = false;
        item.classList.add("error-inputs");
      } else {
        item.classList.remove("error-inputs");
      }
    }
    item.addEventListener("keyup", () => {
      if (item.value === "" || item.value.length === 0) {
        item.classList.add("error-inputs");
      } else {
        item.classList.remove("error-inputs");
      }

      if (!verificarEmail(mail)) {
        isValid = false;
      }
    });
  });
  return isValid;
}

function verificarEmail(mail) {
  const regex =
    /^[a-zA-Z0-9._-]+@(gmail|hotmail|yahoo|outlook|aol|icloud|protonmail|yandex|mail|inbox)\.[a-zA-Z]{2,6}$/;
  if (regex.test(mail)) {
    mail.classList.remove("error-inputs");
    return true;
  } else {
    mail.classList.add("error-inputs");
    return false;
  }
}

function enviarmail() {
  const bodyMensaje = `Nombre: ${name.value} <br> Email: ${mail.value} <br> Mensaje: ${mensaje.value}`;
  Email.send({
    SecureToken: "833fe71e-0e19-4732-9d67-e3f8521914d8",
    Password: "B5255044417D144C2974A300378E34908F03",
    To: "gianb04@gmail.com",
    From: "gianb04@gmail.com",
    Subject: "This is the subject",
    Body: bodyMensaje,
  }).then((message) => alert(message));
}
