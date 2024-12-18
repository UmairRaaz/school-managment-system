"use client";

import { useCallback, useEffect, useState } from "react";

import { FcVoicePresentation } from "react-icons/fc";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlinePending } from "react-icons/md";
import { FcPaid } from "react-icons/fc";
import { FaUserSlash } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import { FcSimCardChip } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { IoIosNotifications } from "react-icons/io";
import { PiMicrophoneStageFill } from "react-icons/pi";
import axios from "axios";
import { useSession } from "next-auth/react";

const StudentDashboard = () => {
  const [totalPresent, settotalPresent] = useState(0);
  const [totalAbsent, settotalAbsent] = useState(0);
  const [totalPaidFee, settotalPaidFee] = useState(0);
  const [totalUnpaidFee, settotalUnpaidFee] = useState(0);
  const [paidChallan, setpaidChallan] = useState(0);
  const [unpaidChallan, setunpaidChallan] = useState(0)
  const [totalResult, settotalResult] = useState(0);
  const [totalPassStudents, settotalPassStudents] = useState(0);
  const [totalFailedStudents, settotalFailedStudents] = useState(0);
  const [totalClassNotification, settotalClassNotification] = useState(0);
  const [totalPublicNotifications, settotalPublicNotifications] = useState(0);
  const [filter, setFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState({
    month: "",
    year: "",
  });
  const { data: session, status } = useSession();
  const getDashbaordDetails = useCallback(async (params = {}) => {
    console.log("params", params);
    const response = await axios.post("api/admin/student-dashboard-details", {
      studentId: session?._id.toString(),
      month: params.month,
      year: params.year,
    });
    let result = response.data.data;
    console.log(result);

    settotalPresent(result.attendance.totalPresent);
    settotalAbsent(result.attendance.totalAbsent);
    settotalPaidFee(result.fees.totalPaidAmount);
    settotalUnpaidFee(result.fees.totalUnpaidAmount);
    setpaidChallan(result.fees.totalPaidCount);
    setunpaidChallan(result.fees.totalUnpaidCount);
    settotalResult(result.results.totalResult);
    settotalPassStudents(result.results.totalPass);
    settotalFailedStudents(result.results.totalFail);
    settotalClassNotification(result.notifications.totalForClass);
    settotalPublicNotifications(result.notifications.totalForPublic);
  }, [session]);

  useEffect(() => {
    if (filter !== "All") {
      setTimeFilter({ year: "", month: "" });
      getDashbaordDetails({ category: filter });
    } else if (Object.values(timeFilter).some((value) => value)) {
      setFilter("All");
      getDashbaordDetails(timeFilter);
    } else {
      getDashbaordDetails(timeFilter);
    }
  }, [filter, timeFilter, getDashbaordDetails, setFilter, setTimeFilter]);
  const today = new Date();
  const data = [
    {
      category: "Student",
      name: "Present",
      value: totalPresent,
      date: new Date(),
      icon: <FcBusinessman />,
    },
    {
      category: "Student",
      name: "Absent",
      value: totalAbsent,
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
      value: paidChallan,
      date: new Date(),
      icon: <FcPaid />,
    },
    {
      category: "Financial",
      name: "Unpaid Challan",
      value: unpaidChallan,
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

  const finalData = filteredData;
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
              onChange={(e) =>
                setTimeFilter({ ...timeFilter, month: e.target.value })
              }
              className="appearance-none py-2 px-2 md:px-6 bg-black text-white rounded-lg"
            >
              <option value="Monthly">Month</option>
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

          {/* Yearly Dropdown */}
          <div className="relative">
            <select
              onChange={(e) =>
                setTimeFilter({ ...timeFilter, year: e.target.value })
              }
              className="appearance-none py-2 px-2 md:px-6 bg-black text-white rounded-lg"
            >
              <option value="Yearly">Year</option>
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

export default StudentDashboard;
