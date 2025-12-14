// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-auto">
      <div className="container mx-auto py-6 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Sweet Shop Management System. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-gray-600 hover:text-purple-600 transition text-sm">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 hover:text-purple-600 transition text-sm">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
