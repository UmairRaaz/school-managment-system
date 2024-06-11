"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherViewAttendancePage = ({ params }) => {
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [teacher, setTeacher] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      setLoading(true);
      const response = await axios.get(
        `/api/admin/delete-get-edit-teacher/${id}`
      );
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (teacher) {
      const response = await axios.get(
        `/api/admin/getAttendanceTeacher/${teacher._id}`
      );
      setAttendance(response.data.data);

      const filteredData = response.data.data.filter(
        (record) =>
          record.className === selectedClass &&
          record.subject === selectedSubject
      );
      setFilteredAttendance(filteredData);
    }
  };

  console.log("Filtered Attendance", filteredAttendance);

  return (
    <div className="min-h-screen mt-28 px-10">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Teacher Details</h1>
          {teacher && (
            <div className="mb-4">
              <p>
                <strong>Name:</strong> {teacher.name}
              </p>
              <p>
                <strong>Email:</strong> {teacher.email}
              </p>
            </div>
          )}

          {teacher && (
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Select Class</label>
                <select
                  value={selectedClass}
                  onChange={handleClassChange}
                  className="border p-2 w-full"
                >
                  <option value="">Select a class</option>
                  {teacher.classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">
                  Select Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                  className="border p-2 w-full"
                >
                  <option value="">Select a subject</option>
                  {teacher.subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Fetch Attendance
              </button>
            </form>
          )}

          {filteredAttendance.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Attendance:</h2>
              <ul>
                {filteredAttendance.map((record, index) => (
                  <li key={index}>
                    {record.students.map((student, idx) => (
                      <div key={idx}>
                        {student.rollNumber}:{" "}
                        {student.isPresent ? "Present" : "Absent"}
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherViewAttendancePage;
