"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";

const AllStudentsFees = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const currentYear = new Date().getFullYear();
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feesLoading, setFeesLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedFees, setSelectedFees] = useState([]);
  const [filterClass, setFilterClass] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  console.log("selectedYear", selectedYear);

  useEffect(() => {
    if (selectedDate) {
      const handleGetFeesByDate = async () => {
        try {
          setFeesLoading(true);
          const response = await axios.post(`/api/admin/get-all-fees`, {
            date: selectedDate,
          });
          console.log("mothly fee", response.data.allFees);
          setFees(response.data.allFees);
          setSelectedFees([]); // Reset selected fees
        } catch (error) {
          console.error("Error fetching fees:", error);
        } finally {
          setFeesLoading(false);
        }
      };
      handleGetFeesByDate();
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!selectedDate && selectedYear) {
      const handleGetFeesByYear = async () => {
        try {
          setFeesLoading(true);
          const response = await axios.post(
            `/api/admin/get-all-fees-annually`,
            {
              year: selectedYear,
            }
          );
          console.log(response.data.allFees);
          setFees(response.data.allFees);
          setSelectedFees([]);
        } catch (error) {
          console.error("Error fetching fees:", error);
        } finally {
          setFeesLoading(false);
        }
      };
      handleGetFeesByYear();
    }
  }, [selectedYear, selectedDate]);

  const handleAddFees = async () => {
    try {
      setFeesLoading(true);
      const response = await axios.post("/api/admin/fees-each-month", {
        date: selectedDate,
      });
      console.log(response.data.allFees);
    } catch (error) {
      console.error("Error adding fees:", error);
    } finally {
      setFeesLoading(false);
    }
  };

  const handleDeleteFees = async (id) => {
    try {
      setFeesLoading(true);
      const response = await axios.delete(
        `/api/admin/fees-get-edit-delete/${id}`
      );
      if (response.data.success) {
        alert("Fees Deleted");
        handleGetFeesByDate();
      }
    } catch (error) {
      console.error("Error deleting fees:", error);
    } finally {
      setFeesLoading(false);
    }
  };

  const handleDeleteAllFees = async () => {
    try {
      setFeesLoading(true);
      for (let id of selectedFees) {
        await axios.delete(`/api/admin/fees-get-edit-delete/${id}`);
      }
      alert("All selected fees deleted");
      handleGetFeesByDate();
    } catch (error) {
      console.error("Error deleting all fees:", error);
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
      const response = await axios.put(
        `/api/admin/fees-get-edit-delete/${id}`,
        {
          isPaid: newStatus,
        }
      );
      if (response.data.success) {
        handleGetFeesByDate();
      }
    } catch (error) {
      console.error("Error updating fee status:", error);
    } finally {
      setFeesLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedFees.length === fees.length) {
      setSelectedFees([]);
    } else {
      setSelectedFees(fees.map((fee) => fee._id));
    }
  };

  const toggleSelectFee = (id) => {
    if (selectedFees.includes(id)) {
      setSelectedFees(selectedFees.filter((feeId) => feeId !== id));
    } else {
      setSelectedFees([...selectedFees, id]);
    }
  };

  const filteredFees = fees.filter((fee) => {
    const matchesClass = filterClass
      ? fee.studentId.CurrentClass === filterClass
      : true;
    const matchesStatus = filterStatus
      ? filterStatus === "Paid"
        ? fee.isPaid
        : !fee.isPaid
      : true;
    const matchesSearch =
      fee.studentId.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.studentId.SID.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 mt-20">
      <h1 className="text-2xl my-4 text-center">All Fees</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedYear(""); // Clear year selection
            }}
            className="border border-gray-300 rounded-md px-2 py-1 text-xs"
          />
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setSelectedDate(""); // Clear date selection
            }}
            className="border border-gray-300 rounded-md px-2 py-1 text-xs"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={currentYear - i}>
                {currentYear - i}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAddFees}
            className="bg-black text-white rounded-md px-2 py-1 text-xs"
            disabled={!selectedDate}
          >
            {feesLoading ? "Adding Fees..." : "Add Fees"}
          </button>
          <button
            type="button"
            onClick={handleGetFeesByDate}
            className="bg-black text-white rounded-md px-2 py-1 text-xs"
            disabled={!selectedDate}
          >
            {feesLoading ? "Fetching Fees..." : "Get Fees"}
          </button>
          <button
            type="button"
            onClick={handleDeleteAllFees}
            className="bg-red-500 text-white rounded-md px-2 py-1 text-xs"
            disabled={selectedFees.length === 0}
          >
            {feesLoading ? "Deleting All..." : "Delete All"}
          </button>
        </div>
        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-end gap-2">
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-xs"
          >
            <option value="">All Classes</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Class {i + 1}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-xs"
          >
            <option value="">Fee Status</option>
            <option value="Paid">Paid</option>
            <option value="Not Paid">Not Paid</option>
          </select>
          <input
            type="text"
            placeholder="Search by Name or Roll Nbr"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-xs"
          />
        </div>
      </div>
      {loading ? (
        <p className="text-center">Loading students...</p>
      ) : (
        <div className="overflow-x-auto">
          {filteredFees.length === 0 ? (
            <p className="text-center">No Data Available</p>
          ) : (
            <table className="min-w-full bg-white shadow-md rounded-lg text-xs">
              <thead className="bg-black text-white">
                <tr className="text-xs font-semibold uppercase tracking-wider">
                  <th className="py-2 px-4 text-left rounded-tl-lg">
                    <input
                      type="checkbox"
                      checked={selectedFees.length === filteredFees.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="py-2 px-4 text-left">Roll Number</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Class</th>
                  <th className="py-2 px-4 text-left">Section</th>
                  <th className="py-2 px-4 text-left">Mobile Number</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Fee Status</th>
                  <th className="py-2 px-4 text-center rounded-tr-lg">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-xs">
                {filteredFees.map((fee) => (
                  <tr
                    key={fee._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-2 px-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedFees.includes(fee._id)}
                        onChange={() => toggleSelectFee(fee._id)}
                      />
                    </td>
                    <td className="py-2 px-4 text-left">{fee.studentId.SID}</td>
                    <td className="py-2 px-4 text-left">
                      {fee.studentId.Name}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {fee.studentId.CurrentClass}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {fee.studentId.Section}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {fee.studentId.MobileNumber}
                    </td>
                    <td className="py-2 px-4 text-left">
                      {new Date(fee.date).toISOString().split("T")[0]}
                    </td>
                    <td className="py-2 px-4 text-left">
                      <select
                        value={fee.isPaid ? "Paid" : "Not Paid"}
                        onChange={(e) =>
                          handleFeeStatusChange(
                            fee._id,
                            e.target.value === "Paid"
                          )
                        }
                        className="border border-gray-300 rounded-md p-1"
                      >
                        <option value="Paid">Paid</option>
                        <option value="Not Paid">Not Paid</option>
                      </select>
                    </td>
                    <td className="py-2 px-4 text-center flex justify-center">
                      <Link
                        href={`/admin-dashboard/view-student-fees/${fee._id}`}
                      >
                        <FaEye className="text-blue-500 hover:text-blue-700 mx-1 cursor-pointer" />
                      </Link>
                      <FaEdit
                        className="text-yellow-500 hover:text-yellow-700 mx-1 cursor-pointer"
                        onClick={() => handleEditFees(fee._id)}
                      />
                      <FaTrash
                        className="text-red-500 hover:text-red-700 mx-1 cursor-pointer"
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
