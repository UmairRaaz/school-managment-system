"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AdminEditAttendancePage = () => {
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [attendanceEditId, setattendanceEditId] = useState("")
  const [attendanceData, setAttendanceData] = useState({
    teacher: "",
    className: "",
    subject: "",
    section: "",
    date: format(new Date(), "yyyy-MM-dd"),
    students: [],
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await axios.get("/api/admin/all-teachers");
      setTeachers(response.data.teachers);
      setLoading(false);
    };

    fetchTeachers();
  }, []);

  const handleTeacherChange = async (event) => {
    const teacherId = event.target.value;
    setSelectedTeacher(teacherId);
    setLoading(true);
    const response = await axios.get(`/api/admin/delete-get-edit-teacher/${teacherId}`);
    setTeacherDetails(response.data.teacher);
    setLoading(false);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  console.log(students)
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedClass && selectedSection) {
      setLoadingStudents(true);
      const attendanceResponse = await axios.post("/api/admin/manage-admin-attendances", {
        selectedClass,
        selectedSection,
        selectedTeacher,
        selectedSubject,
        date,
      });
      setattendanceEditId(attendanceResponse.data.id)
      if (attendanceResponse.data.attendance) {
        const existingAttendance = attendanceResponse.data.attendance[0];
        setStudents(existingAttendance.students);
        setAttendanceData({
          teacher: selectedTeacher,
          className: selectedClass,
          subject: selectedSubject,
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
          teacher: selectedTeacher,
          className: selectedClass,
          subject: selectedSubject,
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
  console.log("AttendanceId", attendanceEditId)
  const handleAttendanceSubmit = async () => {
    try {
      const response = await axios.put(`/api/admin/manage-admin-attendances`, {attendanceData, attendanceEditId});
      if (response.data.success) {
        alert("Attendance Edited successfully");
        setSelectedTeacher("");
        setSelectedClass("");
        setSelectedSubject("");
        setSelectedSection("");
        setDate(format(new Date(), "yyyy-MM-dd"));
        setStudents([]);
        setAttendanceData({
          teacher: "",
          className: "",
          subject: "",
          section: "",
          date: format(new Date(), "yyyy-MM-dd"),
          students: [],
        });
        window.location.reload(true)
      }
    } catch (error) {
      console.error("Error Editing attendance", error);
      alert("Failed Editing attendance");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const totalStudents = students.length;
  const totalPresents = students.filter((student) => student.isPresent).length;
  const totalAbsents = totalStudents - totalPresents;

  return (
    <div className="min-h-screen mt-20 pt-10 pb-10 px-4 sm:px-10">
      <div className="container mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-lg font-bold mb-6 text-start text-gray-800">Admin Edit Attendance</h1>

        <div className="mb-6 mt-10">
          <label className="block text-sm font-medium text-blue-600 mb-2">Select Teacher</label>
          <select
            value={selectedTeacher}
            onChange={handleTeacherChange}
            className="border p-2 w-full rounded-md shadow-sm"
          >
            <option value="">Select a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        {teacherDetails && (
          <>
            <h2 className="text-xs font-semibold mb-4 text-blue-600 mt-10">Teacher Details</h2>
            <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-inner">
              <p className="text-xs">
                <strong>Name:</strong> {teacherDetails.name}
              </p>
              <p className="text-xs">
                <strong>Email:</strong> {teacherDetails.email}
              </p>
            </div>

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
                    {teacherDetails.classes.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                    className="border p-2 w-full rounded-md shadow-sm"
                  >
                    <option value="">Select a subject</option>
                    {teacherDetails.subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
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
                    {teacherDetails.section.map((section) => (
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
          </>
        )}

        <div className="mt-10">
          <h2 className="text-xs font-semibold mb-4 text-blue-500 flex flex-col sm:flex-row justify-between items-center">
            <span className="mb-2 sm:mb-0">Students Roll Number</span>
            <div className="flex flex-wrap justify-center sm:justify-end gap-2">
              <button
                onClick={handleSelectAll}
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 text-xs rounded-md shadow-lg transition duration-300 ease-in-out"
              >
                Select All
              </button>
              <button
                onClick={handleDeselectAll}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 text-xs rounded-md shadow-lg transition duration-300 ease-in-out"
              >
                Deselect All
              </button>
            </div>
          </h2>

          {loadingStudents ? (
            <div className="text-center py-4">
              <p className="text-lg">Loading Students...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-2 mt-8">
                {students.length > 0 ? (
                  students.map((student) => (
                    <div
                      key={student.id}
                      onClick={() => togglePresence(student.id)}
                      className={`p-2 border rounded-lg text-center cursor-pointer flex items-center justify-between ${
                        student.isPresent ? "bg-green-200" : "bg-red-200"
                      }`}
                      style={{ width: "70px", height: "40px" }}
                    >
                      <p className="text-xs" style={{ width: "50%" }}>{student.rollNumber}</p>
                      {student.isPresent ? (
                        <FaCheckCircle className="text-green-600 inline-block" style={{ fontSize: "18px" }} />
                      ) : (
                        <FaTimesCircle className="text-red-600 inline-block" style={{ fontSize: "18px" }} />
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-red-500 mb-20" style={{ whiteSpace: "nowrap" }}>
                    No students found for the selected class and section &#128513;
                  </p>
                )}
              </div>

              {students.length > 0 && (
                <div className="flex flex-wrap justify-end gap-2 mt-10">
                  <div className="bg-gray-100 border rounded-lg p-2 text-center flex-grow">
                    <p className="text-sm">Total Students {totalStudents}</p>
                  </div>
                  <div className="bg-green-100 border rounded-lg p-2 text-center flex-grow">
                    <p className="text-sm">Presents {totalPresents}</p>
                  </div>
                  <div className="bg-red-100 border rounded-lg p-2 text-center flex-grow">
                    <p className="text-sm">Absent {totalAbsents}</p>
                  </div>
                  <button
                    onClick={handleAttendanceSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 text-xs rounded-md shadow-lg transition duration-300 ease-in-out"
                  >
                    Submit Attendance
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEditAttendancePage;
