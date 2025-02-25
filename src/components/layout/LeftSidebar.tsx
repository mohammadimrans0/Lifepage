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
    <div className="py-6">
      <div className="mb-8 bg-white px-8 py-4 rounded-lg border drop-shadow-md">
        {/* Profile Section */}
        {loggedInProfile ? (
          <div className="flex flex-col items-center justify-center gap-y-2">
            <Image
              src={loggedInProfile.image}
              alt="profile image"
              width={64}
              height={36}
            />
            <h1 className="text-2xl font-semibold">{loggedInProfile.name}</h1>
            <p>{loggedInProfile.bio}</p>

            <div className="flex items-center justify-center gap-x-6">
              <div className="flex flex-col items-center">
                <span className="font-semibold">
                {userPosts.length}
                </span>{" "}
                Posts
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold">
                  {loggedInProfile.followers_count}
                </span>{" "}
                Followers
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold">
                  {loggedInProfile.following_count}
                </span>{" "}
                Following
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <hr className="my-4" />

        <div className="flex flex-col gap-y-6 mb-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/image-icon/home-feed.svg"
              alt="feed"
              width={24}
              height={16}
            />
            <p className="text-xl font-medium hover:text-blue-500 cursor-pointer">
              Feed
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/images/image-icon/connections.svg"
              alt="feed"
              width={24}
              height={16}
            />
            <p className="text-xl font-medium hover:text-blue-500 cursor-pointer">
              Connections
            </p>
          </div>
          <Link href="/latest-news">
          
          <div className="flex items-center gap-2">
            <Image
              src="/images/image-icon/news.svg"
              alt="feed"
              width={24}
              height={16}
            />
            <p className="text-xl font-medium hover:text-blue-500 cursor-pointer">
              Latest News
            </p>
          </div>          </Link>
          {/* <div className="flex items-center gap-2">
            <Image
              src="/images/image-icon/events.svg"
              alt="feed"
              width={24}
              height={16}
            />
            <p className="text-xl font-medium hover:text-blue-500 cursor-pointer">
              Events
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/images/image-icon/group.svg"
              alt="feed"
              width={24}
              height={16}
            />
            <p className="text-xl font-medium hover:text-blue-500 cursor-pointer">
              Groups
            </p>
          </div> */}
          <Link href="/settings/profile-setting">
            <div className="flex items-center gap-2">
              <Image
                src="/images/image-icon/settings.svg"
                alt="feed"
                width={24}
                height={16}
              />
              <p className="text-xl font-medium hover:text-blue-500 cursor-pointer">
                Settings
              </p>
            </div>
          </Link>
          
        </div>

        <Link href="/user/profile">
          <h2 className="text- text-center text-blue-500 border-t py-2 cursor-pointer">
            View Profile
          </h2>
        </Link>
      </div>

      <div className="px-4 flex flex-wrap items-center justify-center gap-x-6 mb-2">
        <p className="text-sm hover:text-blue-500 cursor-pointer">About</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Settings</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Support</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Docs</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">Help</p>
        <p className="text-sm hover:text-blue-500 cursor-pointer">
          Privace & Terms
        </p>
      </div>

      <p className="text-sm text-center">&copy; 2025 Lifepage</p>
    </div>
  );
}
