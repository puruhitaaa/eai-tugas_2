import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const students = sqliteTable("students", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  student_id: text("student_id").notNull().unique(),
  address: text("address").notNull(),
  email: text("email"),
  phone: text("phone"),
  created_at: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updated_at: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
})
