import React, { useState, useEffect } from 'react';
import { BookmarkType, Post } from '@/stores/usePostStore';
import { usePostStore } from '@/stores/usePostStore';
import { Heart, MessageCircle, Bookmark} from 'lucide-react';
import Image from "next/image";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { userId, likePost, addComment, addBookmark, deleteLike, removeBookmark } = usePostStore();

  const [comment, setComment] = useState<string>('');
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // Check if the post is liked or bookmarked when it first loads
  useEffect(() => {
    if (userId) {
      // Check if the post is liked by the user
      setIsLiked(post.likes.includes(userId));
  
      // Check if the post is bookmarked by the user
      setIsBookmarked(
        Array.isArray(post.bookmarks) && post.bookmarks.some((bookmark: BookmarkType) => bookmark.user === userId)
      );
    } else {
      // Handle the case where userId is null (e.g., user is not logged in)
      setIsLiked(false);
      setIsBookmarked(false);
    }
  }, [post, userId]);
  

  const handleLike = () => {
    if (isLiked) {
      deleteLike(post.id); // Remove like from backend
      setIsLiked(false);
    } else {
      likePost({ post: post.id, user: userId }); // Add like to backend
      setIsLiked(true);
    }
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(post.id); // Remove bookmark from backend
      setIsBookmarked(false);
    } else {
      addBookmark({ post: post.id, user: userId }); // Add bookmark to backend
      setIsBookmarked(true);
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      addComment({ comment, post: post.id, user: userId });
      setComment('');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 mb-4 border border-gray-200 w-[450px]">
      <div className="flex items-center gap-4 mb-4">
        <div>
          <Image
            src={post.userDetails.image}
            alt="User"
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
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium "
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500' : 'text-gray-500'}`} />
          <span>{post.no_of_likes} Likes</span>
        </button>
        <button
          onClick={() => setShowCommentInput(!showCommentInput)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
        >
          <MessageCircle className="w-5 h-5 text-gray-500" />
          <span>{post.no_of_comments} Comments</span>
        </button>
        <button
          onClick={handleBookmark}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'text-yellow-500' : 'text-gray-500'}`} />
          <span>Bookmark</span>
        </button>
      </div>

      {/* Comment Input */}
      {showCommentInput && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
