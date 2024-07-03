'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
    router.push(`/admin-dashboard/edit-teacher/${id}`);
  };

  const handleView = (id) => {
    router.push(`/admin-dashboard/view-teacher/${id}`);
  };

  const getShortContent = (content) => {
    if (typeof content === 'string') {
      const words = content.split(' ');
      return words.slice(0, 1).join(' ') + (words.length > 1 ? ' ...' : '');
    } else if (Array.isArray(content)) {
      return content.slice(0, 1).join(', ') + (content.length > 1 ? ' ...' : '');
    }
    return '';
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10">
      <h1 className="text-3xl my-4 text-center">All Teachers</h1>
      <div className="flex flex-col md:flex-row justify-start mb-4">
    <input
        type="text"
        className="border rounded p-2 w-full md:w-1/2 text-xs mb-2 md:mb-0 md:mr-2"
        placeholder="Search by name, username, or email"
        value={searchTerm}
        onChange={handleSearch}
    />
</div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-black text-white">
            <tr className="text-xs font-semibold uppercase tracking-wider">
              <th className="py-3 px-6 text-left rounded-tl-lg">Name</th>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Classes</th>
              <th className="py-3 px-6 text-left">Subjects</th>
              <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-xs">
            {filteredTeachers.map((teacher) => (
              <tr key={teacher._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{teacher.name}</td>
                <td className="py-3 px-6 text-left">{teacher.username}</td>
                <td className="py-3 px-6 text-left">{teacher.email}</td>
                <td className="py-3 px-6 text-left">{teacher.phoneNumber}</td>
                <td className="py-3 px-6 text-left">{getShortContent(teacher.classes)}</td>
                <td className="py-3 px-6 text-left">{getShortContent(teacher.subjects)}</td>
                <td className="py-3 px-6 text-center flex justify-center">
                  <FaEye className="text-blue-500 hover:text-blue-700 mx-2 cursor-pointer" onClick={() => handleView(teacher._id)} />
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
