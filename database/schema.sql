CREATE TABLE IF NOT EXISTS planes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    fecha TEXT,
    estado TEXT NOT NULL,
    alternativas TEXT,
    elegida TEXT,
    organizador TEXT
);

CREATE TABLE IF NOT EXISTS historial (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id INTEGER,
    plan_nombre TEXT,
    accion TEXT,
    fecha TEXT,
    organizador TEXT
);
