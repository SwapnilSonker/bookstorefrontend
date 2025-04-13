// app/books/[id]/page.js
'use client';

import { useEffect, useState , use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import MainLayout from '../../../components/layout/MainLayout';
import Button from '../../../components/ui/Button';
import { getBookById } from '../../../lib/api';
import { getUserFromStorage, isAuthenticated } from '../../../lib/auth';

export default function BookDetailPage({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params) 
  const { id } = unwrappedParams.id;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = getUserFromStorage();
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        toast.error('Failed to load book details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBook();
  }, [id]);
  
  const handleContactOwner = () => {
    if (!isAuthenticated()) {
      toast.error('Please login to contact the book owner');
      router.push('/auth/login');
      return;
    }
    
    // If contactInfo is available, display it
    if (book.contactInfo) {
      toast.success(`Owner's contact: ${book.contactInfo}`);
    } else {
      toast.info('Contact information not provided by the owner');
    }
  };
  
  const isOwner = user && book && user.id === book.ownerId;
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }
  
  if (!book) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-700">Book not found</h2>
          <p className="mt-2 text-gray-500">The book you're looking for might have been removed or doesn't exist.</p>
          <Button
            onClick={() => router.push('/books')}
            variant="primary"
            className="mt-6"
          >
            Back to Books
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const displayImage = book.coverImageUrl 
    ? `${process.env.NEXT_PUBLIC_API_URL}${book.coverImageUrl}`
    : '/images/placeholder-cover.jpg';
  
  return (
    <MainLayout>
      <div className="py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 relative min-h-[300px]">
              <Image 
                src={displayImage}
                alt={book.title || "image"}
                fill
                style={{ objectFit: 'cover' }}
                className="w-full h-full"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold">{book.title}</h1>
              <p className="text-xl text-gray-600 mt-2">By {book.author}</p>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Genre</h3>
                  <p className="mt-1">{book.genre || 'Not specified'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="mt-1">{book.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Availability</h3>
                  <p className="mt-1">
                    {book.isAvailable ? (
                      <span className="text-green-600">Available for exchange/borrow</span>
                    ) : (
                      <span className="text-red-600">Currently unavailable</span>
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Listed By</h3>
                  <p className="mt-1">{book.ownerName || 'Book Owner'}</p>
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                {!isOwner && book.isAvailable && (
                  <Button onClick={handleContactOwner} variant="primary">
                    Contact Owner
                  </Button>
                )}
                
                {isOwner && (
                  <>
                    <Button onClick={() => router.push(`/books/edit/${book.id}`)} variant="secondary">
                      Edit Listing
                    </Button>
                  </>
                )}
                
                <Button onClick={() => router.back()} variant="secondary">
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}