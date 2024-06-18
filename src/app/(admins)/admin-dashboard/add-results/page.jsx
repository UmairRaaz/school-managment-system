'use client'

import React, { useState } from "react";

const calculateGrade = (percentage) => {
  if (percentage >= 80) return "A1";
  if (percentage >= 70) return "A";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 40) return "D";
  return "Fail";
};

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    class: "",
    section: "",
    rollNumber: "",
    cast: "",
    age: "",
    date: "",
    subjects: Array(10).fill({ name: "", totalMarks: 0, minMarks: 0, obtainedMarks: 0 }),
  });

  const handleChange = (e, index, field) => {
    const updatedSubjects = formData.subjects.map((subject, i) => 
      i === index ? { ...subject, [field]: e.target.value } : subject
    );
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalMarks = formData.subjects.reduce((sum, subject) => sum + Number(subject.totalMarks), 0);
  const totalObtainedMarks = formData.subjects.reduce((sum, subject) => sum + Number(subject.obtainedMarks), 0);
  const percentage = totalMarks > 0 ? ((totalObtainedMarks / totalMarks) * 100).toFixed(2) : 0;
  const grade = calculateGrade(percentage);

  return (
    <div className="container mx-auto p-2 text-[8px] mt-20 px-10">
      <h1 className="text-xs  mb-2 text-blue-600 pt-10">Add Result Card</h1>
      <form className="space-y-2">
        <div className="flex flex-wrap justify-between gap-2">
          <div className="flex-grow">
            <label className="block">Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Father Name:</label>
            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Class:</label>
            <input type="text" name="class" value={formData.class} onChange={handleInputChange} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Section:</label>
            <input type="text" name="section" value={formData.section} onChange={handleInputChange} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Roll Number:</label>
            <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleInputChange} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Cast:</label>
            <input type="text" name="cast" value={formData.cast} onChange={handleInputChange} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Age:</label>
            <input type="text" name="age" value={formData.age} onChange={handleInputChange} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-1 border text-[8px]" />
          </div>
          <div className="flex-grow">
            <label className="block">Note:</label>
            <input type="text" name="note" value={formData.note} onChange={handleInputChange} className="w-full p-1 border text-[8px]" />
          </div>
        </div>

        {formData.subjects.map((subject, index) => (
          <div key={index} className="border p-2 mb-2">
            <h2 className="text-[8px]">Subject {index + 1}</h2>
            <div className="flex flex-wrap justify-between gap-2">
              <div className="flex-grow">
                <label className="block">Name:</label>
                <input type="text" value={subject.name} onChange={(e) => handleChange(e, index, "name")} className="w-full p-1 border text-[8px]" />
              </div>
              <div className="flex-grow">
                <label className="block">Total Marks:</label>
                <input type="number" value={subject.totalMarks} onChange={(e) => handleChange(e, index, "totalMarks")} className="w-full p-1 border text-[8px]" />
              </div>
              <div className="flex-grow">
                <label className="block">Min Marks:</label>
                <input type="number" value={subject.minMarks} onChange={(e) => handleChange(e, index, "minMarks")} className="w-full p-1 border text-[8px]" />
              </div>
              <div className="flex-grow">
                <label className="block">Obtained Marks:</label>
                <input type="number" value={subject.obtainedMarks} onChange={(e) => handleChange(e, index, "obtainedMarks")} className="w-full p-1 border text-[8px]" />
              </div>
            </div>
          </div>
        ))}

        <div className="border p-2">
          <h2 className="text-[10px]"></h2>
          <div className="flex flex-wrap justify-between gap-2">
            <div className="flex-grow">
              <label className="block">Total Marks:</label>
              <input type="number" value={totalMarks} readOnly className="w-full p-1 border text-[8px] bg-gray-100" />
            </div>
            <div className="flex-grow">
              <label className="block">Obtained Marks:</label>
              <input type="number" value={totalObtainedMarks} readOnly className="w-full p-1 border text-[8px] bg-gray-100" />
            </div>
            <div className="flex-grow">
              <label className="block">Percentage:</label>
              <input type="text" value={`${percentage}%`} readOnly className="w-full p-1 border text-[8px] bg-gray-100" />
            </div>
            <div className="flex-grow">
              <label className="block">Grade:</label>
              <input type="text" value={grade} readOnly className="w-full p-1 border text-[8px] bg-gray-100" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-6 py-2 w-full text-black font-semibold hover:bg-black hover:text-white border border-black transition-all duration-300 ease-in-out"
              >
                Add Result
              </button>
            </div>
      </form>
    </div>
  );
};

export default Form;
