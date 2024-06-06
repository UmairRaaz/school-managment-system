'use client'
import React from 'react';
import { useForm } from 'react-hook-form';

const AddStudentForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-2xl mx-auto">
      {/* SID */}
      <div>
        <label htmlFor="SID" className="block text-sm font-medium text-gray-700">SID</label>
        <input
          type="number"
          id="SID"
          {...register('SID', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.SID && <span className="text-red-500">This field is required</span>}
      </div>
      
      {/* Name */}
      <div>
        <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="Name"
          {...register('Name', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.Name && <span className="text-red-500">This field is required</span>}
      </div>

      {/* FatherName */}
      <div>
        <label htmlFor="FatherName" className="block text-sm font-medium text-gray-700">Father's Name</label>
        <input
          type="text"
          id="FatherName"
          {...register('FatherName', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.FatherName && <span className="text-red-500">This field is required</span>}
      </div>

      {/* Gender */}
      <div>
        <label htmlFor="Gender" className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          id="Gender"
          {...register('Gender', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.Gender && <span className="text-red-500">This field is required</span>}
      </div>

      {/* AdmissionDate */}
      <div>
        <label htmlFor="AdmissionDate" className="block text-sm font-medium text-gray-700">Admission Date</label>
        <input
          type="date"
          id="AdmissionDate"
          {...register('AdmissionDate', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.AdmissionDate && <span className="text-red-500">This field is required</span>}
      </div>

      {/* SeatNumber */}
      <div>
        <label htmlFor="SeatNumber" className="block text-sm font-medium text-gray-700">Seat Number</label>
        <input
          type="number"
          id="SeatNumber"
          {...register('SeatNumber', { required: false })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* AdmissionClass */}
      <div>
        <label htmlFor="AdmissionClass" className="block text-sm font-medium text-gray-700">Admission Class</label>
        <input
          type="text"
          id="AdmissionClass"
          {...register('AdmissionClass', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.AdmissionClass && <span className="text-red-500">This field is required</span>}
      </div>

      {/* Address */}
      <div>
        <label htmlFor="Address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          id="Address"
          {...register('Address', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.Address && <span className="text-red-500">This field is required</span>}
      </div>

      {/* GRNo */}
      <div>
        <label htmlFor="GRNo" className="block text-sm font-medium text-gray-700">GR No.</label>
        <input
          type="text"
          id="GRNo"
          {...register('GRNo', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.GRNo && <span className="text-red-500">This field is required</span>}
      </div>

      {/* Section */}
      <div>
        <label htmlFor="Section" className="block text-sm font-medium text-gray-700">Section</label>
        <input
          type="text"
          id="Section"
          {...register('Section', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.Section && <span className="text-red-500">This field is required</span>}
      </div>

      {/* CNICNumber */}
      <div>
        <label htmlFor="CNICNumber" className="block text-sm font-medium text-gray-700">CNIC Number</label>
        <input
          type="text"
          id="CNICNumber"
          {...register('CNICNumber', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.CNICNumber && <span className="text-red-500">This field is required</span>}
      </div>

      {/* Caste */}
      <div>
        <label htmlFor="Caste" className="block text-sm font-medium text-gray-700">Caste</label>
        <input
          type="text"
          id="Caste"
          {...register('Caste', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.Caste && <span className="text-red-500">This field is required</span>}
      </div>

      {/* DateOfBirth */}
      <div>
        <label htmlFor="DateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          type="date"
          id="DateOfBirth"
          {...register('DateOfBirth', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.DateOfBirth && <span className="text-red-500">This field is required</span>}
      </div>

      {/* FamilyNumber */}
      <div>
        <label htmlFor="FamilyNumber" className="block text-sm font-medium text-gray-700">Family Number</label>
        <input
          type="text"
          id="FamilyNumber"
          {...register('FamilyNumber', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.FamilyNumber && <span className="text-red-500">This field is required</span>}
      </div>

      {/* CurrentClass */}
      <div>
        <label htmlFor="CurrentClass" className="block text-sm font-medium text-gray-700">Current Class</label>
        <input
          type="text"
          id="CurrentClass"
          {...register('CurrentClass', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.CurrentClass && <span className="text-red-500">This field is required</span>}
      </div>

      {/* MobileNumber */}
      <div>
        <label htmlFor="MobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
        <input
          type="text"
          id="MobileNumber"
          {...register('MobileNumber', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.MobileNumber && <span className="text-red-500">This field is required</span>}
      </div>

      {/* PlaceOfBirth */}
      <div>
        <label htmlFor="PlaceOfBirth" className="block text-sm font-medium text-gray-700">Place of Birth</label>
        <input
          type="text"
          id="PlaceOfBirth"
          {...register('PlaceOfBirth', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.PlaceOfBirth && <span className="text-red-500">This field is required</span>}
      </div>

      {/* Religion */}
      <div>
        <label htmlFor="Religion" className="block text-sm font-medium text-gray-700">Religion</label>
        <input
          type="text"
          id="Religion"
          {...register('Religion', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.Religion && <span className="text-red-500">This field is required</span>}
      </div>

      {/* ReligionStatus */}
      <div>
        <label htmlFor="ReligionStatus" className="block text-sm font-medium text-gray-700">Religion Status</label>
        <input
          type="text"
          id="ReligionStatus"
          {...register('ReligionStatus', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.ReligionStatus && <span className="text-red-500">This field is required</span>}
      </div>

      {/* Reason */}
      <div>
        <label htmlFor="Reason" className="block text-sm font-medium text-gray-700">Reason</label>
        <input
          type="text"
          id="Reason"
          {...register('Reason', { required: false })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Remarks */}
      <div>
        <label htmlFor="Remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
        <input
          type="text"
          id="Remarks"
          {...register('Remarks', { required: false })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* AdmissionNote */}
      <div>
        <label htmlFor="AdmissionNote" className="block text-sm font-medium text-gray-700">Admission Note</label>
        <input
          type="text"
          id="AdmissionNote"
          {...register('AdmissionNote', { required: false })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Nationality */}
      <div>
        <label htmlFor="Nationality" className="block text-sm font-medium text-gray-700">Nationality</label>
        <input
          type="text"
          id="Nationality"
          {...register('Nationality', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.Nationality && <span className="text-red-500">This field is required</span>}
      </div>

      {/* LeaveDate */}
      <div>
        <label htmlFor="LeaveDate" className="block text-sm font-medium text-gray-700">Leave Date</label>
        <input
          type="date"
          id="LeaveDate"
          {...register('LeaveDate', { required: false })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* LastSchool */}
      <div>
        <label htmlFor="LastSchool" className="block text-sm font-medium text-gray-700">Last School</label>
        <input
          type="text"
          id="LastSchool"
          {...register('LastSchool', { required: false })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* LastSchoolGroup */}
      <div>
        <label htmlFor="LastSchoolGroup" className="block text-sm font-medium text-gray-700">Last School Group</label>
        <input
          type="text"
          id="LastSchoolGroup"
          {...register('LastSchoolGroup', { required: false })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* AdmissionFee */}
      <div>
        <label htmlFor="AdmissionFee" className="block text-sm font-medium text-gray-700">Admission Fee</label>
        <input
          type="number"
          id="AdmissionFee"
          {...register('AdmissionFee', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.AdmissionFee && <span className="text-red-500">This field is required</span>}
      </div>

      {/* AdmissionFeeDiscount */}
      <div>
        <label htmlFor="AdmissionFeeDiscount" className="block text-sm font-medium text-gray-700">Admission Fee Discount</label>
        <input
          type="number"
          id="AdmissionFeeDiscount"
          {...register('AdmissionFeeDiscount', { required: false })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* ApprovedAdmissionFee */}
      <div>
        <label htmlFor="ApprovedAdmissionFee" className="block text-sm font-medium text-gray-700">Approved Admission Fee</label>
        <input
          type="number"
          id="ApprovedAdmissionFee"
          {...register('ApprovedAdmissionFee', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.ApprovedAdmissionFee && <span className="text-red-500">This field is required</span>}
      </div>

      {/* LabCharges */}
      <div>
        <label htmlFor="LabCharges" className="block text-sm font-medium text-gray-700">Lab Charges</label>
        <input
          type="number"
          id="LabCharges"
          {...register('LabCharges', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.LabCharges && <span className="text-red-500">This field is required</span>}
      </div>

      {/* LabChargesDiscount */}
      <div>
        <label htmlFor="LabChargesDiscount" className="block text-sm font-medium text-gray-700">Lab Charges Discount</label>
        <input
          type="number"
          id="LabChargesDiscount"
          {...register('LabChargesDiscount', { required: false })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* ApprovedLabChargesFee */}
      <div>
        <label htmlFor="ApprovedLabChargesFee" className="block text-sm font-medium text-gray-700">Approved Lab Charges Fee</label>
        <input
          type="number"
          id="ApprovedLabChargesFee"
          {...register('ApprovedLabChargesFee', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.ApprovedLabChargesFee && <span className="text-red-500">This field is required</span>}
      </div>

      {/* TuitionFee */}
      <div>
        <label htmlFor="TuitionFee" className="block text-sm font-medium text-gray-700">Tuition Fee</label>
        <input
          type="number"
          id="TuitionFee"
          {...register('TuitionFee', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.TuitionFee && <span className="text-red-500">This field is required</span>}
      </div>

      {/* TuitionFeeDiscount */}
      <div>
        <label htmlFor="TuitionFeeDiscount" className="block text-sm font-medium text-gray-700">Tuition Fee Discount</label>
        <input
          type="number"
          id="TuitionFeeDiscount"
          {...register('TuitionFeeDiscount', { required: false })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* ApprovedTuitionFee */}
      <div>
        <label htmlFor="ApprovedTuitionFee" className="block text-sm font-medium text-gray-700">Approved Tuition Fee</label>
        <input
          type="number"
          id="ApprovedTuitionFee"
          {...register('ApprovedTuitionFee', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.ApprovedTuitionFee && <span className="text-red-500">This field is required</span>}
      </div>

      {/* CoursePayment */}
      <div>
        <label htmlFor="CoursePayment" className="block text-sm font-medium text-gray-700">Course Payment</label>
        <input
          type="number"
          id="CoursePayment"
          {...register('CoursePayment', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.CoursePayment && <span className="text-red-500">This field is required</span>}
      </div>

      {/* CoursePaymentDiscount */}
      <div>
        <label htmlFor="CoursePaymentDiscount" className="block text-sm font-medium text-gray-700">Course Payment Discount</label>
        <input
          type="number"
          id="CoursePaymentDiscount"
          {...register('CoursePaymentDiscount', { required: false })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* ApprovedCoursePayment */}
      <div>
        <label htmlFor="ApprovedCoursePayment" className="block text-sm font-medium text-gray-700">Approved Course Payment</label>
        <input
          type="number"
          id="ApprovedCoursePayment"
          {...register('ApprovedCoursePayment', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.ApprovedCoursePayment && <span className="text-red-500">This field is required</span>}
      </div>

      {/* StationaryCharges */}
      <div>
        <label htmlFor="StationaryCharges" className="block text-sm font-medium text-gray-700">Stationary Charges</label>
        <input
          type="number"
          id="StationaryCharges"
          {...register('StationaryCharges', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.StationaryCharges && <span className="text-red-500">This field is required</span>}
      </div>

      {/* AnnualCharges */}
      <div>
        <label htmlFor="AnnualCharges" className="block text-sm font-medium text-gray-700">Annual Charges</label>
        <input
          type="number"
          id="AnnualCharges"
          {...register('AnnualCharges', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.AnnualCharges && <span className="text-red-500">This field is required</span>}
      </div>

      {/* SchoolFee */}
      <div>
        <label htmlFor="SchoolFee" className="block text-sm font-medium text-gray-700">School Fee</label>
        <input
          type="number"
          id="SchoolFee"
          {...register('SchoolFee', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.SchoolFee && <span className="text-red-500">This field is required</span>}
      </div>

      {/* Arrears */}
      <div>
        <label htmlFor="Arrears" className="block text-sm font-medium text-gray-700">Arrears</label>
        <input
          type="number"
          id="Arrears"
          {...register('Arrears', { required: false })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* StudentImage */}
      <div>
        <label htmlFor="StudentImage" className="block text-sm font-medium text-gray-700">Student Image</label>
        <input
          type="text"
          id="StudentImage"
          {...register('StudentImage', { required: false })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
      </div>
    </form>
  );
};

export default AddStudentForm;
