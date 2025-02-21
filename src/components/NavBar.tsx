
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { VaultIcon } from 'lucide-react';

const NavBar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/50 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <VaultIcon className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">Saving Vault</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`text-sm transition-colors ${
                isActive('/') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className={`text-sm transition-colors ${
                isActive('/dashboard') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
