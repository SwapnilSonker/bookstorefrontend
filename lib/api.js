// lib/api.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bookstore-backend-pkbf.onrender.com/api';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add user-id to requests if available
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (user && user.id) {
        config.headers['user-id'] = user.id;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API calls
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Book API calls
export const getAllBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

export const getBookById = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

export const getUserBooks = async (userId) => {
  const response = await api.get(`/books/owner/${userId}`);
  return response.data;
};

export const createBook = async (bookData) => {
  // For file uploads we need FormData
  const formData = new FormData();
  
  // Add text fields
  Object.keys(bookData).forEach(key => {
    if (key !== 'coverImage') {
      formData.append(key, bookData[key]);
    }
  });
  
  // Add image if present
  if (bookData.coverImage) {
    formData.append('coverImage', bookData.coverImage);
  }
  
  const response = await api.post('/books', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const updateBook = async (id, bookData) => {
  // For file uploads we need FormData
  const formData = new FormData();
  
  // Add text fields
  Object.keys(bookData).forEach(key => {
    if (key !== 'coverImage') {
      formData.append(key, bookData[key]);
    }
  });
  
  // Add image if present
  if (bookData.coverImage) {
    formData.append('coverImage', bookData.coverImage);
  }
  
  const response = await api.put(`/books/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

export const searchBooks = async (params) => {
  const response = await api.get('/books/search', { params });
  return response.data;
};