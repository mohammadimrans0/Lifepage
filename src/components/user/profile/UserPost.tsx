import { usePostStore } from "@/stores/usePostStore";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";

export default function UserPost() {
  const { userId } = useUserStore();
  const { fetchUserPosts, userPosts } = usePostStore();

  //   Fetch profile when the component mounts
  useEffect(() => {
    if (userId) {
      fetchUserPosts();
    }
  }, [userId, fetchUserPosts]);

  return (
    <div>
      {userPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userPosts.map((post) => (
            <div
              key={post.id}
              className="relative group w-full h-64 rounded-lg overflow-hidden"
            >
              {/* Post Image */}
              <Image
                src={post.image}
                alt={`Post ${post.id}`}
                width={400}
                height={400}
                className="object-cover"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white flex items-center gap-6">
                  {/* Likes */}
                  <div className="flex items-center gap-2">
                    <Heart className="text-red-500" size={20} />
                    <span>{post.no_of_likes}</span>
                  </div>

                  {/* Comments */}
                  <div className="flex items-center gap-2">
                    <MessageCircle className="text-blue-400" size={20} />
                    <span>{post.no_of_comments || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </div>
  );
}
