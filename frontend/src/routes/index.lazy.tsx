import { useQuery } from "@tanstack/react-query"
import { createLazyFileRoute } from "@tanstack/react-router"
import { studentService } from "../services/studentService"
import StudentFormDialog from "../components/StudentFormDialog"
import { useState } from "react"
import type { Student } from "../types/student"

export const Route = createLazyFileRoute("/")({
  component: StudentList,
})

function StudentList() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeStudent, setActiveStudent] = useState<Student | null>(null)
  const [viewMode, setViewMode] = useState(false)

  const {
    data: students,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["students"],
    queryFn: () => studentService.getAll(),
  })

  // Function to reset dialog state
  const closeDialog = () => {
    setIsOpen(false)
    // Reset the state after the dialog closes
    setTimeout(() => {
      setViewMode(false)
      setActiveStudent(null)
    }, 100)
  }

  // Function to open dialog in add mode
  const handleAddNew = () => {
    setActiveStudent(null)
    setViewMode(false)
    setIsOpen(true)
  }

  // Function to open dialog in edit mode
  const handleEdit = (student: Student) => {
    setActiveStudent(student)
    setViewMode(false)
    setIsOpen(true)
  }

  // Function to open dialog in view mode
  const handleView = (student: Student) => {
    setActiveStudent(student)
    setViewMode(true)
    setIsOpen(true)
  }

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
    <>
      <div className='container mx-auto px-4 py-6'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Student Management System</h1>
          <button
            onClick={handleAddNew}
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer flex items-center'
            type='button'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 mr-2'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                clipRule='evenodd'
              />
            </svg>
            Add New Student
          </button>
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
                        <button
                          type='button'
                          className='text-indigo-600 hover:text-indigo-900 cursor-pointer'
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>
                        <button
                          type='button'
                          className='text-blue-600 hover:text-blue-900 cursor-pointer'
                          onClick={() => handleView(student)}
                        >
                          View
                        </button>
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

      <StudentFormDialog
        isOpen={isOpen}
        onClose={closeDialog}
        student={activeStudent}
        viewMode={viewMode}
      />
    </>
  )
}

export default StudentList
