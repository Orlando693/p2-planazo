const express = require("express");
const db = require("./database");

const router = express.Router();

router.get("/", function (req, res) {
  const organizador = req.query.organizador;

  if (!organizador) {
    res.status(400).json({ error: "Falta el organizador." });
    return;
  }

  const sql = "SELECT id, plan_id, plan_nombre, accion, fecha, organizador FROM historial WHERE organizador = ? ORDER BY id DESC";

  db.all(sql, [organizador], function (error, registros) {
    if (error) {
      res.status(500).json({ error: "No se pudo obtener el historial." });
      return;
    }

    res.json(registros);
  });
});

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
