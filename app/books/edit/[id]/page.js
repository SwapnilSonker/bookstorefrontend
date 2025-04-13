// app/books/edit/[id]/page.js
'use client';

import { useEffect, useState , use } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import MainLayout from '../../../../components/layout/MainLayout';
import BookForm from '../../../../components/books/BookForm';
import { isAuthenticated, getUserFromStorage } from '../../../../lib/auth';
import { getBookById } from '../../../../lib/api';

export default function EditBookPage({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params)
  const { id } = unwrappedParams.id;
  const [loading, setLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      toast.error('Please login to edit a book');
      router.push('/auth/login');
      return;
    }
    
    // Check if user owns the book
    const checkBookOwnership = async () => {
      try {
        setLoading(true);
        const book = await getBookById(id);
        const user = getUserFromStorage();
        
        if (book.ownerId !== user.id) {
          toast.error('You can only edit your own books');
          router.push('/dashboard/owner');
          return;
        }
        
        setCanEdit(true);
      } catch (error) {
        console.error('Error checking book ownership:', error);
        toast.error('Failed to verify book ownership');
        router.push('/dashboard/owner');
      } finally {
        setLoading(false);
      }
    };
    
    checkBookOwnership();
  }, [id, router]);
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }
  
  if (!canEdit) {
    return null; // Will redirect from useEffect
  }
  
  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Edit Book</h1>
        <BookForm bookId={id} />
      </div>
    </MainLayout>
  );
}