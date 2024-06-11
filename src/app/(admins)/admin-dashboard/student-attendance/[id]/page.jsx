"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentAttendancePage = ({ params }) => {
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [studentAttendance, setStudentAttendance] = useState([]);

  useEffect(() => {
    const fetchStudentAttendance = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/admin/get-student-attendance/${id}`);
        setStudentAttendance(response.data.attendance);
      } catch (error) {
        console.error("Error fetching student attendance:", error);
      }
      setLoading(false);
    };

    fetchStudentAttendance();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (studentAttendance.length === 0) {
    return <div className="flex justify-center items-center h-screen">No attendance data found.</div>;
  }

  return (
    <div className="p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4">Student Attendance</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Class</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Subject</th>
              <th className="py-2 px-4 border">Roll Number</th>
              <th className="py-2 px-4 border">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {studentAttendance.map((attendance) => (
              <tr key={attendance._id}>
                <td className="py-2 px-4 border">{attendance.className}</td>
                <td className="py-2 px-4 border">{new Date(attendance.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{attendance.subject}</td>
                <td className="py-2 px-4 border">{attendance.students.rollNumber}</td>
                <td className="py-2 px-4 border">
                  {attendance.students.isPresent ? "Present" : "Absent"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentAttendancePage;
