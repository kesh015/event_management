import React from 'react';
import { Calendar, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-[#B0BABF] pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-[#CF2D2D]" />
              <span className="ml-2 text-lg font-semibold text-[#1E2022]">EventHub</span>
            </div>
            <p className="mt-3 text-[#989090] text-sm">
              Discover and attend exciting events happening around you.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-[#989090] hover:text-[#CF2D2D]">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#989090] hover:text-[#CF2D2D]">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#989090] hover:text-[#CF2D2D]">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-[#1E2022] tracking-wider uppercase">Site Map</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm text-[#989090] hover:text-[#CF2D2D]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm text-[#989090] hover:text-[#CF2D2D]">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-[#989090] hover:text-[#CF2D2D]">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-sm text-[#989090] hover:text-[#CF2D2D]">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-[#1E2022] tracking-wider uppercase">Categories</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-[#989090] hover:text-[#CF2D2D]">
                  Concerts
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#989090] hover:text-[#CF2D2D]">
                  Conferences
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#989090] hover:text-[#CF2D2D]">
                  Workshops
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#989090] hover:text-[#CF2D2D]">
                  Sport Events
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-[#1E2022] tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#989090] mt-0.5 flex-shrink-0" />
                <span className="ml-2 text-sm text-[#989090]">123 Event St, San Francisco, CA 94123</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#989090] flex-shrink-0" />
                <span className="ml-2 text-sm text-[#989090]">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#989090] flex-shrink-0" />
                <span className="ml-2 text-sm text-[#989090]">info@eventhub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#B0BABF]">
          <p className="text-center text-xs text-[#989090]">
            &copy; {new Date().getFullYear()} EventHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;