"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AdminEditAttendancePage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [attendanceEditId, setAttendanceEditId] = useState("");
  const [attendanceData, setAttendanceData] = useState({
    className: "",
    section: "",
    date: format(new Date(), "yyyy-MM-dd"),
    students: [],
  });

  useEffect(() => {
    setLoading(false); // Remove teacher loading since it's no longer needed
  }, []);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedClass && selectedSection) {
      setLoadingStudents(true);
      const attendanceResponse = await axios.post("/api/admin/manage-admin-attendances", {
        selectedClass,
        selectedSection,
        date,
      });
      setAttendanceEditId(attendanceResponse.data.id);
      if (attendanceResponse.data.attendance) {
        const existingAttendance = attendanceResponse.data.attendance[0];
        setStudents(existingAttendance.students);
        setAttendanceData({
          className: selectedClass,
          section: selectedSection,
          date: date,
          students: existingAttendance.students,
        });
      } else {
        const studentsData = await axios.post("/api/admin/getClassStudents", {
          selectedClass,
          selectedSection,
        });
        const initializedStudents = studentsData.data.data.map((student) => ({
          id: student._id,
          rollNumber: student.SID,
          isPresent: false,
        }));
        setStudents(initializedStudents);
        setAttendanceData((prevData) => ({
          ...prevData,
          className: selectedClass,
          section: selectedSection,
          date: date,
          students: initializedStudents,
        }));
      }
      setLoadingStudents(false);
    }
  };

  const togglePresence = (studentId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, isPresent: !student.isPresent } : student
      )
    );
    setAttendanceData((prevData) => ({
      ...prevData,
      students: prevData.students.map((student) =>
        student.id === studentId ? { ...student, isPresent: !student.isPresent } : student
      ),
    }));
  };

  const handleSelectAll = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({ ...student, isPresent: true }))
    );
    setAttendanceData((prevData) => ({
      ...prevData,
      students: prevData.students.map((student) => ({ ...student, isPresent: true })),
    }));
  };

  const handleDeselectAll = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({ ...student, isPresent: false }))
    );
    setAttendanceData((prevData) => ({
      ...prevData,
      students: prevData.students.map((student) => ({ ...student, isPresent: false })),
    }));
  };

  const handleAttendanceSubmit = async () => {
    try {
      const response = await axios.put(`/api/admin/manage-admin-attendances`, { attendanceData, attendanceEditId });
      if (response.data.success) {
        alert("Attendance Edited successfully");
        setSelectedClass("");
        setSelectedSection("");
        setDate(format(new Date(), "yyyy-MM-dd"));
        setStudents([]);
        setAttendanceData({
          className: "",
          section: "",
          date: format(new Date(), "yyyy-MM-dd"),
          students: [],
        });
        window.location.reload(true);
      }
    } catch (error) {
      console.error("Error Editing attendance", error);
      alert("Failed Editing attendance");
    }
  };

  const totalStudents = students.length;
  const totalPresents = students.filter((student) => student.isPresent).length;
  const totalAbsents = totalStudents - totalPresents;

  return (
    <div className="min-h-screen mt-20 pt-10 pb-10 px-4 sm:px-10">
      <div className="container mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-lg font-bold mb-6 text-start text-gray-800">Admin Edit Attendance</h1>

        <form
          onSubmit={handleSubmit}
          className="text-sm mb-6 flex flex-col sm:flex-row gap-4 items-end mt-10"
        >
          <div className="flex flex-col sm:flex-row gap-4 flex-grow w-full">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
              <select
                value={selectedClass}
                onChange={handleClassChange}
                className="border p-2 w-full rounded-md shadow-sm"
              >
                <option value="">Select a class</option>
                {/* Hardcoded classes 1 to 10 */}
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((num) => (
                  <option key={num + 1} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Section</label>
              <select
                value={selectedSection}
                onChange={handleSectionChange}
                className="border p-2 w-full rounded-md shadow-sm"
              >
                <option value="">Select a section</option>
                {/* Hardcoded sections A to D */}
                {['A', 'B', 'C', 'D'].map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="border p-2 w-full rounded-md shadow-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-black hover:bg-blue-600 text-white py-2 px-2 text-xs rounded-md shadow-md transition duration-300 ease-in-out"
            style={{ whiteSpace: "nowrap" }}
          >
            Get Students
          </button>
        </form>

        <div className="mt-10">
          <h2 className="text-xs font-semibold mb-4 text-blue-600">Student List</h2>
          {loadingStudents ? (
            <div className="text-center py-10">Loading Students...</div>
          ) : students.length > 0 ? (
            <div>
              <div className="flex justify-between mb-4">
                <span className="text-sm">
                  Total Students: {totalStudents} | Present: {totalPresents} | Absent: {totalAbsents}
                </span>
                <div>
                  <button
                    onClick={handleSelectAll}
                    className="bg-green-600 hover:bg-green-500 text-white py-1 px-2 text-xs rounded-md mr-2"
                  >
                    Select All
                  </button>
                  <button
                    onClick={handleDeselectAll}
                    className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 text-xs rounded-md"
                  >
                    Deselect All
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border px-4 py-2 text-left">Roll Number</th>
                      <th className="border px-4 py-2 text-left">Present</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td className="border px-4 py-2">{student.rollNumber}</td>
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => togglePresence(student.id)}
                            className={`flex items-center justify-center ${
                              student.isPresent ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {student.isPresent ? (
                              <FaCheckCircle className="mr-1" />
                            ) : (
                              <FaTimesCircle className="mr-1" />
                            )}
                            {student.isPresent ? "Present" : "Absent"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={handleAttendanceSubmit}
                className="mt-4 bg-black hover:bg-blue-600 text-white py-2 px-4 text-xs rounded-md"
              >
                Submit Attendance
              </button>
            </div>
          ) : (
            <div>No students found for the selected class and section.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEditAttendancePage;
