import {
  actualizarItem,
  crearItem,
  eliminarItemPorId,
  obtenerItems,
  obtenerSalas
} from "./api.js"
import {
  elementos,
  llenarFormularioEdicion,
  obtenerDatosFormulario,
  renderizarOpcionesSalas,
  renderizarTabla,
  resetearFormulario
} from "./ui.js"

let inventarioActual = []
let debounceTimer = null

const cargarInventario = async () => {
  inventarioActual = await obtenerItems({
    search: elementos.filtroNombre.value,
    sala: elementos.filtroSala.value
  })
  renderizarTabla(inventarioActual)
}

const cargarSalas = async () => {
  const salas = await obtenerSalas()
  renderizarOpcionesSalas(salas)
}

const refrescarTodo = async () => {
  await Promise.all([cargarSalas(), cargarInventario()])
}

elementos.form.addEventListener("submit", async (event) => {
  event.preventDefault()
  const { id, payload } = obtenerDatosFormulario()

  if (id) {
    await actualizarItem(id, payload)
  } else {
    await crearItem(payload)
  }

  resetearFormulario()
  await refrescarTodo()
})

elementos.btnCancel.addEventListener("click", resetearFormulario)

elementos.filtroNombre.addEventListener("input", () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(cargarInventario, 250)
})

elementos.filtroSala.addEventListener("change", cargarInventario)

elementos.btnLimpiarFiltros.addEventListener("click", async () => {
  elementos.filtroNombre.value = ""
  elementos.filtroSala.value = ""
  await cargarInventario()
})

elementos.tablaCuerpo.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]")
  if (!button) return

  const row = button.closest("tr[data-id]")
  const id = Number(row?.dataset.id)
  if (!id) return

  const { action } = button.dataset

  if (action === "edit") {
    const item = inventarioActual.find((entry) => entry.id === id)
    if (item) llenarFormularioEdicion(item)
  }

  if (action === "delete") {
    if (!confirm("¿Seguro que deseas eliminar este artículo?")) return
    await eliminarItemPorId(id)
    if (Number(elementos.inputId.value) === id) resetearFormulario()
    await refrescarTodo()
  }
})

document.addEventListener("DOMContentLoaded", refrescarTodo)
