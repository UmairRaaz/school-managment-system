'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginAction } from './server-actions/loginAction';
import Image from 'next/image';
import { FaSpinner } from 'react-icons/fa';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [errorMessage, seterrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    seterrorMessage(null);
    try {
      const response = await LoginAction(data);
      console.log("response", response);
      // Handle successful login here (e.g., redirect)
    } catch (error) {
      seterrorMessage("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='flex items-center justify-center h-full gradient-form bg-white md:h-screen'>
      <div className='container py-12 px-6 h-full'>
        <div className='flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
          <div className=''>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0'>
                <div className='px-4 md:px-0 w-full'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <Image
                        src="/images/logo/logo.svg"
                        alt='School Logo'
                        width={40}
                        height={40}
                        className='mx-auto'
                      />
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Go to Your Account
                      </h4>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <p className='mb-4 text-center'>
                        Please Login to access your account!
                      </p>
                      <div className='mb-4'>
                        <input
                          type='text'
                          id='username'
                          {...register("username", { required: "Username is required" })}
                          className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                          placeholder='Username'
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                      </div>
                      <div className='mb-4'>
                        <input
                          type='password'
                          id='password'
                          {...register("password", { required: "Password is required" })}
                          className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                          placeholder='Password'
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                      </div>
                      <div className='text-center pt-1 pb-1'>
                        <button
                          type="submit"
                          className={`bg-gradient-to-r from-green-400 to-blue-500 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex items-center justify-center">
                              <FaSpinner className="animate-spin mr-2" /> Loading...
                            </span>
                          ) : 'Login'}
                        </button>
                      </div>
                      <div className='flex items-center justify-end '>
                        <a href='/' className='inline-block py-8 text-green-600 font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out'>
                          Forgot Password?
                        </a>
                      </div>
                    </form>
                    {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
