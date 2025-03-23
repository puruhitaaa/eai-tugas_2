import { Hono } from "hono"
import { logger } from "hono/logger"
import { cors } from "hono/cors"
import studentRoutes from "./routes/studentRoutes"
import { serveStatic } from "hono/bun"
import "dotenv/config"

// Create app instance
const app = new Hono()

// Apply global middlewares
app.use("*", logger())
app.use("*", cors())

// API routes
app.route("/api/students", studentRoutes)

// Base route
app.get("/", (c) => {
  return c.json({
    message: "Student Management API",
    version: "1.0.0",
    endpoints: {
      students: "/api/students",
    },
  })
})

// Handle static files if needed
app.use("/static/*", serveStatic({ root: "./" }))

// 404 handler
app.notFound((c) => {
  return c.json({ error: "Not Found" }, 404)
})

// Global error handler
app.onError((err, c) => {
  console.error("Server error:", err)
  return c.json({ error: "Internal Server Error" }, 500)
})

// Export for Bun
export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
}
