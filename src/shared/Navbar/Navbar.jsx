import { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { FaBell } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import useAxios from "../../hooks/useAxios";
import moment from "moment";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const axios = useAxios();

  const [unread, setUnread] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ✅ Unread announcements fetch
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get("/announcements");
        const all = res.data;
        const readIds = JSON.parse(localStorage.getItem("read_announcements")) || [];

        const unreadAnnouncements = all.filter(a => !readIds.includes(a._id));
        setUnread(unreadAnnouncements);
      } catch (err) {
        console.error(" Failed to fetch announcements", err);
      }
    };

    if (user) fetchAnnouncements();
  }, [user]);

  // ✅ Mark all as read
  const handleMarkAllRead = () => {
    const ids = unread.map(a => a._id);
    localStorage.setItem("read_announcements", JSON.stringify([...ids, ...(JSON.parse(localStorage.getItem("read_announcements")) || [])]));
    setUnread([]); // Remove from UI
  };

  const handleLogout = async () => {
    await signOutUser();
    navigate("/join-us");
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/" className="font-medium" activeclassname="text-orange-500">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-post" className="font-medium" activeclassname="text-orange-500">All Post</NavLink>
      </li>
      <li>
        <NavLink to="/membership" className="font-medium" activeclassname="text-orange-500">Membership</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 sticky top-0 z-50">
      <div className="navbar-start">
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

        <NavLink to="/" className="btn btn-ghost text-xl font-bold">
          Pet<span className="text-orange-500">House</span>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-3 relative">
        {/*  Bell Icon */}
        {user && (
          <div className="relative">
            <button
              className="btn btn-ghost text-xl relative"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              title="Notifications"
            >
              <FaBell />
              {unread.length > 0 && (
                <span className="badge badge-sm bg-red-500 text-white absolute -top-1 -right-1">
                  {unread.length}
                </span>
              )}
            </button>

            {/*  Notification Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 shadow-lg rounded-md z-50">
                <div className="px-4 py-2 font-semibold border-b">Notifications</div>
                <div className="max-h-64 overflow-y-auto">
                  {unread.length > 0 ? (
                    unread.map(a => (
                      <div key={a._id} className="p-3 border-b">
                        <p className="font-medium">{a.title}</p>
                        <p className="text-xs text-gray-500">{moment(a.createdAt).fromNow()}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-gray-500">No new notifications</div>
                  )}
                </div>
                {unread.length > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-blue-500 hover:underline w-full py-2 text-sm"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/*  Login/Profile */}
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
