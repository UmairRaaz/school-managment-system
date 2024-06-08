'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaAngleRight,
  FaHome,
  FaTachometerAlt,
  FaPlus,
  FaBoxes,
  FaShoppingCart,
  FaLifeRing,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDown,
  FaAngleLeft,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showDropdown, setShowDropdown] = useState(Array(8).fill(false));
  const { data: session, status } = useSession();

  const [userDetails, setUserDetails] = useState({
    username: "",
    image: "/profile.png",
    email: "",
  });

  useEffect(() => {
    if (session) {
      setUserDetails({
        username: session?.username || "",
        image: session?.image || "/profile.png",
        email: session?.email || "",
      });
    }
  }, [session]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (index) => {
    setShowDropdown((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const adminNavLinks = [
    {
      href: "/",
      icon: FaTachometerAlt,
      label: "Dashboard",
      color: "blue",
      tooltip: "Go to Dashboard",
    },
    {
      href: "/",
      icon: FaUserGraduate,
      label: "Students",
      color: "blue",
      tooltip: "Students",
      hasDropdown: true,
      dropdownLinks: [
        { href: "/admin-dashboard/add-student", label: "Add Student" },
        { href: "/admin-dashboard/all-students", label: "View All Students" },
        { href: "/admin-dashboard/manage-students", label: "Manage Students" },
      ],
    },
    {
      href: "/",
      icon: FaUsers,
      label: "Teachers",
      color: "blue",
      tooltip: "Teachers",
      hasDropdown: true,
      dropdownLinks: [
        { href: "/admin-dashboard/add-teachers", label: "Add Teacher" },
        { href: "/admin-dashboard/all-teachers", label: "Manage Teacher" },
      ],
    },
    {
      href: "/",
      icon: FaBoxes,
      label: "Attendance",
      color: "blue",
      tooltip: "Attendance",
      hasDropdown: true,
      dropdownLinks: [{ href: "/admin/all-orders", label: "All Orders" }],
    },
    {
      href: "/",
      icon: FaShoppingCart,
      label: "Result",
      color: "blue",
      tooltip: "Result",
      hasDropdown: true,
      dropdownLinks: [{ href: "/admin/all-supports", label: "All Support" }],
    },
    {
      href: "/",
      icon: FaLifeRing,
      label: "Fees",
      color: "blue",
      tooltip: "Fees",
      hasDropdown: true,
      dropdownLinks: [{ href: "/admin/all-users", label: "All Users" }],
    },
    {
      href: "/",
      icon: FaLifeRing,
      label: "Notification",
      color: "blue",
      tooltip: "Notification",
      hasDropdown: true,
      dropdownLinks: [{ href: "/admin/all-users", label: "All Users" }],
    },
    {
      href: "/api/auth/signout",
      icon: FaUsers,
      label: "Logout",
      color: "red",
      tooltip: "Logout",
    },
  ];

  const teacherNavLinks = [
    {
      href: '/',
      icon: FaTachometerAlt,
      label: 'Account View',
      color: 'blue',
      tooltip: 'Account View',
    },
    {
      href: '/admin-dashboard/take-attendance',
      icon: FaUserGraduate,
      label: 'Take Attendance',
      color: 'blue',
      tooltip: 'Take Attendance',
    },
    {
      href: '/admin-dashboard/add-result',
      icon: FaUserGraduate,
      label: 'Add Result',
      color: 'blue',
      tooltip: 'Add Result',
    },
    {
      href: '/admin-dashboard/add-notifications',
      icon: FaUserGraduate,
      label: 'Add Notification',
      color: 'blue',
      tooltip: 'Add Notification',
    },
    {
      href: '/api/auth/signout',
      icon: FaUsers,
      label: 'Logout',
      color: 'red',
      tooltip: 'Logout',
    },
  ];

  const studentNavLinks = [
    {
      href: '/',
      icon: FaTachometerAlt,
      label: 'Dashboard',
      color: 'blue',
      tooltip: 'Dashboard',
    },
    {
      href: '/student-dashboard/view-grades',
      icon: FaUserGraduate,
      label: 'View Grades',
      color: 'blue',
      tooltip: 'View Grades',
    },
    {
      href: '/student-dashboard/notifications',
      icon: FaUserGraduate,
      label: 'Notifications',
      color: 'blue',
      tooltip: 'Notifications',
    },
    {
      href: '/api/auth/signout',
      icon: FaUsers,
      label: 'Logout',
      color: 'red',
      tooltip: 'Logout',
    },
  ];

  const navLinks =
    session?.role === 'admin'
      ? adminNavLinks
      : session?.role === 'teacher'
      ? teacherNavLinks
      : studentNavLinks;

  return (
    <div
      className={`h-screen fixed mt-20 pb-40 shadow-xl   left-0 top-0 bg-white text-black ${
        isOpen ? 'w-64' : 'w-20'
      } transition-all duration-300 flex flex-col overflow-y-auto`}
    >
      <div className="py-4 px-6 flex justify-between items-center">
        <Link
          href="/"
          className={`flex justify-center items-center ${
            isOpen ? 'md:flex' : 'md:hidden'
          } py-2.5  hover:text-black`}
        >
          <FaHome className="w-6 h-6 mr-3" style={{ color: 'blue' }} />
          <span
            className={`text-xl text-nowrap font-bold transition-all duration-300 ${
              !isOpen && 'hidden'
            }`}
          >
            Moon School
          </span>
        </Link>
        <button
          onClick={toggleSidebar}
          className="text-black focus:outline-none"
        >
          {isOpen ? (
            <FaChevronLeft className="w-6 h-6" />
          ) : (
            <FaChevronRight className="w-6 h-6" />
          )}
        </button>
      </div>
      <nav className="flex flex-col flex-1 px-2 space-y-2 gap-3">
        {navLinks.map((link, index) => (
          <div className="relative group" key={index}>
            {link.hasDropdown ? (
              <>
                <div
                  className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 bg-white hover:bg-white cursor-pointer"
                  onClick={() => toggleDropdown(index)}
                >
                  <link.icon className="w-6 h-6 mr-3 text-blue-800" />
                  <span
                    className={`transition-all duration-300 ${
                      !isOpen && 'hidden'
                    } group-hover:text-blue-500`}
                  >
                    {link.label}
                  </span>
                  <FaAngleDown className="ml-auto w-4 h-4 text-gray-600" />
                </div>
                {showDropdown[index] && (
                  <div className="ml-10">
                    {link.dropdownLinks.map((dropdownLink, i) => (
                      <Link
                        href={dropdownLink.href}
                        key={i}
                        className={`flex items-center py-2.5 px-4  transition duration-200 bg-white hover:bg-blue-50 hover:text-blue-700 hover:shadow-xl transform hover:scale-105`}
                      >
                        <FaAngleRight className="w-4 h-4 mr-2 text-blue-500" />
                        <span
                          className={`text-sm transition-all duration-300 ${
                            !isOpen && 'hidden'
                          }`}
                        >
                          {dropdownLink.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={link.href}
                className={`flex items-center py-2.5 px-4 rounded-lg transition duration-200 bg-white hover:bg-blue-50 hover:text-blue-700 hover:shadow-xl transform hover:scale-105`}
              >
                <link.icon className="w-6 h-6 mr-3 text-blue-800" />
                <span
                  className={`transition-all duration-300 ${
                    !isOpen && 'hidden'
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            )}
            <div className="absolute bottom-full mb-2 hidden group-hover:flex justify-center w-full">
              <div className="relative bg-blue-600 text-white text-xs rounded py-1 px-3 shadow-lg">
                <span>{link.tooltip}</span>
                <div className="absolute w-3 h-3 left-1/2 transform -translate-x-1/2 top-full">
                  <svg
                    className="fill-current text-blue-600"
                    viewBox="0 0 100 100"
                    width="100%"
                    height="100%"
                  >
                    <polygon points="50,0 100,100 0,100" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

// const Sidebar = () => {
//     return (
//         <div className="bg-gray-800 text-white h-screen fixed top-0 left-0 w-[20%] flex-shrink-0">
//             <div className="p-4">
//                 <h1 className="text-2xl font-bold">Dashboard</h1>
//                 <ul className="mt-4">
//                     <Link className="mb-2" href="/admin-dashboard/admin-profile">
//                         <p  className="block py-2 px-4 hover:bg-gray-700">Edit Admin</p>
//                     </Link>
//                     <Link className="mb-2" href="/admin-dashboard/student-details" >
//                         <p className="block py-2 px-4 hover:bg-gray-700">Add Students</p>
//                     </Link>
//                     <Link className="mb-2" href="/admin-dashboard/add-teachers" >
//                         <p className="block py-2 px-4 hover:bg-gray-700">Add Teacher</p>
//                     </Link>
//                     <Link className="mb-2" href="/admin-dashboard/all-teachers" >
//                         <p className="block py-2 px-4 hover:bg-gray-700">All Teachers List</p>
//                     </Link>
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;
