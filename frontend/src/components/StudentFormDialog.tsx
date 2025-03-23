import { useEffect } from "react"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { studentService } from "../services/studentService"
import { Student, StudentInput } from "../types/student"

interface StudentFormDialogProps {
  isOpen: boolean
  onClose: () => void
  student?: Student | null
  viewMode?: boolean
}

export default function StudentFormDialog({
  isOpen,
  onClose,
  student,
  viewMode = false,
}: StudentFormDialogProps) {
  const isEditMode = !!student && !viewMode
  const queryClient = useQueryClient()

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: StudentInput) => studentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      onClose()
    },
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<StudentInput> }) =>
      studentService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      onClose()
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => studentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      onClose()
    },
  })

  const form = useForm({
    defaultValues: {
      name: "",
      student_id: "",
      address: "",
      email: "",
      phone: "",
    },
    onSubmit: async ({ value }) => {
      const formData: StudentInput = {
        name: value.name,
        student_id: value.student_id,
        address: value.address,
        email: value.email || undefined,
        phone: value.phone || undefined,
      }

      if (isEditMode && student) {
        updateMutation.mutate({ id: student.id, data: formData })
      } else {
        createMutation.mutate(formData)
      }
    },
  })

  const handleDelete = () => {
    if (
      student &&
      window.confirm("Are you sure you want to delete this student?")
    ) {
      deleteMutation.mutate(student.id)
    }
  }

  // Reset form and set values when opening dialog or changing student
  useEffect(() => {
    if (isOpen) {
      if (student) {
        form.reset({
          name: student.name,
          student_id: student.student_id,
          address: student.address,
          email: student.email || "",
          phone: student.phone || "",
        })
      } else {
        form.reset({
          name: "",
          student_id: "",
          address: "",
          email: "",
          phone: "",
        })
      }
    }
  }, [isOpen, student, form])

  if (!isOpen) return null

  // Get dialog title based on mode
  const getDialogTitle = () => {
    if (viewMode) return "Student Details"
    if (isEditMode) return "Edit Student"
    return "Add New Student"
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        <h2 className='text-xl font-bold mb-6'>{getDialogTitle()}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className='space-y-4'
        >
          {/* Name field */}
          <div>
            <form.Field name='name'>
              {(field) => (
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Full Name
                  </label>
                  <input
                    id='name'
                    type='text'
                    className={`w-full px-3 py-2 border rounded-md ${
                      field.state.meta.errors.length > 0
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    disabled={
                      viewMode || (isEditMode && field.name === "student_id")
                    }
                    readOnly={viewMode}
                  />
                  {!viewMode && field.state.meta.errors.length > 0 && (
                    <p className='mt-1 text-sm text-red-500'>
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          {/* Student ID field */}
          <div>
            <form.Field name='student_id'>
              {(field) => (
                <div>
                  <label
                    htmlFor='student_id'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Student ID
                  </label>
                  <input
                    id='student_id'
                    type='text'
                    className={`w-full px-3 py-2 border rounded-md ${
                      field.state.meta.errors.length > 0
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    disabled={viewMode || isEditMode} // Disable editing of student_id in edit mode
                    readOnly={viewMode || isEditMode}
                  />
                  {!viewMode && field.state.meta.errors.length > 0 && (
                    <p className='mt-1 text-sm text-red-500'>
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          {/* Address field */}
          <div>
            <form.Field name='address'>
              {(field) => (
                <div>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Address
                  </label>
                  <textarea
                    id='address'
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md ${
                      field.state.meta.errors.length > 0
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    disabled={viewMode}
                    readOnly={viewMode}
                  />
                  {!viewMode && field.state.meta.errors.length > 0 && (
                    <p className='mt-1 text-sm text-red-500'>
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          {/* Email field */}
          <div>
            <form.Field name='email'>
              {(field) => (
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Email (optional)
                  </label>
                  <input
                    id='email'
                    type='email'
                    className={`w-full px-3 py-2 border rounded-md ${
                      field.state.meta.errors.length > 0
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    disabled={viewMode}
                    readOnly={viewMode}
                  />
                  {!viewMode && field.state.meta.errors.length > 0 && (
                    <p className='mt-1 text-sm text-red-500'>
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          {/* Phone field */}
          <div>
            <form.Field name='phone'>
              {(field) => (
                <div>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Phone (optional)
                  </label>
                  <input
                    id='phone'
                    type='text'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    disabled={viewMode}
                    readOnly={viewMode}
                  />
                </div>
              )}
            </form.Field>
          </div>

          {/* Timestamps in view mode */}
          {viewMode && student && (
            <div className='grid grid-cols-2 gap-4 mt-4 border-t pt-4'>
              <div>
                <h3 className='text-sm font-medium text-gray-500'>Created</h3>
                <p className='mt-1 text-sm text-gray-900'>
                  {student.created_at
                    ? new Date(student.created_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <h3 className='text-sm font-medium text-gray-500'>
                  Last Updated
                </h3>
                <p className='mt-1 text-sm text-gray-900'>
                  {student.updated_at
                    ? new Date(student.updated_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          )}

          <div className='flex justify-end space-x-3 mt-6'>
            {viewMode && student && (
              <button
                type='button'
                onClick={handleDelete}
                className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 cursor-pointer'
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            )}

            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer'
            >
              {viewMode ? "Close" : "Cancel"}
            </button>

            {!viewMode && (
              <button
                type='submit'
                className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer'
                disabled={
                  createMutation.isPending ||
                  updateMutation.isPending ||
                  !form.state.canSubmit
                }
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : "Save"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
