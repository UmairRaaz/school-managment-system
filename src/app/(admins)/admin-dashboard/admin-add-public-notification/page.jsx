"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";

const AdminAddPublicNotificationPage = () => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const { data: session } = useSession();
  const [adminId, setAdminId] = useState("");
  const imageFile = watch("image");

  useEffect(() => {
    setAdminId(session?._id);
  }, [session]);

  const onSubmit = async (data) => {
    const formData = {
      title: data.title,
      content: data.content,
      admin: adminId,
      addedBy: "admin",
      notificationFor: "public",
    };

    if (imageFile && imageFile.length > 0) {
      formData.image = imageFile[0];
    }

    const response = await axios.post("/api/admin/admin-add-notification", formData);
    if (response.data.success) {
      alert("Notification added successfully");
    } else {
      alert("Notification adding failed");
    }
    reset();
  };

  return (
    <div className="max-w-full  p-4 mt-24 px-10">
      <h2 className="text-sm flex justify-start text-blue-400  mb-6 text-center">Add Public Notification</h2>
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
          />
        </div>

        <button type="submit" className="px-12 py-2 w-full text-black font-semibold hover:bg-black hover:text-white border border-black transition-all duration-300 ease-in-out">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminAddPublicNotificationPage;
