"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import Image from "next/image";
import Link from "next/link";
import { usePostStore } from "@/stores/usePostStore";

export default function LeftSidebar() {
  const { loggedInProfile, fetchLoggedInProfile } = useUserStore();
  const { userPosts } = usePostStore();

  useEffect(() => {
    fetchLoggedInProfile();
  }, [fetchLoggedInProfile]);

  return (
    <div className="fixed top-16 left-8 h-[calc(100vh-64px)] w-[350px] px-4 py-6 bg-white border-r drop-shadow-md overflow-hidden">
      <div className="mb-8 px-6 py-4 rounded-lg">
        {loggedInProfile ? (
          <div className="flex flex-col items-center gap-y-2">
            <Image
              src={loggedInProfile.profile.image}
              alt="profile image"
              width={64}
              height={64}
              className="rounded-full"
            />
            <h1 className="text-xl font-semibold">{loggedInProfile.profile.name}</h1>
            <p className="text-sm text-gray-600">{loggedInProfile.profile.bio}</p>

            <div className="flex items-center justify-between gap-x-6 mt-2">
              <div className="text-center">
                <span className="font-semibold">{userPosts.length}</span>
                <p className="text-xs">Posts</p>
              </div>
              <div className="text-center">
                <span className="font-semibold">
                  {loggedInProfile.profile.followers_count}
                </span>
                <p className="text-xs">Followers</p>
              </div>
              <div className="text-center">
                <span className="font-semibold">
                  {loggedInProfile.profile.following_count}
                </span>
                <p className="text-xs">Following</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <hr className="my-4" />

      <div className="flex flex-col gap-y-2 mb-4">
        <SidebarLink href="/" src="/images/image-icon/home-feed.svg" label="Feed" />
        <SidebarLink href="/connections" src="/images/image-icon/connections.svg" label="Connections" />
        <SidebarLink href="/latest-news" src="/images/image-icon/news.svg" label="Latest News" />
        <SidebarLink href="/settings/profile-setting" src="/images/image-icon/settings.svg" label="Settings" />
      </div>

      <Link href="/user/profile">
        <h2 className="text-center text-blue-500 border-t py-4 cursor-pointer">
          View Profile
        </h2>
      </Link>

      <FooterLinks />

      <p className="text-center text-sm text-gray-500">&copy; 2025 Lifepage</p>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  src: string;
  label: string;
}

function SidebarLink({ href, src, label }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out hover:bg-slate-100 hover:text-blue-500"
    >
      <Image src={src} alt={label} width={24} height={16} />
      <p className="text-xl font-medium cursor-pointer">{label}</p>
    </Link>
  );
}

function FooterLinks() {
  const links = ["About", "Settings", "Support", "Docs", "Help", "Privacy & Terms"];
  return (
    <div className="px-4 flex flex-wrap justify-center gap-x-6 mb-2 text-sm text-gray-500">
      {links.map((link) => (
        <p key={link} className="cursor-pointer hover:text-blue-500">
          {link}
        </p>
      ))}
    </div>
  );
}
