import express from "express"
import path from "node:path"
import { fileURLToPath } from "node:url"
import itemsRouter from "./routes/items.routes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3000

app.disable("x-powered-by")
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "../public")))
app.use("/api", itemsRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
