import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { studentService } from "../services/studentService"

export const Route = createFileRoute("/students/$studentId/view")({
  component: StudentView,
})

function StudentView() {
  const { studentId } = Route.useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    data: student,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["student", studentId],
    queryFn: () => studentService.getById(Number(studentId)),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => studentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] })
      navigate({ to: "/" })
    },
  })

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteMutation.mutate(Number(studentId))
    }
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[50vh]'>
        <div className='text-xl font-semibold'>Loading student data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4'>
        <strong className='font-bold'>Error!</strong>
        <span className='block sm:inline'>
          {" "}
          Failed to load student details.
        </span>
      </div>
    )
  }

  if (!student) {
    return (
      <div className='bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mt-4'>
        <strong className='font-bold'>Not Found!</strong>
        <span className='block sm:inline'> Student not found.</span>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Student Details</h1>
        <div className='space-x-2'>
          <Link
            to={`/students/$studentId/edit`}
            params={{ studentId }}
            className='bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded'
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded'
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{student.name}</div>
          <p className='text-gray-700 text-sm mb-4'>
            Student ID: {student.student_id}
          </p>

          <div className='border-t border-gray-200 pt-4 mt-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <h3 className='text-sm font-medium text-gray-500'>Address</h3>
                <p className='mt-1 text-sm text-gray-900'>{student.address}</p>
              </div>

              {student.email && (
                <div>
                  <h3 className='text-sm font-medium text-gray-500'>Email</h3>
                  <p className='mt-1 text-sm text-gray-900'>{student.email}</p>
                </div>
              )}

              {student.phone && (
                <div>
                  <h3 className='text-sm font-medium text-gray-500'>Phone</h3>
                  <p className='mt-1 text-sm text-gray-900'>{student.phone}</p>
                </div>
              )}

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
          </div>
        </div>

        <div className='px-6 py-4 bg-gray-50'>
          <Link to='/' className='text-indigo-600 hover:text-indigo-900'>
            ← Back to Student List
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StudentView
