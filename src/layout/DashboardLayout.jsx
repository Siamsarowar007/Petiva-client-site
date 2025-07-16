import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
// import ThemeToggle from "../pages/ThemeToggle/ThemeToggle"; // Uncomment if needed

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const activeClass = "text-blue-600 font-medium";
  const inactiveClass = "text-gray-700";

  return (
    <div className="flex min-h-screen relative">
      {/* Hamburger button - mobile only */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 btn btn-ghost text-xl"
      >
        {isSidebarOpen ? <IoClose /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-base-300 w-64 h-full lg:h-screen shadow-md p-5 space-y-4 absolute lg:static z-40 top-0 left-0 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex justify-between">
          <NavLink to="/">
            <div className=" items-center cursor-pointer">
              <img src="/Petiva-logo.png" alt="Petiva Logo" className="w-16 h-16 object-contain" />
              <h4 className="text-[#4CA3B8] text-2xl font-bold m-0">Petiva</h4>
            </div>
          </NavLink>
          {/* <ThemeToggle /> */}
        </div>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard/dashboard-home"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/payment-membership"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Membership Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-post"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Add Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-posts"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              My Posts
            </NavLink>
          </li>
          <h2 className="font-bold text-lg my-6">Admin</h2>
          <li>
            <NavLink
              to="/dashboard/admin-profile"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Admin Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-users"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/announcement"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Make Announcement
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin-report"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Reported Comments
            </NavLink>
          </li>


        </ul>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-6 overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
