'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const TeacherPreviewPage = ({ params }) => {
    const [teacher, setTeacherDetails] = useState({})
    const id = params.id
    const [loading, setIsLoading] = useState(true);

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
    }, [])
    return (
        <div>
            {loading ? "Loading" :
                (
                    <div className="max-w-sm mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{teacher.name}</h2>
                        <div className="text-gray-700 mb-2">
                            <span className="font-bold">Username:</span> {teacher.username}
                        </div>
                        <div className="text-gray-700 mb-2">
                            <span className="font-bold">Email:</span> {teacher.email}
                        </div>
                        <div className="text-gray-700 mb-2">
                            <span className="font-bold">Phone Number:</span> {teacher.phoneNumber}
                        </div>
                        <div className="text-gray-700 mb-2">
                            <span className="font-bold">Classes:</span>
                            <ul className="list-disc list-inside">
                                {teacher.classes.map((className, index) => (
                                    <li key={index}>{className}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-gray-700">
                            <span className="font-bold">Subjects:</span>
                            <ul className="list-disc list-inside">
                                {teacher.subjects.map((subject, index) => (
                                    <li key={index}>{subject}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default TeacherPreviewPage