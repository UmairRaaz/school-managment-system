'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { FaEye } from "react-icons/fa";

const StudentAllFees = ({ studentId }) => {
  const [feesData, setFeesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession(); 

  useEffect(() => {
    const getFeesDetails = async () => {
      if (status === 'authenticated' && session) {
        try {
          const response = await axios.get(`/api/admin/get-student-fee/${session._id}`);
          setFeesData(response.data.fee);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10">
      <h1 className="text-3xl my-4 text-center">Student Fees</h1>
      <div className="overflow-x-auto">
        {feesData.length === 0 ? (
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
              {feesData.map((fee) => (
                <tr key={fee._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{new Date(fee.date).toLocaleDateString()}</td>
                  <td className="py-3 px-6 text-left">{fee.MonthlyFee}</td>
                  <td className="py-3 px-6 text-left">{fee.isPaid ? "Paid" : "Unpaid"}</td>
                  <td className="py-3 px-6 text-left">{fee.FeeDescription}</td>
                  <td className="py-3 px-6 text-left">
                    {/* Add any actions you need here */}
                    
                  
  <a href={`/admin-dashboard/view-student-fees/${fee._id}`}>
    <FaEye
      className="text-blue-500 hover:text-blue-700 mx-2 cursor-pointer"
      onClick={() => handleView(result._id)}
    />
  </a>





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
