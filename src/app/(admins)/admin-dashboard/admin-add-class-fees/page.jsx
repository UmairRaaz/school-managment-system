'use client'
// components/AdminAddClassFees.jsx
import React, { useState, useEffect } from 'react';

function AdminAddClassFees() {
  const [formData, setFormData] = useState({
    date: '',
    rollNo: '',
    studentName: '',
    fatherName: '',
    className: '',
    section: '',
    feeDescription: '',
    admission: 0,
    monthly: 0,
    tuition: 0,
    discount: 0,
    penalty: 0,
    total: 0,
    sno: '',
  });

  const generateUniqueSNO = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      sno: generateUniqueSNO(),
    }));
  }, []);

  useEffect(() => {
    const total = 
      parseFloat(formData.admission) +
      parseFloat(formData.monthly) +
      parseFloat(formData.tuition) -
      parseFloat(formData.discount) +
      parseFloat(formData.penalty);
    setFormData((prevData) => ({
      ...prevData,
      total: total.toFixed(2),
    }));
  }, [formData.admission, formData.monthly, formData.tuition, formData.discount, formData.penalty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    setFormData({
      date: '',
      rollNo: '',
      studentName: '',
      fatherName: '',
      className: '',
      section: '',
      feeDescription: '',
      admission: 0,
      monthly: 0,
      tuition: 0,
      discount: 0,
      penalty: 0,
      total: 0,
      sno: generateUniqueSNO(),
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-10 pt-10">
      <div className="bg-white p-8 w-full ">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-start text-center text-sm text-blue-500 mb-4">Add Class Fees</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label htmlFor="sno" className="text-xs block text-gray-700">SNO</label>
              <input
                type="text"
                id="sno"
                name="sno"
                value={formData.sno}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="flex justify-start text-center text-sm text-blue-500 mt-4">Student Information</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            
            <div className="flex flex-col">
              <label htmlFor="studentName" className="text-xs block text-gray-700">Student Name</label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="fatherName" className="text-xs block text-gray-700">Father Name</label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="rollNo" className="text-xs block text-gray-700">Roll No</label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="className" className="text-xs block text-gray-700">Class</label>
              <input
                type="text"
                id="className"
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="section" className="text-xs block text-gray-700">Section</label>
              <input
                type="text"
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="feeDescription" className="text-xs block text-gray-700">Fee Description</label>
              <input
                type="text"
                id="feeDescription"
                name="feeDescription"
                value={formData.feeDescription}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
  <label htmlFor="feeStatus" className="text-xs block text-gray-700">Fee Description</label>
  <select
    id="feeStatus"
    name="feeStatus"
    value={formData.feeDescription}
    onChange={handleChange}
    className="mt-1 p-2 border border-gray-300 rounded"
  >
    <option value="paid">Paid</option>
    <option value="unpaid">Unpaid</option>
  </select>
</div>

            <div className="flex flex-col">
              <label htmlFor="date" className="text-xs block text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="flex justify-start text-center text-sm text-blue-500 mt-4">Fees</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label htmlFor="admission" className="text-xs block text-gray-700">Admission Fee</label>
              <input
                type="number"
                id="admission"
                name="admission"
                value={formData.admission}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="monthly" className="text-xs block text-gray-700">Monthly Fee</label>
              <input
                type="number"
                id="monthly"
                name="monthly"
                value={formData.monthly}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="tuition" className="text-xs block text-gray-700">Tuition Fee</label>
              <input
                type="number"
                id="tuition"
                name="tuition"
                value={formData.tuition}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="discount" className="text-xs block text-gray-700">Discount</label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="penalty" className="text-xs block text-gray-700">Penalty</label>
              <input
                type="number"
                id="penalty"
                name="penalty"
                value={formData.penalty}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="total" className="text-xs block text-gray-700">Total</label>
              <input
                type="number"
                id="total"
                name="total"
                value={formData.total}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded bg-gray-100"
              />
            </div>
          </div>
          <div className="flex items-end  justify-end">
              <button
                type="submit"
                className=" px-6 py-2  text-black font-semibold hover:bg-black hover:text-white border border-black transition-all duration-300 ease-in-out"
              >
                Add Fee
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAddClassFees;
