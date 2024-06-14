"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const StudentPreviewPage = ({ params }) => {
  const [student, setStudentDetails] = useState({});
  const id = params.id;
  const [loading, setIsLoading] = useState(true);

  const getStudentDetails = async (id) => {
    try {
      const response = await axios.get(
        `/api/admin/delete-edit-get-student/${id}`
      );
      setStudentDetails(response.data.student);
    } catch (error) {
      console.error("Error fetching student details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStudentDetails(id);
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      {loading ? (
        "Loading..."
      ) : (
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Student Information
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Profile Picture */}
            <div className="md:col-span-1 flex justify-center md:justify-end items-start md:order-2 order-1 mt-6">
              <div className="text-center md:text-center">
                <Image
                  src={student.StudentImage || "/images/profile/moon.jpg"}
                  width={128}
                  height={128}
                  alt="Student"
                  className="w-32 h-32 md:w-48 md:h-48 object-cover border-4 border-gray-200"
                />
                <p className="text-xl font-semibold text-gray-700 mt-2">
                  <span className="text-blue-500">{student.Name}</span>
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  <span className="font-bold">Username:</span>{" "}
                  {student.username}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold">Password:</span>{" "}
                  {student.password}
                </p>
              </div>
            </div>

            {/* Personal Details */}
            <div className="md:col-span-2 md:order-1 order-2">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                  Personal Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <p className="text-gray-700">
                    <span className="font-bold">Name:</span> {student.Name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Father Name:</span>{" "}
                    {student.FatherName}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Seat No:</span>{" "}
                    {student.SeatNumber}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Admission Class:</span>{" "}
                    {student.AdmissionClass}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Current Class:</span>{" "}
                    {student.CurrentClass}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Section:</span>{" "}
                    {student.Section}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Caste:</span> {student.Caste}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Date of Birth:</span>{" "}
                    {new Date(student.DateOfBirth).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Religion:</span>{" "}
                    {student.Religion}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Gender:</span> {student.Gender}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Phone Number:</span>{" "}
                    {student.MobileNumber}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Address:</span>{" "}
                    {student.Address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Other Details and Fees Section */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Other Details */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold   text-gray-900 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Other Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <DetailItem label="CNIC" value={student.CNICNumber} />
                <DetailItem
                  label="Family Number"
                  value={student.FamilyNumber}
                />
                <DetailItem
                  label="Place of Birth"
                  value={student.PlaceOfBirth}
                />
                {student.Reason && (
                  <DetailItem label="Reason" value={student.Reason} />
                )}
                {student.Remarks && (
                  <DetailItem label="Remarks" value={student.Remarks} />
                )}
                {student.AdmissionNote && (
                  <DetailItem
                    label="Admission Note"
                    value={student.AdmissionNote}
                  />
                )}
                <DetailItem label="Nationality" value={student.Nationality} />
                {student.LeaveDate && (
                  <DetailItem
                    label="Leave Date"
                    value={new Date(student.LeaveDate).toLocaleDateString()}
                  />
                )}
                {student.LastSchool && (
                  <DetailItem label="Last School" value={student.LastSchool} />
                )}
                {student.LastSchoolGroup && (
                  <DetailItem
                    label="Last School Group"
                    value={student.LastSchoolGroup}
                  />
                )}
              </div>
            </div>

            {/* Fees */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold  text-gray-900 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Fees
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
                <DetailItem
                  label="Admission Fee"
                  value={student.AdmissionFee}
                />
                <DetailItem
                  label="Admission Fee Discount"
                  value={student.AdmissionFeeDiscount}
                />
                <DetailItem
                  label="Approved Admission Fee"
                  value={student.ApprovedAdmissionFee}
                />
                <DetailItem label="Lab Charges" value={student.LabCharges} />

                <DetailItem
                  label="Lab Charges Discount"
                  value={student.LabChargesDiscount}
                />
                <DetailItem
                  label="Approved Lab Charges"
                  value={student.ApprovedLabChargesFee}
                />
                <DetailItem label="Tuition Fee" value={student.TuitionFee} />
                <DetailItem
                  label="Tuition Fee Discount"
                  value={student.TuitionFeeDiscount}
                />
                <DetailItem
                  label="Approved Tuition Fee"
                  value={student.ApprovedTuitionFee}
                />
                <DetailItem
                  label="Course Payment"
                  value={student.CoursePayment}
                />
                <DetailItem
                  label="Course Payment Discount"
                  value={student.CoursePaymentDiscount}
                />
                <DetailItem
                  label="Approved Course Payment"
                  value={student.ApprovedCoursePayment}
                />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold  text-gray-900 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Extra Carges
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <DetailItem
                  label="Stationary Charges"
                  value={student.StationaryCharges}
                />
                <DetailItem
                  label="Annual Charges"
                  value={student.AnnualCharges}
                />
                <DetailItem label="School Fee" value={student.SchoolFee} />
                {student.Arrears && (
                  <DetailItem label="Arrears" value={student.Arrears} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// DetailItem component to display label and value pair
const DetailItem = ({ label, value }) => (
  <div className="col-span-1 md:col-span-1">
    <p className="text-gray-700">
      <span className="font-bold">{label}:</span> {value}
    </p>
  </div>
);

export default StudentPreviewPage;
