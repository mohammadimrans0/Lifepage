"use client";

import { useParams } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import UserPost from "@/components/user/profile/UserPost";
import BookMark from "@/components/user/profile/BookMark";
import { Bookmark, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePostStore } from "@/stores/usePostStore";

const ProfilePage = () => {
  const { id } = useParams();
  const userId = Array.isArray(id) ? id[0] : id;
  const { profile, fetchProfile } = useUserStore();
  const { userPosts } = usePostStore();
  const [activeTab, setActiveTab] = useState("posts");
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
    }
  }, [fetchProfile, userId, router]);

  if (!profile) {
    return <div className="">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="px-2 md:px-16 py-6 mt-16">
        {/* Profile Header */}
        <div className="flex items-center space-x-2 md:space-x-8">
          <Image
            src={profile.image}
            alt="Profile"
            width={160}
            height={0}
            className="rounded-full w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] border-4 border-blue-300 shadow-md object-cover"
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">{profile?.user.username}</h1>
            <p className="mt-1">{profile.name}</p>
            <div className="flex items-center mt-1">
              <span className="font-semibold mr-1">{userPosts.length}</span>{" "}
              Posts
            </div>
            <div className="flex flex-wrap space-x-4 mt-2">
              <div className="flex items-center">
                <span className="font-semibold mr-1">
                  {profile.followers_count}
                </span>{" "}
                Followers
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-1">
                  {profile.following_count}
                </span>{" "}
                Following
              </div>
            </div>

            <div className="mt-2">
              <p>{profile.bio}</p>
            </div>

            <div className="flex space-x-2 mt-4">
              <button className="px-4 py-1 bg-blue-500 text-white rounded-lg transition duration-200">
                Follow
              </button>
              <button className="px-4 py-1 rounded-lg border text-blue-500 transition duration-200">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts and Bookmark Section */}
      <div className="p-8 border-t border-slate-400">
        {/* Tab Navigation */}
        <div className="flex justify-around items-center mb-8">
          <button
            className={`flex gap-2 items-center px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "posts"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-300"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            <span>Posts</span>
            <FileText className="w-5 h-5" />
          </button>
          <button
            className={`flex gap-2 items-center px-4 py-2 ml-4 rounded-lg transition-all duration-300 ${
              activeTab === "bookmarks"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-300"
            }`}
            onClick={() => setActiveTab("bookmarks")}
          >
            <span>Bookmarks</span>
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        {/* Content Display */}
        <div>
          {activeTab === "posts" ? (
            <div>
              {userId && <UserPost userId={userId} />}
            </div>
          ) : (
            <div>
              {userId && <BookMark userId={userId} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
