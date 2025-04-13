import Link from 'next/link';
import Image from 'next/image';
import { getUserFromStorage } from '../../lib/auth';

const BookCard = ({ book, onDelete, showActions = false }) => {
  const user = getUserFromStorage();
  const isOwner = user && user.id === book.ownerId;
  
  const displayImage = book.coverImageUrl 
    ? `${process.env.NEXT_PUBLIC_API_URL}${book.coverImageUrl}`
    : '/public/vercel.svg';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image 
          src={displayImage}
          alt={book.title}
          fill
          style={{ objectFit: 'cover' }}
          className="w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{book.title}</h3>
        <p className="text-gray-600 text-sm">By {book.author}</p>
        <p className="text-gray-600 text-sm mt-1">
          <span className="font-medium">Location:</span> {book.location}
        </p>
        {book.genre && (
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Genre:</span> {book.genre}
          </p>
        )}
        <div className="mt-2">
          {book.isAvailable ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
              Available
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
              Not Available
            </span>
          )}
        </div>
        
        <div className="mt-4 flex justify-between">
          <Link href={`/books/${book.id}`} className="text-blue-600 hover:underline text-sm">
            View Details
          </Link>
          
          {showActions && isOwner && (
            <div className="flex space-x-2">
              <Link href={`/books/edit/${book.id}`} className="text-blue-600 hover:underline text-sm">
                Edit
              </Link>
              <button 
                onClick={() => onDelete(book.id)} 
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;