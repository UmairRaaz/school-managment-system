'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const AllStudentsPage = () => {
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('/api/admin/all-students');
            setStudents(response.data.students);
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

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };

    const filteredStudents = students.filter((student) => {
        return (
            (selectedClass === '' || student.AdmissionClass === selectedClass) &&
            (student.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.FatherName.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    return (
        <div className="max-w-6xl mx-auto p-8 mt-10">
            <h1 className="text-3xl my-4 text-center">All Students</h1>
            <div className="flex flex-col md:flex-row justify-between mb-4">
    <input
        type="text"
        className="border p-2 rounded mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
        placeholder="Search by name, username"
        value={searchQuery}
        onChange={handleSearch}
    />
    <select
        className="border p-2 rounded w-full md:w-auto"
        value={selectedClass}
        onChange={handleClassChange}
    >
        <option value="">All Classes</option>
        {[...Array(10).keys()].map(i => (
            <option key={i + 1} value={`${i + 1}`}>{`Class ${i + 1}`}</option>
        ))}
    </select>
</div>

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
                        {filteredStudents.map((student) => (
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
