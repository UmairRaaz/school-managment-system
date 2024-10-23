"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // Assuming you are using Next.js
import { FaTimes } from "react-icons/fa";

const galleryImages = [
  // Add your image URLs here
  "/image1.jpg",
  "/image2.jpg",
  "/image3.jpg",
  "/image4.jpg",
  "/image5.jpg",
  "/image6.jpg",
  "/image7.jpg",
  "/image8.jpg",
  "/image9.jpg",
  "/image10.jpg",
  "/image11.jpg",
  "/image12.jpg",
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  return (
    <div className="container-fluid py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          School Activities
        </h1>
        <p className="text-sm md:text-lg text-gray-700 max-w-3xl mx-auto">
          Explore the vibrant activities and moments from our school. Click on
          any image to view it in detail.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg"
            onClick={() => openModal(image)}
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              width={300} // Fixed width
              height={300} // Fixed height
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg font-semibold">View</p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-3xl w-full p-4 bg-white rounded-lg">
            <FaTimes
              className="absolute top-4 right-4 text-3xl text-gray-800 cursor-pointer"
              onClick={closeModal}
            />
            <Image
              src={selectedImage}
              alt="Selected gallery image"
              layout="responsive"
              width={1200}
              height={800}
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
