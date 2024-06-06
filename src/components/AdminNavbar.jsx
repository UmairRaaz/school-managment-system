'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function AdminNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-white fixed w-full top-0 z-50  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between  h-20">
          <div className="flex-shrink-0 flex   items-center">
            <Image src="/images/logo/logo.svg" alt="School Logo" width={40} height={40} />
            <span className="text-xl font-semibold ml-2">Admin Panel</span>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button
                className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition"
                onClick={toggleDropdown}
              >
                <span className="text-sm text-between py-2 px-5">Muhammad Moon</span>
                <Image
                  className="h-8 w-8 rounded-full"
                  src="/images/profile/moon.jpg" // Make sure this image path is correct
                  alt=""
                  width={32}
                  height={32}
                />
              </button>
              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ease-out">
                <div className="p-4 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">Moon</p>
                  <p className="text-xs text-gray-600">Moon@example.com</p>
                </div>
                <div className="p-2">
                  <a href="/admin-dashboard/admin-profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition duration-150 ease-in-out">
                    <FaCog className="mr-2 text-blue-500" /> Account Settings
                  </a>
                  <a href="/api/auth/signout" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded transition duration-150 ease-in-out">
                    <FaSignOutAlt className="mr-2 text-red-500" /> Logout
                  </a>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
