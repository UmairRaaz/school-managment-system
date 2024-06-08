'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function AdminNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState({
    id: session?._id || "",
    username: "",
    image: "/profile.png",
    email: "",
    role: "Panel",
  });

  useEffect(() => {
    if (session) {
      setUserDetails({
        id: session?._id || "",
        username: session?.username || "",
        image: session?.image || "/profile.png",
        email: session?.email || "",
        role: session?.role || ""
      });
    }
  }, [session]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getProfileLink = (id) => {
    switch (userDetails.role) {
      case 'admin':
        return `/admin-dashboard/admin-profile`;
      case 'teacher':
        return `/admin-dashboard/view-teacher/${id}`;
      case 'student':
        return `/admin-dashboard/view-student/${id}`;
      default:
        return `/admin-dashboard/admin-profile`;
    }
  };

  return (
    <nav className="bg-white fixed w-full top-0 z-50 border-b-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Image src="/images/logo/logo.svg" alt="School Logo" width={40} height={40} />
            <span className="text-xl font-semibold ml-2">{userDetails.role} Panel</span>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button
                className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition"
                onClick={toggleDropdown}
              >
                <span className="text-sm text-between py-2 px-5">{userDetails.username}</span>
                <Image
                  className="h-8 w-8 rounded-full"
                  src={userDetails.image}
                  alt=""
                  width={32}
                  height={32}
                />
              </button>
              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ease-out">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{userDetails.username}</p>
                    <p className="text-xs text-gray-600">{userDetails.email}</p>
                  </div>
                  <div className="p-2">
                    {userDetails.role === "admin" && (
                      <Link href={`/admin-dashboard/admin-profile`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition duration-150 ease-in-out">
                      <FaCog className="mr-2 text-blue-500" /> Account Settings
                    </Link>
                    )}
                    {userDetails.role === "teacher" && (
                      <Link href={`/admin-dashboard/view-teacher/${userDetails.id}`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition duration-150 ease-in-out">
                      <FaCog className="mr-2 text-blue-500" /> Account Settings
                    </Link>
                    )}
                    {userDetails.role === "student" && (
                      <Link href={`/admin-dashboard/view-student/${userDetails.id}`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition duration-150 ease-in-out">
                      <FaCog className="mr-2 text-blue-500" /> Account Settings
                    </Link>
                    )}
                    
                    <Link href="/api/auth/signout" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded transition duration-150 ease-in-out">
                      <FaSignOutAlt className="mr-2 text-red-500" /> Logout
                    </Link>
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
