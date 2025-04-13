// app/books/add/page.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import MainLayout from '../../../components/layout/MainLayout';
import BookForm from '../../../components/books/BookForm';
import { isAuthenticated, isBookOwner } from '../../../lib/auth';

export default function AddBookPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is authenticated and is a book owner
    if (!isAuthenticated()) {
      toast.error('Please login to add a book');
      router.push('/auth/login');
      return;
    }
    
    if (!isBookOwner()) {
      toast.error('Only book owners can add books');
      router.push('/dashboard/seeker');
      return;
    }
  }, [router]);
  
  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Add a New Book</h1>
        <BookForm />
      </div>
    </MainLayout>
  );
}