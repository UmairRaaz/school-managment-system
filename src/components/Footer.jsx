import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white py-6  items-center mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between  md:flex-row gap-3">
          {/* Company Info */}
          <div className="text-center md:text-left flex flex-wrap  flex-col w-full sm:w-[500px] mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Company</h3>
            <p className="text-gray-700 text-wrap ">We provide high-quality products and excellent customer service. Our goal is to meet your needs and exceed your expectations.</p>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <ul className="text-gray-700">
              <li className="mb-2">Email: muhammadmoon033@gmail.com</li>
              <li className="mb-2">Phone: +923144461778</li>
              <li className="mb-2">Address: Jamshoro Muet NICVD</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="text-center flex flex-col md:text-left  gap-2 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-start items-center text-blue-600">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mr-3 hover:text-green-800">
                <FaFacebook size={24} />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mr-3 hover:text-green-800">
                <FaTwitter size={24} />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mr-3 hover:text-green-800">
                <FaInstagram size={24} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className=" hover:text-green-800">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center mt-4 text-gray-700">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;