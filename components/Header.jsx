'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, loading } = useAuth();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  // Define navigation items based on authentication status
  const getNavItems = () => {
    if (!isAuthenticated || loading) {
      return [
        { name: 'Home', href: '/' },
        { name: 'Login', href: '/login' },
        { name: 'Sign Up', href: '/signup' },
      ];
    }
    
    return [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Profile', href: '/profile' },
    ];
  };

  const navItems = getNavItems();

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 max-w-6xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="text-xl font-bold flex items-center">
            <span>Todo App</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                  pathname === item.href 
                    ? 'bg-indigo-700 font-medium' 
                    : 'hover:bg-indigo-500'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated && !loading && (
              <div className="relative group">
                <button className="flex items-center space-x-1 focus:outline-none">
                  <FaUser className="mr-2" />
                  <span>{user?.name || user?.email || 'User'}</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 hidden group-hover:block z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {!isAuthenticated && !loading && (
              <Link href="/login" className="mr-4 text-sm">
                Login
              </Link>
            )}
            
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-indigo-500">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md ${
                    pathname === item.href 
                      ? 'bg-indigo-700 font-medium' 
                      : 'hover:bg-indigo-500'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {isAuthenticated && !loading && (
                <>
                  <div className="px-3 py-2 border-t border-indigo-500">
                    <div className="flex items-center mb-2">
                      <FaUser className="mr-2" />
                      <span className="font-medium">{user?.name || user?.email || 'User'}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-indigo-500 flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;