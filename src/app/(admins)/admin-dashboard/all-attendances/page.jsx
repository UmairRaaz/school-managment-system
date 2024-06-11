'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAllAttendancesPage = () => {
  const [loading, setLoading] = useState(true);
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    const fetchAttendances = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/admin/manage-admin-attendances');
        setAttendances(response.data.attendance);
      } catch (error) {
        console.error('Error fetching attendances:', error);
      }
      setLoading(false);
    };

    fetchAttendances();
  }, []);

  const toggleAttendance = async (attendanceId, studentId, isPresent) => {
    console.log(attendanceId, studentId, isPresent)
    try {
      const response = await axios.put(`/api/admin/manage-admin-attendances`, {
        attendanceId,
        studentId,
        isPresent: !isPresent
      });
      setAttendances(response.data.attendance); 
      if(response.data.success){
        alert("edited successfully")
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  console.log(attendances)
  return (
    <div className="p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4">All Attendances</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Class</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Subject</th>
              <th className="py-2 px-4 border">Teacher ID</th>
              <th className="py-2 px-4 border">Student ID</th>
              <th className="py-2 px-4 border">Roll Number</th>
              <th className="py-2 px-4 border">Attendance</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((attendance) => (
              <tr key={attendance._id}>
                <td className="py-2 px-4 border">{attendance.className}</td>
                <td className="py-2 px-4 border">{new Date(attendance.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{attendance.subject}</td>
                <td className="py-2 px-4 border">{attendance.teacher}</td>
                {attendance.students.map((student) => (
                  <React.Fragment key={student._id}>
                    <td className="py-2 px-4 border">{student.id}</td>
                    <td className="py-2 px-4 border">{student.rollNumber}</td>
                    <td className="py-2 px-4 border">{student.isPresent ? 'Present' : 'Absent'}</td>
                    <td className="py-2 px-4 border">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => toggleAttendance(attendance._id, student.id, student.isPresent)}
                      >
                        Toggle
                      </button>
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllAttendancesPage;
