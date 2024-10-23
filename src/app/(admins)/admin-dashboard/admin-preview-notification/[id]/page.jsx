"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";

const AdminPreviewNotification = ({ params }) => {
  const [notification, setNotification] = useState(null);
  const componentRef = useRef();
  const { id } = params;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
            @page {
                size: A4;
                margin: 20mm 10mm;
            }
            @media print {
                body {
                    -webkit-print-color-adjust: exact !important;
                }
            }
            .print-container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
            }
            .print-content {
                width: 100%;
                max-width: 800px;
                margin: 0 auto;
            }
        `,
  });

  useEffect(() => {
    const getNotification = async () => {
      try {
        const response = await axios.get(
          `/api/admin/delete-edit-get-notification/${id}`
        );
        setNotification(response.data.notification);
      } catch (error) {
        console.error("Error fetching the notification:", error);
      }
    };
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
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-end items-end print:bg-white print:p-4 print:shadow-none print:my-0 mt-20 print-container">
      <button
        onClick={handlePrint}
        className="text-xs mb-4 px-4 py-2 bg-black text-white font-semibold rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:rotate-2 hover:shadow-2xl flex items-center space-x-2 print:hidden"
      >
        <FaDownload className="text-white" />
        <span>Download PDF</span>
      </button>
      <div
        className="w-full h-auto bg-white shadow-lg rounded-lg overflow-hidden print:w-auto print:h-auto print:max-w-none print:rounded-none print:shadow-none print-content "
        ref={componentRef}
      >
        {/* Header with School Logo and Name */}
        <div className="overflow-x-auto print:overflow-visible bg-gradient-to-r from-gray-700 to-cyan-700 text-white p-4 flex justify-between items-center print:bg-black print:text-white print:rounded-t-lg">
          <div className="flex items-center">
            <div>
              <h2 className="text-4xl font-bold mt-10">
                The Zai&rsquo;s School
              </h2>
              <p className="text-lg mt-4">
                123 Main Street, Jamshoro, Pakistan
              </p>
            </div>
          </div>
          <div className="h-40 w-40 p-4 flex items-center justify-center print:h-32 print:w-32">
            <img
              src="/logo.png"
              alt="logo"
              className="object-cover w-full h-full border border-black rounded-md"
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-700 to-cyan-700 text-white p-4 flex justify-center items-center rounded-xl mt-2">
          <h2 className="text-lg ">
            Notification For Class {notification.class} , Section{" "}
            {notification.section}{" "}
          </h2>
        </div>

        <div className="p-6 rounded-lg shadow-md mt-4">
          <h3 className="text-lg font-semibold mb-2 text-cyan-700">
            Title: {notification.title}
          </h3>
          <p className="text-gray-700 whitespace-pre-line mb-4 mt-4 ">
            {notification.content}
          </p>

          {/* Full Width and Height Image */}
          {notification?.image && (
            <div className="relative h-80 md:h-96 lg:h-96 mt-8">
              <img
                src={notification.image}
                alt="Background"
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            <div></div>
            <div className="p-2 py-2 gap-2">
              <p className="text-sm text-cyan-700 ">
                Teacher: {notification.teacherName}
              </p>
              <p className="text-sm text-cyan-700">
                Date: {notification.createdDate}
              </p>
              <p className="text-sm text-cyan-700">
                Day: {notification.createdDay}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPreviewNotification;
