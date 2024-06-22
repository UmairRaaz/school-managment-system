"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function AdminAddClassFees() {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState("");


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/admin/all-students");
        setStudents(response.data.students);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const onSubmit = async (data) => {
    try {
      
      const feeData = {
        studentId: selectedStudent,
        isPaid: data.feeStatus === "paid",
        date: data.date,
        AdmissionFee: data.admission,
        MonthlyFee: data.monthly,
        TuitionFee: data.tuition,
        Discount: data.discount,
        Penalty: data.penalty,
        month: new Date(data.date).toLocaleString('default', { month: 'long' }),
        year: new Date(data.date).getFullYear(),
      };
      console.log("Fee data:", feeData);
      const response = await axios.post("/api/admin/admin-add-fee", feeData);
      if(response.data.success){
        alert("Fee added successfully")
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleStudentChange = async (e) => {
    console.log('Event:', e); 
    const studentId = e.target.value;
    console.log('Selected Student ID:', studentId); 
    setSelectedStudent(studentId);

    try {
      const response = await axios.get(`/api/admin/delete-edit-get-student/${studentId}`);
      console.log('API Response:', response.data);

      const student = response.data.student;
      console.log('Student Details:', student);
      setValue('studentName', student.Name);
      setValue('fatherName', student.FatherName);
      setValue('rollNo', student.SID);
      setValue('className', student.CurrentClass);
      setValue('section', student.Section);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const feeValues = watch([
    "admission",
    "monthly",
    "tuition",
    "discount",
    "penalty",
  ]);
  const total =
    (parseFloat(feeValues[0]) || 0) +
    (parseFloat(feeValues[1]) || 0) +
    (parseFloat(feeValues[2]) || 0) -
    (parseFloat(feeValues[3]) || 0) +
    (parseFloat(feeValues[4]) || 0);

  useEffect(() => {
    setValue("total", total.toFixed(2));
  }, [feeValues, setValue, total]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-10 pt-10">
      <div className="bg-white p-8 w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-start text-center text-sm text-blue-500 mb-4">
            Add Class Fees
          </div>
          <div className="flex justify-start text-center text-sm text-blue-500 mt-4">
            Student Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label htmlFor="studentId" className="text-xs block text-gray-700">
                Student
              </label>
              <select
                id="studentId"
                name="studentId"
                onChange={handleStudentChange}
                className="mt-1 p-2 border border-gray-300 rounded">
                <option value="">Select a student</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="studentName" className="text-xs block text-gray-700">
                Student Name
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("studentName", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="fatherName" className="text-xs block text-gray-700">
                Father Name
              </label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("fatherName", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="rollNo" className="text-xs block text-gray-700">
                Roll No
              </label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("rollNo", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="className" className="text-xs block text-gray-700">
                Class
              </label>
              <input
                type="text"
                id="className"
                name="className"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("className", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="section" className="text-xs block text-gray-700">
                Section
              </label>
              <input
                type="text"
                id="section"
                name="section"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("section", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="feeDescription" className="text-xs block text-gray-700">
                Fee Description
              </label>
              <input
                type="text"
                id="feeDescription"
                name="feeDescription"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("feeDescription", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="feeStatus" className="text-xs block text-gray-700">
                Fee Status
              </label>
              <select
                id="feeStatus"
                name="feeStatus"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("feeStatus", { required: true })}
              >
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="text-xs block text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("date", { required: true })}
              />
            </div>
          </div>
          <div className="flex justify-start text-center text-sm text-blue-500 mt-4">
            Fees
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label htmlFor="admission" className="text-xs block text-gray-700">
                Admission Fee
              </label>
              <input
                type="number"
                id="admission"
                name="admission"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("admission", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="monthly" className="text-xs block text-gray-700">
                Monthly Fee
              </label>
              <input
                type="number"
                id="monthly"
                name="monthly"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("monthly", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="tuition" className="text-xs block text-gray-700">
                Tuition Fee
              </label>
              <input
                type="number"
                id="tuition"
                name="tuition"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("tuition", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="discount" className="text-xs block text-gray-700">
                Discount
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("discount", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="penalty" className="text-xs block text-gray-700">
                Penalty
              </label>
              <input
                type="number"
                id="penalty"
                name="penalty"
                className="mt-1 p-2 border border-gray-300 rounded"
                {...register("penalty", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="total" className="text-xs block text-gray-700">
                Total
              </label>
              <input
                type="number"
                id="total"
                name="total"
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded bg-gray-100"
                {...register("total", { required: true })}
              />
            </div>
          </div>
          <div className="flex items-end justify-end">
            <button
              type="submit"
              className="px-6 py-2 text-black font-semibold hover:bg-black hover:text-white border border-black transition-all duration-300 ease-in-out"
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