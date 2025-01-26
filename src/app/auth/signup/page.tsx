'use client';

import React, { useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import Link from 'next/link';

const SignupPage: React.FC = () => {
  const signup = useUserStore((state) => state.signup);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert('Passwords do not match!');
      return;
    }
    await signup(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen w-1/2 mx-auto">
      <div className='border rounded-lg shadow-lg p-8'>
      <h2 className="text-3xl text-center font-bold mb-6">Signup</h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          value={formData.confirm_password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Signup
        </button>
      </form>

      <p className='mt-2'>Already have an account? <Link href="/auth/login" className="text-blue-500">Login</Link></p>
      </div>
    </div>
  );
};

export default SignupPage;
