"use client";

import { useState } from "react";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaUserNurse,
  FaLaptop,
  FaUserCheck,
} from "react-icons/fa";

const StudentDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(500);
  const [totalTeachers, setTotalTeachers] = useState(50);
  const [totalAmount, setTotalAmount] = useState(75000);
  const [totalEngineeringStudents, setTotalEngineeringStudents] = useState(250);
  const [totalMedicalStudents, setTotalMedicalStudents] = useState(150);
  const [totalAttendanceToday, setTotalAttendanceToday] = useState(350);
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl my-4 text-center">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Students */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
          <div className="text-4xl text-blue-600 mr-4">
            <FaUserGraduate />
          </div>
          <div>
            <p className="text-lg font-semibold">View Attendance</p>
            <p className="text-2xl">{totalStudents}</p>
          </div>
        </div>

        {/* Total Engineering Students */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
          <div className="text-4xl text-purple-600 mr-4">
            <FaLaptop />
          </div>
          <div>
            <p className="text-lg font-semibold">Total Marks</p>
            <p className="text-2xl">{totalEngineeringStudents}</p>
          </div>
        </div>

        {/* Total Medical Students */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
          <div className="text-4xl text-red-600 mr-4">
            <FaUserNurse />
          </div>
          <div>
            <p className="text-lg font-semibold">Total Notifications</p>
            <p className="text-2xl">{totalMedicalStudents}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
