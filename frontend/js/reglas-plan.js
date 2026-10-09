function puedeEliminarPlan(plan) {
  return plan.estado !== "Decidido";
}

function puedeCancelarPlan(plan) {
  return plan.estado !== "Cancelado";
}
