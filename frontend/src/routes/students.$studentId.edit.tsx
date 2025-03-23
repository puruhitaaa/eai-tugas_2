import { useEffect } from "react"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { studentService } from "../services/studentService"
import { StudentInput } from "../types/student"

export const Route = createFileRoute("/students/$studentId/edit")({
  component: StudentForm,
})

function StudentForm() {
  const { studentId } = Route.useParams()
  const isEditMode = studentId !== "new"
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Fetch student data if in edit mode
  const { data: student, isLoading } = useQuery({
    queryKey: ["student", studentId],
    queryFn: () => studentService.getById(Number(studentId)),
    enabled: isEditMode,
  })

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: StudentInput) => studentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      navigate({ to: "/" })
    },
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<StudentInput> }) =>
      studentService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      queryClient.invalidateQueries({ queryKey: ["student", studentId] })
      navigate({ to: "/" })
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

      if (isEditMode) {
        updateMutation.mutate({ id: Number(studentId), data: formData })
      } else {
        createMutation.mutate(formData)
      }
    },
  })

  // Set form values when student data is loaded
  useEffect(() => {
    if (student) {
      form.reset({
        name: student.name,
        student_id: student.student_id,
        address: student.address,
        email: student.email || "",
        phone: student.phone || "",
      })
    }
  }, [student, form])

  if (isEditMode && isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[50vh]'>
        <div className='text-xl font-semibold'>Loading student data...</div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-2xl font-bold mb-6'>
        {isEditMode ? "Edit Student" : "Add New Student"}
      </h1>

      <div className='bg-white p-6 rounded-lg shadow'>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className='space-y-6'
        >
          {/* Name field */}
          <div>
            <form.Field
              name='name'
              children={(field) => (
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Full Name
                  </label>
                  <input
                    id='name'
                    type='text'
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                      field.state.meta.errors.length > 0 ? "border-red-500" : ""
                    }`}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className='mt-1 text-sm text-red-500'>
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Student ID field */}
          <div>
            <form.Field
              name='student_id'
              children={(field) => (
                <div>
                  <label
                    htmlFor='student_id'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Student ID
                  </label>
                  <input
                    id='student_id'
                    type='text'
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                      field.state.meta.errors.length > 0 ? "border-red-500" : ""
                    }`}
                    disabled={isEditMode} // Disable editing of student_id in edit mode
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className='mt-1 text-sm text-red-500'>
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Address field */}
          <div>
            <form.Field
              name='address'
              children={(field) => (
                <div>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Address
                  </label>
                  <textarea
                    id='address'
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    rows={3}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                      field.state.meta.errors.length > 0 ? "border-red-500" : ""
                    }`}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className='mt-1 text-sm text-red-500'>
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Email field */}
          <div>
            <form.Field
              name='email'
              children={(field) => (
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Email (optional)
                  </label>
                  <input
                    id='email'
                    type='email'
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                      field.state.meta.errors.length > 0 ? "border-red-500" : ""
                    }`}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className='mt-1 text-sm text-red-500'>
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Phone field */}
          <div>
            <form.Field
              name='phone'
              children={(field) => (
                <div>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Phone (optional)
                  </label>
                  <input
                    id='phone'
                    type='text'
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                  />
                </div>
              )}
            />
          </div>

          <div className='flex gap-4'>
            <button
              type='submit'
              className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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
            <button
              type='button'
              onClick={() => navigate({ to: "/" })}
              className='inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StudentForm
