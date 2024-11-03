"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosHome } from "react-icons/io";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import {
  FaUserCircle,
  FaInfoCircle,
  FaEnvelope,
  FaBell,
  FaBars,
  FaTimes,
} from "react-icons/fa";
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
    image: session?.image || "/profile.png",
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
        role: session?.role || "",
      });
      setIsLoggedIn(true);
    }
  }, [session]);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  console.log("home-sessions", session);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  console.log(session);
  const logoutHandler = () => {
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="bg-white px-14 py-2 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="">
          {/* <Link
            href="/"
            className="text-2xl font-bold tracking-wide hover:text-black transition duration-300 text-black"
          >
            <span className="text-5xl font-extrabold text-blue-500">Z</span>ai&lsquo;s{" "}
            <span className="text-2xl font-extrabold ">S</span>chool
          </Link> */}
          <Link
            href="/"
          >
            <Image  src={"/logo.png"} width={60} height={40} alt="logo"/>
          </Link>
        </div>
        <div className="hidden lg:flex items-center space-x-8">
          <Link href="/" className="relative group px-4 py-2">
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
          </Link>
          <Link href="#about" className="relative group px-4 py-2">
            About
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
          </Link>

          <Link href="#contact" className="relative group px-4 py-2">
            Contact
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
          </Link>
          

          <div className="relative">
            {isLoggedIn ? (
              <>
                <Image
                  src={userDetails.image}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <div className="origin-top-right absolute z-50 right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ease-out">
                    <div className="p-4 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">
                        {userDetails.username}
                      </p>
                      <p className="text-xs text-gray-600">
                        {userDetails.email}
                      </p>
                    </div>
                    <div className="p-2">
                      {userDetails.role === "admin" && (
                        <Link
                          href={`/admin-dashboard`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition duration-150 ease-in-out"
                        >
                          <FaCog className="mr-2 text-blue-500" /> View
                          Dashboard
                        </Link>
                      )}
                      {userDetails.role === "teacher" && (
                        <Link
                          href={`/admin-dashboard/`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition duration-150 ease-in-out"
                        >
                          <FaCog className="mr-2 text-blue-500" /> View
                          Dashboard
                        </Link>
                      )}
                      {userDetails.role === "student" && (
                        <Link
                          href={`/admin-dashboard/`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition duration-150 ease-in-out"
                        >
                          <FaCog className="mr-2 text-blue-500" /> View
                          Dashboard
                        </Link>
                      )}
                      <a
                        href="/api/auth/signout"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded transition duration-150 ease-in-out"
                      >
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
                <Link
                  href="/"
                  className="block px-4 py-2 text-xl transition duration-300 relative group"
                >
                  Home
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400  scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="block px-4 py-2 text-xl transition duration-300 relative group"
                >
                  About
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400  scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
                </Link>
              </li>

              <li>
                <Link
                  href="#contact"
                  className="block px-4 py-2 text-xl transition duration-300 relative group"
                >
                  Contact
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400  scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
                </Link>
              </li>
             
              <li>
                <div className="relative">
                  {isLoggedIn ? (
                    <>
                      <Image
                        src={userDetails.image}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        onClick={toggleDropdown}
                      />
                      {isDropdownOpen && (
                        <div className="origin-top-right z-50 absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ease-out">
                          <div className="p-4 border-b border-gray-200">
                            <p className="text-sm font-semibold text-gray-900">
                              {userDetails.username}
                            </p>
                            <p className="text-xs text-gray-600">
                              {userDetails.email}
                            </p>
                          </div>
                          <div className="p-2">
                            {userDetails.role === "admin" && (
                              <Link
                                href={`/admin-dashboard/admin-profile`}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition duration-150 ease-in-out"
                              >
                                <FaCog className="mr-2 text-blue-500" /> View
                                Dashboard
                              </Link>
                            )}
                            {userDetails.role === "teacher" && (
                              <Link
                                href={`/admin-dashboard/`}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition duration-150 ease-in-out"
                              >
                                <FaCog className="mr-2 text-blue-500" /> View
                                Dashboard
                              </Link>
                            )}
                            {userDetails.role === "student" && (
                              <Link
                                href={`/admin-dashboard/`}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition duration-150 ease-in-out"
                              >
                                <FaCog className="mr-2 text-blue-500" /> View
                                Dashboard
                              </Link>
                            )}
                            <a
                              href="/api/auth/signout"
                              onClick={logoutHandler}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded transition duration-150 ease-in-out"
                            >
                              <FaSignOutAlt className="mr-2 text-red-500" />{" "}
                              Logout
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
