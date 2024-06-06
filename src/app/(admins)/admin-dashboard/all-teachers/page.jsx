'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/admin/all-teachers');
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/delete-get-edit-teacher/${id}`);
      fetchTeachers(); 
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin-dashboard/edit-teacher/${id}`)
  };
  const handleView = (id) => {
    router.push(`/admin-dashboard/view-teacher/${id}`)
  };

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10">
      <h1 className="text-3xl my-4 text-center">All Teachers</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-black text-white">
            <tr className="text-xs font-semibold uppercase tracking-wider">
              <th className="py-3 px-6 text-left rounded-tl-lg">Username</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Classes</th>
              <th className="py-3 px-6 text-left">Subjects</th>
              <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-xs">
            {teachers.map((teacher) => (
              <tr key={teacher._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{teacher.username}</td>
                <td className="py-3 px-6 text-left">{teacher.name}</td>
                <td className="py-3 px-6 text-left">{teacher.email}</td>
                <td className="py-3 px-6 text-left">{teacher.phoneNumber}</td>
                <td className="py-3 px-6 text-left">{teacher.classes.join(', ')}</td>
                <td className="py-3 px-6 text-left">{teacher.subjects.join(', ')}</td>
                <td className="py-3 px-6 text-center flex justify-center">
                  <FaEye className="text-blue-500 hover:text-blue-700 mx-2 cursor-pointer" onClick={() => handleEdit(teacher._id)} />
                  <FaEdit className="text-yellow-500 hover:text-yellow-700 mx-2 cursor-pointer" onClick={() => handleEdit(teacher._id)} />
                  <FaTrash className="text-red-500 hover:text-red-700 mx-2 cursor-pointer" onClick={() => handleDelete(teacher._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherList;
