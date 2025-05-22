import React, { useState } from 'react';
import { Menu, X, Calendar, UserCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Calendar className="h-8 w-8 text-[#CF2D2D]" />
              <span className="ml-2 text-xl font-semibold text-[#1E2022]">EventHub</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'text-[#CF2D2D] border-b-2 border-[#CF2D2D]' 
                  : 'text-[#1E2022] hover:text-[#CF2D2D]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/events"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/events') 
                  ? 'text-[#CF2D2D] border-b-2 border-[#CF2D2D]' 
                  : 'text-[#1E2022] hover:text-[#CF2D2D]'
              }`}
            >
              Events
            </Link>
            <Link
              to="/login"
              className="ml-4 px-4 py-2 rounded text-white bg-[#CF2D2D] hover:bg-opacity-90 transition-colors text-sm font-medium flex items-center"
            >
              <UserCircle className="h-4 w-4 mr-1" />
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#1E2022] hover:text-[#CF2D2D] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg absolute w-full">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'text-[#CF2D2D] border-l-4 border-[#CF2D2D] pl-2' 
                  : 'text-[#1E2022] hover:text-[#CF2D2D]'
              }`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/events"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/events') 
                  ? 'text-[#CF2D2D] border-l-4 border-[#CF2D2D] pl-2' 
                  : 'text-[#1E2022] hover:text-[#CF2D2D]'
              }`}
              onClick={toggleMenu}
            >
              Events
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#1E2022] hover:text-[#CF2D2D]"
              onClick={toggleMenu}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;