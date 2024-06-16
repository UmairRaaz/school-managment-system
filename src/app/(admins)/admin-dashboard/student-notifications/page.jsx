'use client'
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const StudentViewNotification = () => {
  const { data: session } = useSession();
  const [studentClass, setStudentClass] = useState("");
  const [studentSection, setStudentSection] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch student class and section based on session user ID
  const fetchStudentDetails = async (studentId) => {
    try {
      const response = await axios.get(
        `/api/admin/delete-edit-get-student/${studentId}`
      );
      const { Section, CurrentClass } = response.data.student;
      setStudentClass(CurrentClass);
      setStudentSection(Section);
      fetchNotifications(studentSection, studentClass); 
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  // Fetch notifications based on class and section
  const fetchNotifications = async (studentSection, studentClass) => {
    try {
      const response = await axios.get(`/api/admin/getNotifications`);
      const filteredNotifications = response.data.notifications.filter(
        (notification) =>
          notification.class === studentClass &&
          notification.section === studentSection
      );
    console.log(filteredNotifications)
    console.log(response)
      setNotifications(filteredNotifications);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (session?._id) {
      fetchStudentDetails(session._id);
    }
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 mt-24 px-10">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notification, index) => (
            <li key={index} className="p-4 border border-gray-300 rounded-lg">
              <h2 className="text-lg font-semibold">{notification.title}</h2>
              <p>{notification.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default StudentViewNotification;
