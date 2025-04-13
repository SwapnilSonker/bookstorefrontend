'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { createBook, updateBook, getBookById } from '../../lib/api';

const BookForm = ({ bookId }) => {
  const router = useRouter();
  const isEditMode = !!bookId;
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    location: '',
    contactInfo: '',
    isAvailable: true
  });
  
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch book data if in edit mode
    if (isEditMode) {
      const fetchBook = async () => {
        try {
          setLoading(true);
          const bookData = await getBookById(bookId);
          setFormData({
            title: bookData.title,
            author: bookData.author,
            genre: bookData.genre || '',
            location: bookData.location,
            contactInfo: bookData.contactInfo || '',
            isAvailable: bookData.isAvailable
          });
          
          if (bookData.coverImageUrl) {
            setCoverPreview(`${process.env.NEXT_PUBLIC_API_URL}${bookData.coverImageUrl}`);
          }
        } catch (error) {
          toast.error('Failed to load book data');
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchBook();
    }
  }, [bookId, isEditMode]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' 
      ? e.target.checked 
      : e.target.value;
      
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const bookData = {
        ...formData,
        coverImage
      };
      
      if (isEditMode) {
        await updateBook(bookId, bookData);
        toast.success('Book updated successfully');
      } else {
        await createBook(bookData);
        toast.success('Book listed successfully');
      }
      
      router.push('/dashboard/owner');
    } catch (error) {
      console.error('Book submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to save book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isEditMode ? 'Edit Book Listing' : 'Add New Book Listing'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Book Title"
          id="title"
          placeholder="Enter book title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Author"
          id="author"
          placeholder="Enter author name"
          value={formData.author}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Genre"
          id="genre"
          placeholder="E.g., Fiction, Science, History"
          value={formData.genre}
          onChange={handleChange}
        />
        
        <Input
          label="Location"
          id="location"
          placeholder="City or neighborhood"
          value={formData.location}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Contact Information"
          id="contactInfo"
          placeholder="Email or phone number"
          value={formData.contactInfo}
          onChange={handleChange}
        />
        
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Book is available for exchange/rent</span>
          </label>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Book Cover Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            accept="image/*"
          />
          {coverPreview && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Preview:</p>
              <img
                src={coverPreview}
                alt="Cover preview"
                className="h-32 object-cover rounded border border-gray-300"
              />
            </div>
          )}
        </div>
        
        <div className="flex space-x-4">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? 'Saving...' : isEditMode ? 'Update Book' : 'Add Book'}
          </Button>
          
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            fullWidth
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;