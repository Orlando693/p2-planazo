const saludo = document.getElementById("saludo");
const listaPlanes = document.getElementById("lista-planes");
const botonCrearPlan = document.getElementById("crear-plan");
const usuario = JSON.parse(localStorage.getItem("usuario"));

if (usuario) {
  saludo.textContent = "Hola, " + usuario.nombre;
}

async function mostrarPlanes() {
  const respuesta = await fetch("/api/planes");
  const planes = await respuesta.json();

  if (planes.length === 0) {
    listaPlanes.textContent = "No tienes planes todavía.";
    return;
  }

  planes.forEach(function (plan) {
    const bloquePlan = document.createElement("button");
    const nombrePlan = document.createElement("strong");
    const estadoPlan = document.createElement("span");

    bloquePlan.className = "plan";
    nombrePlan.textContent = plan.nombre;
    estadoPlan.textContent = "Estado: " + plan.estado;
    bloquePlan.appendChild(nombrePlan);
    bloquePlan.appendChild(estadoPlan);

    bloquePlan.addEventListener("click", function () {
      localStorage.setItem("planActual", plan.id);
      window.location.href = "detalle-plan.html";
    });

    listaPlanes.appendChild(bloquePlan);
  });
}

mostrarPlanes();

botonCrearPlan.addEventListener("click", function () {
  window.location.href = "crear-plan.html";
});
