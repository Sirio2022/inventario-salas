export const elementos = {
  form: document.getElementById("form-inventario"),
  tablaCuerpo: document.getElementById("tabla-cuerpo"),
  inputId: document.getElementById("item-id"),
  inputNombre: document.getElementById("nombre"),
  inputSala: document.getElementById("sala_ventas"),
  inputCantidad: document.getElementById("cantidad"),
  selectEstado: document.getElementById("estado"),
  btnSubmit: document.getElementById("btn-submit"),
  btnCancel: document.getElementById("btn-cancel"),
  filtroNombre: document.getElementById("filtro-nombre"),
  filtroSala: document.getElementById("filtro-sala"),
  btnLimpiarFiltros: document.getElementById("btn-limpiar-filtros")
}

const escapeHTML = (str) =>
  String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")

export const renderizarTabla = (items) => {
  if (items.length === 0) {
    elementos.tablaCuerpo.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">No se encontraron artículos con los filtros actuales.</td>
      </tr>
    `
    return
  }

  elementos.tablaCuerpo.innerHTML = items
    .map(
      ({ id, nombre, sala_ventas, cantidad, estado }) => `
        <tr data-id="${id}">
          <td><strong>${escapeHTML(nombre)}</strong></td>
          <td>${escapeHTML(sala_ventas)}</td>
          <td>${cantidad}</td>
          <td>${escapeHTML(estado)}</td>
          <td>
            <button type="button" class="btn-edit" data-action="edit">Editar</button>
            <button type="button" class="btn-delete" data-action="delete">Eliminar</button>
          </td>
        </tr>
      `
    )
    .join("")
}

export const renderizarOpcionesSalas = (salas) => {
  const seleccionPrevia = elementos.filtroSala.value

  elementos.filtroSala.innerHTML = [
    '<option value="">Todas las salas de ventas</option>',
    ...salas.map(
      (sala) =>
        `<option value="${escapeHTML(sala)}">${escapeHTML(sala)}</option>`
    )
  ].join("")

  if (salas.includes(seleccionPrevia)) {
    elementos.filtroSala.value = seleccionPrevia
  }
}

export const llenarFormularioEdicion = (item) => {
  elementos.inputId.value = item.id
  elementos.inputNombre.value = item.nombre
  elementos.inputSala.value = item.sala_ventas
  elementos.inputCantidad.value = item.cantidad
  elementos.selectEstado.value = item.estado

  elementos.btnSubmit.textContent = "Actualizar"
  elementos.btnCancel.style.display = "inline-block"
  elementos.inputNombre.focus()
}

export const resetearFormulario = () => {
  elementos.form.reset()
  elementos.inputId.value = ""
  elementos.inputCantidad.value = 1
  elementos.btnSubmit.textContent = "Agregar"
  elementos.btnCancel.style.display = "none"
}

export const obtenerDatosFormulario = () => ({
  id: elementos.inputId.value,
  payload: {
    nombre: elementos.inputNombre.value.trim(),
    sala_ventas: elementos.inputSala.value.trim(),
    cantidad: Number.parseInt(elementos.inputCantidad.value, 10) || 1,
    estado: elementos.selectEstado.value
  }
})
