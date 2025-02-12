"use client";

import { useState } from "react";
import { Post } from "@/stores/usePostStore";
import { usePostStore } from "@/stores/usePostStore";
import { useUserStore } from "@/stores/useUserStore";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const {
    userId,
    likes,
    comments,
    likePost,
    unLike,
    fetchLikes,
    addComment,
    fetchComments,
    addBookmark,
    removeBookmark,
  } = usePostStore();

  const { followUser, unfollowUser } = useUserStore();

  const [comment, setComment] = useState<string>("");
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const [postStates, setPostStates] = useState<{
    [key: string]: { liked: boolean; bookmarked: boolean };
  }>({});

  const handleLikeToggle = async () => {
    fetchLikes(post.id);
    const isLiked = likes.some((like) => like.post === post.id);

    if (isLiked) {
      if (userId) {
        unLike(userId, post.id);
      }
    } else {
      likePost({ post: post.id, user: userId });
    }

    setPostStates((prevState) => {
      const newLikedStatus = !isLiked;
      return {
        ...prevState,
        [post.id]: {
          ...prevState[post.id],
          liked: newLikedStatus,
        },
      };
    });
  };

  const handleBookmark = async () => {
    if (postStates[post.id]?.bookmarked) {
      removeBookmark(post.id);
    } else {
      addBookmark({ post: post.id, user: userId });
    }
    setPostStates((prevState) => ({
      ...prevState,
      [post.id]: {
        ...prevState[post.id],
        bookmarked: !prevState[post.id]?.bookmarked,
      },
    }));
  };

  const handleShowComment = async (postId: string) => {
    await fetchComments(postId);
    setShowCommentInput(!showCommentInput);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      addComment({ comment, post: post.id, user: userId });
      setComment("");
    }
  };

  const handleFollowToggle = () => {
    const followerId = userId;
    const followingId = post.userDetails.user.id;

    if (!followerId) {
      setTimeout(() => router.push("/auth/login"), 2000);
      return;
    } else {
      if (isFollowing) {
        unfollowUser({ followerId, followingId });
      } else {
        followUser({ followerId, followingId });
      }
      setIsFollowing(!isFollowing);
    }
  };

  return (
    <div className="bg-white drop-shadow-md rounded-lg p-4 mb-4 border border-gray-200 ">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Image
            src={post.userDetails.image}
            alt="User"
            width={48}
            height={48}
            className="rounded-full ml-1"
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
          <button
            onClick={handleFollowToggle}
            className={`px-6 py-1 mr-2 border rounded-lg text-white ${
              isFollowing ? "bg-gray-500" : "bg-blue-500"
            }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>

      <div className="mb-4 px-2 ">
        <Image
          src={post.image}
          alt="Post"
          width={540}
          height={0}
          className="object-cover max-h-[500px] rounded-lg"
        />
      </div>

      <div className="mb-4 px-2 ">
        <p className="text-sm text-gray-800">{post.caption}</p>
      </div>

      <div className="flex items-center justify-center md:justify-between gap-x-5">
        <button
          onClick={handleLikeToggle}
          className="flex items-center gap-2 md:px-2 py-2 rounded-lg text-sm font-medium"
        >
          <Heart
            size={20}
            fill={postStates[post.id]?.liked ? "red" : "none"}
            color={postStates[post.id]?.liked ? "red" : "currentColor"}
          />
          <div className="flex items-center gap-1">
            <span>{post.no_of_likes}</span>
            <span className="">Likes</span>
          </div>
        </button>

        <button
          onClick={() => handleShowComment(post.id)}
          className="flex items-center gap-2 md:px-4 py-2 rounded-lg text-sm font-medium"
        >
          <MessageCircle size={20} />
          <div className="flex items-center gap-1">
            <span>{post.no_of_comments}</span>
            <span className="">Comments</span>
          </div>
        </button>

        <button className="flex items-center gap-2 md:px-4 py-2 rounded-lg text-sm font-medium">
          <Share2 size={20} />
          <div className="flex items-center gap-1">
            <span>{0}</span>
            <span className="">Share</span>
          </div>
        </button>

        <button
          onClick={handleBookmark}
          className="flex items-center gap-2 md:px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Bookmark
            size={20}
            fill={postStates[post.id]?.bookmarked ? "black" : "none"}
          />
          <span className="hidden md:block">
            {postStates[post.id]?.bookmarked ? "Bookmarked" : "Bookmark"}
          </span>
        </button>
      </div>

      {showCommentInput && (
        <div className="space-y-2">
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
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Post
            </button>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-sm mb-2">Comments</h3>
            <div className="space-y-3">
              {comments.map((commentData) => (
                <div
                key={commentData.id}
                className="flex justify-between gap-2 border p-2 rounded-lg"
              >
                <div className="flex gap-2 items-center w-full">
                  {/* <Image
                    src={profile?.image}
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full"
                  /> */}
                  <div className="flex flex-col">
                    <p className="font-semibold">rahims0</p>
                    <p>{commentData.comment}</p>
                  </div>
                </div>
              
                <div className="flex flex-col items-end">
                  <p className="text-xs text-gray-500">
                    {new Date(commentData.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
