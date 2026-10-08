const express = require("express");
const db = require("./database");

const router = express.Router();

function convertirPlan(plan) {
  plan.alternativas = plan.alternativas ? JSON.parse(plan.alternativas) : [];
  return plan;
}

router.get("/", function (req, res) {
  db.all("SELECT * FROM planes", function (error, planes) {
    if (error) {
      res.status(500).json({ error: "No se pudieron obtener los planes." });
      return;
    }

    res.json(planes.map(convertirPlan));
  });
});

router.get("/:id", function (req, res) {
  db.get("SELECT * FROM planes WHERE id = ?", [req.params.id], function (error, plan) {
    if (error) {
      res.status(500).json({ error: "No se pudo obtener el plan." });
      return;
    }

    if (!plan) {
      res.status(404).json({ error: "No se encontró el plan." });
      return;
    }

    res.json(convertirPlan(plan));
  });
});

router.post("/", function (req, res) {
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion || "";
  const fecha = req.body.fecha || "";
  const estado = req.body.estado || "En decisión";
  const alternativas = req.body.alternativas || [];
  const elegida = req.body.elegida || null;
  const sql = "INSERT INTO planes (nombre, descripcion, fecha, estado, alternativas, elegida) VALUES (?, ?, ?, ?, ?, ?)";

  db.run(sql, [nombre, descripcion, fecha, estado, JSON.stringify(alternativas), elegida], function (error) {
    if (error) {
      res.status(500).json({ error: "No se pudo crear el plan." });
      return;
    }

    res.status(201).json({
      id: this.lastID,
      nombre: nombre,
      descripcion: descripcion,
      fecha: fecha,
      estado: estado,
      alternativas: alternativas,
      elegida: elegida
    });
  });
});

router.put("/:id", function (req, res) {
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion || "";
  const fecha = req.body.fecha || "";
  const estado = req.body.estado || "En decisión";
  const alternativas = req.body.alternativas || [];
  const elegida = req.body.elegida || null;
  const sql = "UPDATE planes SET nombre = ?, descripcion = ?, fecha = ?, estado = ?, alternativas = ?, elegida = ? WHERE id = ?";

  db.run(sql, [nombre, descripcion, fecha, estado, JSON.stringify(alternativas), elegida, req.params.id], function (error) {
    if (error) {
      res.status(500).json({ error: "No se pudo actualizar el plan." });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: "No se encontró el plan." });
      return;
    }

    res.json({
      id: Number(req.params.id),
      nombre: nombre,
      descripcion: descripcion,
      fecha: fecha,
      estado: estado,
      alternativas: alternativas,
      elegida: elegida
    });
  });
});

router.delete("/:id", function (req, res) {
  db.get("SELECT * FROM planes WHERE id = ?", [req.params.id], function (error, plan) {
    if (error) {
      res.status(500).json({ error: "No se pudo eliminar el plan." });
      return;
    }

    if (!plan) {
      res.status(404).json({ error: "No se encontró el plan." });
      return;
    }

    if (plan.estado === "Decidido") {
      res.status(400).json({ error: "No puedes eliminar un plan decidido. Primero debes cancelarlo." });
      return;
    }

    db.run("DELETE FROM planes WHERE id = ?", [req.params.id], function (error) {
      if (error) {
        res.status(500).json({ error: "No se pudo eliminar el plan." });
        return;
      }

      res.json({ mensaje: "Plan eliminado." });
    });
  });
});

module.exports = router;
