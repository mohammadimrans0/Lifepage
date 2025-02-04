"use client";

import { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { FaApple, FaGoogle, FaFacebook } from "react-icons/fa";

const SignupPage: React.FC = () => {
  const signup = useUserStore((state) => state.signup);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await signup(formData);
    } catch (error) {
      toast.error("Failed to create an account");
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row items-center border max-w-4xl">
        <ToastContainer />
        <div className="">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
              </div>
              <div className="grid gap-2">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Your username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-96 p-2 border rounded"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="username">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-96 p-2 border rounded"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-96 p-2 border rounded"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password">Confirm Password</label>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="confirm_password"
                  required
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="w-96 p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="w-96 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Signup
              </button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border w-96">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="flex items-center justify-around gap-4 w-96">
                <button
                  type="button"
                  className="flex items-center gap-x-1 w-28 justify-center bg-gray-100 p-2 rounded"
                >
                  <FaApple /> Apple
                </button>
                <button
                  type="button"
                  className="flex items-center gap-x-1 w-28 justify-center bg-gray-100 p-2 rounded"
                >
                  <FaGoogle /> Google
                </button>
                <button
                  type="button"
                  className="flex items-center gap-x-1 w-28 justify-center bg-gray-100 p-2 rounded"
                >
                  <FaFacebook /> Meta
                </button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline hover:underline-offset-2 text-blue-500"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>

        <div>
          <Image
            src="/images/login-image.png"
            alt="login-image"
            width={420}
            height={420}
            className="rounded-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
