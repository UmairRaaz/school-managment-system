// components/AboutUs.jsx
import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-white">
      <div className="container mx-auto flex items-center justify-between p-4 lg:p-8">
        {/* Left Column - Text Content */}
        <div className="max-w-lg flex flex-col justify-center text-white">
          <h1 className="text-4xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            We Provide Quality Of Education
          </h1>
          <p className="text-base lg:text-lg mb-8">
            At Zia&rsquo;s School, we are committed to providing a quality education that fosters growth and development in every student. We believe in nurturing a positive learning environment that encourages creativity and critical thinking.
          </p>
        </div>

        {/* Right Column - Image */}
        <div className="flex-shrink-0 w-60 h-60 md:w-80 md:h-80">
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