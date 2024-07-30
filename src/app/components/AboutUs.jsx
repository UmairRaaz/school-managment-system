'use client';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaGraduationCap, FaBuilding, FaHandsHelping } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div id='about' className="container-fluid min-h-screen flex flex-col items-center bg-gray-100 px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-600 mb-4">
          About Us
        </h1>
        <p className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
          At our school, we are committed to nurturing young minds and fostering a love for learning. 
          Our mission is to provide a holistic education that empowers students to excel academically, 
          socially, and emotionally.
        </p>
      </div>

      {/* Feature Cards Section */}
      <div className="flex flex-wrap justify-center gap-8 lg:gap-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg hover:bg-blue-50 transition-all duration-300 w-full sm:w-80 lg:w-72 xl:w-80"
        >
          <FaChalkboardTeacher className="text-5xl text-green-600 mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Experienced Faculty</h3>
          <p className="text-gray-600 text-center">
            Our team of dedicated teachers bring a wealth of knowledge and passion to the classroom, 
            ensuring each student receives personalized attention and support.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg hover:bg-blue-50 transition-all duration-300 w-full sm:w-80 lg:w-72 xl:w-80"
        >
          <FaBuilding className="text-5xl text-red-600 mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Online Records</h3>
          <p className="text-gray-600 text-center">
          Our modern school provides online access to student details, including attendance, results, fees, and notifications on our website. Each student will have their own personal portal.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg hover:bg-blue-50 transition-all duration-300 w-full sm:w-80 lg:w-72 xl:w-80"
        >
          <FaGraduationCap className="text-5xl text-blue-600 mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Holistic Education</h3>
          <p className="text-gray-600 text-center">
            We believe in a balanced approach to education, emphasizing academic excellence as well 
            as personal growth and character development.
          </p>
        </motion.div>

        

       
      </div>
    </div>
  );
};

export default AboutUs;
