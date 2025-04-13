// app/dashboard/owner/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import MainLayout from '../../../components/layout/MainLayout';
import BookList from '../../../components/books/BookList';
import Button from '../../../components/ui/Button';
import { getUserBooks, deleteBook } from '../../../lib/api';
import { isAuthenticated, getUserFromStorage, isBookOwner } from '../../../lib/auth';

export default function OwnerDashboardPage() {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated and is a book owner
    if (!isAuthenticated()) {
      toast.error('Please login to access your dashboard');
      router.push('/auth/login');
      return;
    }
    
    if (!isBookOwner()) {
      toast.error('This dashboard is for book owners only');
      router.push('/dashboard/seeker');
      return;
    }
    
    // Fetch user's books
    const fetchUserBooks = async () => {
      try {
        const user = getUserFromStorage();
        const data = await getUserBooks(user.id);
        setBooks(data);
      } catch (error) {
        console.error('Error fetching user books:', error);
        toast.error('Failed to load your books');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserBooks();
  }, [router]);
  
  const handleDeleteBook = async (bookId) => {
    if (!confirm('Are you sure you want to delete this book?')) {
      return;
    }
    
    try {
      await deleteBook(bookId);
      toast.success('Book deleted successfully');
      // Update the books list
      setBooks(books.filter(book => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book');
    }
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Book Listings</h1>
          <Link href="/books/add" passHref>
            <Button variant="primary">Add New Book</Button>
          </Link>
        </div>
        
        {books.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">You haven't listed any books yet</h2>
            <p className="text-gray-600 mb-6">
              Share your books with the community by adding your first book listing.
            </p>
            <Link href="/books/add" passHref>
              <Button variant="primary">Add Your First Book</Button>
            </Link>
          </div>
        ) : (
          <BookList 
            books={books} 
            onDelete={handleDeleteBook}
            showActions={true}
          />
        )}
      </div>
    </MainLayout>
  );
}