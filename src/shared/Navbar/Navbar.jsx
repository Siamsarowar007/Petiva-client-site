import { use } from "react";
import { NavLink, useNavigate } from "react-router";
import { FaBell } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const Navbar = () => {
  const { user, signOutUser} = use(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOutUser();
    navigate("/join-us");
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/" className="font-medium" activeclassname="text-orange-500">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-post" className="font-medium" activeclassname="text-orange-500">
          All Post
        </NavLink>
      </li>
      <li>
        <NavLink to="/membership" className="font-medium" activeclassname="text-orange-500">
          Membership
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 sticky top-0 z-50">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">
            {navItems}
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="btn btn-ghost text-xl font-bold">
          Pet<span className="text-orange-500">House</span>
        </NavLink>
      </div>

      {/* Navbar Center (Desktop Menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-3">
        {/* Notification Icon */}
        {user && (
          <button className="btn btn-ghost text-xl" title="Notifications">
            <FaBell />
          </button>
        )}

        {/* Join Us or Profile */}
        {!user ? (
          <NavLink to="/join-us" className="btn btn-outline btn-sm">
            Join Us
          </NavLink>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-orange-400 ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL || "/default-avatar.png"} alt="profile" title={user.displayName || 'User'} />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[10] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li className="text-center font-semibold">{user.displayName || 'User'}</li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500">
                  <AiOutlineLogout /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

