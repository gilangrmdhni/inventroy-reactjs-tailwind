// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onLogout }) => {
  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-900 text-white w-64 p-4 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Navbar in Sidebar */}
      <div className="text-xl font-bold mb-6">Inventory</div>

      {/* Navigation Links */}
      <ul className="mb-4">
        <li className="mb-2">
          <Link to="/product-list" className="block text-gray-300 hover:text-white">Produk</Link>
        </li>
        <li className="mb-2">
          <Link to="/brand-list" className="block text-gray-300 hover:text-white">Brand</Link>
        </li>
      </ul>

      {/* Additional Navbar Content */}
      <div className="mt-auto">
        <div className="border-t border-gray-700 pt-4">
          <button className="text-gray-400" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
