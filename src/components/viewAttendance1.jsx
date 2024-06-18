'use client'

import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { format, parseISO, addDays, startOfMonth, endOfMonth } from "date-fns";
import { FiEye, FiPrinter } from 'react-icons/fi';
import { enUS } from 'date-fns/locale';
import { Viewer, Worker, printPlugin } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/print/lib/styles.css';

const styles = css`
  @import '@react-pdf-viewer/print/lib/styles.css';
  /* Any additional styles you want to apply */
`;


const ViewAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [pdfVisible, setPdfVisible] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(true);
  const viewerRef = useRef(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/admin/all-teachers");
        setTeachers(response.data.teachers);
      } catch (error) {
        console.error("Error fetching teachers", error);
      }
      setLoading(false);
    };

    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/admin/all-students");
        setStudents(response.data.students);
      } catch (error) {
        console.error("Error fetching students", error);
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
      console.error("Error fetching teacher details", error);
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
          const attMonth = format(parseISO(att.date), "yyyy-MM");
          return attMonth === selectedMonth;
        });

        setAttendanceData(filteredAttendance);
        setNotFound(false);
      }
    } catch (error) {
      console.error("Error fetching attendance", error);
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
      const dayName = format(addDays(firstDayOfMonth, i - 1), dateFormat, { locale: enUS });
      dayNames.push(
        <th key={`dayName-${i}`} className="py-2 px-4 border text-xs">
          {dayName}
        </th>
      );
      dates.push(
        <th key={`date-${i}`} className="py-2 px-4 border text-xs">
          {i}
        </th>
      );
    }

    return (
      <>
        <tr>
          <th className="text-xs py-2 px-4 border">SR.NO</th>
          <th className="text-xs py-2 px-4 border">Name</th>
          <th className="text-xs py-2 px-4 border">RN</th>
          {dayNames}
          <th className="text-xs py-2 px-4 border"></th>
          <th className="text-xs py-2 px-4 border  bg-green-300 ">Total</th>
        </tr>
        <tr>
          <th className="text-xs py-2 px-4 border"></th>
          <th className="text-xs py-2 px-4 border"></th>
          <th className="text-xs py-2 px-4 border"></th>
          {dates}
          <th className="text-xs py-2 px-4 border"></th>
          <th className="text-xs py-2 px-4 border"></th>
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
            attendance: Array(31).fill("-"),
            totalPresent: 0,
          });
        }

        const attendanceArray = studentAttendanceMap.get(
          studentData.rollNumber
        ).attendance;
        const day = new Date(attdata.date).getDate() - 1;
        attendanceArray[day] = studentData.isPresent ? "P" : "A";

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
      const studentName = student ? student.Name : "Unknown";

      const attendanceCells = studentData.attendance.map((att, dayIndex) => (
        <td
          key={`${studentData.rollNumber}-${dayIndex}`}
          className={`text-xs py-2 px-4 border text-center ${
            att === "A" ? "bg-red-200" : ""
          }`}
        >
          {att}
        </td>
      ));

      rows.push(
        <tr key={studentData.rollNumber}>
          <td className="text-xs py-2 px-4 border text-center">{index}</td>
          <td className="text-xs py-2 px-4 border text-center">{studentName}</td>
          <td className="text-xs py-2 px-4 border text-center">{studentData.rollNumber}</td>
          {attendanceCells}
          <td className="text-xs  py-2 px-4 border text-center">{studentData.totalPresent}</td>
        </tr>
      );

      index++;
    });

    // Render the row for the total present count for each day of the month
    const totalRow = (
      <tr key="totalRow">
        <td className="text-xs py-2 px-4 border text-center"></td>
        <td className="text-xs py-2 px-4 border text-center font-semibold  bg-green-300">Total</td>
        <td className="text-xs py-2 px-4 border text-center"></td>
        {monthTotal.map((total, index) => (
          <td
            key={`total-${index}`}
            className={`text-xs py-2 px-4 border text-center ${
              total > 0 ? "bg-green-100" : ""
            }`}
          >
            {total > 0 ? total : "-"}
          </td>
        ))}
        <td className="text-sm py-2 px-4 border text-center bg-green-300 font-semibold  ">{monthTotal.reduce((acc, curr) => acc + curr, 0)}</td>
      </tr>
    );

    rows.push(totalRow);

    return rows;
  };

  const printPDF = async () => {
    try {
      setPdfLoading(true);
      // Get the content of the PDF
      const content = viewerRef.current.getDocument();
      // Print the PDF
      await printPlugin.print({ pdfDocument: content });
    } catch (error) {
      console.error("Error printing PDF", error);
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-28 px-10">
    <div className="container mx-auto p-4">
      <h1 className="text-sm flex justify-start items-start text-blue-500 mb-10 text-center">
        View Attendance
      </h1>
      <div className="flex items-center justify-start mb-5">
        <select
          className="rounded-md border-gray-300 shadow-sm mr-2"
          onChange={handleTeacherChange}
          value={selectedTeacher}
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.Name}
            </option>
          ))}
        </select>
        <select
          className="rounded-md border-gray-300 shadow-sm mr-2"
          onChange={(e) => setSelectedClass(e.target.value)}
          value={selectedClass}
        >
          <option value="">Select Class</option>
          {classes.map((classItem) => (
            <option key={classItem._id} value={classItem._id}>
              {classItem.classname}
            </option>
          ))}
        </select>
        <select
          className="rounded-md border-gray-300 shadow-sm mr-2"
          onChange={(e) => setSelectedSection(e.target.value)}
          value={selectedSection}
        >
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option key={section._id} value={section._id}>
              {section.sectionname}
            </option>
          ))}
        </select>
        <select
          className="rounded-md border-gray-300 shadow-sm mr-2"
          onChange={(e) => setSelectedSubject(e.target.value)}
          value={selectedSubject}
        >
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject._id} value={subject._id}>
              {subject.subjectname}
            </option>
          ))}
        </select>
        <input
          type="month"
          className="rounded-md border-gray-300 shadow-sm"
          onChange={(e) => setSelectedMonth(e.target.value)}
          value={selectedMonth}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 ml-2 rounded-md shadow-md transition duration-300 ease-in-out"
          onClick={handleFetchAttendance}
          disabled={!selectedTeacher || !selectedClass || !selectedSection || !selectedSubject || !selectedMonth}
        >
          Fetch Attendance
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && attendanceData.length === 0 && notFound && (
        <p className="text-red-500 text-center">No attendance found.</p>
      )}

      {!loading && attendanceData.length > 0 && (
        <>
          <div className="flex justify-between mb-3">
            <div>
              <button
                className="bg-gray-700 text-white py-3 px-2 text-xs rounded-md shadow-md transition duration-300 ease-in-out flex items-center"
                onClick={() => setPdfVisible(true)}
                disabled={pdfLoading}
              >
                <FiPrinter className="mr-1" />
                Print PDF
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full">
              <thead>
                {renderDays()}
              </thead>
              <tbody>
                {renderAttendanceRows()}
              </tbody>
            </table>
          </div>
        </>
      )}

      {pdfVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-3/4">
            <div className="flex justify-end mb-3">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                onClick={() => setPdfVisible(false)}
              >
                Close
              </button>
            </div>

            <Worker workerUrl="/pdf.worker.min.js">
            <Viewer
        fileUrl="/path-to-your-pdf-file.pdf"
        plugins={[printPlugin]}
        css={styles} // Apply styles here
      />
            </Worker>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default ViewAttendance;

