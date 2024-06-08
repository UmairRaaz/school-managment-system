'use client'
import StudentEditForm from '@/components/StudentEditForm'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const EditteacherPage = ({ params }) => {
  const [studentDetails, setstudentDetails] = useState({})
  const id = params.id
  const [isLoading, setIsLoading] = useState(true);

  const getStudentDetails = async (id) => {
    try {
      console.log("id", id)
      const response = await axios.get(`/api/admin/delete-edit-get-student/${id}`)
      console.log(response.data.student)
      setstudentDetails(response.data.student)
    } catch (error) {
      console.error("Error fetching student details:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getStudentDetails(id)
  }, [])

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <StudentEditForm studentDetails={studentDetails} />
      )}
    </div>
  )
}

export default EditteacherPage
