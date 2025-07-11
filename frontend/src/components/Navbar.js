import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo + Title */}
          <div className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="text-xl font-bold tracking-wide">
              Sappattu Wallet
            </span>
          </div>

          {/* Right: Navigation Links */}
          <div className="space-x-8 flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-white pb-1 text-white font-semibold"
                  : "text-white hover:border-b-2 hover:border-white pb-1 transition"
              }
              end
            >
              Home
            </NavLink>

            <NavLink
              to="/summary"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-white pb-1 text-white font-semibold"
                  : "text-white hover:border-b-2 hover:border-white pb-1 transition"
              }
            >
              Summary
            </NavLink>

            <NavLink
              to="/add-member"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-white pb-1 text-white font-semibold"
                  : "text-white hover:border-b-2 hover:border-white pb-1 transition"
              }
            >
              Members
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
