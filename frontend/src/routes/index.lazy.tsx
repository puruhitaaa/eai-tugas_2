import { Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { createLazyFileRoute } from "@tanstack/react-router"
import { studentService } from "../services/studentService"

export const Route = createLazyFileRoute("/")({
  component: StudentList,
})

function StudentList() {
  const {
    data: students,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["students"],
    queryFn: () => studentService.getAll(),
  })

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[50vh]'>
        <div className='text-xl font-semibold'>Loading students...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4'>
        <strong className='font-bold'>Error!</strong>
        <span className='block sm:inline'> Failed to load students.</span>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Student Management System</h1>
        {/* <Link
          to='/student/new'
          className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'
        >
          Add New Student
        </Link> */}
      </div>

      {students && students.length > 0 ? (
        <div className='overflow-x-auto bg-white rounded-lg shadow'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Name
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Student ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Address
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Contact
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {students.map((student) => (
                <tr key={student.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='font-medium text-gray-900'>
                      {student.name}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-gray-500'>{student.student_id}</div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='text-gray-500'>{student.address}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>
                      {student.email && (
                        <div>
                          <span className='font-medium'>Email:</span>{" "}
                          {student.email}
                        </div>
                      )}
                      {student.phone && (
                        <div>
                          <span className='font-medium'>Phone:</span>{" "}
                          {student.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex space-x-2'>
                      <Link
                        to={`/students/$studentId/edit`}
                        params={{ studentId: student.id.toString() }}
                        className='text-indigo-600 hover:text-indigo-900'
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/students/$studentId/view`}
                        params={{ studentId: student.id.toString() }}
                        className='text-blue-600 hover:text-blue-900'
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='bg-white p-6 rounded-lg shadow text-center'>
          <p className='text-gray-500'>
            No students found. Add a new student to get started.
          </p>
        </div>
      )}
    </div>
  )
}

export default StudentList
