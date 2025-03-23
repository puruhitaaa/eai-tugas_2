import { z } from "zod"

export const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  student_id: z.string().min(5, "Student ID must be at least 5 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  email: z.string().email("Invalid email format").optional(),
  phone: z.string().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
})

export const studentUpdateSchema = studentSchema.partial()

export type Student = z.infer<typeof studentSchema>
export type StudentUpdate = z.infer<typeof studentUpdateSchema>
