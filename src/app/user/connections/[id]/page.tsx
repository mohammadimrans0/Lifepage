"use client";

import { useParams } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ConnectionPage = () => {
  const { id } = useParams();
  const userId = Array.isArray(id) ? id[0] : id;
  const { profile, fetchProfile } = useUserStore();
  const [activeTab, setActiveTab] = useState("followers");

  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
    }
  }, [fetchProfile, userId]);

  if (!profile) {
    return (
      <div className="text-center py-10 text-lg font-semibold">
        Loading data...
      </div>
    );
  }

  return (
    <div className="px-4 py-6 mt-16">
      {/* Tab Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 font-medium rounded-lg transition-all ${
            activeTab === "followers" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("followers")}
        >
          Followers ({profile.profile.followers_count})
        </button>
        <button
          className={`px-4 py-2 font-medium rounded-lg transition-all ${
            activeTab === "following" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("following")}
        >
          Following ({profile.profile.following_count})
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        {activeTab === "followers" ? (
          <div>
            <h3 className="text-xl font-semibold mb-4">Followers</h3>
            <div className="space-y-4">
              {profile.profile.followers.length > 0 ? (
                profile.profile.followers.map((follower) => (
                  <div
                    key={follower.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={follower.image}
                        alt={follower.name}
                        width={50}
                        height={50}
                        className="rounded-full border"
                      />
                      <span className="text-lg font-medium">
                        {follower.name}
                      </span>
                    </div>
                   
                    <Link href={`/user/profiles/${follower.id}`}>
                      <button className="px-4 py-1 border rounded-lg text-white bg-gray-500">visit profile</button>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No followers yet.</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-4">Following</h3>
            <div className="space-y-4">
              {profile.profile.following.length > 0 ? (
                profile.profile.following.map((following) => (
                  <div key={following.id} className="flex items-center justify-between">
                    <div
                    
                    className="flex items-center space-x-4"
                  >
                    <Image
                      src={following.image}
                      alt={following.name}
                      width={50}
                      height={50}
                      className="rounded-full border"
                    />
                    <span className="text-lg font-medium">
                      {following.name}
                    </span>
                  </div>
                  <div>
                      <button className="px-4 py-1 border rounded-lg text-white bg-gray-500">unfollow</button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Not following anyone yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionPage;
