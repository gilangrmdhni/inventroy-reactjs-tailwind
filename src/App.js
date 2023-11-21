// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import BrandList from './components/BrandList';
import Login from './components/Login';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    alert(`Selamat datang, ${username}!`);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsSidebarOpen(false);
  };
  return (
    <Router>
      {isLoggedIn && <Navbar toggleSidebar={toggleSidebar} isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      {isLoggedIn && <Sidebar isOpen={isSidebarOpen} onLogout={handleLogout} />}
      <div className={`flex h-screen overflow-hidden ${isLoggedIn ? 'ml-64' : 'ml-0'}`}>
        <div className="flex-1 transition-all duration-300">
          <div className="p-4">
            {isLoggedIn ? (
              <Routes>
                <Route path="/product-form" element={<ProductForm />} />
                <Route path="/product-list" element={<ProductList />} />
                <Route path="/brand-list" element={<BrandList />} />
              </Routes>
            ) : (
              <Login path="/login" onLogin={handleLogin} />
            )}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
