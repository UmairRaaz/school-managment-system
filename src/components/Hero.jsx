'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import backgroundImage from '../../public/images/profile/school.jpg'; // Replace with your background image path

const Hero = () => {
  return (
    <div className="w-full h-screen relative mt-20 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
        {/* <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Welcome to Zia's School
        </motion.h1> */}
        {/* <motion.p
          className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
        >
          Our mission is to provide a quality education that fosters growth and development in every student. Join us on our journey to excellence.
        </motion.p>
        <motion.p
          className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 1 }}
        >
          We believe in nurturing a positive learning environment that encourages creativity and critical thinking.
        </motion.p> */}
      </div>
    </div>
  );
};

export default Hero;
