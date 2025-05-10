
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 bg-white border-t border-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} OKRify. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm text-gray-500 hover:text-okr-blue transition-colors">
              Home
            </Link>
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-okr-blue transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-okr-blue transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
