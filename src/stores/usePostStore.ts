import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

export interface Post {
  bookmarks: any;
  userDetails: any;
  id: string;
  user: string;
  image: string;
  caption?: string;
  created_at: string;
  no_of_likes: number;
  no_of_comments: number;
  likes: Like[];
}

export interface Like {
  id: string;
  post: string;
  user: string;
}

interface Comment {
  id: string;
  post: string;
  userDetails: {
    name: string;
    image: string;
  };
  comment: string;
  created_at: string;
}

export interface BookmarkType {
  postDetails: any;
  id: string;
  post: string;
  user: string;
  created_at: string;
}

interface PostStore {
  userId: string | null;
  posts: Post[];
  userPosts: Post[];
  comments: Comment[];
  bookmarks: BookmarkType[];
  likes: Like[];

  fetchPosts: () => Promise<void>;
  fetchUserPosts: (id : string) => Promise<void>;
  createPost: (data: FormData) => Promise<void>;
  updatePost: (id: string, data: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  likePost: (data: { post: string; user: string | null }) => Promise<void>;
  fetchLikes: (postId: string) => Promise<void>;
  unLike: (userId: string, postId: string) => Promise<void>;
  addComment: (data: {
    comment: string;
    post: string;
    user: string | null;
  }) => Promise<void>;
  fetchComments: (postId: string) => Promise<void>;
  updateComment: (id: string, data: Partial<Comment>) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
  fetchBookmarks: (id : string) => Promise<void>;
  addBookmark: (data: { post: string; user: string | null }) => Promise<void>;
  removeBookmark: (bookmarkId: string) => Promise<void>;
}

// const BASE_URL = "https://lifepage-server.onrender.com/api/post";
// const USER_URL = "https://lifepage-server.onrender.com/api/user";
const BASE_URL = "https://lifepage-server.vercel.app/api/post";
const USER_URL = "https://lifepage-server.vercel.app/api/user";

export const usePostStore = create<PostStore>((set, get) => ({
  userId:
    typeof window !== "undefined"
      ? localStorage.getItem("lifepage_user_id") || null
      : null,
  posts: [],
  userPosts: [],
  comments: [],
  bookmarks: [],
  likes: [],

  // Fetch all posts
  fetchPosts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/`);
      const posts = response.data;

      const updatedPosts = await Promise.all(
        posts.map(async (post: any) => {
          try {
            const userResponse = await axios.get(`${USER_URL}/profiles/${post.user}/`);
            return {
              ...post,
              userDetails: userResponse.data,
            };
          } catch (error) {
            console.error(
              `Failed to fetch user details or likes for post ID: ${post.id}`,
              error
            );
            return { ...post, userDetails: null };
          }
        })
      );

      set({ posts: updatedPosts });
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  },

  // Fetch all user posts
  fetchUserPosts: async (userId : string) => {
    try {
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }
      const response = await axios.get(`${BASE_URL}/posts/?user=${userId}`);
      set({ userPosts: response.data });
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
    }
  },

  // Create a new post
  createPost: async (data: FormData) => {
    try {
      await axios.post(`${BASE_URL}/posts/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await get().fetchPosts();
    } catch (error : any) {
      toast.error("Failed to create post:", error);
      console.error("Failed to create post:", error);
    }
  },

  // Update an existing post
  updatePost: async (id, data) => {
    try {
      await axios.put(`${BASE_URL}/posts/${id}/`, data);
      await get().fetchPosts();
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  },

  // Delete a post
  deletePost: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/posts/${id}/`);
      await get().fetchPosts();
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  },

  // Like a post
  likePost: async (data) => {
    try {
      await axios.post(`${BASE_URL}/likepost/`, data);
    } catch (error: any) {
      console.error(
        "Failed to create like:",
        error.response?.data || error.message
      );
    }
  },

  // Fetch likes for a post
  fetchLikes: async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/likepost/?post=${postId}`);
      set({ likes: response.data as Like[] });
    } catch (error) {
      console.error("Failed to fetch likes:", error);
    }
  },

  // Delete a like
  unLike: async (userId, postId) => {
    console.log("unlike clicked");
    try {
      const response = await axios.delete(
        `https://lifepage-server.onrender.com/api/post/likepost/?user_id=${userId}&post_id=${postId}`
      );
  
      if (response.status === 204) {
        console.log("Like removed successfully.");
        await get().fetchPosts();
      } else {
        console.log("Failed to remove like.");
      }
    } catch (error: any) {
      console.error("Failed to un-like the post:", error.response?.data || error.message);
    }
  },
  

  // Add a comment to a post
  addComment: async (data) => {
    try {
      await axios.post(`${BASE_URL}/commentpost/`, data);
      console.log(data)
      await get().fetchComments(data.post);
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  },

  // Fetch comments for a specific post
  fetchComments: async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/commentpost/?post=${postId}`);
      const commentsData = response.data;

      const updatedcommentsData = await Promise.all(
        commentsData.map(async (comment: any) => {
          try {
            const userResponse = await axios.get(`${USER_URL}/profiles/${comment.user}/`);
            return {
              ...comment,
              userDetails: userResponse.data,
            };
          } catch (error) {
            console.error("Failed to fetch user details.", error);
            return { ...comment, userDetails: null };
          }
        })
      );
  
      set({ comments: updatedcommentsData });
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  },

  // Update a comment
  updateComment: async (id, data) => {
    try {
      await axios.put(`${BASE_URL}/commentpost/${id}/`, data);
      const currentComments = get().comments;
      set({
        comments: currentComments.map((comment) =>
          comment.id === id ? { ...comment, ...data } : comment
        ),
      });
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  },

  // Delete a comment
  deleteComment: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/commentpost/${id}/`);
      const currentComments = get().comments;
      set({ comments: currentComments.filter((comment) => comment.id !== id) });
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  },

  // Fetch all bookmarks
  fetchBookmarks: async (userId : string) => {
    try {
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }
      const response = await axios.get(`${BASE_URL}/bookmarks/?user=${userId}`);
      const bookmarks = response.data;

      const updatedBookmarks = await Promise.all(
        bookmarks.map(async (bookmark: any) => {
          try {
            const postResponse = await axios.get(
              `${BASE_URL}/posts/${bookmark.post}/`
            );
            return { ...bookmark, postDetails: postResponse.data };
          } catch (error) {
            console.error(
              `Failed to fetch post details for post ID: ${bookmark.post}`,
              error
            );
            return { ...bookmark, postDetails: null };
          }
        })
      );

      set({ bookmarks: updatedBookmarks });
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
    }
  },

  // Add a bookmark
  addBookmark: async (data) => {
    try {
      await axios.post(`${BASE_URL}/bookmarks/`, data);
    } catch (error) {
      console.error("Failed to add bookmark:", error);
    }
  },

  // Remove a bookmark
  removeBookmark: async (bookmarkId) => {
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${bookmarkId}/`);
      const currentBookmarks = get().bookmarks;
      set({
        bookmarks: currentBookmarks.filter(
          (bookmark) => bookmark.id !== bookmarkId
        ),
      });
    } catch (error) {
      console.error("Failed to remove bookmark:", error);
    }
  },
}));
