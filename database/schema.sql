CREATE TABLE IF NOT EXISTS planes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    fecha TEXT,
    estado TEXT NOT NULL,
    alternativas TEXT,
    elegida TEXT
);
