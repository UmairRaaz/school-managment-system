"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";

const AllStudentsFees = () => {
  const [student, setStudent] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/admin/all-students");
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
    router.push(`/admin-dashboard/edit-student/${id}`);
  };
  const handleView = (id) => {
    router.push(`/admin-dashboard/view-student/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10">
      <h1 className="text-3xl my-4 text-center">All Fees</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-black text-white">
            <tr className="text-xs font-semibold uppercase tracking-wider">
              <th className="py-3 px-6 text-left rounded-tl-lg">Roll Number</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">class</th>
              <th className="py-3 px-6 text-left">Section</th>
              <th className="py-3 px-6 text-left">MobileNumber</th>
              <th className="py-3 px-6 text-left">Fee Status</th>
              <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-xs">
            {student.map((student) => (
              <tr
                key={student._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">21BSCS34</td>
                <td className="py-3 px-6 text-left">Moon Khan</td>
                <td className="py-3 px-6 text-left">6</td>
                <td className="py-3 px-6 text-left">A</td>
                <td className="py-3 px-6 text-left">03144461778</td>
                <td className="py-3 px-6 text-left">Not Paid</td>
                <td className="py-3 px-6 text-center flex justify-center">
                  <Link href="/admin-dashboard/view-student-fees">
                    <FaEye className="text-blue-500 hover:text-blue-700 mx-2 cursor-pointer" />
                  </Link>
                  <FaEdit
                    className="text-yellow-500 hover:text-yellow-700 mx-2 cursor-pointer"
                    onClick={() => handleEdit(student._id)}
                  />
                  <FaTrash
                    className="text-red-500 hover:text-red-700 mx-2 cursor-pointer"
                    onClick={() => handleDelete(student._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllStudentsFees;
