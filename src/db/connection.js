import Database from "better-sqlite3"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.resolve(__dirname, "../../inventario.db")
export const db = new Database(dbPath)

db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    sala_ventas TEXT NOT NULL,
    cantidad INTEGER NOT NULL DEFAULT 1,
    estado TEXT NOT NULL DEFAULT 'Disponible'
  )
`)
