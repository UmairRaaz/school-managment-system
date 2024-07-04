"use client";

<<<<<<< HEAD
import { useState } from "react";
=======
import { useEffect, useState } from "react";

import { FaBoxes } from "react-icons/fa";
>>>>>>> origin/main

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaUserNurse,
<<<<<<< HEAD
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
=======
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
import { FaArrowsAltH } from "react-icons/fa";
import axios from "axios";

const AdminDashboard = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalPresent, settotalPresent] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalPaidFee, settotalPaidFee] = useState(0);
  const [totalUnpaidFee, settotalUnpaidFee] = useState(0);
  const [totalResult, settotalResult] = useState(0);
  const [totalPassStudents, settotalPassStudents] = useState(0);
  const [totalFailedStudents, settotalFailedStudents] = useState(0);
  const [totalClassNotification, settotalClassNotification] = useState(0);
  const [totalPublicNotifications, settotalPublicNotifications] = useState(0)
  const [totalAttendanceToday, setTotalAttendanceToday] = useState(0);
  const [totalPaidStudents, settotalPaidStudents] = useState(0)
  const [toalUnpaidStudents, settoalUnpaidStudents] = useState(0)
  const [filter, setFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All");

  const getDashbaorDetails = async () => {
    const response = await axios.get("api/admin/admin-dashboard-details")
    let result = response.data.data
    console.log(result)
    setTotalAmount(result.totalFeeSum);
    setTotalStudents(result.totalStudents);
    settotalPresent(result.totalPresent);
    setTotalTeachers(result.totalTeachers);
    settotalPaidFee(result.totalPaidFeeSum);
    settotalUnpaidFee(result.totalUnpaidFeeSum);
    settotalResult(result.totalResults);
    settotalPassStudents(result.passedResults);
    settotalFailedStudents(result.failedResults);
    settotalClassNotification(result.totalClassNotifications);
    settotalPublicNotifications(result.totalPublicNotifications);
    setTotalAttendanceToday(result.totalAttendance);
    settotalPaidStudents(result.countPaid);
    settoalUnpaidStudents(result.countUnpaid);

  }
  useEffect(()=>{
    getDashbaorDetails()
  },[])
  const today = new Date();
  const data = [
   
    {
      category: "Student",
      name: "Present",
      value: totalStudents,
      date: new Date(),
      icon: <FcBusinessman />,
    },
    {
      category: "Student",
      name: "Absent",
      value: totalAttendanceToday,
      date: new Date(),
      icon: <FcVoicePresentation />,
    },
   
    {
      category: "Financial",
      name: "Paid Amount",
      value: totalPaidFee,
      date: new Date(),
      icon: <GiTakeMyMoney />,
    },
    {
      category: "Financial",
      name: "Pending Amount",
      value: totalUnpaidFee,
      date: new Date(),
      icon: <MdOutlinePending />,
    },
    {
      category: "Financial",
      name: "Paid Challan",
      value: totalPaidStudents,
      date: new Date(),
      icon: <FcPaid />,
    },
    {
      category: "Financial",
      name: "Unpaid Challan",
      value: toalUnpaidStudents,
      date: new Date(),
      icon: <FaUserSlash />,
    },
    {
      category: "Student",
      name: "Result",
      value: totalResult,
      date: new Date(),
      icon: <FcSimCardChip />,
    },
    {
      category: "Student",
      name: "Passed",
      value: totalPassStudents,
      date: new Date(),
      icon: <FcLike />,
    },
    {
      category: "Student",
      name: "Failed",
      value: totalFailedStudents,
      date: new Date(),
      icon: <FcDislike />,
    },
    {
      category: "Notification",
      name: "Class Notification",
      value: totalClassNotification,
      date: new Date(),
      icon: <IoIosNotifications />,
    },
    {
      category: "Notification",
      name: "Public Notification",
      value: totalPublicNotifications,
      date: new Date(),
      icon: <PiMicrophoneStageFill />,
    },
   
  ];

  const filteredData =
    filter === "All" ? data : data.filter((item) => item.category === filter);

  const applyTimeFilter = (items) => {
    switch (timeFilter) {
      case "Daily":
        return items.filter(
          (item) => item.date.toDateString() === today.toDateString()
        );
      case "Weekly":
        const weekStart = new Date(
          today.setDate(today.getDate() - today.getDay())
        );
        const weekEnd = new Date(
          today.setDate(today.getDate() - today.getDay() + 6)
        );
        return items.filter(
          (item) => item.date >= weekStart && item.date <= weekEnd
        );
      case "Monthly":
        return items.filter(
          (item) =>
            item.date.getMonth() === today.getMonth() &&
            item.date.getFullYear() === today.getFullYear()
        );
      case "Yearly":
        return items.filter(
          (item) => item.date.getFullYear() === today.getFullYear()
        );
      case "Date-wise":
        // Implement a date picker logic to select a specific date range
        // For simplicity, we can just return all items for now
        return items;
      default:
        return items;
    }
  };

  const finalData = applyTimeFilter(filteredData);

  return (
    <div className="max-w-6xl mx-auto p-2 mt-20">
      {/* <h1 className="text-3xl my-4 text-center">Admin Dashboard</h1> */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 text-xs">
  <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
    <button
      onClick={() => setFilter("All")}
      className="py-2 px-2 md:px-6 bg-black text-white rounded-lg"
    >
      All
    </button>
    <button
      onClick={() => setFilter("Financial")}
      className="py-2 px-2 md:px-6 bg-black text-white rounded-lg"
    >
      Financial
    </button>
    <button
      onClick={() => setFilter("Student")}
      className="py-2 px-2 md:px-6 bg-black text-white rounded-lg"
    >
      Student
    </button>
   
    <button
      onClick={() => setFilter("Notification")}
      className="py-2 px-2 md:px-6 bg-black text-white rounded-lg"
    >
      Notification
    </button>
  </div>

  <div className="flex flex-wrap justify-end gap-2">
    <button
      onClick={() => setTimeFilter("All")}
      className="py-2 px-2 md:px-6 bg-black text-white rounded-lg"
    >
      All
    </button>
  

    {/* Monthly Dropdown */}
    <div className="relative">
      <select
        onChange={(e) => setTimeFilter(e.target.value)}
        className="appearance-none py-2 px-2 md:px-6 bg-black text-white rounded-lg"
      >
        <option value="Monthly">Month</option>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={`Monthly-${i + 1}`}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-6-6H4l6 6 6-6h-1l-6 6 6 6h1l-6-6z" />
        </svg>
      </div>
    </div>

    {/* Yearly Dropdown */}
    <div className="relative">
      <select
        onChange={(e) => setTimeFilter(e.target.value)}
        className="appearance-none py-2 px-2 md:px-6 bg-black text-white rounded-lg"
      >
        <option value="Yearly">Year</option>
        {Array.from(
          { length: new Date().getFullYear() - 2019 + 1 },
          (_, i) => (
            <option key={i} value={`Yearly-${2019 + i}`}>
              {2019 + i}
            </option>
          )
        ).reverse()}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-6-6H4l6 6 6-6h-1l-6 6 6 6h1l-6-6z" />
        </svg>
      </div>
    </div>

  

    <div className="relative">
      <select
        onChange={(e) => setTimeFilter(e.target.value)}
        className="appearance-none py-2 px-2 md:px-6 bg-black text-white rounded-lg"
      >
        <option value="Class">Class</option>
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i + 1} value={`Class-${i + 1}`}>{`Class ${i + 1}`}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-6-6H4l6 6 6-6h-1l-6 6 6 6h1l-6-6z" />
        </svg>
      </div>
    </div>
  </div>
</div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {finalData.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 hover:border-black hover:bg-slate-100"
          >
            <div className="text-4xl text-black mb-4">{item.icon}</div>
            <p className="text-sm font-semibold">{item.name}</p>
            <p className="text-black text-sm mt-2">{item.value}</p>
            <a
              href="#"
              className="text-black text-xs mt-2 transform hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-500 transition-transform duration-300"
            >
              View
            </a>
          </div>
        ))}
>>>>>>> origin/main
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default StudentDashboard;
=======
export default AdminDashboard;
>>>>>>> origin/main
