'use client'
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { format, parseISO, addDays, startOfMonth, endOfMonth } from 'date-fns';
import { FiEye } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';
import { enUS } from 'date-fns/locale';

const ViewAttendance = () => {
  const componentRef = useRef();
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/admin/all-teachers');
        setTeachers(response.data.teachers);
      } catch (error) {
        console.error('Error fetching teachers', error);
      }
      setLoading(false);
    };

    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/admin/all-students');
        setStudents(response.data.students);
      } catch (error) {
        console.error('Error fetching students', error);
      }
      setLoading(false);
    };

    fetchTeachers();
    fetchStudents();
  }, []);

  const handleTeacherChange = async (event) => {
    const teacherId = event.target.value;
    setSelectedTeacher(teacherId);
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/admin/delete-get-edit-teacher/${teacherId}`
      );
      const { classes, section, subjects } = response.data.teacher;
      setClasses(classes);
      setSections(section);
      setSubjects(subjects);
      setAttendanceData([]);
      setNotFound(false);
    } catch (error) {
      console.error('Error fetching teacher details', error);
    }
    setLoading(false);
  };

  const handleFetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/admin/get-attendance`, {
        selectedTeacher: selectedTeacher,
        selectedClass: selectedClass,
        selectedSection: selectedSection,
        selectedSubject: selectedSubject,
        selectedMonth: selectedMonth,
      });
      const { attendance } = response.data;
      if (attendance.length === 0) {
        setNotFound(true);
        setAttendanceData([]);
      } else {
        // Filter attendance data to only include entries from the selected month
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
    const dateFormat = 'EEE'; // Format for displaying day names (e.g., Mon, Tue, etc.)

    // Get the first day of the selected month
    const firstDayOfMonth = startOfMonth(new Date(selectedMonth));
    const lastDayOfMonth = endOfMonth(new Date(selectedMonth));
    const numberOfDays = lastDayOfMonth.getDate();

    // Render the day names
    for (let i = 1; i <= numberOfDays; i++) {
      const dayName = format(addDays(firstDayOfMonth, i - 1), dateFormat, {
        locale: enUS,
      });
      dayNames.push(
        <th key={`dayName-${i}`} className="text-[8px] py-2 px-2 border ">
          {dayName}
        </th>
      );
      dates.push(
        <th key={`date-${i}`} className="text-[8px] py-2 px-2 border ">
          {i}
        </th>
      );
    }

    return (
      <>
        <tr className=''> 
          <th className="text-[8px] py-2 px-4 border" >SR.NO</th>
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
    const monthTotal = Array(31).fill(0); // Array to store monthly totals

    attendanceData.forEach((attdata) => {
      attdata.students.forEach((studentData) => {
        if (!studentAttendanceMap.has(studentData.rollNumber)) {
          studentAttendanceMap.set(studentData.rollNumber, {
            id: studentData.id,
            rollNumber: studentData.rollNumber,
            attendance: Array(31).fill('-'),
            totalPresent: 0,
          });
        }

        const attendanceArray = studentAttendanceMap.get(
          studentData.rollNumber
        ).attendance;
        const day = new Date(attdata.date).getDate() - 1;
        attendanceArray[day] = studentData.isPresent ? 'P' : 'A';

        if (studentData.isPresent) {
          studentAttendanceMap.get(studentData.rollNumber).totalPresent++;
          monthTotal[day]++; // Increment the day's total present count
        }
      });
    });

    const rows = [];
    let index = 1;
    studentAttendanceMap.forEach((studentData) => {
      const student = students.find((s) => s._id === studentData.id);
      const studentName = student ? student.Name : 'Unknown';

      const attendanceCells = studentData.attendance.map((att, dayIndex) => (
        <td
  key={`${studentData.rollNumber}-${dayIndex}`}
  className={`text-[8px] border text-center ${
    att === 'A' ? 'bg-red-200' : att === 'P' ? 'bg-green-200' : ''
  }`}
>
  {att}
</td>

      ));

      rows.push(
        <tr key={studentData.rollNumber}>
          <td className="text-[8px]  border text-center">{index}</td>
          <td className="text-[8px]  border text-center">{studentName}</td>
          <td className="text-[8px]  border text-center">
            {studentData.rollNumber}
          </td>
          {attendanceCells}
          <td className="text-[8px]    border text-center bg-blue-200">
            {studentData.totalPresent}
          </td>
        </tr>
      );

      index++;
    });

    // Render the row for the total present count for each day of the month
    const totalRow = (
      <tr key="totalRow">
        <td className="text-[8px] border text-center"></td>
        <td className="text-[8px] border text-center font-semibold bg-blue-200">
          Total
        </td>
        <td className="text-[8px] border text-center"></td>
        {monthTotal.map((total, index) => (
          <td
            key={`total-${index}`}
            className={`text-[8px] border text-center ${
              total > 0 ? 'bg-blue-200' : ''
            }`}
          >
            {total > 0 ? total : '-'}
          </td>
        ))}
        <td className="text-[8px] border text-center bg-purple-400 font-semibold  ">
          {monthTotal.reduce((acc, curr) => acc + curr, 0)}
        </td>
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
    <div className=" w-full  px-4 " id="component-to-print" >
      <div className="container  " ref={componentRef}>
        <h1 className="text-xsm flex justify-start items-start text-blue-500 mb-10 text-center">
          View Attendance
        </h1>
        <div className="text-[8px] mb-6 flex flex-col sm:flex-row gap-4 items-end mt-10">
          <div className="flex-grow">

            <label className="block text-[12px] font-medium text-gray-700 mb-2">
              Select Teacher
            </label>
            <select
              value={selectedTeacher}
              onChange={handleTeacherChange}

              className="border text-[12px] p-2 w-full rounded-md shadow-sm"
            >
              <option value="" className='text-[12px]'>Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          {classes.length > 0 && (
            <div className="flex-grow">
              <label className="block text-[12px] font-medium text-gray-700 mb-2">
                Select Class
              </label>
              <select
              
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className=" text-[12px] border p-2 w-full rounded-md shadow-sm"
              >
                <option value="" className='text-[12px]'>Select a class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
          )}
          {sections.length > 0 && (
            <div className="flex-grow">
              <label className="block text-[12px] font-medium text-gray-700 mb-2">
                Select Section
              </label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="text-[12px] border p-2 w-full rounded-md shadow-sm"
              >
                <option value="" className='text-[12px]'>Select a section</option>
                {sections.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
          )}
          {subjects.length > 0 && (
            <div className="flex-grow">
              <label className="block text-[12px] font-medium text-gray-700 mb-2">
                Select Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="text-[12px] border p-2 w-full rounded-md shadow-sm"
              >
                <option value="" className='text-[12px]'>Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex-grow">
            <label className="block text-[12px] font-medium text-gray-700 mb-2">
              Select Month
            </label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className=" text-[12px] border p-2 w-full rounded-md shadow-sm"
            />
          </div>
          <button
            onClick={handleFetchAttendance}
            className="btn btn-sm bg-black text-white  text-xs rounded-md shadow-md transition duration-300 ease-in-out flex items-center"
            style={{ whiteSpace: 'nowrap' }}
            disabled={
              !selectedTeacher ||
              !selectedClass ||
              !selectedSection ||
              !selectedSubject
            }
          >
            View
            <FiEye className="ml-2" />
          </button>
          <button
            onClick={handlePrint}
            className="btn btn-sm bg-black text-white  text-xs rounded-md shadow-md transition duration-300 ease-in-out flex items-center "
            style={{ whiteSpace: 'nowrap' }}
            disabled={!attendanceData.length}
          >
            PDF
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a.75.75 0 01.75.75V6h3a.75.75 0 010 1.5h-3v3.25a.75.75 0 01-1.5 0V7.5H6a.75.75 0 010-1.5h3V2.75A.75.75 0 0110 2zm7.86 7.28a.75.75 0 00-1.06 0L12 14.94V11.5a.75.75 0 00-1.5 0v3.44l-4.78-5.72a.75.75 0 00-1.16.94l6 7.2a.75.75 0 001.16 0l6-7.2a.75.75 0 00.1-.84z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10" >Loading...</div>
        ) : notFound ? (
          <div className="text-center py-10">Attendance Data Not Found</div>
        ) : attendanceData.length > 0 ? (
          <div className="mt-4" >
            <table className="w-full bg-white border-collapse border">
              <thead>
                {renderDays()}
              </thead>
              <tbody>{renderAttendanceRows()}</tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10">No Data Found</div>
        )}
      </div>
    </div>
  );
};

export default ViewAttendance;
