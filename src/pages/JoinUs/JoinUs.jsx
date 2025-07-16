import React from "react";
import { useSearchParams } from "react-router-dom";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";

const JoinUs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || "login";

  const switchToLogin = () => setSearchParams({ type: "login" });
  const switchToRegister = () => setSearchParams({ type: "register" });

  const isLogin = type === "login";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-50 p-6 gap-10">
      {/* Left Side: Dynamic Description */}
      <div className="max-w-md text-center lg:text-left space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-800">
          {isLogin ? "Welcome Back to PetHouse" : "Join PetHouse Today"}
        </h1>
        <p className="text-gray-600 text-lg">
          {isLogin
            ? "Access your dashboard, track your pets, and stay updated with the community."
            : "Register now to explore memberships, adopt pets, and connect with loving pet owners."}
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {isLogin ? (
            <>
              <li>Secure & fast login</li>
              <li>Manage your profile & pets</li>
              <li>Track your activity and messages</li>
              <li>Stay connected with pet owners</li>
            </>
          ) : (
            <>
              <li>Quick and easy registration</li>
              <li>Earn badges & join memberships</li>
              <li>Adopt or list pets</li>
              <li>Get real-time updates</li>
            </>
          )}
        </ul>
      </div>

      {/* Right Side: Auth Form */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={switchToLogin}
            className={`transition-all duration-300 px-5 py-2 font-semibold rounded-md shadow-sm ${
              isLogin
                ? "bg-[#4CA3B8] text-white scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={switchToRegister}
            className={`transition-all duration-300 px-5 py-2 font-semibold rounded-md shadow-sm ${
              !isLogin
                ? "bg-[#4CA3B8] text-white scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Section */}
        <div>
          {isLogin ? (
            <Login btnColor="bg-orange-500 hover:bg-orange-600" />
          ) : (
            <Register btnColor="bg-green-500 hover:bg-green-600" />
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
