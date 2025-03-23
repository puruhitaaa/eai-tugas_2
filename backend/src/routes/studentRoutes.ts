import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController"
import { studentSchema, studentUpdateSchema } from "../types/student"

const studentRoutes = new Hono()

// Get all students
studentRoutes.get("/", getAllStudents)

// Get student by ID
studentRoutes.get("/:id", getStudentById)

// Create new student
studentRoutes.post("/", zValidator("json", studentSchema), createStudent)

// Update student
studentRoutes.put(
  "/:id",
  zValidator("json", studentUpdateSchema),
  updateStudent
)

// Delete student
studentRoutes.delete("/:id", deleteStudent)

export default studentRoutes
