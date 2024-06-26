"use client";

import { useState } from "react";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaUserNurse,
} from "react-icons/fa";

import { FaSackDollar } from "react-icons/fa6";
import { FcVoicePresentation } from "react-icons/fc";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlinePending } from "react-icons/md";

import { FcPaid } from "react-icons/fc";
import { FaUserSlash } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import { FcSimCardChip } from "react-icons/fc";

import { FcBusinessman } from "react-icons/fc";
import { FcAssistant } from "react-icons/fc";
import { IoIosNotifications } from "react-icons/io";
import { PiMicrophoneStageFill } from "react-icons/pi";












const AdminDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(500);
  const [totalTeachers, setTotalTeachers] = useState(50);
  const [totalAmount, setTotalAmount] = useState(75000);
  const [totalAttendanceToday, setTotalAttendanceToday] = useState(350);

  return (
    <div className="max-w-6xl mx-auto p-8 mt-20">
      <h1 className="text-3xl my-4 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">

         {/* Total Amount */}
         <div className="bg-white border border-gray-300 p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 hover:border-black  hover:bg-slate-100">
          <FaSackDollar className="text-4xl  mb-4 text-green-500" />
          <p className="text-sm font-semibold">Total Amount</p>
          <p className="text-black text-sm mt-2">{totalAmount}</p>
          <a href="#" className="text-black text-xs mt-2 transform hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-500 transition-transform duration-300"> View </a>

        </div>


        {/* Total Students */}
        <div className="bg-white border border-gray-300 p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 hover:border-black  hover:bg-slate-100">
          <FcBusinessman className="text-4xl text-black mb-4" />
          <p className="text-sm font-semibold">Students</p>
          <p className="text-black text-sm mt-2">{totalStudents}</p>
          <a href="#" className="text-black text-xs mt-2 transform hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-500 transition-transform duration-300"> View </a>
        </div>

        {/* Total Medical Students */}
        <div className="bg-white border border-gray-300 p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 hover:border-black  hover:bg-slate-100">
          <FcVoicePresentation className="text-4xl text-black mb-4" />
          <p className="text-sm font-semibold">Present</p>
          <p className="text-black text-sm mt-2">{totalAttendanceToday}</p>
          <a href="#" className="text-black text-xs mt-2 transform hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-500 transition-transform duration-300" >  View </a>
        </div>

        {/* Total Teachers */}
        <div className="bg-white border border-gray-300 p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 hover:border-black  hover:bg-slate-100">
          <FcAssistant className="text-4xl text-black mb-4" />
          <p className="text-sm font-semibold">Teachers</p>
          <p className="text-black text-sm mt-2">{totalTeachers}</p>
          <a href="#" className="text-black text-xs mt-2 transform hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-500 transition-transform duration-300"> View </a>
        </div>

       


          {/* Total Amount */}
          <div className="bg-white border border-gray-300 p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 hover:border-black  hover:bg-slate-100">
          <GiTakeMyMoney className="text-4xl text-red-500 mb-4" />
          <p className="text-sm font-semibold">Received Amount</p>
          <p className="text-black text-sm mt-2">{totalAmount}</p>
          <a href="#" className="text-black text-xs mt-2 transform hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-500 transition-transform duration-300"> View </a>
        </div>

         {/* Total Amount */}
         <div className="bg-white border border-gray-300 p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 hover:border-black  hover:bg-slate-100">
          < MdOutlinePending  className="text-4xl text-yellow-500 mb-4" />
          <p className="text-sm font-semibold">Pending Amount</p>
          <p className="text-black text-sm mt-2">{totalAmount}</p>
          <a href="#" className="text-black text-xs mt-2 transform hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-500 transition-transform duration-300"> View </a>
        </div>

         {/* Total Amount */}
         <div className="bg-white border border-gray-300 p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 hover:border-black  hover:bg-slate-100">
          <FcPaid className="text-4xl text-black mb-4" />
          <p className="text-sm font-semibold">Paid Students</p>
          <p className="text-black text-sm mt-2">{totalAmount}</p>
          <a href="#" className="text-black text-xs mt-2 transform hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-500 transition-transform duration-300"> View </a>
        </div>

         {/* Total Amount */}
         <div className="bg-white border border-gray-300 p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 hover:border-black  hover:bg-slate-100">
          <FaUserSlash className="text-4xl text-red-600 mb-4" />
          <p className="text-sm font-semibold">Unpaid Students</p>
          <p className="text-black text-sm mt-2">{totalAmount}</p>
          <a href="#" className="text-black text-xs mt-2 transform hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-500 transition-transform duration-300"> View </a>
        </div>

         {/* Total Amount */}
         <div className="bg-white border border-gray-300 p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 hover:border-black  hover:bg-slate-100">
          <FcSimCardChip className="text-4xl text-black mb-4" />
          <p className="text-sm font-semibold">Result</p>
          <p className="text-black text-sm mt-2">{totalAmount}</p>
          <a href="#" className="text-black text-xs mt-2 transform hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-500 transition-transform duration-300"> View </a>
        </div>

         {/* Total Amount */}
         <div className="bg-white border border-gray-300 p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 hover:border-black  hover:bg-slate-100">
          <FcLike className="text-4xl text-black mb-4" />
          <p className="text-sm font-semibold">Passed Student</p>
          <p className="text-black text-sm mt-2">{totalAmount}</p>
          <a href="#" className="text-black text-xs mt-2 transform hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-500 transition-transform duration-300"> View </a>
        </div>

         {/* Total Amount */}
         <div className="bg-white border border-gray-300 p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 hover:border-black  hover:bg-slate-100">
          <FcDislike className="text-4xl text-black mb-4" />
          <p className="text-sm font-semibold">Failed Student</p>
          <p className="text-black text-sm mt-2">{totalAmount}</p>
          <a href="#" className="text-black text-xs mt-2 transform hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-500 transition-transform duration-300"> View </a>
        </div>

          {/* Total Amount */}
          <div className="bg-white border border-gray-300 p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 hover:border-black  hover:bg-slate-100">
          <IoIosNotifications className="text-4xl text-blue-500 mb-4" />
          <p className="text-sm font-semibold">Class Notification</p>
          <p className="text-black text-sm mt-2">{totalAmount}</p>
          <a href="#" className="text-black text-xs mt-2 transform hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-500 transition-transform duration-300"> View </a>
        </div>

          {/* Total Amount */}
          <div className="bg-white border border-gray-300 p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 hover:border-black  hover:bg-slate-100">
          <PiMicrophoneStageFill className="text-4xl text-teal-600 mb-4" />
          <p className="text-sm font-semibold">Public Notification</p>
          <p className="text-black text-sm mt-2">{totalAmount}</p>
          <a href="#" className="text-black text-xs mt-2 transform hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-500 transition-transform duration-300"> View </a>
        </div>




      </div>

      

      




    </div>
  );
};

export default AdminDashboard;
