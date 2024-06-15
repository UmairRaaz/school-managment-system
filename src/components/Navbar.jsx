"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosHome } from "react-icons/io";
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import { FaUserCircle, FaInfoCircle, FaEnvelope, FaBell, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useSession } from "next-auth/react";

function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    id: session?._id || "",
    username: "",
    image: "/profile.png",
    email: "",
    role: session?.role || "",
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
      setIsLoggedIn(true)
    }
  }, [session]);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  console.log("home-sessions", session)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="bg-white p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black font-bold text-2xl">
          MyWebsite
        </div>
        <div className="hidden lg:flex items-center space-x-8">
          <Link href="/">
            <IoIosHome size={25} className="text-blue-400 hover:text-blue-500" />
          </Link>
          <Link href="/about" className="text-black hover:text-blue-500">
            About
          </Link>
          <Link href="/services" className="text-black hover:text-blue-500">
            Services
          </Link>
          <Link href="/contact" className="text-black hover:text-blue-500">
            Contact
          </Link>
          <Link href="/notifications" className="text-black hover:text-blue-500">
            <FaBell size={25} />
          </Link>

          <div className="relative">
      {isLoggedIn ? (
        <>
          <Image
            src="/profile.png"
            alt="Profile"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ease-out">
              <div className="p-4 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-900">{userDetails.username}</p>
                <p className="text-xs text-gray-600">{userDetails.email}</p>
              </div>
              <div className="p-2">
                {userDetails.role === "admin" && (
                  <a href={`/admin-dashboard`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition duration-150 ease-in-out">
                    <FaCog className="mr-2 text-blue-500" /> View Dashboard
                  </a>
                )}
                {userDetails.role === "teacher" && (
                  <a href={`/admin-dashboard/`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition duration-150 ease-in-out">
                    <FaCog className="mr-2 text-blue-500" /> View Dashboard
                  </a>
                )}
                {userDetails.role === "student" && (
                  <a href={`/admin-dashboard/`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition duration-150 ease-in-out">
                    <FaCog className="mr-2 text-blue-500" /> View Dashboard
                  </a>
                )}
                <a href="/api/auth/signout" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded transition duration-150 ease-in-out">
                  <FaSignOutAlt className="mr-2 text-red-500" /> Logout
                </a>
              </div>
            </div>
          )}
        </>
      ) : (
        <a href="/admin-auth/login">
          <button className="text-sm px-6 py-3 bg-black text-white rounded-full hover:bg-gradient-to-l transition-colors duration-300 shadow-lg transform hover:scale-105">
            Login
          </button>
        </a>
      )}
    </div>
        </div>
        <button className="lg:hidden text-black" onClick={toggleSidebar}>
          <FaBars className="h-6 w-6" />
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 lg:hidden">
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-4">
            <button className="mb-4 text-black" onClick={toggleSidebar}>
              <FaTimes className="h-6 w-6" />
            </button>
            <ul className="space-y-6">
              <li>
                <Link href="/" className="flex items-center space-x-3 text-black hover:text-blue-500">
                  <IoIosHome size={25} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center space-x-3 text-black hover:text-blue-500">
                  <FaInfoCircle size={25} />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="flex items-center space-x-3 text-black hover:text-blue-500">
                  <FaUserCircle size={25} />
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center space-x-3 text-black hover:text-blue-500">
                  <FaEnvelope size={25} />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/notifications" className="flex items-center space-x-3 text-black hover:text-blue-500">
                  <FaBell size={25} />
                  <span>Notifications</span>
                </Link>
              </li>
              <li>
              <div className="relative">
      {isLoggedIn ? (
        <>
          <Image
            src="/profile.png"
            alt="Profile"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ease-out">
              <div className="p-4 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-900">{userDetails.username}</p>
                <p className="text-xs text-gray-600">{userDetails.email}</p>
              </div>
              <div className="p-2">
                {userDetails.role === "admin" && (
                  <a href={`/admin-dashboard/admin-profile`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition duration-150 ease-in-out">
                    <FaCog className="mr-2 text-blue-500" /> View Dashboard
                  </a>
                )}
                {userDetails.role === "teacher" && (
                  <a href={`/admin-dashboard/`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition duration-150 ease-in-out">
                    <FaCog className="mr-2 text-blue-500" /> View Dashboard
                  </a>
                )}
                {userDetails.role === "student" && (
                  <a href={`/admin-dashboard/`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition duration-150 ease-in-out">
                    <FaCog className="mr-2 text-blue-500" /> View Dashboard
                  </a>
                )}
                <a href="/api/auth/signout" onClick={logoutHandler} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded transition duration-150 ease-in-out">
                  <FaSignOutAlt className="mr-2 text-red-500" /> Logout
                </a>
              </div>
            </div>
          )}
        </>
      ) : (
        <a href="/admin-auth/login">
          <button className="text-sm px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md">
            Login
          </button>
        </a>
      )}
    </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
