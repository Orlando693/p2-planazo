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
