// app/not-found.js
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 max-w-md mb-8">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </MainLayout>
  );
}