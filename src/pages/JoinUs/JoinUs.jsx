import React from "react";
import { useSearchParams } from "react-router";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";


const JoinUs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || "login"; 
  const switchToLogin = () => setSearchParams({ type: "login" });
  const switchToRegister = () => setSearchParams({ type: "register" });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-50 p-6 gap-10">
      
      {/* Left Side: Website Description */}
      <div className="max-w-md text-center lg:text-left space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Welcome to PetHouse
        </h1>
        <p className="text-gray-600 text-lg">
          Discover the best pet care platform to find loving homes, memberships, and community support.
          Join thousands of happy pet lovers today!
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Easy and fast registration</li>
          <li>Exclusive membership benefits</li>
          <li>Real-time notifications and updates</li>
          <li>Connect with a loving pet community</li>
        </ul>
      </div>

      {/* Right Side: Login/Register Tabs and Forms */}
      <div className="w-full bg-gray-50  rounded-lg shadow-sm ">
        {/* Tabs */}
        <div className="flex justify-center  space-x-4">
          <button
            onClick={switchToLogin}
            className={`px-4 py-2 font-semibold rounded ${
              type === "login"
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={switchToRegister}
            className={`px-4 py-2 font-semibold rounded ${
              type === "register"
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Section */}
        <div>
          {type === "login" ? <Login></Login> : <Register></Register>}
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
