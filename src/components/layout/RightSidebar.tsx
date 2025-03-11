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
    if (!userId) {
      setTimeout(() => router.push("/auth/login"), 2000);
      return;
    }
  
    setIsFollowing((prev) => {
      const following = !!prev[followingId];
  
      if (following) {
        unfollowUser({ followerId: userId, followingId });
      } else {
        followUser({ followerId: userId, followingId });
      }
  
      return { ...prev, [followingId]: !following };
    });
  };

  return (
    <div className="fixed top-16 right-8 h-[calc(100vh-64px)] w-[350px] px-4 py-6 bg-white border-l drop-shadow-md overflow-hidden hover:overflow-y-scroll scrollbar-thin">
      <div className="p-4 rounded-lg w-80">
        <h1 className="text-xl font-semibold">Who to follow</h1>

        <div className="mb-8">
          {allProfiles.slice(0, 10).map((profile, index) => (
            <div key={profile.id || `profile-${index}`} className="flex items-center justify-between py-2">
              <Link href={`/user/profiles/${profile.id}`} className="flex items-center gap-3 cursor-pointer">
                <Image
                  src={profile.profile.image || "/default-avatar.png"}
                  alt={profile.username || "User Avatar"}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <span className="font-medium">{profile.username || "Unknown User"}</span>
              </Link>
              <button
                onClick={() => handleFollowToggle(profile.id.toString())}
                className={`px-4 py-1 border rounded-lg text-white ${
                  isFollowing[profile.id] ? "bg-gray-500" : "bg-blue-500"
                }`}
              >
                {isFollowing[profile.id] ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))}
        </div>

        <button className="w-full bg-blue-100 text-blue-500 px-4 py-2 rounded-md">View more</button>
      </div>

      <div className="p-4 rounded-lg w-80">
        <h1 className="text-2xl font-semibold mb-4">Today&apos;s news</h1>
        <div className="flex flex-col gap-y-4">
          {["Breaking News: Market Hits Record High", "Five unbelievable facts about money", "Best Pinterest Boards for learning about business", "Skills that you can learn from business"].map((news, idx) => (
            <div key={idx}>
              <p className="font-medium hover:text-blue-500 cursor-pointer">{news}</p>
              <p className="text-sm">{idx + 2}hr</p>
            </div>
          ))}
        </div>
        <Link href="/latest-news">
        <h2 className="text-sm text-gray-500 hover:text-blue-500 mt-4">View all latest news...</h2>
        </Link>
        
      </div>
    </div>
  );
}
