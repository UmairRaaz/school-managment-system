// components/HeroSection.js
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Our School</h1>
        <p className="text-lg mb-8">
          Providing quality education since 1980
        </p>
        <div className="flex justify-center">
          <a
            href="#"
            className="bg-white text-indigo-600 hover:text-indigo-700 py-3 px-8 rounded-full shadow-md text-lg font-medium transition duration-300 ease-in-out inline-block"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
