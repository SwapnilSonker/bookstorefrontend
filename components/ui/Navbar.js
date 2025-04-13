'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUserFromStorage, removeUserFromStorage, isBookOwner } from '../../lib/auth';

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    setUser(getUserFromStorage());
  }, []);
  
  const handleLogout = () => {
    removeUserFromStorage();
    setUser(null);
    router.push('/');
  };
  
  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              BookExchange
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/books" className="hover:text-blue-200">
                Browse Books
              </Link>
              {user && isBookOwner() && (
                <Link href="/dashboard/owner" className="hover:text-blue-200">
                  My Listings
                </Link>
              )}
              {user && !isBookOwner() && (
                <Link href="/dashboard/seeker" className="hover:text-blue-200">
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span>Hi, {user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link 
                  href="/auth/login" 
                  className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800"
                >
                  Login
                </Link>
                <Link 
                  href="/auth/register" 
                  className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;