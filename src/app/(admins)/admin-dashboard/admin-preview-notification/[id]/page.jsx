'use client'

import axios from "axios";
import { useEffect, useState } from "react";

const AdminPreviewNotification = ({ params }) => {
    const [notification, setNotification] = useState(null);
    const { id } = params;

    const getNotification = async () => {
        try {
            const response = await axios.get(`/api/admin/delete-edit-get-notification/${id}`);
            setNotification(response.data.notification);
        } catch (error) {
            console.error("Error fetching the notification:", error);
        }
    };

    useEffect(() => {
        getNotification();
    }, [id]);

    if (!notification) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-xl">Loading...</span>
            </div>
        );
    }

    return (
        <div className=" text-white py-10">
            <div className="max-w-full mx-auto p-8 mt-10 ">
                <div className="p-6">
                    <h1 className="text-lg  mb-4 text-blue-500">Preview Notification Details</h1>
                    <div className="mb-6">
                        <h2 className="text-lg text-black font-semibold mb-2">Title</h2>
                        <p className="text-sm text-gray-700">{notification.title}</p>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-lg text-black font-semibold mb-2">Content</h2>
                        <p className="text-sm text-gray-700">{notification.content}</p>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-lg text-black font-semibold mb-2">Date</h2>
                        <p className="text-sm text-gray-700">{notification.createdDate}</p>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-lg text-black font-semibold mb-2">Day</h2>
                        <p className="text-sm text-gray-700">{notification.createdDay}</p>
                    </div>
                    {notification.teacherName && (
                        <div className="mb-6">
                        <h2 className="text-lg text-black font-semibold mb-2">Added By</h2>
                        <p className="text-sm text-gray-700">{notification.teacherName} </p>
                    </div>
                    )}
                    
                  
                    {notification.notificationFor && (
                        <div className="mb-6">
                            <h2 className="text-lg text-black font-semibold mb-2">Notification For</h2>
                            <p className="text-sm text-gray-700">Class {notification.class}</p>
                        </div>
                    )}
                    {notification.section && (
                        <div className="mb-6">
                            <h2 className="text-lg text-black font-semibold mb-2">Section</h2>
                            <p className="text-sm text-gray-700">{notification.section}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="relative h-64 md:h-96 lg:h-screen">
                <img
                    src="/moon.jpg"
                    alt="Random"
                    className="absolute inset-0 w-full h-full object-contain"
                />
            </div>
        </div>
    );
};

export default AdminPreviewNotification;
