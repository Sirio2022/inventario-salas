# 📦 Inventario de Salas de Ventas

Aplicación web para llevar el control de artículos (colchones, muebles, equipos, etc.) distribuidos en diferentes **salas de ventas** de un proyecto inmobiliario. Permite agregar, editar, eliminar, buscar y filtrar artículos según su sala y estado.

Es un proyecto universitario construido **desde cero, sin frameworks de frontend**: solo HTML, CSS y JavaScript puro en el navegador, y un pequeño servidor hecho con Node.js y Express.

---

## 🧰 Tecnologías utilizadas

| Tecnología | ¿Para qué se usa? |
|---|---|
| **Node.js** | Entorno para ejecutar JavaScript en el servidor (es el "motor" del proyecto) |
| **Express** | Framework web que sirve la página y crea los endpoints de la API |
| **SQLite** (con `better-sqlite3`) | Base de datos guardada en un solo archivo (`inventario.db`), no requiere instalar nada más |
| **HTML / CSS / JavaScript** | Interfaz de la aplicación (sin frameworks como React o Vue) |

---

## ✅ Requisitos previos

Lo único que necesitas instalado en tu computadora es **Node.js** (viene con `npm`, el instalador de paquetes).

### 1. Descargar e instalar Node.js

1. Entra a <https://nodejs.org>.
2. Descarga la versión marcada como **"LTS"** (recomendada, es la estable). Hay instaladores para Windows y macOS.
3. Ejecuta el instalador y deja todas las opciones por defecto (Siguiente → Siguiente → Instalar).

### 2. Verificar que quedó bien instalado

Abre una **terminal** y escribe:

- **En Windows**: abre el menú inicio, escribe `cmd` y abre el "Símbolo del sistema".
- **En macOS**: abre la app "Terminal" (se busca con Spotlight / ⌘ + Espacio).

```bash
node --version
```

Deberías ver algo como `v22.x.x` o superior (cualquier número alto está bien). Prueba también:

```bash
npm --version
```

Debería responder con un número, por ejemplo `10.x.x`.

> ⚠️ Si dice `node: command not found` o `'node' no se reconoce como un comando`, cierra la terminal, **ábrela de nuevo** y reintenta. Si sigue fallando, reinstala Node.js y marca la casilla "Add to PATH" durante la instalación.

---

## 🚀 Pasos para arrancar el proyecto (de cero)

### Paso 1: Descargar el código

Tienes dos opciones:

**Opción A — Con Git** (si ya tienes Git instalado):

```bash
git clone <URL-DEL-REPOSITORIO>
cd inventario-salas
```

**Opción B — Sin Git**: en la página del repositorio (GitHub) pulsa el botón verde **`<> Code` → **`Download ZIP`**, descomprime el archivo y entra a la carpeta:

```bash
cd inventario-salas
```

> 💡 Truco: en Windows puedes escribir `cd ` (con espacio) y arrastrar la carpeta desde el Explorador hasta la terminal para pegar la ruta automáticamente.

### Paso 2: Instalar las dependencias

Estando **dentro de la carpeta del proyecto** (donde está el archivo `package.json`), ejecuta:

```bash
npm install
```

**¿Qué hace este comando?** Lee el archivo `package.json` y descarga los paquetes que el proyecto necesita (Express y better-sqlite3) dentro de una carpeta llamada `node_modules/`. Solo se hace **una vez**. Puede tardar uno o dos minutos.

### Paso 3: Levantar el servidor

```bash
npm start
```

(Es equivalente a escribir `node src/server.js`.)

Si todo salió bien verás este mensaje en la terminal:

```
Servidor corriendo en http://localhost:3000
```

**¿Qué hace este comando?** Ejecuta el archivo `src/server.js`, que crea el servidor Express, prepara la base de datos y queda "escuchando" peticiones en el puerto 3000. La terminal queda **ocupada** mientras el servidor corre — esto es normal, no la cierres.

### Paso 4: Abrir la aplicación

Abre tu navegador (Chrome, Edge, Firefox…) y entra a:

<http://localhost:3000>

Verás la tabla del inventario. ¡Listo! Ya puedes agregar artículos.

> 🛑 Para **detener el servidor**: vuelve a la terminal y presiona `Ctrl + C` (en Windows y macOS es igual).

---

## 📋 Uso de la aplicación

- **Agregar artículo**: llena el formulario de arriba (nombre y sala son obligatorios, cantidad mínima 1) y pulsa **Agregar**.
- **Editar**: pulsa el botón azul **Editar** de una fila; el formulario se llenará con esos datos y el botón dirá **Actualizar**. Pulsa **Cancelar** si te arrepientes.
- **Eliminar**: pulsa el botón rojo **Eliminar** y confirma el mensaje.
- **Buscar**: escribe parte del nombre en la barra de búsqueda; la tabla se filtra sola mientras escribes.
- **Filtrar por sala**: usa el desplegable para ver solo los artículos de una sala. El botón **Limpiar filtros** restablece la vista.

Los estados disponibles son: **Disponible**, **En uso (Apartamento Modelo)** y **Mantenimiento**.

---

## 📁 Estructura del proyecto

