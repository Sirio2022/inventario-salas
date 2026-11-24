export const obtenerItems = async ({ search = "", sala = "" } = {}) => {
  const params = new URLSearchParams()
  if (search.trim()) params.set("search", search.trim())
  if (sala.trim()) params.set("sala", sala.trim())

  const query = params.toString()
  const res = await fetch(query ? `/api/items?${query}` : "/api/items")
  if (!res.ok) throw new Error("Error al obtener el inventario")
  return res.json()
}

export const obtenerSalas = async () => {
  const res = await fetch("/api/salas")
  if (!res.ok) throw new Error("Error al obtener las salas de ventas")
  return res.json()
}

export const crearItem = async (payload) => {
  const res = await fetch("/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error("Error al crear el artículo")
  return res.json()
}

export const actualizarItem = async (id, payload) => {
  const res = await fetch(`/api/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error("Error al actualizar el artículo")
  return res.json()
}

export const eliminarItemPorId = async (id) => {
  const res = await fetch(`/api/items/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Error al eliminar el artículo")
}
