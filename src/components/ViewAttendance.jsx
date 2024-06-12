"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const ViewAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [notFound, setNotFound] = useState(false);

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

    fetchTeachers();
  }, []);

  const handleTeacherChange = async (event) => {
    const teacherId = event.target.value;
    setSelectedTeacher(teacherId);
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/admin/delete-get-edit-teacher/${teacherId}`
      );
      console.log("teacher", response);
      const { classes, section, subjects } = response.data.teacher;
      setClasses(classes);
      setSections(section);
      setSubjects(subjects);
      setSelectedClass("");
      setSelectedSection("");
      setSelectedSubject("");
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
      });
      const { attendance } = response.data;
      if (attendance.length === 0) {
        setNotFound(true);
        setAttendanceData([]);
      } else {
        setAttendanceData(attendance);
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
    const days = [];
    for (let i = 1; i <= 30; i++) {
      const dateExists = attendanceData.some(
        (attdata) => new Date(attdata.date).getDate() === i
      );
      days.push(
        <th key={i} className="py-2 px-4 border text-xs">
          {/* {dateExists ? i : "-"} */}
          {i}
        </th>
      );
    }
    return days;
  };
  console.log(attendanceData);
  const renderAttendanceRows = () => {
    const daysInMonth = Array.from(
      { length: 30 },
      (_, dayIndex) => dayIndex + 1
    );

    return attendanceData.flatMap((attdata, attIndex) => {
      return attdata.students.map((studentData, studentIndex) => {
        const attendanceCells = daysInMonth.map((day) => {
          const attForDay = attendanceData.find(
            (att) => new Date(att.date).getDate() === day
          );
          const studentForDay = attForDay
            ? attForDay.students.find(
                (student) => student._id === studentData._id
              )
            : null;
          const attendanceForDay = studentForDay
            ? studentForDay.isPresent
              ? "P"
              : "A"
            : "-";
          return (
            <td
              key={`${studentData._id}-${day}`}
              className={`text-xs py-2 px-4 border ${studentForDay ? "" : ""}`}
            >
              {attendanceForDay}
            </td>
          );
        });

        return (
          <tr key={`${studentData._id}-${attIndex}`}>
            <td className="text-xs py-2 px-4 border">{studentIndex + 1}</td>
            <td className="text-xs py-2 px-4 border">{studentData.name}</td>
            <td className="text-xs py-2 px-4 border">
              {studentData.rollNumber}
            </td>
            {attendanceCells}
          </tr>
        );
      });
    });
  };

  return (
    <div className="min-h-screen mt-28 px-10">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Attendance Page</h1>
        <form className="mb-4">
          <div className="mb-4">
            <label className="block mb-2">Select Teacher</label>
            <select
              value={selectedTeacher}
              onChange={handleTeacherChange}
              className="border p-2 w-full"
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          {classes.length > 0 && (
            <div className="mb-4">
              <label className="block mb-2">Select Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="border p-2 w-full"
              >
                <option value="">Select a class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
          )}
          {sections.length > 0 && (
            <div className="mb-4">
              <label className="block mb-2">Select Section</label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="border p-2 w-full"
              >
                <option value="">Select a section</option>
                {sections.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
          )}
          {subjects.length > 0 && (
            <div className="mb-4">
              <label className="block mb-2">Select Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border p-2 w-full"
              >
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-2">Select Date</label>
            <input type="date" className="border p-2 w-full" />
          </div>
        </form>
        <button
          onClick={handleFetchAttendance}
          className="bg-blue-500 text-white p-2 rounded"
          disabled={
            !selectedTeacher ||
            !selectedClass ||
            !selectedSection ||
            !selectedSubject
          }
        >
          Fetch Attendance
        </button>
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : notFound ? (
          <div className="text-center py-10">Attendance Data Not Found</div>
        ) : (
          attendanceData.length > 0 && (
            <div className="mt-4">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="text-xs py-2 px-4 border">SR.NO</th>
                      <th className="text-xs py-2 px-4 border">Name</th>
                      <th className="text-xs py-2 px-4 border">RN</th>
                      {renderDays()}
                    </tr>
                  </thead>
                  <tbody>{renderAttendanceRows()}</tbody>
                </table>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ViewAttendance;
