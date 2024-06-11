"use client";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const AddStudentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const response = await axios.post("/api/admin/add-student", data);
    console.log(data);
    if (response.data.success) {
      alert("student added successfully");
      reset();
    } else {
      alert("username is taken");
    }
  };

  return (
<<<<<<< HEAD

    <div className=" p-11 mt-20 bg-white  ">
             <h1 className="text-sm flex justify-start items-start text-red-500 mb-10 ml-3 text-center">'Add Student'</h1>

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4 p-4  max-w-4xl mx-auto sm:grid-cols-5"
    >
      {/* SID */}
      <div>
        <label
          htmlFor="SID"
          className="block text-xs font-medium text-gray-700"
        >
          SID
        </label>
        <input
          type="text"
          id="SID"
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          {...register("SID", { required: true })} // Add this line
        />
        {errors.SID && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="Name"
          className="block text-xs font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="Name"
          {...register("Name", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.Name && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* FatherName */}
      <div>
        <label
          htmlFor="FatherName"
          className="block text-xs font-medium text-gray-700"
        >
          Father's Name
        </label>
        <input
          type="text"
          id="FatherName"
          {...register("FatherName", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.FatherName && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* Gender */}
      <div>
        <label
          htmlFor="Gender"
          className="block text-xs font-medium text-gray-700"
        >
          Gender
        </label>
        <select
          id="Gender"
          {...register("Gender", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        >
          <option value="">Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.Gender && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* AdmissionDate */}
      <div>
        <label
          htmlFor="AdmissionDate"
          className="block text-xs font-medium text-gray-700"
        >
          Admission Date
        </label>
        <input
          type="date"
          id="AdmissionDate"
          {...register("AdmissionDate", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.AdmissionDate && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* SeatNumber */}
      <div>
        <label
          htmlFor="SeatNumber"
          className="block text-xs font-medium text-gray-700"
        >
          Seat Number
        </label>
        <input
          type="text"
          id="SeatNumber"
          {...register("SeatNumber", { required: false })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
      </div>

      {/* AdmissionClass */}
      <div>
        <label
          htmlFor="AdmissionClass"
          className="block text-xs font-medium text-gray-700"
        >
          Admission Class
        </label>
        <input
          type="text"
          id="AdmissionClass"
          {...register("AdmissionClass", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.AdmissionClass && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* Address */}
      <div>
        <label
          htmlFor="Address"
          className="block text-xs font-medium text-gray-700"
        >
          Address
        </label>
        <input
          type="text"
          id="Address"
          {...register("Address", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.Address && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* GRNo */}
      <div>
        <label
          htmlFor="GRNo"
          className="block text-xs font-medium text-gray-700"
        >
          GR No.
        </label>
        <input
          type="text"
          id="GRNo"
          {...register("GRNo", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.GRNo && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* Section */}
      <div>
        <label
          htmlFor="Section"
          className="block text-xs font-medium text-gray-700"
        >
          Section
        </label>
        <input
          type="text"
          id="Section"
          {...register("Section", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.Section && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* CNICNumber */}
      <div>
        <label
          htmlFor="CNICNumber"
          className="block text-xs font-medium text-gray-700"
        >
          CNIC Number
        </label>
        <input
          type="text"
          id="CNICNumber"
          {...register("CNICNumber", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.CNICNumber && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* Caste */}
      <div>
        <label
          htmlFor="Caste"
          className="block text-xs font-medium text-gray-700"
        >
          Caste
        </label>
        <input
          type="text"
          id="Caste"
          {...register("Caste", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.Caste && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* DateOfBirth */}
      <div>
        <label
          htmlFor="DateOfBirth"
          className="block text-xs font-medium text-gray-700"
        >
          Date of Birth
        </label>
        <input
          type="date"
          id="DateOfBirth"
          {...register("DateOfBirth", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.DateOfBirth && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* FamilyNumber */}
      <div>
        <label
          htmlFor="FamilyNumber"
          className="block text-xs font-medium text-gray-700"
        >
          Family Number
        </label>
        <input
          type="text"
          id="FamilyNumber"
          {...register("FamilyNumber", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.FamilyNumber && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* CurrentClass */}
      <div>
        <label
          htmlFor="CurrentClass"
          className="block text-xs font-medium text-gray-700"
        >
          Current Class
        </label>
        <input
          type="text"
          id="CurrentClass"
          {...register("CurrentClass", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.CurrentClass && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* MobileNumber */}
      <div>
        <label
          htmlFor="MobileNumber"
          className="block text-xs font-medium text-gray-700"
        >
          Mobile Number
        </label>
        <input
          type="text"
          id="MobileNumber"
          {...register("MobileNumber", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.MobileNumber && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* PlaceOfBirth */}
      <div>
        <label
          htmlFor="PlaceOfBirth"
          className="block text-xs font-medium text-gray-700"
        >
          Place of Birth
        </label>
        <input
          type="text"
          id="PlaceOfBirth"
          {...register("PlaceOfBirth", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.PlaceOfBirth && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* Religion */}
      <div>
        <label
          htmlFor="Religion"
          className="block text-xs font-medium text-gray-700"
        >
          Religion
        </label>
        <input
          type="text"
          id="Religion"
          {...register("Religion", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.Religion && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* ReligionStatus */}
      <div>
        <label
          htmlFor="ReligionStatus"
          className="block text-xs font-medium text-gray-700"
        >
          Religion Status
        </label>
        <input
          type="text"
          id="ReligionStatus"
          {...register("ReligionStatus", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.ReligionStatus && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* Reason */}
      <div>
        <label
          htmlFor="Reason"
          className="block text-xs font-medium text-gray-700"
        >
          Reason
        </label>
        <input
          type="text"
          id="Reason"
          {...register("Reason", { required: false })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
      </div>

      {/* Remarks */}
      <div>
        <label
          htmlFor="Remarks"
          className="block text-xs font-medium text-gray-700"
        >
          Remarks
        </label>
        <input
          type="text"
          id="Remarks"
          {...register("Remarks", { required: false })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
      </div>

      {/* AdmissionNote */}
      <div>
        <label
          htmlFor="AdmissionNote"
          className="block text-xs font-medium text-gray-700"
        >
          Admission Note
        </label>
        <input
          type="text"
          id="AdmissionNote"
          {...register("AdmissionNote", { required: false })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
      </div>

      {/* Nationality */}
      <div>
        <label
          htmlFor="Nationality"
          className="block text-xs font-medium text-gray-700"
        >
          Nationality
        </label>
        <input
          type="text"
          id="Nationality"
          {...register("Nationality", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.Nationality && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* LeaveDate */}
      <div>
        <label
          htmlFor="LeaveDate"
          className="block text-xs font-medium text-gray-700"
        >
          Leave Date
        </label>
        <input
          type="date"
          id="LeaveDate"
          {...register("LeaveDate", { required: false })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
      </div>

      {/* LastSchool */}
      <div>
        <label
          htmlFor="LastSchool"
          className="block text-xs font-medium text-gray-700"
        >
          Last School
        </label>
        <input
          type="text"
          id="LastSchool"
          {...register("LastSchool", { required: false })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
      </div>

      {/* LastSchoolGroup */}
      <div>
        <label
          htmlFor="LastSchoolGroup"
          className="block text-xs font-medium text-gray-700"
        >
          Last School Group
        </label>
        <input
          type="text"
          id="LastSchoolGroup"
          {...register("LastSchoolGroup", { required: false })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
      </div>

      {/* AdmissionFee */}
      <div>
        <label
          htmlFor="AdmissionFee"
          className="block text-xs font-medium text-gray-700"
        >
          Admission Fee
        </label>
        <input
          type="text"
          id="AdmissionFee"
          step="any"
          {...register("AdmissionFee", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.AdmissionFee && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* AdmissionFeeDiscount */}
      <div>
        <label
          htmlFor="AdmissionFeeDiscount"
          className="block text-xs font-medium text-gray-700"
        >
          Admission Fee Discount
        </label>
        <input
          type="text"
          id="AdmissionFeeDiscount"
          step="any"
          {...register("AdmissionFeeDiscount", { required: false })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
      </div>

      {/* ApprovedAdmissionFee */}
      <div>
        <label
          htmlFor="ApprovedAdmissionFee"
          className="block text-xs font-medium text-gray-700"
        >
          Approved Admission Fee
        </label>
        <input
          type="text"
          id="ApprovedAdmissionFee"
          step="any"
          {...register("ApprovedAdmissionFee", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.ApprovedAdmissionFee && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* LabCharges */}
      <div>
        <label
          htmlFor="LabCharges"
          className="block text-xs font-medium text-gray-700"
        >
          Lab Charges
        </label>
        <input
          type="text"
          id="LabCharges"
          step="any"
          {...register("LabCharges", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.LabCharges && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* LabChargesDiscount */}
      <div>
        <label
          htmlFor="LabChargesDiscount"
          className="block text-xs font-medium text-gray-700"
        >
          Lab Charges Discount
        </label>
        <input
          type="text"
          id="LabChargesDiscount"
          step="any"
          {...register("LabChargesDiscount", { required: false })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
      </div>

      {/* ApprovedLabChargesFee */}
      <div>
        <label
          htmlFor="ApprovedLabChargesFee"
          className="block text-xs font-medium text-gray-700"
        >
          Approved Lab Charges Fee
        </label>
        <input
          type="text"
          id="ApprovedLabChargesFee"
          step="any"
          {...register("ApprovedLabChargesFee", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.ApprovedLabChargesFee && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* TuitionFee */}
      <div>
        <label
          htmlFor="TuitionFee"
          className="block text-xs font-medium text-gray-700"
        >
          Tuition Fee
        </label>
        <input
          type="text"
          id="TuitionFee"
          step="any"
          {...register("TuitionFee", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.TuitionFee && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* TuitionFeeDiscount */}
      <div>
        <label
          htmlFor="TuitionFeeDiscount"
          className="block text-xs font-medium text-gray-700"
        >
          Tuition Fee Discount
        </label>
        <input
          type="text"
          id="TuitionFeeDiscount"
          step="any"
          {...register("TuitionFeeDiscount", { required: false })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
      </div>

      {/* ApprovedTuitionFee */}
      <div>
        <label
          htmlFor="ApprovedTuitionFee"
          className="block text-xs font-medium text-gray-700"
        >
          Approved Tuition Fee
        </label>
        <input
          type="text"
          id="ApprovedTuitionFee"
          step="any"
          {...register("ApprovedTuitionFee", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.ApprovedTuitionFee && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* CoursePayment */}
      <div>
        <label
          htmlFor="CoursePayment"
          className="block text-xs font-medium text-gray-700"
        >
          Course Payment
        </label>
        <input
          type="text"
          id="CoursePayment"
          step="any"
          {...register("CoursePayment", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.CoursePayment && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* CoursePaymentDiscount */}
      <div>
        <label
          htmlFor="CoursePaymentDiscount"
          className="block text-xs font-medium text-gray-700"
        >
          Course Payment Discount
        </label>
        <input
          type="text"
          id="CoursePaymentDiscount"
          step="any"
          {...register("CoursePaymentDiscount", { required: false })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
      </div>

      {/* ApprovedCoursePayment */}
      <div>
        <label
          htmlFor="ApprovedCoursePayment"
          className="block text-xs font-medium text-gray-700"
        >
          Approved Course Payment
        </label>
        <input
          type="text"
          id="ApprovedCoursePayment"
          step="any"
          {...register("ApprovedCoursePayment", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.ApprovedCoursePayment && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* StationaryCharges */}
      <div>
        <label
          htmlFor="StationaryCharges"
          className="block text-xs font-medium text-gray-700"
        >
          Stationary Charges
        </label>
        <input
          type="text"
          id="StationaryCharges"
          step="any"
          {...register("StationaryCharges", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.StationaryCharges && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* AnnualCharges */}
      <div>
        <label
          htmlFor="AnnualCharges"
          className="block text-xs font-medium text-gray-700"
        >
          Annual Charges
        </label>
        <input
          type="text"
          id="AnnualCharges"
          step="any"
          {...register("AnnualCharges", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.AnnualCharges && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* SchoolFee */}
      <div>
        <label
          htmlFor="SchoolFee"
          className="block text-xs font-medium text-gray-700"
        >
          School Fee
        </label>
        <input
          type="text"
          id="SchoolFee"
          step="any"
          {...register("SchoolFee", { required: true })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
        {errors.SchoolFee && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* Arrears */}
      <div>
        <label
          htmlFor="Arrears"
          className="block text-xs font-medium text-gray-700"
        >
          Arrears
        </label>
        <input
          type="text"
          id="Arrears"
          step="any"
          {...register("Arrears", { required: false })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
      </div>

      {/* StudentImage */}
      <div>
        <label
          htmlFor="StudentImage"
          className="block text-xs font-medium text-gray-700"
        >
          Student Image
        </label>
        <input
          type="text"
          id="StudentImage"
          {...register("StudentImage", { required: false })}
          className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
        />
      </div>

      <div className="col-span-1 md:col-span-5 flex items-end justify-end">
        <button
          type="submit"
          className="border bg-black text-white p-3 rounded-md hover:bg-blue-500 hover:text-white transition duration-300"
        >
          Submit
        </button>
      </div>
    </form>
=======
    <div className="max-w-4xl mx-auto mt-20 p-2">
      <h1 className="text-sm flex justify-start items-start text-red-500 mb-10 text-center ml-3">
        &rsquo;Add Student&rsquo;
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 p-4 max-w-4xl mx-auto sm:grid-cols-5"
      >
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Student Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.username && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Student Password
          </label>
          <input
            type="text"
            id="password"
            {...register("password", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* SID */}
        <div>
          <label
            htmlFor="SID"
            className="block text-xs font-medium text-gray-700"
          >
            SID
          </label>
          <input
            type="text"
            id="SID"
            {...register("SID", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="Name"
            className="block text-xs font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="Name"
            {...register("Name", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.Name && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* FatherName */}
        <div>
          <label
            htmlFor="FatherName"
            className="block text-xs font-medium text-gray-700"
          >
            Father&rsquo;s Name
          </label>
          <input
            type="text"
            id="FatherName"
            {...register("FatherName", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.FatherName && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* Gender */}
        <div>
          <label
            htmlFor="Gender"
            className="block text-xs font-medium text-gray-700"
          >
            Gender
          </label>
          <select
            id="Gender"
            {...register("Gender", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.Gender && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* AdmissionDate */}
        <div>
          <label
            htmlFor="AdmissionDate"
            className="block text-xs font-medium text-gray-700"
          >
            Admission Date
          </label>
          <input
            type="date"
            id="AdmissionDate"
            {...register("AdmissionDate", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.AdmissionDate && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* SeatNumber */}
        <div>
          <label
            htmlFor="SeatNumber"
            className="block text-xs font-medium text-gray-700"
          >
            Seat Number
          </label>
          <input
            type="text"
            id="SeatNumber"
            {...register("SeatNumber", { required: false })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
        </div>

        {/* AdmissionClass */}
        <div>
          <label
            htmlFor="AdmissionClass"
            className="block text-xs font-medium text-gray-700"
          >
            Admission Class
          </label>
          <input
            type="text"
            id="AdmissionClass"
            {...register("AdmissionClass", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.AdmissionClass && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="Address"
            className="block text-xs font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="Address"
            {...register("Address", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.Address && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* GRNo */}
        <div>
          <label
            htmlFor="GRNo"
            className="block text-xs font-medium text-gray-700"
          >
            GR No.
          </label>
          <input
            type="text"
            id="GRNo"
            {...register("GRNo", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.GRNo && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* Section */}
        <div>
          <label
            htmlFor="Section"
            className="block text-xs font-medium text-gray-700"
          >
            Section
          </label>
          <input
            type="text"
            id="Section"
            {...register("Section", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.Section && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* CNICNumber */}
        <div>
          <label
            htmlFor="CNICNumber"
            className="block text-xs font-medium text-gray-700"
          >
            CNIC Number
          </label>
          <input
            type="text"
            id="CNICNumber"
            {...register("CNICNumber", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.CNICNumber && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* Caste */}
        <div>
          <label
            htmlFor="Caste"
            className="block text-xs font-medium text-gray-700"
          >
            Caste
          </label>
          <input
            type="text"
            id="Caste"
            {...register("Caste", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.Caste && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* DateOfBirth */}
        <div>
          <label
            htmlFor="DateOfBirth"
            className="block text-xs font-medium text-gray-700"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="DateOfBirth"
            {...register("DateOfBirth", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.DateOfBirth && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* FamilyNumber */}
        <div>
          <label
            htmlFor="FamilyNumber"
            className="block text-xs font-medium text-gray-700"
          >
            Family Number
          </label>
          <input
            type="text"
            id="FamilyNumber"
            {...register("FamilyNumber", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.FamilyNumber && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* CurrentClass */}
        <div>
          <label
            htmlFor="CurrentClass"
            className="block text-xs font-medium text-gray-700"
          >
            Current Class
          </label>
          <input
            type="text"
            id="CurrentClass"
            {...register("CurrentClass", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.CurrentClass && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* MobileNumber */}
        <div>
          <label
            htmlFor="MobileNumber"
            className="block text-xs font-medium text-gray-700"
          >
            Mobile Number
          </label>
          <input
            type="text"
            id="MobileNumber"
            {...register("MobileNumber", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.MobileNumber && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* PlaceOfBirth */}
        <div>
          <label
            htmlFor="PlaceOfBirth"
            className="block text-xs font-medium text-gray-700"
          >
            Place of Birth
          </label>
          <input
            type="text"
            id="PlaceOfBirth"
            {...register("PlaceOfBirth", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.PlaceOfBirth && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* Religion */}
        <div>
          <label
            htmlFor="Religion"
            className="block text-xs font-medium text-gray-700"
          >
            Religion
          </label>
          <input
            type="text"
            id="Religion"
            {...register("Religion", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.Religion && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* ReligionStatus */}
        <div>
          <label
            htmlFor="ReligionStatus"
            className="block text-xs font-medium text-gray-700"
          >
            Religion Status
          </label>
          <input
            type="text"
            id="ReligionStatus"
            {...register("ReligionStatus", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.ReligionStatus && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* Reason */}
        <div>
          <label
            htmlFor="Reason"
            className="block text-xs font-medium text-gray-700"
          >
            Reason
          </label>
          <input
            type="text"
            id="Reason"
            {...register("Reason", { required: false })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
        </div>

        {/* Remarks */}
        <div>
          <label
            htmlFor="Remarks"
            className="block text-xs font-medium text-gray-700"
          >
            Remarks
          </label>
          <input
            type="text"
            id="Remarks"
            {...register("Remarks", { required: false })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
        </div>

        {/* AdmissionNote */}
        <div>
          <label
            htmlFor="AdmissionNote"
            className="block text-xs font-medium text-gray-700"
          >
            Admission Note
          </label>
          <input
            type="text"
            id="AdmissionNote"
            {...register("AdmissionNote", { required: false })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
        </div>

        {/* Nationality */}
        <div>
          <label
            htmlFor="Nationality"
            className="block text-xs font-medium text-gray-700"
          >
            Nationality
          </label>
          <input
            type="text"
            id="Nationality"
            {...register("Nationality", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.Nationality && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* LeaveDate */}
        <div>
          <label
            htmlFor="LeaveDate"
            className="block text-xs font-medium text-gray-700"
          >
            Leave Date
          </label>
          <input
            type="date"
            id="LeaveDate"
            {...register("LeaveDate", { required: false })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
        </div>

        {/* LastSchool */}
        <div>
          <label
            htmlFor="LastSchool"
            className="block text-xs font-medium text-gray-700"
          >
            Last School
          </label>
          <input
            type="text"
            id="LastSchool"
            {...register("LastSchool", { required: false })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
        </div>

        {/* LastSchoolGroup */}
        <div>
          <label
            htmlFor="LastSchoolGroup"
            className="block text-xs font-medium text-gray-700"
          >
            Last School Group
          </label>
          <input
            type="text"
            id="LastSchoolGroup"
            {...register("LastSchoolGroup", { required: false })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
        </div>

        {/* AdmissionFee */}
        <div>
          <label
            htmlFor="AdmissionFee"
            className="block text-xs font-medium text-gray-700"
          >
            Admission Fee
          </label>
          <input
            type="text"
            id="AdmissionFee"
            step="any"
            {...register("AdmissionFee", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.AdmissionFee && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* AdmissionFeeDiscount */}
        <div>
          <label
            htmlFor="AdmissionFeeDiscount"
            className="block text-xs font-medium text-gray-700"
          >
            Admission Fee Discount
          </label>
          <input
            type="text"
            id="AdmissionFeeDiscount"
            step="any"
            {...register("AdmissionFeeDiscount", { required: false })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
        </div>

        {/* ApprovedAdmissionFee */}
        <div>
          <label
            htmlFor="ApprovedAdmissionFee"
            className="block text-xs font-medium text-gray-700"
          >
            Approved Admission Fee
          </label>
          <input
            type="text"
            id="ApprovedAdmissionFee"
            step="any"
            {...register("ApprovedAdmissionFee", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.ApprovedAdmissionFee && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* LabCharges */}
        <div>
          <label
            htmlFor="LabCharges"
            className="block text-xs font-medium text-gray-700"
          >
            Lab Charges
          </label>
          <input
            type="text"
            id="LabCharges"
            step="any"
            {...register("LabCharges", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.LabCharges && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* LabChargesDiscount */}
        <div>
          <label
            htmlFor="LabChargesDiscount"
            className="block text-xs font-medium text-gray-700"
          >
            Lab Charges Discount
          </label>
          <input
            type="text"
            id="LabChargesDiscount"
            step="any"
            {...register("LabChargesDiscount", { required: false })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
        </div>

        {/* ApprovedLabChargesFee */}
        <div>
          <label
            htmlFor="ApprovedLabChargesFee"
            className="block text-xs font-medium text-gray-700"
          >
            Approved Lab Charges Fee
          </label>
          <input
            type="text"
            id="ApprovedLabChargesFee"
            step="any"
            {...register("ApprovedLabChargesFee", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.ApprovedLabChargesFee && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* TuitionFee */}
        <div>
          <label
            htmlFor="TuitionFee"
            className="block text-xs font-medium text-gray-700"
          >
            Tuition Fee
          </label>
          <input
            type="text"
            id="TuitionFee"
            step="any"
            {...register("TuitionFee", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.TuitionFee && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* TuitionFeeDiscount */}
        <div>
          <label
            htmlFor="TuitionFeeDiscount"
            className="block text-xs font-medium text-gray-700"
          >
            Tuition Fee Discount
          </label>
          <input
            type="text"
            id="TuitionFeeDiscount"
            step="any"
            {...register("TuitionFeeDiscount", { required: false })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
        </div>

        {/* ApprovedTuitionFee */}
        <div>
          <label
            htmlFor="ApprovedTuitionFee"
            className="block text-xs font-medium text-gray-700"
          >
            Approved Tuition Fee
          </label>
          <input
            type="text"
            id="ApprovedTuitionFee"
            step="any"
            {...register("ApprovedTuitionFee", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.ApprovedTuitionFee && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* CoursePayment */}
        <div>
          <label
            htmlFor="CoursePayment"
            className="block text-xs font-medium text-gray-700"
          >
            Course Payment
          </label>
          <input
            type="text"
            id="CoursePayment"
            step="any"
            {...register("CoursePayment", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.CoursePayment && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* CoursePaymentDiscount */}
        <div>
          <label
            htmlFor="CoursePaymentDiscount"
            className="block text-xs font-medium text-gray-700"
          >
            Course Payment Discount
          </label>
          <input
            type="text"
            id="CoursePaymentDiscount"
            step="any"
            {...register("CoursePaymentDiscount", { required: false })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
        </div>

        {/* ApprovedCoursePayment */}
        <div>
          <label
            htmlFor="ApprovedCoursePayment"
            className="block text-xs font-medium text-gray-700"
          >
            Approved Course Payment
          </label>
          <input
            type="text"
            id="ApprovedCoursePayment"
            step="any"
            {...register("ApprovedCoursePayment", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.ApprovedCoursePayment && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* StationaryCharges */}
        <div>
          <label
            htmlFor="StationaryCharges"
            className="block text-xs font-medium text-gray-700"
          >
            Stationary Charges
          </label>
          <input
            type="text"
            id="StationaryCharges"
            step="any"
            {...register("StationaryCharges", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.StationaryCharges && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* AnnualCharges */}
        <div>
          <label
            htmlFor="AnnualCharges"
            className="block text-xs font-medium text-gray-700"
          >
            Annual Charges
          </label>
          <input
            type="text"
            id="AnnualCharges"
            step="any"
            {...register("AnnualCharges", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.AnnualCharges && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* SchoolFee */}
        <div>
          <label
            htmlFor="SchoolFee"
            className="block text-xs font-medium text-gray-700"
          >
            School Fee
          </label>
          <input
            type="text"
            id="SchoolFee"
            step="any"
            {...register("SchoolFee", { required: true })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
          {errors.SchoolFee && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        {/* Arrears */}
        <div>
          <label
            htmlFor="Arrears"
            className="block text-xs font-medium text-gray-700"
          >
            Arrears
          </label>
          <input
            type="text"
            id="Arrears"
            step="any"
            {...register("Arrears", { required: false })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
        </div>

        {/* StudentImage */}
        <div>
          <label
            htmlFor="image"
            className="block text-xs font-medium text-gray-700"
          >
            Student Image
          </label>
          <input
            type="text"
            id="image"
            {...register("image", { required: false })}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-xs"
          />
        </div>

        <div className="col-span-1 md:col-span-5 flex items-end justify-end">
          <button
            type="submit"
            className="border bg-black text-white p-3 rounded-md hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
>>>>>>> bf6fd20720fa3e216d87e1ca60b1f73848002da3
    </div>
  );
};

export default AddStudentForm;
