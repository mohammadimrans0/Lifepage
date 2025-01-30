import { usePostStore } from "@/stores/usePostStore";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";

export default function BookMark() {
  const { userId } = useUserStore();
  const { bookmarks, fetchBookmarks } = usePostStore();

  //   Fetch profile when the component mounts
  useEffect(() => {
    if (userId) {
      fetchBookmarks();
    }
  }, [userId, fetchBookmarks]);
  return (
    <div>
  {bookmarks.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="relative group w-full h-72 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          {/* Bookmark Image */}
          <Image
            src={bookmark.postDetails.image}
            alt={`Bookmark ${bookmark.id}`}
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
                <span>{bookmark.postDetails.no_of_likes}</span>
              </div>

              {/* Comments */}
              <div className="flex items-center gap-2 text-lg font-semibold">
                <MessageCircle className="text-blue-400" size={26} fill="currentColor" />
                <span>{bookmark.postDetails.no_of_comments || 0}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 text-center text-lg mt-6">No Bookmarks available.</p>
  )}
</div>

  );
}
