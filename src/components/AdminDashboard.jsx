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

const AdminDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(500);
  const [totalTeachers, setTotalTeachers] = useState(50);
  const [totalAmount, setTotalAmount] = useState(75000);
  const [totalEngineeringStudents, setTotalEngineeringStudents] = useState(250);
  const [totalMedicalStudents, setTotalMedicalStudents] = useState(150);
  const [totalAttendanceToday, setTotalAttendanceToday] = useState(350);
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl my-4 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Students */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
          <div className="text-4xl text-blue-600 mr-4">
            <FaUserGraduate />
          </div>
          <div>
            <p className="text-lg font-semibold">Total Students</p>
            <p className="text-2xl">{totalStudents}</p>
          </div>
        </div>

        {/* Total Teachers */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
          <div className="text-4xl text-yellow-600 mr-4">
            <FaChalkboardTeacher />
          </div>
          <div>
            <p className="text-lg font-semibold">Total Teachers</p>
            <p className="text-2xl">{totalTeachers}</p>
          </div>
        </div>

        {/* Total Amount */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
          <div className="text-4xl text-green-600 mr-4">
            <FaMoneyBillWave />
          </div>
          <div>
            <p className="text-lg font-semibold">Total Amount</p>
            <p className="text-2xl">${totalAmount}</p>
          </div>
        </div>

        {/* Total Engineering Students */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
          <div className="text-4xl text-purple-600 mr-4">
            <FaLaptop />
          </div>
          <div>
            <p className="text-lg font-semibold">Total Engineering Students</p>
            <p className="text-2xl">{totalEngineeringStudents}</p>
          </div>
        </div>

        {/* Total Medical Students */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
          <div className="text-4xl text-red-600 mr-4">
            <FaUserNurse />
          </div>
          <div>
            <p className="text-lg font-semibold">Total Medical Students</p>
            <p className="text-2xl">{totalMedicalStudents}</p>
          </div>
        </div>

        {/* Today's Total Attendance */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
          <div className="text-4xl text-indigo-600 mr-4">
            <FaUserCheck />
          </div>
          <div>
            <p className="text-lg font-semibold">Today's Total Attendance</p>
            <p className="text-2xl">{totalAttendanceToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;