const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const rutaBase = path.join(__dirname, "../database/planazo.db");
const esquema = fs.readFileSync(path.join(__dirname, "../database/schema.sql"), "utf8");
const db = new sqlite3.Database(rutaBase);

db.serialize(function () {
  db.exec(esquema);

  db.all("PRAGMA table_info(planes)", function (error, columnas) {
    if (error) {
      return;
    }

    const tieneOrganizador = columnas.some(function (columna) {
      return columna.name === "organizador";
    });

    if (!tieneOrganizador) {
      db.run("ALTER TABLE planes ADD COLUMN organizador TEXT");
    }
  });
});

module.exports = db;
