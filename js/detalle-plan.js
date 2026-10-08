const idPlan = localStorage.getItem("planActual");
const contenidoPlan = document.getElementById("contenido-plan");
const nombrePlan = document.getElementById("nombre-plan");
const descripcionPlan = document.getElementById("descripcion-plan");
const fechaPlan = document.getElementById("fecha-plan");
const estadoPlan = document.getElementById("estado-plan");
const listaAlternativas = document.getElementById("lista-alternativas");
const formulario = document.getElementById("formulario-alternativa");
const alternativa = document.getElementById("alternativa");
const mensaje = document.getElementById("mensaje");
const editar = document.getElementById("editar");
const eliminar = document.getElementById("eliminar");
const cancelar = document.getElementById("cancelar");
const volver = document.getElementById("volver");
let plan;

function mostrarAlternativas() {
  listaAlternativas.innerHTML = "";

  if (plan.alternativas.length === 0) {
    listaAlternativas.textContent = "No hay alternativas todavía.";
    return;
  }

  plan.alternativas.forEach(function (opcion) {
    const bloqueAlternativa = document.createElement("p");
    const botonElegir = document.createElement("button");

    bloqueAlternativa.className = "alternativa";
    bloqueAlternativa.textContent = opcion;
    botonElegir.textContent = "Elegir";
    botonElegir.addEventListener("click", async function () {
      plan.estado = "Decidido";
      plan.elegida = opcion;
      await guardarPlan();
      mostrarPlan();
    });
    bloqueAlternativa.appendChild(botonElegir);
    listaAlternativas.appendChild(bloqueAlternativa);
  });
}

function mostrarPlan() {
  nombrePlan.textContent = "Plan: " + plan.nombre;
  descripcionPlan.textContent = plan.descripcion ? "Descripción: " + plan.descripcion : "";
  fechaPlan.textContent = plan.fecha ? "Fecha: " + plan.fecha : "";
  estadoPlan.textContent = "Estado: " + plan.estado + (plan.elegida ? " - Opción elegida: " + plan.elegida : "");
  cancelar.hidden = plan.estado !== "Decidido";
  mostrarAlternativas();
}

async function guardarPlan() {
  await fetch("/api/planes/" + idPlan, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plan)
  });
}

async function cargarPlan() {
  const respuesta = await fetch("/api/planes/" + idPlan);

  if (!respuesta.ok) {
    contenidoPlan.textContent = "No se encontró el plan.";
    return;
  }

  plan = await respuesta.json();
  mostrarPlan();

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (alternativa.value.trim() === "") {
      mensaje.textContent = "Ingresa una alternativa.";
      return;
    }

    agregarAlternativa();
  });

  editar.addEventListener("click", function () {
    window.location.href = "editar-plan.html";
  });

  eliminar.addEventListener("click", function () {
    eliminarPlan();
  });

  cancelar.addEventListener("click", function () {
    cancelarPlan();
  });
}

async function agregarAlternativa() {
  plan.alternativas.push(alternativa.value.trim());
  await guardarPlan();
    alternativa.value = "";
    mensaje.textContent = "";
    mostrarAlternativas();
}

async function eliminarPlan() {
  if (!puedeEliminarPlan(plan)) {
    mensaje.textContent = "No puedes eliminar un plan decidido. Primero debes cancelarlo.";
    return;
  }

  if (!confirm("¿Seguro que quieres eliminar este plan?")) {
    return;
  }

  const respuesta = await fetch("/api/planes/" + idPlan, { method: "DELETE" });

  if (!respuesta.ok) {
    const error = await respuesta.json();
    mensaje.textContent = error.error;
    return;
  }

  window.location.href = "inicio.html";
}

async function cancelarPlan() {
  plan.estado = "Cancelado";
  await guardarPlan();
  mostrarPlan();
  mensaje.textContent = "";
}

cargarPlan();

volver.addEventListener("click", function () {
  window.location.href = "inicio.html";
});
