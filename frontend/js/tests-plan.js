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

const planPermitido = { estado: "Decidido" };
const resultadoPermitido = puedeCancelarPlan(planPermitido) === true;
const mensajePermitido = document.createElement("p");

mensajePermitido.textContent = (resultadoPermitido ? "PASS - " : "FAIL - ") + "Plan Decidido puede cancelarse";
resultados.appendChild(mensajePermitido);

const planRechazado = { estado: "Cancelado" };
const resultadoRechazado = puedeCancelarPlan(planRechazado) === false;
const mensajeRechazado = document.createElement("p");

mensajeRechazado.textContent = (resultadoRechazado ? "PASS - " : "FAIL - ") + "Plan Cancelado no puede volver a cancelarse";
resultados.appendChild(mensajeRechazado);
