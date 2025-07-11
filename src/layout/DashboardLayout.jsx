// import React from 'react';
// import { Outlet } from 'react-router';

// const DashboardLayout = () => {
//     return (
//         <div>
//             <h1>DashboardLayout</h1>
//             <Outlet></Outlet>
//         </div>
//     );
// };

// export default DashboardLayout;

// DashboardLayout.jsx

import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5"; 

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* 🔘 Hamburger button - mobile only */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 btn btn-ghost text-xl"
      >
        {isSidebarOpen ? <IoClose /> : <FaBars />}
      </button>

      {/* 📂 Sidebar */}
      <div
        className={`bg-white w-64 h-full shadow-md p-5 space-y-4 absolute lg:static z-40 top-0 left-0 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <NavLink to='/'><h2 className="text-xl font-bold  mt-12 mb-4">Petiva</h2></NavLink>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard/dashboard-home"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-medium" : "text-gray-700"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-medium" : "text-gray-700"
              }
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-post"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-medium" : "text-gray-700"
              }
            >
              Add Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-posts"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-medium" : "text-gray-700"
              }
            >
              My Posts
            </NavLink>
          </li>
          {/* Add more items here if needed */}
        </ul>
      </div>

      {/* 📄 Page Content */}
      <div className="flex-1 p-6 overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
