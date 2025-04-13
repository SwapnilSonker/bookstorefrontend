// app/dashboard/seeker/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import MainLayout from '../../../components/layout/MainLayout';
import { isAuthenticated, getUserFromStorage } from '../../../lib/auth';
import { getAllBooks } from '../../../lib/api';
import BookList from '../../../components/books/BookList';

export default function SeekerDashboardPage() {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      toast.error('Please login to access your dashboard');
      router.push('/auth/login');
      return;
    }
    
    // Fetch all books for the seeker
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error('Failed to load books');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, [router]);
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }
  
  const user = getUserFromStorage();
  
  return (
    <MainLayout>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-gray-600">Browse books available for exchange in your community.</p>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6">Available Books</h2>
        <BookList books={books.filter(book => book.isAvailable)} />
      </div>
    </MainLayout>
  );
}