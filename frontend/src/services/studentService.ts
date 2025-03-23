import { Student, StudentInput } from "../types/student"

const API_URL = "http://localhost:3000/api/students"

export const studentService = {
  // Get all students
  getAll: async (): Promise<Student[]> => {
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error("Failed to fetch students")
    }

    return response.json()
  },

  // Get student by ID
  getById: async (id: number): Promise<Student> => {
    const response = await fetch(`${API_URL}/${id}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch student with ID ${id}`)
    }

    return response.json()
  },

  // Create new student
  create: async (data: StudentInput): Promise<Student> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to create student")
    }

    return response.json()
  },

  // Update student
  update: async (id: number, data: Partial<StudentInput>): Promise<Student> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Failed to update student with ID ${id}`)
    }

    return response.json()
  },

  // Delete student
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`Failed to delete student with ID ${id}`)
    }
  },
}
