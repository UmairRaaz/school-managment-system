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
        return <div className="m-20">Loading...</div>;
    }

    return (
        <div className="m-20">
            <h1 className="text-2xl font-bold mb-4">Title : {notification.title}</h1>
            <p className="text-lg mb-4">Content: {notification.content}</p>
            <div className="mb-4">
                <strong>Added By:</strong> {notification.addedBy}
            </div>
            {notification.class && (
                <div className="mb-4">
                    <strong>Class:</strong> {notification.class}
                </div>
            )}
            {notification.notificationFor && (
                <div className="mb-4">
                    <strong>Notification For:</strong> {notification.notificationFor}
                </div>
            )}
            {notification.section && (
                <div className="mb-4">
                    <strong>Section:</strong> {notification.section}
                </div>
            )}
        </div>
    );
};

export default AdminPreviewNotification;
