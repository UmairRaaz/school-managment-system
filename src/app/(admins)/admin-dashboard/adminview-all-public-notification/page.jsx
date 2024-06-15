"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const PublicNotificationsPage = () => {
  const [publicNotifications, setPublicNotifications] = useState([]);
  const router = useRouter()
  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/api/admin/getNotifications");
      const notifications = response.data.notifications;
      const filteredPublicNotifications = notifications.filter(
        (notification) => notification.notificationFor === "public"
      );
      setPublicNotifications(filteredPublicNotifications);
    } catch (error) {
      console.error("Error fetching public notifications:", error);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `/api/admin/delete-edit-get-notification/${id}`
      );
      if (response.data.success) {
        alert("Notification Deleted");
        fetchNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (id) =>{
    router.push(`/admin-dashboard/admin-edit-public-notification/${id}`)
  }
  const handleView = async (id) =>{
    router.push(`/admin-dashboard/admin-preview-notification/${id}`)
  }
  return (
    <div className="p-4 mt-24 px-10">
      <h1 className="text-2xl font-bold mb-4">Public Notifications</h1>
      {publicNotifications.length === 0 ? (
        <p>No public notifications available</p>
      ) : (
        <div className="space-y-4">
          {publicNotifications.map((notification) => (
            <div
              key={notification._id}
              className="border border-gray-300 p-4 rounded"
            >
              <h2 className="text-xl font-semibold mb-2 flex gap-4 items-center">
                {notification.title}
                <div
                  className="text-sm cursor-pointer"
                  onClick={() => handleEdit(notification._id)}
                >
                  Edit
                </div>
                <div
                  className="text-sm cursor-pointer"
                  onClick={() => handleView(notification._id)}
                >
                  View
                </div>
                <div
                  className="text-sm cursor-pointer"
                  onClick={() => handleDelete(notification._id)}
                >
                  Delete
                </div>
              </h2>
              <p className="mb-2">{notification.content}</p>
              {/* Uncomment this block if you want to display images */}
              {/* {notification.image && (
                <img
                  src={notification.image}
                  alt="Notification"
                  className="mb-2 max-w-full h-auto"
                />
              )} */}
              <p className="text-sm text-gray-500">
                Added by: {notification.addedBy}
              </p>
              <p className="text-sm text-gray-500">
                Notification For: {notification.notificationFor}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicNotificationsPage;
