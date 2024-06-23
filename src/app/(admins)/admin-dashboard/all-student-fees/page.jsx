'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";

const AllStudentsFees = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' }); 
  const currentYear = new Date().getFullYear(); 

  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [feesLoading, setFeesLoading] = useState(false); 
  const [selectedMonth, setSelectedMonth] = useState(currentMonth); 
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const router = useRouter();

  useEffect(() => {
    handleGetFees();
  }, [selectedMonth, selectedYear]);

  const handleAddFees = async () => {
    try {
      setFeesLoading(true); 
      const response = await axios.post("/api/admin/fees-each-month", { month: selectedMonth, year: selectedYear });
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
      const response = await axios.post(`/api/admin/get-all-fees`, { month: selectedMonth, year: selectedYear });
      console.log(response.data.allFees);
      setFees(response.data.allFees);
    } catch (error) {
      console.error("Error fetching fees:", error);
    } finally {
      setFeesLoading(false); 
    }
  };

  const handleDeleteFees = async (id) => {
    try {
      const response = await axios.delete(`/api/admin/fees-get-edit-delete/${id}`);
      if(response.data.success){
        alert("Fees Deleted");
        handleGetFees();
      }
    } catch (error) {
      console.error("Error deleting fees:", error);
    } finally {
      setFeesLoading(false); 
    }
  };

  const handleEditFees = (id) => {
    router.push(`/admin-dashboard/admin-edit-fees/${id}`);
  };

  const handleFeeStatusChange = async (id, newStatus) => {
    try {
      setFeesLoading(true);
      const response = await axios.put(`/api/admin/fees-get-edit-delete/${id}`, {
        isPaid: newStatus
      });
      if (response.data.success) {
        handleGetFees(); 
      }
    } catch (error) {
      console.error("Error updating fee status:", error);
    } finally {
      setFeesLoading(false);
    }
  };

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10">
      <h1 className="text-3xl my-4 text-center">All Fees</h1>
      <div className="flex gap-4">
        <select 
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm my-4"
        >
          <option value="">Select Month</option>
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>
        <select 
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm my-4"
        >
          {[...Array(5)].map((_, i) => {
            const year = new Date().getFullYear() - i;
            return <option key={year} value={year}>{year}</option>
          })}
        </select>
        <button
          type="button"
          onClick={handleAddFees}
          className="bg-black text-white rounded-md px-4 py-2 text-sm my-4"
          disabled={!selectedMonth || !selectedYear}
        >
          {feesLoading ? "Adding Fees..." : "Add Monthly Fees"}
        </button>
        <button
          type="button"
          onClick={handleGetFees}
          className="bg-black text-white rounded-md px-4 py-2 text-sm my-4"
          disabled={!selectedMonth || !selectedYear}
        >
          {feesLoading ? "Fetching Fees..." : "Get Fees"}
        </button>
      </div>
      {loading ? (
        <p className="text-center">Loading students...</p>
      ) : (
        <div className="overflow-x-auto">
          {fees.length === 0 ? (
            <p className="text-center">No Data Available</p>
          ) : (
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
                    <td className="py-3 px-6 text-left">
                      <select
                        value={fee.isPaid ? "Paid" : "Not Paid"}
                        onChange={(e) => handleFeeStatusChange(fee._id, e.target.value === "Paid")}
                        className="border border-gray-300 rounded-md p-1"
                      >
                        <option value="Paid">Paid</option>
                        <option value="Not Paid">Not Paid</option>
                      </select>
                    </td>
                    <td className="py-3 px-6 text-center flex justify-center">
                      <Link href={`/admin-dashboard/view-student-fees/${fee._id}`}>
                        <FaEye className="text-blue-500 hover:text-blue-700 mx-2 cursor-pointer" />
                      </Link>
                      <FaEdit
                        className="text-yellow-500 hover:text-yellow-700 mx-2 cursor-pointer"
                        onClick={() => handleEditFees(fee._id)}
                      />
                      <FaTrash
                        className="text-red-500 hover:text-red-700 mx-2 cursor-pointer"
                        onClick={() => handleDeleteFees(fee._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AllStudentsFees;
