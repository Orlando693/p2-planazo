const idPlan = localStorage.getItem("planActual");
const planes = JSON.parse(localStorage.getItem("planes")) || [];
const plan = planes.find(function (plan) {
  return plan.id == idPlan;
});
const contenidoPlan = document.getElementById("contenido-plan");
const nombrePlan = document.getElementById("nombre-plan");
const descripcionPlan = document.getElementById("descripcion-plan");
const fechaPlan = document.getElementById("fecha-plan");
const estadoPlan = document.getElementById("estado-plan");
const listaAlternativas = document.getElementById("lista-alternativas");
const formulario = document.getElementById("formulario-alternativa");
const alternativa = document.getElementById("alternativa");
const mensaje = document.getElementById("mensaje");
const volver = document.getElementById("volver");

function mostrarAlternativas() {
  listaAlternativas.innerHTML = "";

  if (plan.alternativas.length === 0) {
    listaAlternativas.textContent = "No hay alternativas todavía.";
    return;
  }

  plan.alternativas.forEach(function (opcion) {
    const bloqueAlternativa = document.createElement("p");
    bloqueAlternativa.className = "alternativa";
    bloqueAlternativa.textContent = opcion;
    listaAlternativas.appendChild(bloqueAlternativa);
  });
}

if (!plan) {
  contenidoPlan.textContent = "No se encontró el plan.";
} else {
  nombrePlan.textContent = "Plan: " + plan.nombre;
  descripcionPlan.textContent = plan.descripcion ? "Descripción: " + plan.descripcion : "";
  fechaPlan.textContent = plan.fecha ? "Fecha: " + plan.fecha : "";
  estadoPlan.textContent = "Estado: " + plan.estado;
  mostrarAlternativas();

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (alternativa.value.trim() === "") {
      mensaje.textContent = "Ingresa una alternativa.";
      return;
    }

    plan.alternativas.push(alternativa.value.trim());
    localStorage.setItem("planes", JSON.stringify(planes));
    alternativa.value = "";
    mensaje.textContent = "";
    mostrarAlternativas();
  });
}

volver.addEventListener("click", function () {
  window.location.href = "inicio.html";
});
