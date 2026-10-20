const express = require("express");
const db = require("./database");

const router = express.Router();

router.post("/", function (req, res) {
  const planId = req.body.plan_id;
  const planNombre = req.body.plan_nombre;
  const accion = req.body.accion;
  const organizador = req.body.organizador;

  if ((accion !== "Confirmado" && accion !== "Cancelado") || !planId || !planNombre || !organizador) {
    res.status(400).json({ error: "Datos del historial inválidos." });
    return;
  }

  const sql = "INSERT INTO historial (plan_id, plan_nombre, accion, fecha, organizador) VALUES (?, ?, ?, datetime('now', 'localtime'), ?)";

  db.run(sql, [planId, planNombre, accion, organizador], function (error) {
    if (error) {
      res.status(500).json({ error: "No se pudo guardar el evento." });
      return;
    }

    res.status(201).json({ id: this.lastID });
  });
});

module.exports = router;
