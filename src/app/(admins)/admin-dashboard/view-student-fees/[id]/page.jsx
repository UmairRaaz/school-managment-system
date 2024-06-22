'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FaDownload } from 'react-icons/fa';
import axios from 'axios';

const Fees = ({ params }) => {
  const componentRef = useRef();
  const [feesData, setFeesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = params;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const getFeesDetails = async () => {
    try {
      const response = await axios.get(`/api/admin/fees-get-edit-delete/${id}`);
      setFeesData(response.data.fees);
    } catch (error) {
      console.error('Error fetching fees details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeesDetails();
  }, []);

  const calculateFee = (currentClass) => {
    if (currentClass >= 1 && currentClass <= 5) {
      return 1000;
    } else if (currentClass >= 6 && currentClass <= 10) {
      return 2000;
    }
    return 0;
  };

  return (
    <div className="min-h-screen flex flex-col items-end justify-end mt-20 px-4">
      <button
        onClick={handlePrint}
        className="text-xs mr-8 mt-4 px-4 py-2 bg-black text-white font-semibold rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:rotate-2 hover:shadow-2xl flex items-center space-x-2"
      >
        <FaDownload className="text-white" />
        <span>Download PDF</span>
      </button>
      <div className="bg-white w-full max-w-5xl" ref={componentRef}>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-4 px-2 md:px-6">
            {['Candidate Copy', 'Bank Copy', 'School Copy'].map((copyType, index) => (
              <div
                key={index}
                className="text-sm bg-white p-4 md:p-8 shadow-xl rounded-lg border border-gray-300 flex flex-col justify-between h-full"
              >
                <header className="text-center mb-8">
                  <h1 className="text-lg font-bold text-gray-800">School Name</h1>
                  <p className="text-gray-600">School Address</p>
                  <p className="text-gray-600">Bank Name</p>
                </header>
                <section className="mb-2">
                  <p className="mb-2 text-xs">
                    <span className="font-semibold">S.No:</span> {feesData.serialNumber}
                  </p>
                  <p className="mb-2 text-xs">
                    <span className="font-semibold">Name:</span> {feesData.studentId.Name}
                  </p>
                  <p className="mb-2 text-xs">
                    <span className="font-semibold">Father Name:</span> {feesData.studentId.FatherName}
                  </p>
                  <p className="mb-2 text-xs">
                    <span className="font-semibold">Roll Number:</span> {feesData.studentId.SID}
                  </p>
                  <p className="mb-2 text-xs">
                    <span className="font-semibold">Class:</span> {feesData.studentId.CurrentClass}th
                  </p>
                  <p className="mb-2 text-xs">
                    <span className="font-semibold">Section:</span> {feesData.studentId.Section}
                  </p>
                  <p className="mb-2 text-xs">
                    <span className="font-semibold">Fee Description:</span> Monthly Fee
                  </p>
                  <p className="mb-2 text-xs">
                    <span className="font-semibold">Fee Status:</span> Not Paid
                  </p>
                  <p className="mb-2 text-xs">
                    <span className="font-semibold">Date:</span> 2024-06-11
                  </p>
                </section>
                <section>
                  <table className="w-full border-collapse mb-8">
                    <thead>
                      <tr className="flex justify-between">
                        <th className="bg-gray-100 text-left w-1/2 mb-4">Fee Type</th>
                        <th className="bg-gray-100 text-right w-1/2 mb-4">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="flex justify-between">
                        <td className="text-xs border-b text-left w-1/2">Calculated Fee</td>
                        <td className="text-xs border-b text-right w-1/2">Rs.0</td>
                      </tr>
                      <tr className="flex justify-between">
                        <td className="text-xs border-b text-left w-1/2">Admission Fee</td>
                        <td className="text-xs border-b text-right w-1/2">Rs.0</td>
                      </tr>
                      <tr className="flex justify-between">
                        <td className="text-xs border-b text-left w-1/2">Monthly Fee</td>
                        <td className="text-xs border-b text-right w-1/2">Rs.{feesData.MonthlyFee}</td>
                      </tr>
                      <tr className="flex justify-between">
                        <td className="text-xs border-b text-left w-1/2">Tuition Fee</td>
                        <td className="text-xs border-b text-right w-1/2">Rs.0</td>
                      </tr>
                      <tr className="flex justify-between">
                        <td className="text-xs border-b text-left w-1/2">Discount</td>
                        <td className="text-xs border-b text-right w-1/2">Rs.0</td>
                      </tr>
                      <tr className="flex justify-between">
                        <td className="text-xs border-b text-left w-1/2">Penalty</td>
                        <td className="text-xs border-b text-right w-1/2">Rs.0</td>
                      </tr>
                      <tr className="flex justify-between font-semibold mt-2">
                        <td className="text-left w-1/2">Total</td>
                        <td className="text-right w-1/2">Rs.{calculateFee(feesData.studentId.CurrentClass)}</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                <footer className="">
                  <div className="mt-3">
                    <span className="text-xs font-semibold">Depositor Name:</span> __________________
                  </div>
                  <div className="mt-3">
                    <span className="text-xs font-semibold">CNIC:</span> ____________________________
                  </div>
                  <div className="mt-3">
                    <span className="text-xs font-semibold">Signature:</span> _______________________
                  </div>
                  <div className="text-center mt-8 font-semibold text-gray-700">
                    {copyType}
                  </div>
                </footer>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fees;
