"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";

const AdminAddPublicNotificationPage = () => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const { data: session } = useSession();
  const [adminId, setAdminId] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    setAdminId(session?._id);
  }, [session]);

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

    try {
      const response = await axios.post("/api/admin/admin-add-notification", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("Notification added successfully");
        setImagePreview(null);
        reset();
      } else {
        alert("Notification adding failed");
      }
    } catch (error) {
      console.error("Error adding notification:", error);
      alert("Notification adding failed");
    }
  };

  return (
    <div className="max-w-full p-4 mt-24 px-10">
      <h2 className="text-sm flex justify-start text-blue-400 mb-6 text-center">Add Public Notification</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm block mb-2">Title</label>
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
          <label className="text-sm block mb-2">Content</label>
          <textarea
            {...register("content", { required: "Content is required" })}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm block mb-2">Image (optional)</label>
          <input
            type="file"
            {...register("image")}
            className="border border-gray-300 p-2 rounded w-full"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Preview" className="max-w-xs rounded mb-2" />
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

        <button type="submit" className="px-12 py-2 w-full text-black font-semibold hover:bg-black hover:text-white border border-black transition-all duration-300 ease-in-out">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminAddPublicNotificationPage;
