"use client";

import { useState } from "react";
import {
  FaUserGraduate,
  FaLaptop,
  FaUserNurse,
  FaUserCheck,
} from "react-icons/fa";

const TeacherDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(500);
  const [totalEngineeringStudents, setTotalEngineeringStudents] = useState(250);
  const [totalMedicalStudents, setTotalMedicalStudents] = useState(150);
  const [totalAttendanceToday, setTotalAttendanceToday] = useState(350);

  return (
    <div className="max-w-6xl mx-auto p-8 ">
      <h1 className="text-3xl my-4 text-center">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Students */}
        <div className="bg-white border border-gray-300 p-8 flex items-center justify-center ">
          <div className="text-4xl text-black mr-4">
            <FaUserGraduate />
          </div>
          <div className="ml-4">
            <p className="text-sm font-semibold">Total Students</p>
            <p className="text-black text-sm mt-2">{totalStudents}</p>
            <p className="text-black text-xs mt-2">View</p>
          </div>
        </div>

        {/* Total Engineering Students */}
        <div className="bg-white border border-gray-300 p-8 flex items-center justify-center ">
          <div className="text-4xl text-black mr-4">
            <FaLaptop />
          </div>
          <div className="ml-4">
            <p className="text-sm font-semibold">Total Students</p>
            <p className="text-black text-sm mt-2">{totalEngineeringStudents}</p>
            <p className="text-black text-xs mt-2">View</p>
          </div>
        </div>

        {/* Total Medical Students */}
        <div className="bg-white border border-gray-300 p-8 flex items-center justify-center ">
          <div className="text-4xl text-black mr-4">
            <FaUserNurse />
          </div>
          <div className="ml-4">
            <p className="text-sm font-semibold">Total Students</p>
            <p className="text-black text-sm mt-2">{totalMedicalStudents}</p>
            <p className="text-black text-xs mt-2">View</p>
          </div>
        </div>

        {/* Today's Total Attendance */}
        <div className="bg-white border border-gray-300 p-8 flex items-center justify-center ">
          <div className="text-4xl text-black mr-4">
            <FaUserCheck />
          </div>
          <div className="ml-4">
            <p className="text-sm font-semibold">Total Students</p>
            <p className="text-black text-sm mt-2">{totalAttendanceToday}</p>
            <p className="text-black text-xs mt-2">View</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
