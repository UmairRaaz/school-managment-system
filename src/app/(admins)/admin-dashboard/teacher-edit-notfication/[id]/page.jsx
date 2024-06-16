"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const TeacherEditClassNotificationPage = ({ params }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession();
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const imageFile = watch("image");
  const router = useRouter();
  const [notification, setNotification] = useState(null);
  const { id } = params;

  useEffect(() => {
    const fetchTeacherData = async () => {
      if (session?._id) {
        const teacherId = session._id;
        try {
          const response = await axios.get(`/api/admin/delete-get-edit-teacher/${teacherId}`);
          const teacherData = response.data.teacher;
          setClasses(teacherData.classes);
          setSections(teacherData.section);
          setSubjects(teacherData.subjects);
        } catch (error) {
          console.error("Error fetching teacher data:", error);
        }
      }
    };

    fetchTeacherData();
  }, [session]);

  const getNotification = async () => {
    try {
      const response = await axios.get(`/api/admin/delete-edit-get-notification/${id}`);
      const notificationData = response.data.notification;
      setNotification(notificationData);
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
      setValue("class", notification.class);
      setValue("section", notification.section);
      setValue("subject", notification.subject);
      setValue("title", notification.title);
      setValue("content", notification.content);
    }
  }, [notification, setValue]);

  const onSubmit = async (data) => {
    const formData = {
      title: data.title,
      content: data.content,
      addedBy: "teacher",
      notificationFor: "class",
      teacher: session?._id,
      class: data.class,
      section: data.section,
      subject: data.subject,
    };

    if (imageFile && imageFile.length > 0) {
      formData.image = imageFile[0];
    }

    try {
      const response = await axios.put(`/api/admin/delete-edit-get-notification/${id}`, formData);
      if (response.data.success) {
        router.push("/admin-dashboard/adminview-all-class-notification");
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
      <h1 className="text-2xl font-bold mb-4">Edit Class Notification</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {session?.user && (
          <div>
            <p className="mb-2"><strong>Teacher:</strong> {session.user.name}</p>
          </div>
        )}

        {classes.length > 0 && (
          <>
            <div>
              <label className="block mb-2">Select Class</label>
              <select
                {...register("class", { required: "Class is required" })}
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value="">Select a class</option>
                {classes.map((cls, index) => (
                  <option key={index} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              {errors.class && (
                <p className="text-red-500">{errors.class.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-2">Select Section</label>
              <select
                {...register("section", { required: "Section is required" })}
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value="">Select a section</option>
                {sections.map((sect, index) => (
                  <option key={index} value={sect}>
                    {sect}
                  </option>
                ))}
              </select>
              {errors.section && (
                <p className="text-red-500">{errors.section.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-2">Select Subject</label>
              <select
                {...register("subject", { required: "Subject is required" })}
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value="">Select a subject</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p className="text-red-500">{errors.subject.message}</p>
              )}
            </div>
          </>
        )}

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
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TeacherEditClassNotificationPage;
