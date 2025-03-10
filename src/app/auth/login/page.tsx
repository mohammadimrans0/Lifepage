"use client";

import { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const login = useUserStore((state) => state.login);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.log(error)
    }
  };

  return (
    <div className="flex items-center justify-center my-8 md:mt-28">
      <div className="flex flex-col md:flex-row items-center border rounded-lg max-w-2xl">
        <ToastContainer />
        <div className="w-full mx-auto">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="">Login to your Lifepage account</p>
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
                  className="w-72 p-2 border rounded"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-72 p-2 border rounded"
                />
              </div>
              <button type="submit" className="w-72 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Login
              </button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border w-72">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
              
              <div className="text-center text-sm w-72">
                Don&apos;t have an account? {" "}
                <Link href="/auth/signup" className="underline hover:underline-offset-2 text-blue-500">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>

        <div className="hidden md:block">
          <Image
            src="/images/login-image.png"
            alt="login-image"
            width={450}
            height={450}
            className="md:rounded-r-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
