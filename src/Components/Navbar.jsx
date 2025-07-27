import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navData = [
    { title: "Book Appointment", link: "book-appointment" },
    { title: "Request Help", link: "requesthelp" },
    { title: "My Request", link: "my-request" },
    { title: "Profile", link: "profile" },
    { title: "Setting", link: "setting" },
  ];

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold w-48">
          <Link to="/home">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navData.map((v, id) => (
            <Link key={id} to={`/${v.link}`} className="hover:text-yellow-300">
              {v.title}
            </Link>
          ))}

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hover:text-yellow-300"
            >
              Login
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded-md z-50">
                <span
                  onClick={() => {
                    localStorage.clear();
                    setDropdownOpen(false);
                    setMenuOpen(false);
                    setTimeout(() => navigate("/"), 100);
                    // navigate("/");
                  }}
                  className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  User Login
                </span>
                <span
                  onClick={() => {
                    localStorage.clear();
                    setDropdownOpen(false);
                    setMenuOpen(false);
                    setTimeout(() => navigate("/admin-login"), 100);
                    // navigate("/admin-login");
                  }}
                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  Admin Login
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4 pb-4">
          {navData.map((v, id) => (
            <Link
              key={id}
              to={`/${v.link}`}
              className="block text-sm hover:text-yellow-300"
              onClick={() => setMenuOpen(false)}
            >
              {v.title}
            </Link>
          ))}

          <span
            className="block cursor-pointer text-sm hover:text-yellow-300"
            onClick={() => {
              localStorage.clear();
              setDropdownOpen(false);
              navigate("/");
            }}
          >
            User Login
          </span>
          <span
            className="block cursor-pointer text-sm hover:text-yellow-300"
            onClick={() => {
              setMenuOpen(false);
              navigate("/admin-login");
            }}
          >
            Admin Login
          </span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
