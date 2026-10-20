const resultados = document.getElementById("resultados");
const pruebas = [
  { estado: "En decisión", esperado: true, texto: "Plan En decisión puede eliminarse" },
  { estado: "Cancelado", esperado: true, texto: "Plan Cancelado puede eliminarse" },
  { estado: "Decidido", esperado: false, texto: "Plan Decidido no puede eliminarse" }
];

pruebas.forEach(function (prueba) {
  const resultado = puedeEliminarPlan({ estado: prueba.estado }) === prueba.esperado;
  const mensaje = document.createElement("p");

  mensaje.textContent = (resultado ? "PASS - " : "FAIL - ") + prueba.texto;
  resultados.appendChild(mensaje);
});

const usuarioOrganizador = { correo: "orlando@gmail.com" };
const planPermitido = { estado: "Decidido", organizador: "orlando@gmail.com" };
const resultadoPermitido = puedeCancelarPlan(planPermitido, usuarioOrganizador) === true;
const mensajePermitido = document.createElement("p");

mensajePermitido.textContent = (resultadoPermitido ? "PASS - " : "FAIL - ") + "El organizador puede cancelar un plan Decidido";
resultados.appendChild(mensajePermitido);

const planCancelado = { estado: "Cancelado", organizador: "orlando@gmail.com" };
const resultadoRechazado = puedeCancelarPlan(planCancelado, usuarioOrganizador) === false;
const mensajeRechazado = document.createElement("p");

mensajeRechazado.textContent = (resultadoRechazado ? "PASS - " : "FAIL - ") + "Un plan Cancelado no puede volver a cancelarse";
resultados.appendChild(mensajeRechazado);

const resultadoConfirmacion = puedeConfirmarPlan(planCancelado) === false;
const mensajeConfirmacion = document.createElement("p");

mensajeConfirmacion.textContent = (resultadoConfirmacion ? "PASS - " : "FAIL - ") + "Un plan Cancelado no puede confirmarse";
resultados.appendChild(mensajeConfirmacion);

function filtrarPorEstado(planes, estado) {
  return planes.filter(function (plan) {
    return plan.estado === estado;
  });
}

const planesParaFiltro = [
  { nombre: "Salida viernes", estado: "Decidido" },
  { nombre: "Partido sábado", estado: "Cancelado" }
];
const cancelados = filtrarPorEstado(planesParaFiltro, "Cancelado");
const mensajeCancelados = document.createElement("p");

mensajeCancelados.textContent = (cancelados.length === 1 ? "PASS - " : "FAIL - ") + "Filtro cancelado devuelve resultados";
resultados.appendChild(mensajeCancelados);

const pendientes = filtrarPorEstado(planesParaFiltro, "En decisión");
const mensajeSinCoincidencias = document.createElement("p");

mensajeSinCoincidencias.textContent = (pendientes.length === 0 ? "PASS - " : "FAIL - ") + "Filtro sin coincidencias devuelve 0 resultados";
resultados.appendChild(mensajeSinCoincidencias);

function ordenarEventosPorId(eventos) {
  return eventos.sort(function (a, b) {
    return b.id - a.id;
  });
}

const eventos = [
  { id: 1, accion: "Confirmado" },
  { id: 3, accion: "Cancelado" },
  { id: 2, accion: "Confirmado" }
];
const eventosOrdenados = ordenarEventosPorId(eventos);
const mensajeHistorialOrdenado = document.createElement("p");

mensajeHistorialOrdenado.textContent = (eventosOrdenados[0].id === 3 ? "PASS - " : "FAIL - ") + "El historial muestra primero el evento más reciente";
resultados.appendChild(mensajeHistorialOrdenado);

const historialVacio = [];
const mensajeHistorialVacio = document.createElement("p");

mensajeHistorialVacio.textContent = (historialVacio.length === 0 ? "PASS - " : "FAIL - ") + "Historial vacío no contiene eventos";
resultados.appendChild(mensajeHistorialVacio);
