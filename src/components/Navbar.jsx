"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosHome } from "react-icons/io";
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
            <IoIosHome size={25} className="text-black hover:text-blue-500" />
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
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-lg">
                    <li className="px-4 py-2 border-b">
                      Name: {userDetails.username}
                    </li>
                    <li className="px-4 py-2 border-b text-sm">
                      Email: {userDetails.email}
                    </li>
                    <li className="px-4 py-2 border-b">
                      <Link href="/admin-dashboard" className="text-blue-800">
                        View Dashboard
                      </Link>
                    </li>
                    <li className="px-4 py-2">
                      <Link href={"/api/auth/signout"}
                        className="text-blue-800 hover:text-blue-600"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                )}
              </>
            ) : (
              <Link href="/admin-auth/login">
                <button className="btn text-sm btn-sm btn-dark border-black">
                  Login
                </button>
              </Link>
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
                        className="w-8 h-8 rounded-full cursor-pointer"
                        onClick={toggleDropdown}
                      />
                      {isDropdownOpen && (
                        <ul className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-lg">
                          <li className="px-4 py-2 border-b">
                            Name: {userDetails.username}
                          </li>
                          <li className="px-4 py-2 border-b text-sm">
                            Email: {userDetails.email}
                          </li>
                          <li className="px-4 py-2 border-b">
                            <Link href="/admin-dashboard" className="text-blue-800">
                              View Dashboard
                            </Link>
                          </li>
                          <li className="px-4 py-2">
                            <Link
                            href={"/api/auth/signout"}
                              onClick={logoutHandler}
                              className="text-blue-800 hover:text-blue-600"
                            >
                              Logout
                            </Link>
                          </li>
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href="/admin-auth/login">
                      <button className="btn text-sm btn-sm btn-dark border-black">
                        Login
                      </button>
                    </Link>
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
