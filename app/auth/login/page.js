// app/auth/login/page.js
'use client';

import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';
import LoginForm from '../../../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Login to Book Exchange</h1>
        <LoginForm />
        <p className="text-center mt-6 text-gray-600">
          Don&apos;t have an account? <Link href="/auth/register" className="text-blue-600 hover:underline">Register here</Link>
        </p>
      </div>
    </MainLayout>
  );
}