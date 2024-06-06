'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const router = useRouter()
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
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl my-4">Teacher List</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Classes</th>
            <th className="py-2 px-4 border-b">Subjects</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td className="py-2 px-4 border-b">{teacher.username}</td>
              <td className="py-2 px-4 border-b">{teacher.name}</td>
              <td className="py-2 px-4 border-b">{teacher.email}</td>
              <td className="py-2 px-4 border-b">{teacher.phoneNumber}</td>
              <td className="py-2 px-4 border-b">{teacher.classes.join(', ')}</td>
              <td className="py-2 px-4 border-b">{teacher.subjects.join(', ')}</td>
              <td className="py-2 px-4 border-b">
                
                <button
                  onClick={() => handleEdit(teacher._id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleView(teacher._id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(teacher._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherList;
