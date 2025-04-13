// app/auth/register/page.js
'use client';

import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';
import RegisterForm from '../../../components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Create an Account</h1>
        <RegisterForm />
        <p className="text-center mt-6 text-gray-600">
          Already have an account? <Link href="/auth/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </div>
    </MainLayout>
  );
}