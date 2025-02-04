"use client";

import { useState, useEffect } from "react";
import { Post } from "@/stores/usePostStore";
import { usePostStore } from "@/stores/usePostStore";
import { Heart, MessageCircle, Bookmark } from "lucide-react";
import Image from "next/image";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    userId,
    likes,
    likePost,
    deleteLike,
    fetchLikes,
    addComment,
    addBookmark,
    removeBookmark,
  } = usePostStore();

  const [comment, setComment] = useState<string>("");
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);

  // Create separate states for each post's like and bookmark status
  const [postStates, setPostStates] = useState<{ [key: string]: { liked: boolean, bookmarked: boolean } }>({});

  // Fetch likes and bookmarks state asynchronously from the store
  useEffect(() => {
    const fetchPostData = async () => {
      if (userId) {
        const likedStatus = likes.some(
          (like) => like.post === post.id && like.user === userId
        );
        const bookmarkedStatus = false; // You can implement the logic for bookmarks based on your data

        // Set the states for this particular post
        setPostStates((prevState) => ({
          ...prevState,
          [post.id]: {
            liked: likedStatus,
            bookmarked: bookmarkedStatus,
          },
        }));
      }
    };

    fetchPostData();
    fetchLikes(post.id);
  }, [post, userId, fetchLikes, likes]);

  const handleLikeToggle = async () => {
    if (postStates[post.id]?.liked) {
      // If post is already liked, delete like
      if (userId) {
        deleteLike(userId, post.id);
      }
    } else {
      likePost({ post: post.id, user: userId });
    }

    // Update the like status for this post
    setPostStates((prevState) => ({
      ...prevState,
      [post.id]: {
        ...prevState[post.id],
        liked: !prevState[post.id]?.liked,
      },
    }));
  };

  const handleBookmark = async () => {
    if (postStates[post.id]?.bookmarked) {
      // If post is already bookmarked, remove bookmark
      removeBookmark(post.id);
    } else {
      addBookmark({ post: post.id, user: userId });
    }

    // Update the bookmark status for this post
    setPostStates((prevState) => ({
      ...prevState,
      [post.id]: {
        ...prevState[post.id],
        bookmarked: !prevState[post.id]?.bookmarked,
      },
    }));
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      addComment({ comment, post: post.id, user: userId });
      setComment("");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 mb-4 border border-gray-200 w-[450px]">
      <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <Image
          src={post.userDetails.image}
          alt="User"
          width={48}
          height={48}
          className="rounded-full"
          priority={true}
        />
        <div>
          <p className="font-semibold">{post.userDetails.user.username}</p>
          <p className="text-sm text-gray-500">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <div>
        <button className="px-6 py-1 border rounded-lg text-white bg-blue-500">Follow</button>
      </div>

      </div>

      <div className="rounded-lg overflow-hidden mb-4">
        <Image
          src={post.image}
          alt="Post"
          width={450}
          height={450}
          className="object-cover max-h-96"
        />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-800">{post.caption}</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleLikeToggle}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Heart
            size={20}
            fill={postStates[post.id]?.liked ? "red" : "none"}
            color={postStates[post.id]?.liked ? "red" : "currentColor"}
          />
          <span>{post.no_of_likes} Likes</span>
        </button>

        <button
          onClick={() => setShowCommentInput(!showCommentInput)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
        >
          <MessageCircle size={20} />
          <span>{post.no_of_comments} Comments</span>
        </button>

        <button
          onClick={handleBookmark}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Bookmark
            size={20}
            fill={postStates[post.id]?.bookmarked ? "black" : "none"}
            color={postStates[post.id]?.bookmarked ? "currentColor" : "currentColor"}
          />
          <span>{postStates[post.id]?.bookmarked ? "Bookmarked" : "Bookmark"}</span>
        </button>
      </div>

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
