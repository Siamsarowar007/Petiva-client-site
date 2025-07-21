import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { NavLink } from 'react-router';

const Forbidden = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,    
      mirror: false, 
    });
    AOS.refresh(); 
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 md:p-12 max-w-xl w-full text-center"
        data-aos="fade-up" 
        data-aos-duration="1200"
      >
        {/* Optional: Your Forum Logo */}
        <div className="mb-6" data-aos="fade-down" data-aos-delay="200">
                                 <NavLink to="/">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <img src="/Petiva-logo.png" alt="Petiva Logo" className="w-16 h-16 -ml-4 object-contain" />
                                <h4 className="text-[#4CA3B8] text-3xl font-bold -ml-4">Petiva</h4>
                            </div>
                        </NavLink>
          <h2 className="text-3xl font-extrabold text-[#4CA3B8]">Petiva</h2>
        </div>

        <div
          className="text-red-500 text-6xl md:text-7xl mb-6 flex items-center justify-center space-x-2"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          {/* Universal "No Entry" symbol */}
          <span>&#128683;</span>
          {/* Or an alternative if you prefer, e.g., an X mark or a broken lock */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg> */}
        </div>

        <h1
          className="text-4xl sm:text-5xl font-extrabold text-red-600 mb-4 leading-tight"
          data-aos="fade-right"
          data-aos-delay="600"
        >
          Access Denied!
        </h1>

        <p
          className="text-lg text-gray-700 mb-6 leading-relaxed"
          data-aos="fade-left"
          data-aos-delay="800"
        >
          It seems you don't have the necessary permissions to view this page. This could be because the content is private, or you need to be logged in.
        </p>

        <p
          className="text-md text-gray-600 mb-8"
          data-aos="fade-left"
          data-aos-delay="900"
        >
          If you believe this is an error, please try logging in or contact our support team.
        </p>

        <div
          className="flex flex-col sm:flex-row justify-center gap-4"
          data-aos="fade-up"
          data-aos-delay="1000"
        >
          <a
            href="/"
            className="px-6 py-3 bg-[#4CA3B8] text-white font-semibold rounded-lg shadow-md hover:bg-[#3b889e] transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Go to Homepage
          </a>
          <a
            href="/join-us"
            className="px-6 py-3 bg-[#4CA3B8] text-white font-semibold rounded-lg shadow-md hover:bg-[#3b889e] transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Login / Register
          </a>
          <a
            href="/support"
            className="px-6 py-3 bg-[#4CA3B8] text-white font-semibold rounded-lg shadow-md hover:bg-[#3b889e] transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;