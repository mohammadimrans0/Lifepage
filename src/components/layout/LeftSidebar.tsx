"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import Image from "next/image";
import { Plus } from "lucide-react";

export default function RightSidebar() {
  const { fetchAllProfile, allProfiles } = useUserStore();

  useEffect(() => {
    fetchAllProfile();
  }, [fetchAllProfile]);

  return (
    <div className="py-6">
      <div className="mb-8 bg-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Who to follow</h1>

        <div className="mb-8">
          {allProfiles.slice(0, 10).map((profile) => (
            <div
              key={profile.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={profile.image || "/default-avatar.png"} // Fallback image
                  alt={profile?.user.username}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <span className="font-medium">{profile?.user.username}</span>
              </div>

              <button className="p-2 rounded-full bg-blue-200">
                <Plus size={20} className="text-blue-500" />
              </button>
            </div>
          ))}
        </div>

        <button className="w-full bg-blue-100 text-blue-500 px-4 py-2 rounded-md">
          View more
        </button>
      </div>

    </div>
  );
}
