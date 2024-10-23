'use client';

import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { format, parseISO, addDays, startOfMonth, endOfMonth } from 'date-fns';
import { FiEye } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';
import { enUS } from 'date-fns/locale';

const ViewAttendance = () => {
  const componentRef = useRef();
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [searchTerm, setSearchTerm] = useState('');

  // Hard-coded class options from 1 to 10
  const classes = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  // Hard-coded section options from A to D
  const sections = ['A', 'B', 'C', 'D'];

  const handleFetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/admin/get-attendance`, {
        selectedClass,
        selectedSection,
        selectedMonth,
      });
      const { attendance } = response.data;
      if (attendance.length === 0) {
        setNotFound(true);
        setAttendanceData([]);
      } else {
        const filteredAttendance = attendance.filter((att) => {
          const attMonth = format(parseISO(att.date), 'yyyy-MM');
          return attMonth === selectedMonth;
        });
        setAttendanceData(filteredAttendance);
        setNotFound(false);
      }
    } catch (error) {
      console.error('Error fetching attendance', error);
      setNotFound(true);
      setAttendanceData([]);
    }
    setLoading(false);
  };

  const renderDays = () => {
    const dayNames = [];
    const dates = [];
    const dateFormat = 'EEE';
    const firstDayOfMonth = startOfMonth(new Date(selectedMonth));
    const lastDayOfMonth = endOfMonth(new Date(selectedMonth));
    const numberOfDays = lastDayOfMonth.getDate();

    for (let i = 1; i <= numberOfDays; i++) {
      const dayName = format(addDays(firstDayOfMonth, i - 1), dateFormat, { locale: enUS });
      dayNames.push(<th key={`dayName-${i}`} className="text-[8px] py-2 px-2 border">{dayName}</th>);
      dates.push(<th key={`date-${i}`} className="text-[8px] py-2 px-2 border">{i}</th>);
    }

    return (
      <>
        <tr>
          <th className="text-[8px] py-2 px-4 border">SR.NO</th>
          <th className="text-[8px] py-2 px-4 border">Name</th>
          <th className="text-[8px] py-2 px-4 border">RN</th>
          {dayNames}
          <th className="text-[8px] py-2 px-4 border"></th>
          <th className="text-[8px] py-2 px-4 border bg-blue-200">Total</th>
        </tr>
        <tr>
          <th className="text-[8px] py-2 px-4 border"></th>
          <th className="text-[8px] py-2 px-4 border"></th>
          <th className="text-[8px] py-2 px-4 border"></th>
          {dates}
          <th className="text-[8px] py-2 px-4 border"></th>
          <th className="text-[8px] py-2 px-4 border"></th>
        </tr>
      </>
    );
  };

  const renderAttendanceRows = () => {
    if (attendanceData.length === 0) return null;

    const studentAttendanceMap = new Map();
    const monthTotal = Array(31).fill(0);

    attendanceData.forEach((attdata) => {
      attdata.students.forEach((studentData) => {
        if (!studentAttendanceMap.has(studentData.rollNumber)) {
          studentAttendanceMap.set(studentData.rollNumber, {
            id: studentData.id,
            rollNumber: studentData.rollNumber,
            studentName: studentData.studentName, // Corrected variable name here
            attendance: Array(31).fill('-'),
            totalPresent: 0,
          });
        }

        const attendanceArray = studentAttendanceMap.get(studentData.rollNumber).attendance;
        const day = new Date(attdata.date).getDate() - 1;
        attendanceArray[day] = studentData.isPresent ? 'P' : 'A';

        if (studentData.isPresent) {
          studentAttendanceMap.get(studentData.rollNumber).totalPresent++;
          monthTotal[day]++;
        }
      });
    });

    const rows = [];
    let index = 1;
    studentAttendanceMap.forEach((studentData) => {
      const student = students.find((s) => s._id === studentData.id);
      const studentName = student ? student.studentName : 'Unknown';

      if (
        searchTerm &&
        !studentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !studentData.rollNumber.toString().includes(searchTerm)
      ) {
        return;
      }

      const attendanceCells = studentData.attendance.map((att, dayIndex) => (
        <td key={`${studentData.rollNumber}-${dayIndex}`} className={`text-[8px] border text-center ${att === 'A' ? 'bg-red-200' : att === 'P' ? 'bg-green-200' : ''}`}>
          {att}
        </td>
      ));

      rows.push(
        <tr key={studentData.rollNumber}>
          <td className="text-[8px] border text-center">{index}</td>
          <td className="text-[8px] border text-center">{studentData.studentName}</td>
          <td className="text-[8px] border text-center">{studentData.rollNumber}</td>
          {attendanceCells}
          <td className="text-[8px] border text-center bg-blue-200">{studentData.totalPresent}</td>
        </tr>
      );

      index++;
    });

    const totalRow = (
      <tr key="totalRow">
        <td className="text-[8px] border text-center"></td>
        <td className="text-[8px] border text-center font-semibold bg-blue-200">Total</td>
        <td className="text-[8px] border text-center"></td>
        {monthTotal.map((total, index) => (
          <td key={`total-${index}`} className={`text-[8px] border text-center ${total > 0 ? 'bg-blue-200' : ''}`}>
            {total > 0 ? total : '-'}
          </td>
        ))}
        <td className="text-[8px] border text-center bg-purple-400 font-semibold">{monthTotal.reduce((acc, curr) => acc + curr, 0)}</td>
      </tr>
    );

    rows.push(totalRow);

    return rows;
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 10px;
      }
    `,
  });

  return (
    <div className="w-full px-4 h-screen overflow-y-auto" id="component-to-print">
      <div className="container" ref={componentRef}>
        <h1 className="text-xsm flex justify-start items-start text-blue-500 mb-10 text-center">
          View Attendance
        </h1> 
        <div className="text-[10px] mb-6 grid grid-cols-1 sm:grid-cols-6 md:grid-cols-4 lg:flex flex-wrap gap-2 items-end mt-10 ">
          <div className="flex-grow mb-4 sm:mb-0">
            <label className="block text-[10px] font-medium text-gray-700 mb-2">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="text-[10px] border p-2 w-full rounded-md shadow-sm"
            >
              <option value="" className="text-[10px]">Select a class</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-grow mb-4 sm:mb-0">
            <label className="block text-[10px] font-medium text-gray-700 mb-2">
              Select Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="text-[10px] border p-2 w-full rounded-md shadow-sm"
            >
              <option value="" className="text-[10px]">Select a section</option>
              {sections.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-grow mb-4 sm:mb-0">
            <label className="block text-[10px] font-medium text-gray-700 mb-2">
              Select Month
            </label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-[10px] border p-2 w-full rounded-md shadow-sm"
            />
          </div>
          <div className="flex-grow mb-4 sm:mb-0">
            <button
              onClick={handleFetchAttendance}
              className="text-[10px] mt-2 p-2 bg-blue-500 text-white rounded-md shadow-md"
            >
              Fetch Attendance
            </button>
          </div>
        </div>
        {loading && <div>Loading...</div>}
        {notFound && <div>No attendance data found.</div>}
        {attendanceData.length > 0 && (
          <>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>{renderDays()}</thead>
              <tbody>{renderAttendanceRows()}</tbody>
            </table>
            <button
              onClick={handlePrint}
              className="mt-5 p-2 bg-green-500 text-white rounded-md shadow-md"
            >
              Print
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewAttendance;
