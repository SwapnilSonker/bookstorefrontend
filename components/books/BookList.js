'use client';

import { useState } from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onDelete, showActions = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  
  // Extract unique locations and genres for filters
  const locations = [...new Set(books.map(book => book.location))];
  const genres = [...new Set(books.map(book => book.genre).filter(Boolean))];
  
  // Filter books based on search and filters
  const filteredBooks = books.filter(book => {
    const matchesSearch = searchTerm === '' || 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesLocation = locationFilter === '' || book.location === locationFilter;
    const matchesGenre = genreFilter === '' || book.genre === genreFilter;
    
    return matchesSearch && matchesLocation && matchesGenre;
  });
  
  const handleReset = () => {
    setSearchTerm('');
    setLocationFilter('');
    setGenreFilter('');
  };
  
  return (
    <div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-3">Filter Books</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or author"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={handleReset}
            className="text-blue-600 text-sm hover:underline"
          >
            Reset Filters
          </button>
        </div>
      </div>
      
      {filteredBooks.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-500">No books found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              onDelete={onDelete}
              showActions={showActions}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;