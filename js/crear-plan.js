const formulario = document.getElementById("formulario-plan");
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const fecha = document.getElementById("fecha");
const mensaje = document.getElementById("mensaje");
const volver = document.getElementById("volver");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  if (nombre.value.trim() === "") {
    mensaje.textContent = "Ingresa un nombre para el plan.";
    return;
  }

  const planes = JSON.parse(localStorage.getItem("planes")) || [];
  const nuevoPlan = {
    id: Date.now(),
    nombre: nombre.value.trim(),
    descripcion: descripcion.value.trim(),
    fecha: fecha.value,
    estado: "En decisión",
    alternativas: [],
    elegida: null
  };

  planes.push(nuevoPlan);
  localStorage.setItem("planes", JSON.stringify(planes));
  localStorage.setItem("planActual", nuevoPlan.id);
  window.location.href = "detalle-plan.html";
});

volver.addEventListener("click", function () {
  window.location.href = "inicio.html";
});
