"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Menu,
  ChevronDown,
  MessageSquareText,
  Bell,
} from "lucide-react";
import Image from "next/image";
import { useUserStore } from "@/stores/useUserStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isAccountsOpen, setIsAccountsOpen] = useState(false);

  const { userId, profile, fetchProfile } = useUserStore();

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId, fetchProfile]);

  return (
    <nav className="bg-white px-6">
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
              <div className="relative">
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 flex items-center"
                >
                  Pages
                  <ChevronDown size={16} className="ml-1" />
                </button>
                {isProductsOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Page1
                    </Link>
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Page2
                    </Link>
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Page3
                    </Link>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsAccountsOpen(!isAccountsOpen)}
                  className="px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600 flex items-center"
                >
                  Accounts
                  <ChevronDown size={16} className="ml-1" />
                </button>
                {isAccountsOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Account1
                    </Link>
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Account2
                    </Link>
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Account3
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/"
                className="px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-600"
              >
                My Network
              </Link>
              <button className="bg-gray-200 text-white px-2 py-2 rounded-md text-sm ">
                <MessageSquareText className="text-slate-800" />
              </button>
              <button className="bg-gray-200 text-white px-2 py-2 rounded-md text-sm ">
                <Bell className="text-slate-800" />
              </button>

              <div>
                {profile?.image ? (
                  <Link href="/user/profile">
                    <Image
                      src={profile.image}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-blue-500 shadow-md object-cover"
                    />
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
            <button
              onClick={() => setIsProductsOpen(!isProductsOpen)}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              Products
            </button>
            {isProductsOpen && (
              <div className="pl-4">
                <Link
                  href="/products/hardware"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  Hardware
                </Link>
                <Link
                  href="/products/software"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  Software
                </Link>
                <Link
                  href="/products/services"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  Services
                </Link>
              </div>
            )}
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              Contact
            </Link>
            <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-blue-500 text-white hover:bg-blue-600">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
