"use client";

import { useEffect, useState } from "react";

import { FaBoxes } from "react-icons/fa";
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
import axios from "axios";

const AdminDashboard = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalPresent, settotalPresent] = useState(0);
  const [totalAbsent, settotalAbsent] = useState(0)
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalPaidFee, settotalPaidFee] = useState(0);
  const [totalUnpaidFee, settotalUnpaidFee] = useState(0);
  const [totalResults, settotalResults] = useState(0);
  const [passedResults, setPassedResults] = useState(0);
  const [failedResults, setFailedResults] = useState(0);
  const [totalClassNotifications, setTotalClassNotifications] = useState(0);
  const [totalPublicNotifications, setTotalPublicNotifications] = useState(0);
  const [totalAttendance, setTotalAttendance] = useState(0);
  const [countPaid, setCountPaid] = useState(0);
  const [countUnpaid, setCountUnpaid] = useState(0);
  const [filter, setFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState({
    year: "",
    month: "",
    class: "",
  });

  const getDashboardDetails = async (params = {}) => {
    console.log(params)
    try {
      const response = await axios.post(
        "/api/admin/admin-dashboard-details",
        params
      );
      const result = response.data.data;
      setTotalAmount(result.totalFeeSum);
      setTotalStudents(result.totalStudents);
      settotalPresent(result.totalPresent);
      settotalAbsent(result.totalAbsent);
      setTotalTeachers(result.totalTeachers);
      settotalPaidFee(result.totalPaidFeeSum);
      settotalUnpaidFee(result.totalUnpaidFeeSum);
      settotalResults(result.totalResults);
      setPassedResults(result.passedResults);
      setFailedResults(result.failedResults);
      setTotalClassNotifications(result.totalClassNotifications);
      setTotalPublicNotifications(result.totalPublicNotifications);
      setTotalAttendance(result.totalAttendance);
      setCountPaid(result.countPaid);
      setCountUnpaid(result.countUnpaid);
    } catch (error) {
      console.error("Error fetching dashboard details:", error);
    }
  };

  useEffect(() => {
    if (filter !== "All") {
      setTimeFilter({ year: "", month: "", class: "" });
      getDashboardDetails({ category: filter });
    } else if (Object.values(timeFilter).some((value) => value)) {
      setFilter("All");
      getDashboardDetails(timeFilter);
    } else {
      getDashboardDetails();
    }
  }, [filter, timeFilter]);

  const today = new Date();
  const data = [
    {
      category: "Financial",
      name: "Total Amount",
      value: totalAmount,
      icon: <FaSackDollar />,
    },
    {
      category: "Student",
      name: "Students",
      value: totalStudents,
      icon: <FcBusinessman />,
    },
    {
      category: "Student",
      name: "Present",
      value: totalPresent,
      icon: <FcVoicePresentation />,
    },
    {
      category: "Student",
      name: "Absent",
      value: totalAbsent,
      date: new Date(),
      icon: <FcVoicePresentation />,
    },
    {
      category: "Staff",
      name: "Teachers",
      value: totalTeachers,
      icon: <FcAssistant />,
    },
    {
      category: "Financial",
      name: "Received Amount",
      value: totalPaidFee,
      icon: <GiTakeMyMoney />,
    },
    {
      category: "Financial",
      name: "Pending Amount",
      value: totalUnpaidFee,
      icon: <MdOutlinePending />,
    },
    {
      category: "Financial",
      name: "Paid Students",
      value: countPaid,
      icon: <FcPaid />,
    },
    {
      category: "Financial",
      name: "Unpaid Students",
      value: countUnpaid,
      icon: <FaUserSlash />,
    },
    {
      category: "Student",
      name: "Result",
      value: totalResults,
      icon: <FcSimCardChip />,
    },
    {
      category: "Student",
      name: "Passed Student",
      value: passedResults,
      icon: <FcLike />,
    },
    {
      category: "Student",
      name: "Failed Student",
      value: failedResults,
      icon: <FcDislike />,
    },
    {
      category: "Notification",
      name: "Class Notification",
      value: totalClassNotifications,
      icon: <IoIosNotifications />,
    },
    {
      category: "Notification",
      name: "Public Notification",
      value: totalPublicNotifications,
      icon: <PiMicrophoneStageFill />,
    },
    {
      category: "Student",
      name: "Attendance",
      value: totalAttendance,
      icon: <FaBoxes />,
    },
  ];

  const filteredData =
    filter === "All" ? data : data.filter((item) => item.category === filter);

  const handleMonthChange = (e) => {
    setTimeFilter({ ...timeFilter, month: e.target.value, class: "" })
  }
  const handleYearChange = (e) => {
    setTimeFilter({ ...timeFilter, year: e.target.value, class: "" })
  }

  const finalData = filteredData;
  return (
    <div className="max-w-6xl mx-auto p-2 mt-20">
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
            onClick={() => setTimeFilter({ year: "", month: "", class: "" })}
            className="py-2 px-2 md:px-6 bg-black text-white rounded-lg"
          >
            All
          </button>

          <div className="relative">
            <select
              onChange={(e) => handleMonthChange(e)} 
              className="appearance-none py-2 px-2 md:px-6 bg-black text-white rounded-lg"
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
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

          <div className="relative">
            <select
              onChange={(e) => handleYearChange(e)} 
              className="appearance-none py-2 px-2 md:px-6 bg-black text-white rounded-lg"
            >
              <option value="">Year</option>
              {Array.from(
                { length: new Date().getFullYear() - 2019 + 1 },
                (_, i) => (
                  <option key={i} value={2019 + i}>
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
              onChange={(e) =>
                setTimeFilter({ ...timeFilter, month: "", year: "", class: e.target.value })
              }
              className="appearance-none py-2 px-2 md:px-6 bg-black text-white rounded-lg"
            >
              <option value="">Class</option>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{`Class ${i + 1}`}</option>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
