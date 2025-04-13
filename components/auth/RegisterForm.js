'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { registerUser } from '../../lib/api';
import { saveUserToStorage } from '../../lib/auth';

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    role: 'seeker' // Default role
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
      const response = await registerUser(formData);
      toast.success('Registration successful!');
      saveUserToStorage(response.user);
      
      // Redirect based on user role
      if (response.user.role === 'owner') {
        router.push('/dashboard/owner');
      } else {
        router.push('/dashboard/seeker');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          id="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Mobile Number"
          id="mobile"
          placeholder="Your mobile number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        
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
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            I am a: <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="seeker"
                checked={formData.role === 'seeker'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Book Seeker</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="owner"
                checked={formData.role === 'owner'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Book Owner</span>
            </label>
          </div>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          fullWidth
        >
          {loading ? 'Creating Account...' : 'Register'}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;