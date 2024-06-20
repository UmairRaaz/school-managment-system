"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";

const AllStudentsFees = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [feesLoading, setFeesLoading] = useState(false); // Fees loading state
  const router = useRouter();

  useEffect(() => {
    handleGetFees();
  }, []);



 
  const handleAddFees = async () => {
    try {
      setFeesLoading(true); 
      const response = await axios.get("/api/admin/fees-each-month");
      console.log(response.data.allFees);
    } catch (error) {
      console.error("Error adding fees:", error);
    } finally {
      setFeesLoading(false); 
    }
  };

  const handleGetFees = async () => {
    try {
      setFeesLoading(true); 
      const response = await axios.get("/api/admin/get-all-fees");
      console.log(response.data.allFees);
      setFees(response.data.allFees);
    } catch (error) {
      console.error("Error fetching fees:", error);
    } finally {
      setFeesLoading(false); 
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10">
      <h1 className="text-3xl my-4 text-center">All Fees</h1>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleAddFees}
          className="bg-black text-white rounded-md px-4 py-2 text-sm my-4"
        >
          {feesLoading ? "Adding Fees..." : "Add Monthly Fees"}
        </button>
        <button
          type="button"
          onClick={handleGetFees}
          className="bg-black text-white rounded-md px-4 py-2 text-sm my-4"
        >
          {feesLoading ? "Fetching Fees..." : "Get Fees"}
        </button>
      </div>
      {loading ? (
        <p className="text-center">Loading students...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-black text-white">
              <tr className="text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-6 text-left rounded-tl-lg">Roll Number</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Class</th>
                <th className="py-3 px-6 text-left">Section</th>
                <th className="py-3 px-6 text-left">Mobile Number</th>
                <th className="py-3 px-6 text-left">Month</th>
                <th className="py-3 px-6 text-left">Fee Status</th>
                <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-xs">
              {fees.map((fee) => (
                <tr
                  key={fee._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{fee.studentId.SID}</td>
                  <td className="py-3 px-6 text-left">{fee.studentId.Name}</td>
                  <td className="py-3 px-6 text-left">{fee.studentId.CurrentClass}</td>
                  <td className="py-3 px-6 text-left">{fee.studentId.Section}</td>
                  <td className="py-3 px-6 text-left">{fee.studentId.MobileNumber}</td>
                  <td className="py-3 px-6 text-left">{fee.month}</td>
                  <td className="py-3 px-6 text-left">{fee.isPaid ? "Paid" : "Not Paid"}</td>
                  <td className="py-3 px-6 text-center flex justify-center">
                    <Link href="/admin-dashboard/view-student-fees">
                      <FaEye className="text-blue-500 hover:text-blue-700 mx-2 cursor-pointer" />
                    </Link>
                    <FaEdit
                      className="text-yellow-500 hover:text-yellow-700 mx-2 cursor-pointer"
                      onClick={() => handleEdit(fee.studentId._id)}
                    />
                    <FaTrash
                      className="text-red-500 hover:text-red-700 mx-2 cursor-pointer"
                      onClick={() => handleDelete(fee.studentId._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllStudentsFees;
