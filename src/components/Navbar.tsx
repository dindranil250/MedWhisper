import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Menu, X, FileText } from 'lucide-react';

interface NavbarProps {
  scrollToFeatures: () => void;
  scrollToDoctors: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToFeatures, scrollToDoctors }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <button 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
            <div className="hidden md:flex md:items-center md:space-x-4">
              <button 
                onClick={scrollToFeatures}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                About App
              </button>
              <button 
                onClick={scrollToDoctors}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                About Doctor
              </button>
              <Link 
                to="/conversation"
                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Start Now
              </Link>
              <Link 
                to="/reports"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center"
              >
                <FileText className="h-4 w-4 mr-1" />
                View Previous Reports
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">MedWhisper</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button
            onClick={() => {
              scrollToFeatures();
              setIsMenuOpen(false);
            }}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 w-full text-left"
          >
            About App
          </button>
          <button
            onClick={() => {
              scrollToDoctors();
              setIsMenuOpen(false);
            }}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 w-full text-left"
          >
            About Doctor
          </button>
          <Link
            to="/conversation"
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 w-full text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Start Now
          </Link>
          <Link
            to="/reports"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 w-full text-left flex items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <FileText className="h-4 w-4 mr-2" />
            View Previous Reports
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;