"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RightSidebar() {
  const router = useRouter();
  const { followUser, unfollowUser } = useUserStore();
  const { userId, fetchAllProfile, allProfiles } = useUserStore();
  const [isFollowing, setIsFollowing] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchAllProfile();
  }, [fetchAllProfile]);

  const handleFollowToggle = (followingId: string) => {
    const followerId = userId;

    if (!followerId) {
      setTimeout(() => router.push("/auth/login"), 2000);
      return;
    }

    setIsFollowing((prev) => {
      const following = !!prev[followingId];

      if (following) {
        unfollowUser({ followerId, followingId });
      } else {
        followUser({ followerId, followingId });
      }

      return { ...prev, [followingId]: !following };
    });
  };

  return (
    <div className="py-6">
      <div className="mb-8 bg-white p-4 rounded-lg border drop-shadow-md">
        <h1 className="text-xl font-semibold">Who to follow</h1>

        <div className="mb-8">
          {allProfiles.slice(0, 10).map((profile, index) => (
            <div
              key={profile.id || `profile-${index}`}
              className="flex items-center justify-between py-2"
            >
              <Link href={`/user/profiles/${profile?.user.id}`}>
              <div className="flex items-center gap-3 cursor-pointer">
                <Image
                  src={profile.image || "/default-avatar.png"}
                  alt={profile?.user.username || "User Avatar"}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <span className="font-medium">
                  {profile?.user.username || "Unknown User"}
                </span>
              </div>
              </Link>

              <button
                onClick={() => handleFollowToggle(profile?.user.id)}
                className={`px-4 py-1 border rounded-lg text-white ${
                  isFollowing[profile?.user.id] ? "bg-gray-500" : "bg-blue-500"
                }`}
              >
                {isFollowing[profile?.user.id] ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))}
        </div>

        <button className="w-full bg-blue-100 text-blue-500 px-4 py-2 rounded-md">
          View more
        </button>
      </div>

      <div className="mb-8 bg-white p-4 rounded-lg border drop-shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Today&apos;s news</h1>

        <div className="flex flex-col gap-y-4 mb-4">
          <div>
            <p className="font-medium hover:text-blue-500 cursor-pointer">
              Breaking News: Market Hits Record High
            </p>
            <p className="text-sm">2hr</p>
          </div>
          <div>
            <p className="font-medium hover:text-blue-500 cursor-pointer">
              Five unbelievable facts about money
            </p>
            <p className="text-sm">3hr</p>
          </div>
          <div>
            <p className="font-medium hover:text-blue-500 cursor-pointer">
              Best Pinterest Boards for learning about business
            </p>
            <p className="text-sm">4hr</p>
          </div>
          <div>
            <p className="font-medium hover:text-blue-500 cursor-pointer">
              Skills that you can learn from business
            </p>
            <p className="text-sm">6hr</p>
          </div>
        </div>

        <h2 className="text-sm">
          <span className="text-3xl">...</span> View all latest news
        </h2>
      </div>
    </div>
  );
}
