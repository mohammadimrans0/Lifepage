'use client';

import { useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import Link from 'next/link';

/**
 * 
{
"username" : "rahims0",
"password" : "rahi1234"
}
 * 
 */

const LoginPage: React.FC = () => {
  const login = useUserStore((state) => state.login);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border rounded-lg shadow-lg p-8">
      <h2 className="text-3xl text-center font-bold mb-6">Login</h2>
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
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className=" w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>

      <p className='mt-2'>Don't have an account? <Link href="/auth/signup" className="text-blue-500">Signup</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
