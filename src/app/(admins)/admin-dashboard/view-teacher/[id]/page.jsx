"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaChalkboardTeacher,
  FaBook,
} from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const TeacherPreviewPage = ({ params }) => {
  const [teacher, setTeacherDetails] = useState({});
  const id = params.id;
  const [loading, setIsLoading] = useState(true);

  const getTeacherDetails = async (id) => {
    try {
      const response = await axios.get(
        `/api/admin/delete-get-edit-teacher/${id}`
      );
      setTeacherDetails(response.data.teacher);
    } catch (error) {
      console.error("Error fetching teacher details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTeacherDetails(id);
  }, [id]);

  return (
    <div className="flex flex-col items-start justify-start min-h-screen bg-white p-11 mt-20">
      <h1 className="text-sm flex justify-start items-start text-blue-500 mb-10 text-center">
        View Teacher Profile
      </h1>

      {loading ? (
        "Loading"
      ) : (
        <div className="bg-gray-50 p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <Image
              src={teacher.image || "/placeholder.jpg"}
              alt="Profile"
              width={128}
              height={128}
              className="w-32 h-32 md:w-48 md:h-48 border border-gray-900 rounded-full object-cover mb-4"
            />
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2 text-center">
              {teacher.name}
            </h2>
          </div>

          {/* Details Section */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <FaUser className="text-indigo-500 mr-2 md:mr-3" />
              <span className="font-semibold text-sm md:text-base">
                Username:
              </span>
              <span className="ml-2 text-sm md:text-base">
                {teacher.username}
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaLock className="text-indigo-500 mr-2 md:mr-3" />
              <span className="font-semibold text-sm md:text-base">
                Password:
              </span>
              <span className="ml-2 text-sm md:text-base">
                {teacher.password}
              </span>
            </div>
            <hr className="my-4" />
            <div className="flex items-center text-gray-700">
              <FaEnvelope className="text-indigo-500 mr-2 md:mr-3" />
              <span className="font-semibold text-sm md:text-base">Email:</span>
              <span className="ml-2 text-sm md:text-base">{teacher.email}</span>
            </div>

            <div className="flex items-center text-gray-700">
              <FaPhone className="text-indigo-500 mr-2 md:mr-3" />
              <span className="font-semibold text-sm md:text-base">
                Phone Number:
              </span>
              <span className="ml-2 text-sm md:text-base">
                {teacher.phoneNumber}
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaChalkboardTeacher className="text-indigo-500 mr-2 md:mr-3" />
              <span className="font-semibold text-sm md:text-base">
                Classes:
              </span>
              <div className="ml-2 flex flex-wrap">
                {teacher.classes.map((className, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-1 mb-1 md:mr-2 md:mb-2"
                  >
                    {className}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <FaChalkboardTeacher className="text-indigo-500 mr-2 md:mr-3" />
              <span className="font-semibold text-sm md:text-base">
                Sections:
              </span>
              <div className="ml-2 flex flex-wrap">
                {teacher.section.map((section, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-1 mb-1 md:mr-2 md:mb-2"
                  >
                    {section}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <FaBook className="text-indigo-500 mr-2 md:mr-3" />
              <span className="font-semibold text-sm md:text-base">
                Subjects:
              </span>
              <div className="ml-2 flex flex-wrap">
                {teacher.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-1 mb-1 md:mr-2 md:mb-2"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherPreviewPage;
