// src/components/Navbar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Toggle Sidebar Button */}
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <span className="text-white">User</span>
          <img
            src="https://placekitten.com/40/40"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
