"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";

const AdminAddClassNotificationPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession();
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [adminId, setAdminId] = useState("");
  const selectedTeacher = watch("teacher");

  useEffect(() => {
    setAdminId(session?._id);
  }, [session]);

  useEffect(() => {
    axios
      .get("/api/admin/all-teachers")
      .then((response) => {
        setTeachers(response.data.teachers);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedTeacher) {
      axios
        .get(`/api/admin/delete-get-edit-teacher/${selectedTeacher}`)
        .then((response) => {
          setClasses(response.data.teacher.classes);
          setSections(response.data.teacher.section);
          setSubjects(response.data.teacher.subjects);
          setTeacherName(response.data.teacher.name);
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    }
  }, [selectedTeacher]);

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
    formData.append("addedBy", "teacher");
    formData.append("teacherName", teacherName);
    formData.append("notificationFor", "class");
    formData.append("teacher", data.teacher);
    formData.append("class", data.class);
    formData.append("section", data.section);
    formData.append("subject", data.subject);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post(
        "/api/admin/admin-add-notification",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Notification added successfully");
        reset();
        setImageFile(null); 
        setImagePreview(null); 
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
      <h2 className="text-sm flex justify-start text-blue-400 mb-6">
        Add Class Notification
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm block mb-2">Select Teacher</label>
            <select
              {...register("teacher", { required: "Teacher is required" })}
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
            {errors.teacher && (
              <p className="text-red-500">{errors.teacher.message}</p>
            )}
          </div>

          {selectedTeacher && (
            <>
              <div>
                <label className="text-sm block mb-2">Select Class</label>
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
                <label className="text-sm block mb-2">Select Section</label>
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
                <label className="text-sm block mb-2">Select Subject</label>
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
        </div>

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

        <div className="flex flex-col">
          <label htmlFor="image" className="text-xs block text-gray-700">
            Notification Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image")}
            onChange={handleImageChange}
            className="mt-1 p-2 border border-gray-300 rounded"
          />
          {imagePreview && (
            <div className="mt-2">
              <Image src={imagePreview} alt="Preview" className="mb-2" />
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

        <button
          type="submit"
          className="px-12 py-2 w-full text-black font-semibold hover:bg-black hover:text-white border border-black transition-all duration-300 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminAddClassNotificationPage;
