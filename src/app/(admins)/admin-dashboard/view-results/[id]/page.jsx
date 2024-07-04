<<<<<<< HEAD
'use client';
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { FaDownload } from "react-icons/fa";
import { GiTrophyCup } from 'react-icons/gi';
import axios from "axios";

const ViewResultCard = ({params}) => {
  const componentRef = useRef();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = params;
=======
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { FaDownload } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import axios from "axios";

const ViewResultCard = ({ params }) => {
  const componentRef = useRef();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = params;
>>>>>>> origin/main

  const getResult = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/delete-edit-get-result/${id}`);
      setResult(response.data.result);
    } catch (error) {
      console.error("Failed to fetch result", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 20px;
        margin-top: 100px;
<<<<<<< HEAD
        padding:100px;
=======
        padding: 100px;
>>>>>>> origin/main
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

  // Mock data (to be replaced with `result` from API)
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
      { name: "Geography", totalMarks: 100, minMarks: 35, obtainedMarks: 35 },
      { name: "Computer Science", totalMarks: 100, minMarks: 40, obtainedMarks: 96 },
      { name: "Physical Education", totalMarks: 100, minMarks: 40, obtainedMarks: 99 },
      { name: "-", totalMarks: '-', minMarks: '-', obtainedMarks: '-' },
      { name: "-", totalMarks: '-', minMarks: '-', obtainedMarks: '-' },
      { name: "-", totalMarks: '-', minMarks: '-', obtainedMarks: '-' },
    ],
    principalSignature: "Principal's Signature.",
    additionalNote: "This is an additional note about the student's performance.",
  };

  const data = result || mockData;

  // Calculate total marks and obtained marks dynamically
  const totalMarks = data.subjects.reduce((acc, subject) => acc + (subject.totalMarks !== '-' ? subject.totalMarks : 0), 0);
  const totalObtainedMarks = data.subjects.reduce((acc, subject) => acc + (subject.obtainedMarks !== '-' ? subject.obtainedMarks : 0), 0);
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
  const isFailed = data.subjects.some(subject => subject.obtainedMarks !== '-' && subject.obtainedMarks < (subject.totalMarks * 0.35));
  const finalGrade = isFailed ? 'Fail' : grade;
<<<<<<< HEAD
  
=======

>>>>>>> origin/main
  // Function to get the appropriate color based on the final grade
  const getResultColor = (grade) => {
    return grade === 'Fail' ? 'text-red-600' : 'text-green-600';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }
<<<<<<< HEAD
  console.log(result)
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-end items-end print:bg-white print:p-4 print:shadow-none print:my-0 mt-20 print-container">
=======

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:p-4 print:shadow-none print:my-0 mt-20 print-container">
>>>>>>> origin/main
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
<<<<<<< HEAD
              <img
                src="/school.jpeg"
                alt="School Logo"
                className="object-cover w-full h-full border border-black rounded-md"
              />
            </div>
          {/* <div>
              <h2 className="text-3xl font-semibold px-2">
                <GiTrophyCup className="inline-block mr-2 text-yellow-300 text-8xl" />
                
              </h2>
              
            </div> */}
=======
            <img
              src="/school.jpeg"
              alt="School Logo"
              className="object-cover w-full h-full border border-black rounded-md"
            />
          </div>
>>>>>>> origin/main
        </div>

        {/* Student Information */}
        <div className="mx-auto rounded-lg mt-10">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="h-40 w-40 p-4 flex items-center justify-center print:h-32 print:w-32">
              <img
                src={result.image || "/placeholder.jpg"}
                alt="Student"
                className="object-cover w-full h-full border border-black rounded-md"
              />
            </div>

<<<<<<< HEAD
            <div className="p-4 flex-grow print:p-2">
=======
            <div className="p-4 flex-grow print:p-2 ">
>>>>>>> origin/main
              <h2 className="text-xl font-bold print:text-xl">{data.name}</h2>
              <p className="text-xs">Father&apos;s Name: {data.fatherName}</p>
              <p className="text-xs">Age: {data.age}</p>
              <p className="text-xs">Class: {data.class}</p>
              <p className="text-xs">Section: {data.section}</p>
              <p className="text-xs">Roll Number: {data.rollNumber}</p>
              <p className="text-xs">Cast: {data.cast}</p>
              
            </div>

            <div>
              <h2 className="text-3xl font-semibold px-8 py-8 flex items-center justify-center">
                <GiTrophyCup className="inline-block mr-2 text-yellow-400 text-8xl" />
                
              </h2>
              
            </div> 

<<<<<<< HEAD
            {/* <div className="h-40 w-40 p-4 flex items-center justify-center print:h-32 print:w-32">
              <img
                src={data.schoolLogo}
                alt="School Logo"
                className="object-cover w-full h-full border border-black rounded-md"
              />
            </div> */}
=======
         
>>>>>>> origin/main
          </div>
        </div>

        {/* Grades and Marks */}
<<<<<<< HEAD
        <div className="w-full mx-auto rounded-lg flex flex-wrap px-auto mt-10">
=======
        <div className="w-full mx-auto rounded-lg flex flex-wrap px-auto mt-10 overflow-x-auto">
>>>>>>> origin/main
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
              {data.subjects.map((subject, index) => (
<<<<<<< HEAD
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
              <tr className="bg-gray-200 print:bg-gray-200 ">
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
        <div className="p-6 bg-gray-100 print:p-2 print:bg-white pt-10 pb-10">
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
          <p className="text-sm print:text-xs">{data.note}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewResultCard;
=======
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
                           <tr className="bg-gray-200 print:bg-gray-200 ">
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
                     <div className="p-6 bg-gray-100 print:p-2 print:bg-white pt-10 pb-10">
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
                       <p className="text-sm print:text-xs">{data.additionalNote}</p>
                     </div>
                   </div>
                 </div>
               );
             };
             
             export default ViewResultCard;
             
>>>>>>> origin/main
