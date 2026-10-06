const saludo = document.getElementById("saludo");
const listaPlanes = document.getElementById("lista-planes");
const botonCrearPlan = document.getElementById("crear-plan");
const usuario = JSON.parse(localStorage.getItem("usuario"));
const planes = JSON.parse(localStorage.getItem("planes")) || [];

if (usuario) {
  saludo.textContent = "Hola, " + usuario.nombre;
}

if (planes.length === 0) {
  listaPlanes.textContent = "No tienes planes todavía.";
} else {
  planes.forEach(function (plan) {
    const bloquePlan = document.createElement("button");
    bloquePlan.className = "plan";
    bloquePlan.innerHTML = "<strong>" + plan.nombre + "</strong><span>Estado: " + plan.estado + "</span>";

    bloquePlan.addEventListener("click", function () {
      localStorage.setItem("planActual", plan.id);
      window.location.href = "detalle-plan.html";
    });

    listaPlanes.appendChild(bloquePlan);
  });
}

botonCrearPlan.addEventListener("click", function () {
  window.location.href = "crear-plan.html";
});
