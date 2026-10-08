const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const rutaBase = path.join(__dirname, "../database/planazo.db");
const esquema = fs.readFileSync(path.join(__dirname, "../database/schema.sql"), "utf8");
const db = new sqlite3.Database(rutaBase);

db.exec(esquema);

module.exports = db;
