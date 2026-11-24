import { Router } from "express"
import { db } from "../db/connection.js"

const router = Router()

router.get("/items", (req, res) => {
  const { search = "", sala = "" } = req.query

  const condiciones = []
  const parametros = []

  if (search.trim()) {
    condiciones.push("nombre LIKE ?")
    parametros.push(`%${search.trim()}%`)
  }

  if (sala.trim()) {
    condiciones.push("sala_ventas = ?")
    parametros.push(sala.trim())
  }

  const whereClause =
    condiciones.length > 0 ? `WHERE ${condiciones.join(" AND ")}` : ""
  const query = `SELECT * FROM items ${whereClause} ORDER BY id DESC`

  const items = db.prepare(query).all(...parametros)
  res.json(items)
})

router.get("/salas", (req, res) => {
  const filas = db
    .prepare("SELECT DISTINCT sala_ventas FROM items ORDER BY sala_ventas ASC")
    .all()

  res.json(filas.map((fila) => fila.sala_ventas))
})

router.post("/items", (req, res) => {
  const { nombre, sala_ventas, cantidad = 1, estado = "Disponible" } = req.body

  if (!nombre?.trim() || !sala_ventas?.trim()) {
    return res
      .status(400)
      .json({ error: "Nombre y Sala de Ventas son obligatorios" })
  }

  const stmt = db.prepare(
    "INSERT INTO items (nombre, sala_ventas, cantidad, estado) VALUES (?, ?, ?, ?)"
  )
  const info = stmt.run(nombre.trim(), sala_ventas.trim(), cantidad, estado)

  res.status(201).json({ id: info.lastInsertRowid })
})

router.put("/items/:id", (req, res) => {
  const { nombre, sala_ventas, cantidad = 1, estado = "Disponible" } = req.body
  const { id } = req.params

  if (!nombre?.trim() || !sala_ventas?.trim()) {
    return res
      .status(400)
      .json({ error: "Nombre y Sala de Ventas son obligatorios" })
  }

  const stmt = db.prepare(`
    UPDATE items
    SET nombre = ?, sala_ventas = ?, cantidad = ?, estado = ?
    WHERE id = ?
  `)
  const info = stmt.run(nombre.trim(), sala_ventas.trim(), cantidad, estado, id)

  if (info.changes === 0) {
    return res.status(404).json({ error: "Artículo no encontrado" })
  }

  res.json({ updated: true })
})

router.delete("/items/:id", (req, res) => {
  db.prepare("DELETE FROM items WHERE id = ?").run(req.params.id)
  res.status(204).send()
})

export default router
