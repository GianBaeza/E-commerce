const form = document.querySelector("#form");
const items = document.querySelectorAll(".item");
const email = document.getElementById("email");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs(items);
});

// function enviarEmail() {}

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

      if (!verificarEmail(email)) {
        isValid = false;
      }
    });
  });
  return isValid;
}

function verificarEmail(email) {
  const regex =
    /^[a-zA-Z0-9._-]+@(gmail|hotmail|yahoo|outlook|aol|icloud|protonmail|yandex|mail|inbox)\.[a-zA-Z]{2,6}$/;
  if (regex.test(email)) {
    email.classList.remove("error-inputs");
    return true;
  } else {
    email.classList.add("error-inputs");
    return false;
  }
}
