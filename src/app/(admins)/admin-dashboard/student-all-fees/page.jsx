'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const StudentAllFees = ({ studentId }) => {
  const [feesData, setFeesData] = useState([]);
  const [filteredFeesData, setFilteredFeesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('');
  const { data: session, status } = useSession(); 

  useEffect(() => {
    const getFeesDetails = async () => {
      if (status === 'authenticated' && session) {
        try {
          const response = await axios.get(`/api/admin/get-student-fee/${session._id}`);
          setFeesData(response.data.fee);
          setFilteredFeesData(response.data.fee); // Initialize filtered data with all fees
          console.log(response.data.fee);
        } catch (error) {
          console.error('Error fetching fees details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    getFeesDetails();
  }, [session, status]);

  useEffect(() => {
    // Filter feesData based on selected year
    if (selectedYear) {
      const filteredData = feesData.filter(fee => new Date(fee.date).getFullYear().toString() === selectedYear);
      setFilteredFeesData(filteredData);
    } else {
      // If no year selected, show all data
      setFilteredFeesData(feesData);
    }
  }, [selectedYear, feesData]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10">
      <h1 className="text-3xl my-4 text-center">Student Fees</h1>

      {/* Year filter dropdown */}
      <div className="mb-4">
        <label htmlFor="year" className="mr-2">Select Year:</label>
        <select id="year" onChange={handleYearChange} value={selectedYear} className="px-3 py-1 border rounded">
          <option value="">All</option>
          {/* Add options dynamically based on available years in feesData within the range */}
          {[...new Set(feesData.map(fee => new Date(fee.date).getFullYear()))]
            .filter(year => year >= 2010 && year <= 2024)
            .map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        {filteredFeesData.length === 0 ? (
          <p className="text-center">No Data Available</p>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-black text-white">
              <tr className="text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-6 text-left rounded-tl-lg">Date</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Fee Description</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-xs">
              {filteredFeesData.map((fee) => (
                <tr key={fee._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{new Date(fee.date).toLocaleDateString()}</td>
                  <td className="py-3 px-6 text-left">{fee.MonthlyFee}</td>
                  <td className="py-3 px-6 text-left">{fee.isPaid ? "Paid" : "Unpaid"}</td>
                  <td className="py-3 px-6 text-left">{fee.FeeDescription}</td>
                  <td className="py-3 px-6 text-left">
                  
                      <a  href={`/admin-dashboard/view-student-fees/${fee._id}`} className="bg-black text-white px-4 py-2 rounded">View</a>
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentAllFees;
