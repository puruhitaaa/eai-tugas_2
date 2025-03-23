import { db } from "./index"
import { students } from "./schema"
import "dotenv/config"

const seedData = [
  {
    name: "John Doe",
    student_id: "ST001",
    address: "123 Main St, City",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  },
  {
    name: "Jane Smith",
    student_id: "ST002",
    address: "456 Oak Ave, Town",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
  },
  {
    name: "Alice Johnson",
    student_id: "ST003",
    address: "789 Pine Rd, Village",
    email: "alice.johnson@example.com",
    phone: "555-555-5555",
  },
]

async function seed() {
  console.log("Starting database seeding...")

  try {
    // Clear existing data
    await db.delete(students)
    console.log("Cleared existing data")

    // Insert seed data
    const result = await db.insert(students).values(seedData).returning()
    console.log(`Inserted ${result.length} records`)

    console.log("Seeding completed successfully!")
  } catch (error) {
    console.error("Seeding failed:", error)
    process.exit(1)
  }
}

seed()
