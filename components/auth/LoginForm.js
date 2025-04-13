// components/auth/LoginForm.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { loginUser } from '../../lib/api';
import { saveUserToStorage } from '../../lib/auth';

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await loginUser(formData);
      toast.success('Login successful!');
      saveUserToStorage(response.user);
      
      // Redirect based on user role
      if (response.user.role === 'owner') {
        router.push('/dashboard/owner');
      } else {
        router.push('/dashboard/seeker');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          fullWidth
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;