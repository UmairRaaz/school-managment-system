// components/ContactPage.jsx
import React from 'react';
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';

const ContactPage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-200 to-indigo-200">
      <div className="container mx-auto p-8 lg:p-16  ">
      <h1 className="text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-400 text-center mb-12">
          Get in Touch with Us
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-around space-y-12 lg:space-y-0 lg:space-x-12">
          {/* Contact Information */}
          <div className="flex flex-col items-center text-gray-800 bg-gradient-to-r from-blue-200 to-blue-200 p-8 rounded-2xl shadow-lg transform hover:scale-105 transition duration-500">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-400 text-center mb-8">Contact Information</h2>
            <p className="text-xl lg:text-2xl mb-4 flex items-center text-black transition duration-300 transform hover:scale-125 ">
  <FaWhatsapp className="inline-block mr-3 transition duration-300 transform" /> +92 3144461778
</p>

            <p className="text-xl lg:text-2xl mb-8 text-white text-center">
              Mehran University Of Engineering And Technology
            </p>
            <div className="flex space-x-6 text-4xl">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 transition duration-300 transform hover:scale-125">
                <FaWhatsapp />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition duration-300 transform hover:scale-125">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition duration-300 transform hover:scale-125">
                <FaFacebook />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600 transition duration-300 transform hover:scale-125">
                <FaLinkedin />
              </a>
            </div>
          </div>
          {/* Decorative Image */}
          <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-8 border-white transform hover:scale-110 transition duration-500">
            <img
              src="/images/profile/about2.jpg"
              alt="Contact Decorative"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-400 to-blue-400 opacity-50 mix-blend-multiply"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
