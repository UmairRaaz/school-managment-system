"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoIosHome } from "react-icons/io";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

<<<<<<< HEAD
  const getCookies = async () => {
    const response = await axios.get("/api/isAdmin");
    if (response.data.data) {
      setUserDetails(response.data.data);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    getCookies();
  }, []);

  const logoutHandler = async () => {
    await axios.get("/api/logout");
    router.replace("/");
    window.location.reload(true);
  };

=======
>>>>>>> bf6fd20720fa3e216d87e1ca60b1f73848002da3
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
<<<<<<< HEAD
    <div className="navbar bg-base-100 fixed top-0 left-0 z-30 w-full">
      <div className="flex-1">
        <span className="btn btn-ghost text-xl">
          <Link href="/">
            <span style={{ color: "blue", fontSize: "1.2em" }}>Z</span>ias{" "}
            <span style={{ color: "blue", fontSize: "1.2em" }}>S</span>chool
          </Link>
        </span>
=======
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">MyWebsite</div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/admin-dashboard">
              <p className="text-white hover:text-gray-200">Dashboard</p>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <p className="text-white hover:text-gray-200">About</p>
            </Link>
          </li>
          <li>
            <Link href="/services">
              <p className="text-white hover:text-gray-200">Services</p>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <p className="text-white hover:text-gray-200">Contact</p>
            </Link>
          </li>
        </ul>
>>>>>>> bf6fd20720fa3e216d87e1ca60b1f73848002da3
      </div>
      <div className="flex-none">
        <div className="hidden lg:flex justify-center w-full">
          <ul className="menu menu-horizontal px-1 flex justify-center">
            <li>
              <Link href="/">
                <IoIosHome size={25} className="text-blue-600" />
              </Link>
            </li>
            <li>
              <Link href="/why-us">About us</Link>
            </li>
            <li>
              <Link href="/problems-solutions">Gallery</Link>
            </li>
            <li>
<<<<<<< HEAD
              <Link href="/products">Noticication</Link>
=======
              <Link href="/products">Notification</Link>
>>>>>>> bf6fd20720fa3e216d87e1ca60b1f73848002da3
            </li>
            <li>
              <Link href="/contactus">Contact Us</Link>
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
<<<<<<< HEAD
                      <ul className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-lg" style={{ top: '100%' }}>
                        <li className="text-xs px-2 py-2 border-b">Name: {userDetails.name}</li>
                        <li className="text-xs font-medium px-2 py-2 border-b">Email: {userDetails.email}</li>
        
                        <li className="text-xs py-2 border-b">
                          <Link href="/admin-dashboard" className="text-blue-800">View Dashboard</Link>
=======
                      <ul
                        className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-lg"
                        style={{ top: "100%" }}
                      >
                        <li className="text-xs px-2 py-2 border-b">
                          Name: {userDetails.name}
                        </li>
                        <li className="text-xs font-medium px-2 py-2 border-b">
                          Email: {userDetails.email}
                        </li>
                        <li className="text-xs py-2 border-b">
                          <Link
                            href="/admin-dashboard"
                            className="text-blue-800"
                          >
                            View Dashboard
                          </Link>
>>>>>>> bf6fd20720fa3e216d87e1ca60b1f73848002da3
                        </li>
                        <li className="px-4 py-2">
                          <button
                            onClick={logoutHandler}
                            className="btn btn-sm border-black text-sm"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href="/admin-dashboard">
<<<<<<< HEAD
                    <button className="btn text-sm btn-sm btn-dark border-black">Login</button>
=======
                    <button className="btn text-sm btn-sm btn-dark border-black">
                      Login
                    </button>
>>>>>>> bf6fd20720fa3e216d87e1ca60b1f73848002da3
                  </Link>
                )}
              </div>
            </li>
          </ul>
        </div>
        <button className="btn btn-ghost lg:hidden" onClick={toggleSidebar}>
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 lg:hidden">
          <div className="fixed inset-y-0 left-0 w-64 bg-base-100 shadow-lg p-4">
            <button className="btn btn-ghost mb-4" onClick={toggleSidebar}>
              <XMarkIcon className="h-6 w-6" />
            </button>
            <ul className="menu flex flex-col">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/why-us">Why We Are</Link>
              </li>
              <li>
                <Link href="/problems-solutions">Problems & Solution</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/contactus">Contact Us</Link>
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
<<<<<<< HEAD
                        <ul className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-lg" style={{ top: '100%' }}>
                          <li className="text-xs px-2 py-2 border-b">Name: {userDetails.name}</li>
                          <li className="text-xs font-medium px-2 py-2 border-b">Email: {userDetails.email}</li>
                          <li className="text-xs py-2 border-b">
                            <Link href="/ordercomplete" className="text-green-800">View Orders</Link>
                          </li>
                          <li className="text-xs py-2 border-b">
                            <Link href="/admin-dashboard" className="text-blue-800">View Dashboard</Link>
=======
                        <ul
                          className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-lg"
                          style={{ top: "100%" }}
                        >
                          <li className="text-xs px-2 py-2 border-b">
                            Name: {userDetails.name}
                          </li>
                          <li className="text-xs font-medium px-2 py-2 border-b">
                            Email: {userDetails.email}
                          </li>
                          <li className="text-xs py-2 border-b">
                            <Link
                              href="/ordercomplete"
                              className="text-green-800"
                            >
                              View Orders
                            </Link>
                          </li>
                          <li className="text-xs py-2 border-b">
                            <Link
                              href="/admin-dashboard"
                              className="text-blue-800"
                            >
                              View Dashboard
                            </Link>
>>>>>>> bf6fd20720fa3e216d87e1ca60b1f73848002da3
                          </li>
                          <li className="px-4 py-2">
                            <button
                              onClick={logoutHandler}
                              className="btn btn-dark btn-sm border-black text-sm"
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href="/admin-dashboard">
<<<<<<< HEAD
                      <button className="btn btn-dark btn-sm border-black">Login</button>
=======
                      <button className="btn btn-dark btn-sm border-black">
                        Login
                      </button>
>>>>>>> bf6fd20720fa3e216d87e1ca60b1f73848002da3
                    </Link>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
<<<<<<< HEAD
    </div>
=======
    </nav>
>>>>>>> bf6fd20720fa3e216d87e1ca60b1f73848002da3
  );
}

export default Navbar;
