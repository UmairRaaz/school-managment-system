// pages/index.js
import React from 'react';
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const students = [
  { name: 'Student 1', class: 'Class 10', position: '1st', image: '/images/profile/1.jpg' },
  { name: 'Student 2', class: 'Class 10', position: '2nd', image: '/images/profile/6.jpeg' },
  { name: 'Student 3', class: 'Class 10', position: '3rd', image: '/images/profile/3.jpeg' },
  { name: 'Student 4', class: 'Class 10', position: '4th', image: '/images/profile/4.jpeg' },
  { name: 'Student 5', class: 'Class 10', position: '5th', image: '/images/profile/5.jpeg' },
  { name: 'Student 6', class: 'Class 10', position: '6th', image: '/images/profile/6.jpeg' },
  { name: 'Student 7', class: 'Class 10', position: '7th', image: '/images/profile/7.jpeg' },
  { name: 'Student 8', class: 'Class 10', position: '8th', image: '/images/profile/4.jpeg' },
  { name: 'Student 9', class: 'Class 10', position: '9th', image: '/images/profile/6.jpeg' },
  { name: 'Student 10', class: 'Class 10', position: '10th', image: '/images/profile/1.jpg' },
];

const StudentCard = ({ student }) => {
  return (
    <div className="relative w-full h-64 overflow-hidden rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
      <img
        src={student.image}
        alt={student.name}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
        <h2 className="text-2xl font-bold">{student.name}</h2>
        <p className="text-lg">{student.class}</p>
        <p className="text-lg">{student.position}</p>
      </div>
    </div>
  );
};

const StudentAllCard = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-200 to-indigo-200 py-12 px-6 lg:px-16">
      <div className="container ">
      <h1 className="text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-400 text-center mb-12">
          Our Top Students
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {students.map((student, index) => (
            <StudentCard key={index} student={student} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentAllCard;
