import React from 'react';
import { Post } from '@/stores/usePostStore';
import { usePostStore } from '@/stores/usePostStore';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';
import Image from "next/image";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { likePost, addBookmark } = usePostStore();

  const handleLike = () => {
    likePost(post.id);
  };

  const handleBookmark = () => {
    addBookmark(post.id);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 mb-4 border border-gray-200 w-[450px]">
      {/* User Info */}
      <div className="flex items-center gap-4 mb-4">
        <div>
          <Image
          src={post.userDetails.image}
          alt='User'
          width={48}
          height={48}
          className="rounded-full"
          />
        </div>
        <div>
          <p className="font-semibold">{post.userDetails.user.username}</p>
          <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
        </div>
      </div>

      {/* Post Image */}
      <div className="rounded-lg overflow-hidden mb-4">
        <Image
          src={post.image}
          alt="Post"
          width={450}
          height={450}
          className="object-cover max-h-96"
        />
      </div>

      {/* Caption */}
      <div className="mb-4">
        <p className="text-sm text-gray-800">{post.caption}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
        >
          <Heart className="w-5 h-5 text-red-500" />
          <span>{post.no_of_likes} Likes</span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
        >
          <MessageCircle className="w-5 h-5 text-gray-500" />
          <span>Comments</span>
        </button>
        <button
          onClick={handleBookmark}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
        >
          <Bookmark className="w-5 h-5 text-gray-500" />
          <span>Bookmark</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
