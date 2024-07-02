'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { AiFillNotification } from "react-icons/ai";
import { FaAward } from "react-icons/fa";
import { MdLogout } from "react-icons/md";





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
  FaCog,
} from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showDropdown, setShowDropdown] = useState(Array(8).fill(false));
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState({
    username: "",
    image: "/profile.png",
    email: "",
    id: ""
  });

  useEffect(() => {
    if (session) {
      setUserDetails({
        username: session?.username || "",
        image: session?.image || "/profile.png",
        email: session?.email || "",
        id: session?._id || "",
      });
    }
  }, [session]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    
    // Reset dropdown visibility when closing sidebar
    if (!isOpen) {
      setShowDropdown(Array(8).fill(false));
    }
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
      href: "/admin-dashboard",
      icon: FaTachometerAlt,
      label: "Dashboard",
      color: "blue",
    },
    {
      href: "/",
      icon: FaUserGraduate,
      label: "Students",
      color: "blue",
      hasDropdown: true,
      dropdownLinks: [
        { href: "/admin-dashboard/add-student", label: "Add Student" },
        { href: "/admin-dashboard/all-students", label: "Manage Students" },
        
      ],
    },
    {
      href: "/",
      icon: FaUsers,
      label: "Teachers",
      color: "blue",
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
      hasDropdown: true,
      dropdownLinks: [
        { href: "/admin-dashboard/admin-take-attendances", label: "Take Attendance" },
        { href: "/admin-dashboard/admin-view-attendances", label: "View Attendance" },
        { href: "/admin-dashboard/all-attendances", label: "Edit Attendance" },
       
      
      ],
    },
    {
      href: "/",
     
      icon: MdAttachMoney,
      label: "Fees",
      color: "blue",
      hasDropdown: true,
      dropdownLinks: [
        { href: "/admin-dashboard/admin-add-class-fees", label: "Add Fees" },
    
      { href: "/admin-dashboard/all-student-fees", label: "Manage Fees" },
  
      
      ],

    },
   
   
    {
      href: "/",
      icon: IoIosNotifications,
      label: "Class Notification",
      color: "blue",
      hasDropdown: true,
      dropdownLinks: [
        { href: "/admin-dashboard/admin-add-class-notification", label: "Add Class Notification" },
        { href: "/admin-dashboard/adminview-all-class-notification", label: "Manage Notification" },
      ],
    },
    {
      href: "/",
      icon: AiFillNotification,
      label: "Public Notification",
      color: "blue",
      hasDropdown: true,
      dropdownLinks: [
        { href: "/admin-dashboard/admin-add-public-notification", label: "Add Public Notification" },
        { href: "/admin-dashboard/adminview-all-public-notification", label: "Manage Notification" },
    
      ],
    },
    {
      href: "/",
      icon: FaAward,
      label: "Result",
      color: "blue",
      hasDropdown: true,
      dropdownLinks: [
        { href: "/admin-dashboard/add-results", label: "Add Result" },
        { href: "/admin-dashboard/all-results", label: "Manage Result" },
      ],
      
    },
    {
      href: "/api/auth/signout",
      icon: MdLogout,
      label: "Logout",
      color: "red",
    },
  ];

  const teacherNavLinks = [
    {
      href: "/admin-dashboard",
      icon: FaTachometerAlt,
      label: "Dashboard",
      color: "blue",
    },

    {
      href: "/",
      icon: FaBoxes,
      label: "Attendance",
      color: "blue",
      hasDropdown: true,
      dropdownLinks: [
        { href: `/admin-dashboard/take-attendance/${userDetails?.id}`, label: "Take Attendance" },
        { href: `/admin-dashboard/view-attendance`, label: "View Attendance" },
      ],
    },

    {
      href: "/",
      icon: IoIosNotifications,
      label: "Class Notification",
      color: "blue",
      hasDropdown: true,
      dropdownLinks: [
        { href: '/admin-dashboard/teacher-add-notifications' , label: "Add Class Notification" },
        { href: '/admin-dashboard/teacher-view-notifications' , label: "Manage Notification" },
      ],
    },
    {
      href: "/",
      icon: FaAward,
      label: "Result",
      color: "blue",
      hasDropdown: true,
      dropdownLinks: [
        { href: "/admin-dashboard/add-results", label: "Add Result" },
        { href: "/admin-dashboard/all-results", label: "All Result" },
      ],
      
    },
    {
      href: '/api/auth/signout',
      icon: FaUsers,
      label: 'Logout',
      color: 'red',
    },
  ];

  const studentNavLinks = [
    {
      href: '/',
      icon: FaTachometerAlt,
      label: 'Dashboard',
      color: 'blue',
    },
    {
      href: '/student-dashboard/view-grades',
      icon: FaUserGraduate,
      label: 'View Grades',
      color: 'blue',
    },
    {
      href: `/admin-dashboard/view-attendance`,
      icon: FaUserGraduate,
      label: 'View Attendance',
      color: 'blue',
    },
    {
      href: `/admin-dashboard/student-all-fees`,
      icon: FaUserGraduate,
      label: 'Your Fees Data',
      color: 'blue',
    },
    {
      href: "/",
      icon: FaAward,
      label: "Result",
      color: "blue",
      hasDropdown: true,
      dropdownLinks: [
        { href: "/admin-dashboard/all-results", label: "All Result" },
      ],
      
    },
    {
      href: '/admin-dashboard/student-notifications',
      icon: FaUserGraduate,
      label: 'Notifications',
      color: 'blue',
    },
    {
      href: '/api/auth/signout',
      icon: FaUsers,
      label: 'Logout',
      color: 'red',
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
      className={`bg-[#0e0e0e] h-screen ${
        isOpen ? 'w-64' : 'w-16'
      } duration-500 text-gray-100 px-4 fixed left-0 top-0 mt-20 pb-40 overflow-y-auto`}
    >
      <style>
        {`
          /* Scrollbar Styles */
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background-color: #f1f1f1;
          }
          ::-webkit-scrollbar-thumb {
            background-color: blue;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: #555;
          }
        `}
      </style>

      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {navLinks.map((link, index) => (
          <div className="relative group" key={index}>
            {link.hasDropdown ? (
              <>
                <div
                  className={`flex items-center text-sm gap-3.5 font-medium p-2 rounded-md cursor-pointer ${
                    link.margin ? 'mt-5' : ''
                  } hover:bg-gray-800`}
                  onClick={() => toggleDropdown(index)}
                >
                  {React.createElement(link.icon, { size: '20' })}
                  <h2
                    className={`whitespace-pre duration-500 ${
                      !isOpen && 'opacity-0 translate-x-28 overflow-hidden'
                    }`}
                  >
                    {link.label}
                  </h2>
                  <FaAngleDown
                    className={`ml-auto transition-transform duration-200 ${
                      showDropdown[index] ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {showDropdown[index] && isOpen && (
                  <div className="ml-5">
                    {link.dropdownLinks.map((dropdownLink, i) => (
                      <Link
                        href={dropdownLink.href}
                        key={i}
                        className={`flex items-center text-sm gap-3.5 font-medium p-2 rounded-md cursor-pointer hover:bg-gray-800`}
                      >
                        <FaAngleRight size={12} />
                        <span className="text-xs">{dropdownLink.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={link.href}
                className={`flex items-center text-sm gap-3.5 font-medium p-2 rounded-md cursor-pointer ${
                  link.margin ? 'mt-5' : ''
                } hover:bg-gray-800`}
              >
                {React.createElement(link.icon, { size: '20' })}
                <h2
                  className={`whitespace-pre duration-500 ${
                    !isOpen && 'opacity-0 translate-x-28 overflow-hidden'
                  }`}
                >
                  {link.label}
                </h2>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
