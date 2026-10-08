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
