// app/page.js
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Book Exchange Portal</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">
          Connect with book enthusiasts in your community. Share, exchange, and discover new books.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-3">Book Seekers</h2>
            <p className="text-gray-600 mb-4">
              Looking for books to borrow or exchange? Browse our collection and connect with book owners.
            </p>
            <Link 
              href="/books" 
              className="mt-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Books
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-3">Book Owners</h2>
            <p className="text-gray-600 mb-4">
              Share your books with the community. List books you're willing to lend or exchange.
            </p>
            <Link 
              href="/auth/register" 
              className="mt-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Start Sharing
            </Link>
          </div>
        </div>
        
        <div className="mt-12 text-gray-600">
          <h3 className="text-xl font-semibold mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-3 mx-auto">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-medium mb-2 text-center">Register an Account</h4>
              <p className="text-sm text-gray-500">
                Sign up as a book seeker or owner to get started with our community.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-3 mx-auto">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h4 className="font-medium mb-2 text-center">List or Browse Books</h4>
              <p className="text-sm text-gray-500">
                Owners can list their books, while seekers can browse the available collection.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-3 mx-auto">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h4 className="font-medium mb-2 text-center">Connect & Exchange</h4>
              <p className="text-sm text-gray-500">
                Connect with community members and arrange for book exchanges or borrowing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}