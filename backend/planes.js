const express = require("express");
const db = require("./database");

const router = express.Router();

function convertirPlan(plan) {
  plan.alternativas = plan.alternativas ? JSON.parse(plan.alternativas) : [];
  return plan;
}

router.get("/", function (req, res) {
  const condiciones = [];
  const parametros = [];
  const nombre = req.query.nombre;
  const estado = req.query.estado;
  const fecha = req.query.fecha;
  let estadoReal;

  if (nombre) {
    condiciones.push("LOWER(nombre) LIKE LOWER(?)");
    parametros.push("%" + nombre + "%");
  }

  if (estado === "pendiente") {
    estadoReal = "En decisión";
  }

  if (estado === "confirmado") {
    estadoReal = "Decidido";
  }

  if (estado === "cancelado") {
    estadoReal = "Cancelado";
  }

  if (estadoReal) {
    condiciones.push("estado = ?");
    parametros.push(estadoReal);
  }

  if (fecha === "proximos7") {
    condiciones.push("date(fecha) BETWEEN date('now') AND date('now', '+7 days')");
  }

  if (fecha === "vencidos") {
    condiciones.push("date(fecha) < date('now')");
  }

  let sql = "SELECT * FROM planes";

  if (condiciones.length > 0) {
    sql += " WHERE " + condiciones.join(" AND ");
  }

  db.all(sql, parametros, function (error, planes) {
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
  const organizador = req.body.organizador || "";
  const sql = "INSERT INTO planes (nombre, descripcion, fecha, estado, alternativas, elegida, organizador) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.run(sql, [nombre, descripcion, fecha, estado, JSON.stringify(alternativas), elegida, organizador], function (error) {
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
      elegida: elegida,
      organizador: organizador
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
  const organizador = req.body.organizador || null;
  const sql = "UPDATE planes SET nombre = ?, descripcion = ?, fecha = ?, estado = ?, alternativas = ?, elegida = ?, organizador = COALESCE(?, organizador) WHERE id = ?";

  db.run(sql, [nombre, descripcion, fecha, estado, JSON.stringify(alternativas), elegida, organizador, req.params.id], function (error) {
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
      elegida: elegida,
      organizador: organizador
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
