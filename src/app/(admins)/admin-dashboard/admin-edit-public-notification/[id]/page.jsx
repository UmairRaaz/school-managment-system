"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AdminEditPublicNotificationPage = ({ params }) => {
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
  const { data: session } = useSession();
  const [adminId, setAdminId] = useState("");
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    setAdminId(session?._id);
  }, [session]);

  const getNotification = async () => {
    try {
      const response = await axios.get(`/api/admin/delete-edit-get-notification/${id}`);
      const notificationData = response.data.notification;
      setNotification(notificationData);
      if (notificationData.image) {
        setImagePreview(notificationData.image);
      }
      reset(notificationData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the notification:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotification();
  }, [id]);

  useEffect(() => {
    if (notification) {
      setValue("title", notification.title);
      setValue("content", notification.content);
    }
  }, [notification, setValue]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(true);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("admin", adminId);
    formData.append("addedBy", "admin");
    formData.append("notificationFor", "public");

    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (removeImage) {
      formData.append("removeImage", "true");
    }

    try {
      const response = await axios.put(`/api/admin/delete-edit-get-notification/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        router.push("/admin-dashboard/adminview-all-public-notification");
      } else {
        alert("Notification update failed");
      }
    } catch (error) {
      console.error("Error updating notification:", error);
      alert("Notification update failed");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 mt-24 px-10">
      <h1 className="text-2xl font-bold mb-4">Edit Public Notification</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Content</label>
          <textarea
            {...register("content", { required: "Content is required" })}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Image (optional)</label>
          <input
            type="file"
            {...register("image")}
            onChange={handleImageChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {imagePreview && (
            <div className="mt-2">
              <Image src={imagePreview} alt="Preview" className="max-w-xs rounded mb-2" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminEditPublicNotificationPage;
