"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import Link from "next/link";
import { Home, User, PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { userId, profile, fetchProfile, logout } = useUserStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();


  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId, fetchProfile]);

  if (!mounted) {
    return null;
  }

  const handleCreatePost = () => {
    if (!userId) {
      toast.error("Please login to create a post!");
      router.replace("/auth/login");
    } else {
      router.push("/user/create-post");
    }
  };


  return (
    <div className="px-8">
      <div>
        <Link href="/">
        <Image
              src="/images/lifepage-logo.png"
              alt="Lifepage"
              width={150}
              height={0}
            />
        </Link>
      </div>

      <nav className="">
        <ul className="space-y-2">
          <li>
            <Link href="/posts">
              <p className="flex items-center py-3 hover:bg-slate-300 rounded-lg cursor-pointer">
                <Home size={36} />
                <span className="ml-3 text-xl">Home</span>
              </p>
            </Link>
          </li>
          <li>
            <button
              onClick={handleCreatePost}
              className="flex items-center py-3 hover:bg-slate-300 rounded-lg cursor-pointer w-full text-left"
            >
              <PlusCircle size={36} />
              <span className="ml-3 text-xl">Create</span>
            </button>
          </li>
          {userId ? (
            <>
              <li>
                <Link href="/user/profile">
                  <div className="flex items-center py-3 hover:bg-slate-300 rounded-lg cursor-pointer">
                    {profile?.image ? (
                      <Image
                        src={profile.image}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-blue-500 shadow-md object-cover"
                      />
                    ) : (
                      <User size={36} className="text-gray-500" />
                    )}
                    <span className="ml-2 text-xl">Profile</span>
                  </div>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className="mt-2 border rounded-lg text-xl text-red-500 cursor-pointer py-2 px-6"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/auth/login">
                  <button className="mt-2 border rounded-lg text-xl text-white bg-blue-500 px-6 py-2 cursor-pointer">
                    Login
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <ToastContainer />
    </div>
  );
}
