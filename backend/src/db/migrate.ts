import { Database } from "bun:sqlite"
import { drizzle } from "drizzle-orm/bun-sqlite"
import { migrate } from "drizzle-orm/bun-sqlite/migrator"
import "dotenv/config"

// Database initialization
async function main() {
  console.log("Starting database migration...")

  try {
    const sqlite = new Database(process.env.DATABASE_URL ?? "sqlite.db")
    const db = drizzle(sqlite)

    // This will run migrations from the specified directory
    await migrate(db, { migrationsFolder: "./drizzle" })

    console.log("Migration completed successfully!")
  } catch (error) {
    console.error("Migration failed:", error)
    process.exit(1)
  }
}

main()
