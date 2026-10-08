const formulario = document.getElementById("formulario-login");
const correo = document.getElementById("correo");
const password = document.getElementById("password");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  if (correo.value.trim() === "" || password.value.trim() === "") {
    mensaje.textContent = "Completa todos los campos.";
    return;
  }

  window.location.href = "inicio.html";
});
