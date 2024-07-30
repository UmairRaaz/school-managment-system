'use client'
import TeacherEditForm from '@/app/components/TeacherEditForm'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const EditteacherPage = ({ params }) => {
  const [teacherDetails, setTeacherDetails] = useState({})
  const id = params.id
  const [isLoading, setIsLoading] = useState(true);

  const getTeacherDetails = async (id) => {
    try {
      console.log("id", id)
      const response = await axios.get(`/api/admin/delete-get-edit-teacher/${id}`)
      console.log(response.data.teacher)
      setTeacherDetails(response.data.teacher)
    } catch (error) {
      console.error("Error fetching teacher details:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTeacherDetails(id)
  }, [id])

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TeacherEditForm teacherDetails={teacherDetails} />
      )}
    </div>
  )
}

export default EditteacherPage
