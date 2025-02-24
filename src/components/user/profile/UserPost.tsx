import { usePostStore } from "@/stores/usePostStore";
import { useEffect } from "react";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";

export default function UserPost({ userId }: { userId: string }) {
  const { fetchUserPosts, userPosts } = usePostStore();

  //   Fetch profile when the component mounts
  useEffect(() => {
    if (userId) {
      fetchUserPosts(userId);
    }
  }, [userId, fetchUserPosts]);

  return (
    <div>
  {userPosts.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {userPosts.map((post) => (
        <div
          key={post.id}
          className="relative group w-full h-72 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          {/* Post Image */}
          <Image
            src={post.image}
            alt={`Post ${post.id}`}
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white flex items-center gap-8">
              {/* Likes */}
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Heart className="text-red-500" size={26} fill="currentColor" />
                <span>{post.no_of_likes}</span>
              </div>

              {/* Comments */}
              <div className="flex items-center gap-2 text-lg font-semibold">
                <MessageCircle className="text-blue-400" size={26} fill="currentColor" />
                <span>{post.no_of_comments || 0}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 text-center text-lg mt-6">No posts available.</p>
  )}
</div>

  );
}
