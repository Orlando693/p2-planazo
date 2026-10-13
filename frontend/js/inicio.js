const saludo = document.getElementById("saludo");
const listaPlanes = document.getElementById("lista-planes");
const botonCrearPlan = document.getElementById("crear-plan");
const buscarNombre = document.getElementById("buscar-nombre");
const filtroEstado = document.getElementById("filtro-estado");
const filtroFecha = document.getElementById("filtro-fecha");
const filtrosActivos = document.getElementById("filtros-activos");
const botonLimpiarFiltros = document.getElementById("limpiar-filtros");
const usuario = JSON.parse(localStorage.getItem("usuario"));

if (usuario) {
  saludo.textContent = "Hola, " + usuario.nombre;
}

async function cargarPlanes() {
  const params = new URLSearchParams();
  const filtros = [];

  if (buscarNombre.value !== "") {
    params.append("nombre", buscarNombre.value);
    filtros.push("Buscar: " + buscarNombre.value);
  }

  if (filtroEstado.value !== "") {
    params.append("estado", filtroEstado.value);
    filtros.push("Estado: " + filtroEstado.options[filtroEstado.selectedIndex].text);
  }

  if (filtroFecha.value !== "") {
    params.append("fecha", filtroFecha.value);
    filtros.push("Fecha: " + filtroFecha.options[filtroFecha.selectedIndex].text);
  }

  filtrosActivos.textContent = filtros.length > 0 ? "Filtros activos: " + filtros.join(" | ") : "Sin filtros activos";

  const url = params.toString() === "" ? "/api/planes" : "/api/planes?" + params.toString();
  const respuesta = await fetch(url);
  const planes = await respuesta.json();

  listaPlanes.textContent = "";

  if (planes.length === 0) {
    listaPlanes.textContent = "No se encontraron planes.";
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

cargarPlanes();

buscarNombre.addEventListener("input", cargarPlanes);
filtroEstado.addEventListener("change", cargarPlanes);
filtroFecha.addEventListener("change", cargarPlanes);

botonLimpiarFiltros.addEventListener("click", function () {
  buscarNombre.value = "";
  filtroEstado.value = "";
  filtroFecha.value = "";
  cargarPlanes();
});

botonCrearPlan.addEventListener("click", function () {
  window.location.href = "crear-plan.html";
});
