// app/error.js
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong!</h1>
        <p className="text-xl text-gray-600 max-w-md mb-8">
          An unexpected error has occurred. We&apos;re sorry for the inconvenience.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => reset()}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
          <Link 
            href="/" 
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}