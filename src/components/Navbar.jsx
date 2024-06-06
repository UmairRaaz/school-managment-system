'use client'
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          MyWebsite
        </div>
        <ul className="flex space-x-4">
          <Link href="/home">
            <p  className="text-white hover:text-gray-200">Home</p>
          </Link>
          <Link href="/about">
            <p  className="text-white hover:text-gray-200">About</p>
          </Link>
          <Link href="/services">
            <p  className="text-white hover:text-gray-200">Services</p>
          </Link>
          <Link href="contact">
            <p  className="text-white hover:text-gray-200">Contact</p>
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
