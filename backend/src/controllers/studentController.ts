import { Context } from "hono"
import { db } from "../db"
import { students } from "../db/schema"
import { eq } from "drizzle-orm"
import { Student, StudentUpdate } from "../types/student"

export const getAllStudents = async (c: Context) => {
  try {
    const result = await db.select().from(students)
    return c.json(result)
  } catch (error) {
    console.error("Error fetching students:", error)
    return c.json({ error: "Failed to fetch students" }, 500)
  }
}

export const getStudentById = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"))
    if (isNaN(id)) {
      return c.json({ error: "Invalid ID format" }, 400)
    }

    const result = await db.select().from(students).where(eq(students.id, id))

    if (!result.length) {
      return c.json({ error: "Student not found" }, 404)
    }

    return c.json(result[0])
  } catch (error) {
    console.error("Error fetching student:", error)
    return c.json({ error: "Failed to fetch student" }, 500)
  }
}

export const createStudent = async (c: Context) => {
  try {
    const data = await c.req.json<Student>()

    // Check if student_id already exists
    const existingStudent = await db
      .select()
      .from(students)
      .where(eq(students.student_id, data.student_id))

    if (existingStudent.length) {
      return c.json({ error: "Student ID already exists" }, 409)
    }

    const result = await db.insert(students).values(data).returning()
    return c.json(result[0], 201)
  } catch (error) {
    console.error("Error creating student:", error)
    return c.json({ error: "Failed to create student" }, 500)
  }
}

export const updateStudent = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"))
    if (isNaN(id)) {
      return c.json({ error: "Invalid ID format" }, 400)
    }

    const data = await c.req.json<StudentUpdate>()

    // Check if student exists
    const existingStudent = await db
      .select()
      .from(students)
      .where(eq(students.id, id))

    if (!existingStudent.length) {
      return c.json({ error: "Student not found" }, 404)
    }

    // Update the timestamp
    data.updated_at = new Date()

    const result = await db
      .update(students)
      .set(data)
      .where(eq(students.id, id))
      .returning()

    return c.json(result[0])
  } catch (error) {
    console.error("Error updating student:", error)
    return c.json({ error: "Failed to update student" }, 500)
  }
}

export const deleteStudent = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"))
    if (isNaN(id)) {
      return c.json({ error: "Invalid ID format" }, 400)
    }

    // Check if student exists
    const existingStudent = await db
      .select()
      .from(students)
      .where(eq(students.id, id))

    if (!existingStudent.length) {
      return c.json({ error: "Student not found" }, 404)
    }

    await db.delete(students).where(eq(students.id, id))

    return c.json({ message: "Student deleted successfully" })
  } catch (error) {
    console.error("Error deleting student:", error)
    return c.json({ error: "Failed to delete student" }, 500)
  }
}
