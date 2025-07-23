import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const ErrorPage = ({ errorMessage = "An unexpected error occurred.", errorDetails = "We're sorry, but something went wrong on our end. Please try again later or contact support if the issue persists." }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,   
      mirror: false, 
    });
    AOS.refresh(); 
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 md:p-12 max-w-xl w-full text-center border border-gray-200"
        data-aos="fade-up" 
        data-aos-duration="1200"
      >
      
        <div className="mb-6" data-aos="fade-down" data-aos-delay="200">
       
          <h2 className="text-3xl font-extrabold text-gray-800">Petiva</h2>
        </div>

        <div
          className="text-yellow-500 text-6xl md:text-7xl mb-6 flex items-center justify-center space-x-2"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          
          <span>&#9888;&#65039;</span> 
         
        </div>

        <h1
          className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 leading-tight"
          data-aos="fade-right"
          data-aos-delay="600"
        >
          Oops! Something Went Wrong.
        </h1>

        <p
          className="text-lg text-gray-700 mb-6 leading-relaxed"
          data-aos="fade-left"
          data-aos-delay="800"
        >
          {errorMessage}
        </p>

        <p
          className="text-md text-gray-600 mb-8"
          data-aos="fade-left"
          data-aos-delay="900"
        >
          {errorDetails}
        </p>

        <div
          className="flex flex-col sm:flex-row justify-center gap-4"
          data-aos="fade-up"
          data-aos-delay="1000"
        >
          <a
            href="/"
            // Updated primary button colors
            style={{ backgroundColor: '#4CA3B8', borderColor: '#4CA3B8' }}
            className="px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:bg-[#3b889e] transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Go to Homepage
          </a>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Refresh Page
          </button>
          <a
            href="/support"
            className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;