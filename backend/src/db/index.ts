import { drizzle } from "drizzle-orm/bun-sqlite"
import { Database } from "bun:sqlite"
import * as schema from "./schema"
import "dotenv/config"

const sqlite = new Database(process.env.DATABASE_URL ?? "sqlite.db")
export const db = drizzle(sqlite, { schema })
