"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const TeacherViewClassNotificationPage = () => {
  const [classNotifications, setClassNotifications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/api/admin/getNotifications");
      const notifications = response.data.notifications;
      const filteredClassNotifications = notifications.filter(
        (notification) => notification.notificationFor === "class"
      );
      setClassNotifications(filteredClassNotifications);
    } catch (error) {
      console.error("Error fetching class notifications:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/admin/delete-edit-get-notification/${id}`);
      if (response.data.success) {
        alert("Notification Deleted");
        fetchNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    router.push(`/admin-dashboard/teacher-edit-notfication/${id}`);
  };

  const handleView = async (id) => {
    router.push(`/admin-dashboard/admin-preview-notification/${id}`);
  };

  const getShortContent = (content) => {
    const words = content.split(' ');
    return words.slice(0, 2).join(' ') + (words.length > 2 ? '...' : '');
  };

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10">
      <h1 className="text-3xl my-4 text-center">Class Notifications</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-black text-white">
            <tr className="text-xs font-semibold uppercase tracking-wider">
              <th className="py-3 px-6 text-left rounded-tl-lg">Title</th>
              <th className="py-3 px-6 text-left">Content</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Teacher</th>
              <th className="py-3 px-6 text-left">Class</th>
              <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-xs">
            {classNotifications.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center text-gray-500">No class notifications available</td>
              </tr>
            ) : (
              classNotifications.map((notification) => (
                <tr key={notification._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{notification.title}</td>
                  <td className="py-3 px-6 text-left">{getShortContent(notification.content)}</td>
                  <td className="py-3 px-6 text-left">17-6-2024</td>
                  <td className="py-3 px-6 text-left">Teacher Name</td>
                  <td className="py-3 px-6 text-left">{notification.class}</td>
                  <td className="py-3 px-6 text-center flex justify-center">
                    <FaEye className="text-blue-500 hover:text-blue-700 mx-2 cursor-pointer" onClick={() => handleView(notification._id)} />
                    <FaEdit className="text-yellow-500 hover:text-yellow-700 mx-2 cursor-pointer" onClick={() => handleEdit(notification._id)} />
                    <FaTrash className="text-red-500 hover:text-red-700 mx-2 cursor-pointer" onClick={() => handleDelete(notification._id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherViewClassNotificationPage;