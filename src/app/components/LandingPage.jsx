'use client';
import { useState, useEffect } from 'react';
import { FaGraduationCap, FaBook, FaLightbulb } from 'react-icons/fa';
import { MdOutlineSportsTennis, MdSportsKabaddi } from 'react-icons/md';

const LandingPage = () => {
  const [quotes] = useState([
    "The beautiful thing about learning is that no one can take it away from you. - B.B. King",
    "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
    "The only way to do great work is to love what you do. - Steve Jobs"
  ]);

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      setCurrentQuote(quotes[index]);
    }, 5000);
    return () => clearInterval(interval);
  }, [index, quotes]);

  return (
    <div className="container-fluid min-h-screen z-10 flex flex-col items-center justify-center bg-gray-100 relative overflow-hidden px-4 sm:px-6 lg:px-8 sm:mt-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-blue-600 text-center leading-tight">
        Welcome to Our School
      </h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-12 text-gray-700 text-center">
        Where learning meets excellence. Join us to unlock your potential and achieve greatness.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-12">
        <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105">
          <FaGraduationCap className="text-4xl mb-4 text-red-600" />
          <p className="text-base text-gray-600">Our Vision</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105">
          <FaBook className="text-4xl mb-4 text-green-600" />
          <p className="text-base text-gray-600">Quality Education</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105">
          <FaLightbulb className="text-4xl mb-4 text-yellow-400" />
          <p className="text-base text-gray-600">Innovative Ideas</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105">
          <MdOutlineSportsTennis className="text-4xl mb-4 text-teal-400" />
          <p className="text-base text-gray-600">Sports</p>
        </div>
        
      </div>
    </div>
  );
};

export default LandingPage;
