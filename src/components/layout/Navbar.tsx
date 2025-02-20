"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Menu,
  // MessageSquareText,
  // Bell,
} from "lucide-react";
import Image from "next/image";
import { useUserStore } from "@/stores/useUserStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { userId, profile, fetchProfile } = useUserStore();

  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
    }
  }, [userId, fetchProfile]);

  return (
    <nav className="bg-white px-6 drop-shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div>
              <Link href="/">
                {/* <Image
                src="/images/lifepage-logo.png"
                alt="logo"
                width={120}
                height={16}
                /> */}
                <h1 className="text-3xl font-semibold">Lifepage</h1>
              </Link>
            </div>
            <div className="hidden md:block ml-6">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {/* <button className="bg-gray-200 text-white px-2 py-2 rounded-md text-sm ">
                <MessageSquareText className="text-slate-800" />
              </button>
              <button className="bg-gray-200 text-white px-2 py-2 rounded-md text-sm ">
                <Bell className="text-slate-800" />
              </button> */}

              <div>
                {profile?.image ? (
                  <Link href="/user/profile" className="flex items-center gap-x-1">
                    <Image
                      src={profile.image}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-blue-500 shadow-md object-cover"
                    />
                    <p className="text-xl">{profile?.user.username}</p>
                  </Link>
                ) : (
                  <Link href="/auth/login">
                    <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-blue-500 text-white hover:bg-blue-600">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-500 focus:ring-1 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/user/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              Profile
            </Link>
           
            <Link
              href="/settings/profile-setting"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              Settings
            </Link>
            <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-blue-500 text-white hover:bg-blue-500">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
