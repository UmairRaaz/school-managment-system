'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const AllStudentsPage = () => {
    const [student, setStudent] = useState([])
    const router = useRouter();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('/api/admin/all-students');
            setStudent(response.data.students);
        } catch (error) {
            console.error("Error fetching Students:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/admin/delete-edit-get-student/${id}`);
            fetchStudents();
        } catch (error) {
            console.error("Error deleting Students:", error);
        }
    };

    const handleEdit = (id) => {
        router.push(`/admin-dashboard/edit-student/${id}`)
    };
    const handleView = (id) => {
        router.push(`/admin-dashboard/view-student/${id}`)
    };

    return (
        <div className="max-w-6xl mx-auto p-8 mt-10">
            <h1 className="text-3xl my-4 text-center">All Students</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-black text-white">
                        <tr className="text-xs font-semibold uppercase tracking-wider">
                            <th className="py-3 px-6 text-left rounded-tl-lg">Username</th>
                            <th className="py-3 px-6 text-left">SID</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">FatherName</th>
                            <th className="py-3 px-6 text-left">AdmissionClass</th>
                            <th className="py-3 px-6 text-left">MobileNumber</th>
                            <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-xs">
                        {student.map((student) => (
                            <tr key={student._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{student.username}</td>
                                <td className="py-3 px-6 text-left">{student.SID}</td>
                                <td className="py-3 px-6 text-left">{student.Name}</td>
                                <td className="py-3 px-6 text-left">{student.FatherName}</td>
                                <td className="py-3 px-6 text-left">{student.AdmissionClass}</td>
                                <td className="py-3 px-6 text-left">{student.MobileNumber}</td>
                                <td className="py-3 px-6 text-center flex justify-center">
                                    <FaEye className="text-blue-500 hover:text-blue-700 mx-2 cursor-pointer" onClick={() => handleView(student._id)} />
                                    <FaEdit className="text-yellow-500 hover:text-yellow-700 mx-2 cursor-pointer" onClick={() => handleEdit(student._id)} />
                                    <FaTrash className="text-red-500 hover:text-red-700 mx-2 cursor-pointer" onClick={() => handleDelete(student._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllStudentsPage