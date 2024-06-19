"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useSession } from "next-auth/react";

const AllResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const getResults = async () => {
      try {
        const response = await axios.get("/api/admin/get-all-results");
        setResults(response.data.results);
      } catch (error) {
        console.error("Failed to fetch results", error);
      } finally {
        setLoading(false);
      }
    };

    getResults();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleView = (id) => {
    router.push(`/admin-dashboard/view-results/${id}`);
  };

  const handleEdit = (id) => {
    router.push(`/admin-dashboard/edit-result/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `/api/admin/delete-edit-get-result/${id}`
      );
      if (response.data.success) {
        alert("Result deleted");
        setResults((prevResults) => prevResults.filter((result) => result._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete result", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10">
      <h1 className="text-3xl my-4 text-center">All Results</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-black text-white">
            <tr className="text-xs font-semibold uppercase tracking-wider">
              <th className="py-3 px-6 text-left rounded-tl-lg">Student Roll Number</th>
              <th className="py-3 px-6 text-left">Student Name</th>
              <th className="py-3 px-6 text-left">Class</th>
              <th className="py-3 px-6 text-left">Section</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-xs">
            {loading ? (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center">Loading results...</td>
              </tr>
            ) : (
              results.map((result) => (
                <tr key={result._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{result.rollNumber}</td>
                  <td className="py-3 px-6 text-left">{result.name}</td>
                  <td className="py-3 px-6 text-left">{result.class}</td>
                  <td className="py-3 px-6 text-left">{result.section}</td>
                  <td className="py-3 px-6 text-left">{formatDate(result.date)}</td>
                  <td className="py-3 px-6 text-center flex justify-center">
                    {session.role === "admin" && (
                      <>
                        <FaEye
                          className="text-blue-500 hover:text-blue-700 mx-2 cursor-pointer"
                          onClick={() => handleView(result._id)}
                        />
                        <FaEdit
                          className="text-yellow-500 hover:text-yellow-700 mx-2 cursor-pointer"
                          onClick={() => handleEdit(result._id)}
                        />
                        <FaTrash
                          className="text-red-500 hover:text-red-700 mx-2 cursor-pointer"
                          onClick={() => handleDelete(result._id)}
                        />
                      </>
                    )}
                    {session.role === "teacher" && (
                      <>
                        <FaEye
                          className="text-blue-500 hover:text-blue-700 mx-2 cursor-pointer"
                          onClick={() => handleView(result._id)}
                        />
                        <FaEdit
                          className="text-yellow-500 hover:text-yellow-700 mx-2 cursor-pointer"
                          onClick={() => handleEdit(result._id)}
                        />
                      </>
                    )}
                    {session.role === "student" && (
                      <>
                        <FaEye
                          className="text-blue-500 hover:text-blue-700 mx-2 cursor-pointer"
                          onClick={() => handleView(result._id)}
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllResults;
