// components/AboutUs.jsx
import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-white">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between p-4 lg:p-8">
        {/* Left Column - Text Content */}
        <div className="max-w-lg flex flex-col justify-center text-white mb-8 lg:mb-0 lg:mr-8 px-6 lg:px-0">
          <h1 className="text-4xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4 ">
            We Provide Quality Of Education
          </h1>
          <p className="text-base lg:text-lg mb-8">
            At Zia&rsquo;s School, we are committed to providing a quality education that fosters growth and development in every student. We believe in nurturing a positive learning environment that encourages creativity and critical thinking.
          </p>
        </div>

        {/* Right Column - Image */}
        <div className="w-full max-w-xs lg:max-w-sm flex-shrink-0">
          <Image
            src="/images/profile/about2.jpg"
            alt="Student"
            layout="responsive"
            width={400}
            height={400}
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
