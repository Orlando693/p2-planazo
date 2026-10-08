const formulario = document.getElementById("formulario-plan");
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const fecha = document.getElementById("fecha");
const mensaje = document.getElementById("mensaje");
const volver = document.getElementById("volver");

formulario.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  if (nombre.value.trim() === "") {
    mensaje.textContent = "Ingresa un nombre para el plan.";
    return;
  }

  const nuevoPlan = {
    nombre: nombre.value.trim(),
    descripcion: descripcion.value.trim(),
    fecha: fecha.value,
    estado: "En decisión",
    alternativas: [],
    elegida: null
  };

  const respuesta = await fetch("/api/planes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoPlan)
  });
  const plan = await respuesta.json();

  localStorage.setItem("planActual", plan.id);
  window.location.href = "detalle-plan.html";
});

volver.addEventListener("click", function () {
  window.location.href = "inicio.html";
});
