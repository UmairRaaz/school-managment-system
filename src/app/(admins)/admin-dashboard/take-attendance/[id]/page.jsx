"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const AttendancePage = ({ params }) => {
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [teacher, setTeacher] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [attendanceData, setAttendanceData] = useState({
    teacherName: "",
    className: "",
    subject: "",
    date: format(new Date(), 'yyyy-MM-dd'),
    students: [],
  });

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      setLoading(true);
      const response = await axios.get(`/api/admin/delete-get-edit-teacher/${id}`);
      setTeacher(response.data.teacher);
      setLoading(false);
    };

    fetchTeacherDetails();
  }, [id]);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedClass) {
      setLoadingStudents(true);
      const studentsData = await axios.get(`/api/admin/getClassStudents/${selectedClass}th`);
      // Initialize each student's presence status
      const initializedStudents = studentsData.data.data.map(student => ({
        id: student._id,
        rollNumber: student.SID,
        isPresent: false
      }));
      setStudents(initializedStudents);
      setAttendanceData(prevData => ({
        ...prevData,
        teacher: teacher._id,
        className: selectedClass,
        subject: selectedSubject,
        date: date,
        students: initializedStudents.map(({ id, rollNumber, isPresent }) => ({
          id, rollNumber, isPresent
        }))
      }));
      setLoadingStudents(false);
    }
  };

  const togglePresence = (studentId) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId ? { ...student, isPresent: !student.isPresent } : student
      )
    );
    setAttendanceData(prevData => ({
      ...prevData,
      students: prevData.students.map(student =>
        student.id === studentId ? { ...student, isPresent: !student.isPresent } : student
      )
    }));
  };

  const handleAttendanceSubmit = async () => {
    try {
      const response = await axios.post(`/api/admin/submit-attendance`, attendanceData);
      if(response.data.success){
        alert("Attendance taken successfully");
        // Reset fields
        setSelectedClass("");
        setSelectedSubject("");
        setDate(format(new Date(), 'yyyy-MM-dd'));
        setStudents([]);
        setAttendanceData({
          teacherName: "",
          className: "",
          subject: "",
          date: format(new Date(), 'yyyy-MM-dd'),
          students: [],
        });
      }
      
    } catch (error) {
      console.error("Error submitting attendance", error);
      alert("Failed taking attendance");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const totalStudents = students.length;
  const totalPresents = students.filter(student => student.isPresent).length;
  const totalAbsents = totalStudents - totalPresents;

  return (
    <div className="min-h-screen mt-28 px-10">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Teacher Details</h1>
        <div className="mb-4">
          <p><strong>Name:</strong> {teacher.name}</p>
          <p><strong>Email:</strong> {teacher.email}</p>
        </div>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label className="block mb-2">Select Class</label>
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="border p-2 w-full"
            >
              <option value="">Select a class</option>
              {teacher.classes.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Select Subject</label>
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="border p-2 w-full"
            >
              <option value="">Select a subject</option>
              {teacher.subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="border p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Get Students
          </button>
        </form>
        <div>
          <h2 className="text-xl font-bold mb-2">Students</h2>
          {loadingStudents ? (
            <div className="text-center py-10">Loading Students...</div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {students.length > 0 ? (
                students.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => togglePresence(student.id)}
                    className={`p-4 border rounded text-center cursor-pointer ${
                      student.isPresent ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    {student.rollNumber}
                  </div>
                ))
              ) : (
                <p>No students found for the selected class.</p>
              )}
            </div>
          )}
        </div>
        <div className="mt-4">
          <p>Total Students: {totalStudents}</p>
          <p>Total Presents: {totalPresents}</p>
          <p>Total Absents: {totalAbsents}</p>
        </div>
        <button
          onClick={handleAttendanceSubmit}
          className="bg-green-500 text-white p-2 rounded mt-4"
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default AttendancePage;