```
inventario-salas/
├── package.json            → Lista de dependencias y comandos del proyecto
├── package-lock.json       → Congela las versiones exactas instaladas (no editarlo)
├── inventario.db           → Base de datos (se crea sola al arrancar; NO se sube a Git)
├── .gitignore              → Le dice a Git qué archivos NO subir
│
├── src/                    → CÓDIGO DEL SERVIDOR (backend)
│   ├── server.js           → Punto de entrada: crea el servidor en el puerto 3000
│   ├── db/
│   │   └── connection.js   → Conexión a la base de datos y creación de la tabla
│   └── routes/
│       └── items.routes.js → Endpoints de la API (listar, crear, editar, borrar)
│
└── public/                 → CÓDIGO DE LA PÁGINA (frontend)
    ├── index.html          → Estructura de la página y estilos
    └── js/
        ├── api.js          → Habla con el servidor (llamadas fetch a la API)
        ├── ui.js           → Dibuja la tabla y manipula el formulario
        └── app.js          → Conecta todo: eventos de botones, búsqueda, etc.
```

**¿Cómo se conectan?** Cuando abres `http://localhost:3000`, Express entrega los archivos de `public/`. Luego, el JavaScript del navegador (`public/js/`) pide los datos al servidor consultando las rutas de `src/routes/items.routes.js` (por ejemplo `GET /api/items`), que a su vez los lee/escribe en la base de datos SQLite.

---

## 🔌 API REST (para probar con el navegador o herramientas)

La página usa internamente estos endpoints, pero también puedes probarlos directamente:

| Método | Ruta | ¿Qué hace? |
|---|---|---|
| GET | `/api/items` | Lista todos los artículos. Acepta `?search=colchon` y `?sala=Nombre` |
| GET | `/api/salas` | Lista las salas de ventas registradas (sin repetir) |
| POST | `/api/items` | Crea un artículo. Requiere JSON con `nombre` y `sala_ventas` |
| PUT | `/api/items/:id` | Actualiza el artículo con ese `id` |
| DELETE | `/api/items/:id` | Elimina el artículo con ese `id` |

**Prueba rápida con el navegador**: entra a <http://localhost:3000/api/items> y verás el inventario en formato JSON.

**Prueba rápida creando un artículo** (con el servidor corriendo, en otra terminal):

```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Colchón Queen","sala_ventas":"Sala Proyecto Mirador","cantidad":2,"estado":"Disponible"}'
```

---

## 💾 Sobre la base de datos

- El archivo `inventario.db` **se crea automáticamente** la primera vez que arrancas el servidor (la tabla también, gracias a `CREATE TABLE IF NOT EXISTS` en `src/db/connection.js`). No hay que configurar nada.
- **No se sube a Git** (está en `.gitignore`), así que cada quien tiene sus propios datos localmente. Es el comportamiento normal para este tipo de proyecto.
- Para **borrar todos los datos y empezar de cero**: detén el servidor (`Ctrl + C`), elimina el archivo `inventario.db` y vuelve a arrancar con `npm start`. Se creará una base nueva y vacía.

---

## 🛠️ Problemas comunes y sus soluciones

| Error / problema | Causa | Solución |
|---|---|---|
| `node: command not found` / no se reconoce | Node.js no instalado o terminal desactualizada | Instala Node.js desde <https://nodejs.org> y **reabre la terminal** |
| `Cannot find module 'express'` (o similar) | Olvidaste instalar dependencias | Ejecuta `npm install` dentro de la carpeta del proyecto |
| `EADDRINUSE: address already in use :::3000` | El puerto 3000 ya está ocupado (otro servidor) | Cierra la otra terminal que corre un servidor, o cambia el número en la línea `const PORT = 3000` de `src/server.js` (por ejemplo a 3001) y entra a `http://localhost:3001` |
| Error raro al instalar `better-sqlite3` (gyp, Python, MSBuild…) | Falla la compilación del módulo nativo | Ejecuta `npm install` de nuevo; si persiste, borra `node_modules` y el archivo no, mejor: `rm -rf node_modules package-lock.json && npm install`. En Windows puede pedir "Desktop development with C++" de Visual Studio; en macOS, Xcode Command Line Tools (`xcode-select --install`) |
| La página abre pero "no se encontraron artículos" | Base vacía o filtros activos | Es normal al inicio: agrega un artículo o pulsa **Limpiar filtros** |
| Cambios en el código no se reflejan | El servidor corre una versión vieja | Detén con `Ctrl + C` y vuelve a arrancar con `npm start` |

---

## 🔄 Comandos útiles para el equipo (Git básico)

Si trabajan juntos en el mismo repositorio, estos cuatro comandos cubren el día a día:

```bash
git pull                      # Bajarse los cambios más recientes de los compañeros
git status                    # Ver qué archivos cambiaste
git add .                     # Marcar tus cambios para subirlos
git commit -m "Descripción"   # Guardar tus cambios con un mensaje
git push                      # Subirlos al repositorio
```

> ⚠️ **Importante**: `node_modules/` e `inventario.db` están ignorados por diseño (están en `.gitignore`). Nunca los subas: el primero pesa demasiado y el segundo contiene datos personales de cada quien. `npm install` regenera todo lo necesario.

---

## 📌 Resumen rápido (para los apurados)

```bash
# 1. Tener Node.js instalado → https://nodejs.org (versión LTS)
# 2. Pararse en la carpeta del proyecto
cd inventario-salas
# 3. Instalar dependencias (solo la primera vez)
npm install
# 4. Arrancar el servidor
npm start
# 5. Abrir en el navegador
# http://localhost:3000
```

¡Eso es todo! Cualquier duda, revisa la sección de problemas comunes arriba. 🎉
