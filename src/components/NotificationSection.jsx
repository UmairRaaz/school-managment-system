// components/NotificationSectionWithModal.jsx
'use client'
import React, { useState } from "react";

const notifications = [
  { title: "School Closure", subject: "Closure Notice", message: "School will be closed on Friday.", link: "/notifications/1" },
  { title: "Parent-Teacher Meeting", subject: "Meeting Schedule", message: "Parent-teacher meeting next Wednesday.", link: "/notifications/2" },
  { title: "Library Update", subject: "New Books", message: "New library books are now available.", link: "/notifications/3" },
  { title: "Sports Day", subject: "Event Announcement", message: "Annual sports day next month.", link: "/notifications/4" },
  { title: "Maths Test", subject: "Test Schedule", message: "Maths test scheduled for Monday.", link: "/notifications/5" },
  { title: "Cafeteria Menu", subject: "Menu Update", message: "New cafeteria menu launched.", link: "/notifications/6" },
  { title: "Science Fair", subject: "Event Announcement", message: "Science fair this weekend.", link: "/notifications/7" },
  { title: "Extra Classes", subject: "Class Schedule", message: "Extra classes for Grade 10 on Saturday.", link: "/notifications/8" },
  { title: "Art Competition", subject: "Competition Announcement", message: "Art competition entries are open.", link: "/notifications/9" },
  { title: "Uniform Sale", subject: "Sale Notice", message: "School uniform sale this Thursday.", link: "/notifications/10" },
];

const NotificationSectionWithModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentNotification, setCurrentNotification] = useState({});

  const handleNotificationClick = (notification) => {
    setCurrentNotification(notification);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentNotification({});
  };

  return (
    <div className="bg-gradient-to-r p-6 rounded-lg w-full md:w-[94%] px-8 md:px-20">
      <h1 className="text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-400 text-center mb-12">
        Notifications
      </h1>
      <div className="h-60 overflow-hidden relative">
        <div className="notification-scroll gap-4">
          {notifications.map((notification, index) => (
            <button
              key={index}
              onClick={() => handleNotificationClick(notification)}
              className="block text-black text-sm py-2 hover:bg-blue-100 hover:shadow-lg transition duration-300 ease-in-out w-full text-left rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {notification.message}
            </button>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => closeModal()}
          ></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-gradient-to-r from-blue-500 to-pink-400 p-4">
              <h2 className="text-2xl font-bold text-white mb-2">{currentNotification.title}</h2>
              <p className="text-white text-sm">{currentNotification.subject}</p>
            </div>
            <div className="p-4">
              <p className="text-gray-700 text-base">{currentNotification.message}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => closeModal()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSectionWithModal;