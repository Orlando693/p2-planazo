function puedeEliminarPlan(plan) {
  return plan.estado !== "Decidido";
}

function puedeCancelarPlan(plan, usuario) {
  if (plan.estado === "Cancelado") {
    return false;
  }

  if (plan.organizador !== usuario.correo) {
    return false;
  }

  return true;
}

function puedeConfirmarPlan(plan) {
  if (plan.estado === "Cancelado") {
    return false;
  }

  return true;
}
