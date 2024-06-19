'use client';
// pages/index.js
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaDownload } from "react-icons/fa";
import { GiTrophyCup } from 'react-icons/gi'

const ViewResultCard = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 20px;
        margin-top: 100px;
        padding:100px;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
        }
      }
      .print-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
      .print-content {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
      }
    `,
  });

  const mockData = {
    schoolName: "The Roots English School",
    schoolAddress: "123 Main Street, Jamshoro, Pakistan",
    schoolLogo: "../school.jpeg", // Replace with your school logo URL
    studentName: "Moon Khan",
    fatherName: "Rustam Khan",
    class: "10",
    section: "A",
    rollNumber: "001",
    cast: "Pathan",
    subjects: [
      { name: "Mathematics", totalMarks: 100, minMarks: 35, obtainedMarks: 100 },
      { name: "Science", totalMarks: 100, minMarks: 35, obtainedMarks: 40 },
      { name: "English", totalMarks: 100, minMarks: 35, obtainedMarks: 70 },
      { name: "History", totalMarks: 100, minMarks: 35, obtainedMarks: 99 },
      { name: "Geography", totalMarks: 100, minMarks: 35, obtainedMarks: 35 }, // Fail: Changed obtained marks to show red color
      { name: "Computer Science", totalMarks: 100, minMarks: 40, obtainedMarks: 96 },
      { name: "Physical Education", totalMarks: 100, minMarks: 40, obtainedMarks: 99 },
      { name: "-", totalMarks: '-', minMarks: '-', obtainedMarks: '-' },
      { name: "-", totalMarks: '-', minMarks: '-', obtainedMarks: '-' },
      { name: "-", totalMarks: '-', minMarks: '-', obtainedMarks: '-' },
    ],
    principalSignature: "Principal's Signature.",
    additionalNote: "This is an additional note about the student's performance.",
  };

  // Calculate total marks and obtained marks dynamically
  const totalMarks = mockData.subjects.reduce((acc, subject) => acc + (subject.totalMarks !== '-' ? subject.totalMarks : 0), 0);
  const totalObtainedMarks = mockData.subjects.reduce((acc, subject) => acc + (subject.obtainedMarks !== '-' ? subject.obtainedMarks : 0), 0);
  const percentage = ((totalObtainedMarks / totalMarks) * 100).toFixed(2);

  // Determine the grade
  const grade = (() => {
    if (percentage >= 80) return 'A1';
    if (percentage >= 70) return 'A';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'Fail';
  })();

  // Check if any subject is failed based on 35% criteria
  const isFailed = mockData.subjects.some(subject => subject.obtainedMarks !== '-' && subject.obtainedMarks < (subject.totalMarks * 0.35));
  const finalGrade = isFailed ? 'Fail' : grade;
  
  // Function to get the appropriate color based on the final grade
  const getResultColor = (grade) => {
    return grade === 'Fail' ? 'text-red-600' : 'text-green-600';
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-end items-end print:bg-white print:p-4 print:shadow-none print:my-0 mt-20 print-container">
      <button
        onClick={handlePrint}
        className="text-xs mb-4 px-4 py-2 bg-black text-white font-semibold rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:rotate-2 hover:shadow-2xl flex items-center space-x-2 print:hidden"
      >
        <FaDownload className="text-white" />
        <span>Download PDF</span>
      </button>
      <div
        className="w-full bg-white shadow-lg rounded-lg overflow-hidden print:w-auto print:max-w-none print:rounded-none print:shadow-none print-content"
        ref={componentRef}
      >
        {/* Header with School Logo and Name */}
        <div className="overflow-x-auto print:overflow-visible bg-gradient-to-r from-gray-700 to-cyan-700 text-white p-4 flex justify-between items-center print:bg-black print:text-white print:rounded-t-lg">
          <div className="flex items-center">
            <div>
              <h2 className="text-3xl font-semibold ">{mockData.schoolName}</h2>
              <p className="text-sm mt-4">{mockData.schoolAddress}</p>
            </div>
          </div>
          <div className="h-40 w-40 p-4 flex items-center justify-center print:h-32 print:w-32">
              <img
                src={mockData.schoolLogo}
                alt="School Logo"
                className="object-cover w-full h-full border border-black rounded-md"
              />
            </div>
          {/* <div>
              <h2 className="text-3xl font-semibold px-2">
                <GiTrophyCup className="inline-block mr-2 text-yellow-300 text-8xl" />
                
              </h2>
              
            </div> */}
        </div>

        {/* Student Information */}
        <div className="mx-auto rounded-lg">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="h-40 w-40 p-4 flex items-center justify-center print:h-32 print:w-32">
              <img
                src="../moon.jpg"
                alt="Student"
                className="object-cover w-full h-full border border-black rounded-md"
              />
            </div>

            <div className="p-4 flex-grow print:p-2">
              <h2 className="text-xl font-bold print:text-xl">{mockData.studentName}</h2>
              <p className="text-xs">Father's Name: {mockData.fatherName}</p>
              <p className="text-xs">Age: 18</p>
              <p className="text-xs">Class: {mockData.class}</p>
              <p className="text-xs">Section: {mockData.section}</p>
              <p className="text-xs">Roll Number: {mockData.rollNumber}</p>
              <p className="text-xs">Cast: {mockData.cast}</p>
              
            </div>

            <div>
              <h2 className="text-3xl font-semibold px-8 py-8 flex items-center justify-center">
                <GiTrophyCup className="inline-block mr-2 text-yellow-400 text-8xl" />
                
              </h2>
              
            </div> 

            {/* <div className="h-40 w-40 p-4 flex items-center justify-center print:h-32 print:w-32">
              <img
                src={mockData.schoolLogo}
                alt="School Logo"
                className="object-cover w-full h-full border border-black rounded-md"
              />
            </div> */}
          </div>
        </div>

        {/* Grades and Marks */}
        <div className="w-full mx-auto rounded-lg flex flex-wrap px-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg print:min-w-full print:shadow-none">
            <thead className="bg-gradient-to-r from-gray-800 to-gray-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left rounded-tl-md">Subject</th>
                <th className="px-4 py-2 text-left">Total Marks</th>
                <th className="px-4 py-2 text-left">Min Marks</th>
                <th className="px-4 py-2 text-left">Obtained Marks</th>
                <th className="px-4 py-2 text-left rounded-tr-md">Result</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
  {mockData.subjects.map((subject, index) => (
    <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} print:bg-white`}>
      <td className="px-6 py-2 whitespace-nowrap">{subject.name || '-'}</td>
      <td className="px-6 py-2 whitespace-nowrap">{subject.totalMarks !== undefined ? subject.totalMarks : '-'}</td>
      <td className="px-6 py-2 whitespace-nowrap">{subject.minMarks !== undefined ? subject.minMarks : '-'}</td>
      <td className={`px-6 py-2 whitespace-nowrap ${subject.obtainedMarks >= subject.minMarks ? "text-green-600" : "text-red-600"}`}>
        {subject.obtainedMarks !== undefined ? subject.obtainedMarks : '-'}
      </td>
      <td className={`px-6 py-2 whitespace-nowrap ${subject.obtainedMarks !== undefined && subject.obtainedMarks >= subject.minMarks ? "text-green-600" : "text-red-600"}`}>
        {subject.name === '-' ? '-' : subject.obtainedMarks !== undefined && subject.obtainedMarks >= subject.minMarks ? "Pass" : subject.obtainedMarks !== undefined ? "Fail" : '-'}
      </td>
    </tr>
  ))}
  {/* Total Marks Row */}
  <tr className="bg-gray-200 print:bg-gray-200">
    <td className="px-6 py-2 font-semibold rounded-tl-md">Total</td>
    <td className="px-6 py-2 font-semibold">{totalMarks}</td>
    <td className="px-6 py-2 font-semibold"></td>
    <td className="px-6 py-2 font-semibold">{totalObtainedMarks}</td>
    <td className={`px-6 py-2 font-semibold rounded-tr-md ${getResultColor(finalGrade)}`}>{finalGrade}</td>
  </tr>
</tbody>
          </table>
        </div>

        {/* Additional Info */}
        <div className="p-6 bg-gray-100 print:p-2 print:bg-white">
  <div className="flex justify-between items-center mb-4">
    <div className="text-start">
      <p className="text-lg font-semibold print:text-base">Position: 1st </p>
      <p className={`text-sm font-semibold print:text-base py-2 ${finalGrade === 'Fail' ? 'text-red-600' : 'text-green-600'}`}>Grade: {finalGrade}</p>
      <p className="text-sm font-semibold print:text-base">Percentage: {percentage}%</p>
      <p className="text-xs font-semibold print:text-base py-2">Date: 18-06-2024</p>
    </div>
    <div className="text-right pt-20 print:mt-0">
      <p className="text-xs print:text-xs">{mockData.principalSignature}</p>
    </div>
  </div>
  <p className="text-sm print:text-xs">{mockData.additionalNote}</p>
</div>
      </div>
    </div>
  );
};

export default ViewResultCard;
