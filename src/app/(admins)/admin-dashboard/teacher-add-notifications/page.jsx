"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";

const TeacherAddClassNotificationPage = () => {
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
  const { data: session } = useSession();
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const imageFile = watch("image");

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
          setValue("teacher", teacherId);
        } catch (error) {
          console.error("Error fetching teacher data:", error);
        }
      }
    };

    fetchTeacherData();
  }, [session, setValue]);

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
      const response = await axios.post("/api/admin/admin-add-notification", formData);
      if (response.data.success) {
        alert("Notification added successfully");
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
      <h2 className="text-sm flex justify-start text-blue-600 mb-6">Add Class Notification</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {session?.user && (
          <div>
             <h2 className="text-xs font-semibold mb-4 text-blue-600 mt-10">
              Teacher Details
            </h2>
            <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-inner">
              <p className="text-xs">
                <strong>Name:</strong> {session.user.name}
              </p>
              <p className="text-xs">
                <strong>Email:</strong> {session.user.email}
              </p>
            </div>
          </div>
        )}


           




        {classes.length > 0 && (
          <>
             <div className=" flex-col grid grid-cols-3 sm:flex-row gap-4 flex-grow w-full">
             <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Section</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Subject</label>
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
            </div>
              
          </>
        )}

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

export default TeacherAddClassNotificationPage;