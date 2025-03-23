export interface Student {
  id: number
  name: string
  student_id: string
  address: string
  email?: string
  phone?: string
  created_at?: string
  updated_at?: string
}

export interface StudentInput {
  name: string
  student_id: string
  address: string
  email?: string
  phone?: string
}
