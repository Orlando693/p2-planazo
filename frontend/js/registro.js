const formulario = document.getElementById("formulario-registro");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const password = document.getElementById("password");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  if (nombre.value.trim() === "" || correo.value.trim() === "" || password.value.trim() === "") {
    mensaje.textContent = "Completa todos los campos.";
    return;
  }

  const usuario = {
    nombre: nombre.value.trim(),
    correo: correo.value.trim(),
    password: password.value
  };

  localStorage.setItem("usuario", JSON.stringify(usuario));
  window.location.href = "login.html";
});
