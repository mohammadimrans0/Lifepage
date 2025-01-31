import { create } from "zustand";
import axios from "axios";

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
  user: string;
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
  fetchUserPosts: () => Promise<void>;
  createPost: (data: FormData) => Promise<void>;
  updatePost: (id: string, data: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  likePost: (data: { post: string; user: string | null }) => Promise<void>;
  fetchLikes: (postId: string) => Promise<void>;
  deleteLike: (userId: string, postId: string) => Promise<void>;
  addComment: (data: {
    comment: string;
    post: string;
    user: string | null;
  }) => Promise<void>;
  fetchComments: (postId: string) => Promise<void>;
  updateComment: (id: string, data: Partial<Comment>) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
  fetchBookmarks: () => Promise<void>;
  addBookmark: (data: { post: string; user: string | null }) => Promise<void>;
  removeBookmark: (bookmarkId: string) => Promise<void>;
}

const BASE_URL = "https://lifepage-server.onrender.com/api/post/";

export const usePostStore = create<PostStore>((set, get) => ({
  userId:
    typeof window !== "undefined"
      ? localStorage.getItem("user_id") || null
      : null,
  posts: [],
  userPosts: [],
  comments: [],
  bookmarks: [],
  likes: [], // Initialize likes array

  // Fetch all posts
  fetchPosts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}posts/`);
      const posts = response.data;

      const updatedPosts = await Promise.all(
        posts.map(async (post: any) => {
          try {
            const userResponse = await axios.get(
              `https://lifepage-server.onrender.com/api/user/profiles/${post.user}/`
            );
            const likeResponse = await axios.get(
              `${BASE_URL}likeposts/?post=${post.id}`
            ); // Fetch likes for the post

            return {
              ...post,
              userDetails: userResponse.data,
              likes: likeResponse.data.map((like: any) => like.user), // Map users who liked the post
            };
          } catch (error) {
            console.error(
              `Failed to fetch user details or likes for post ID: ${post.id}`,
              error
            );
            return { ...post, userDetails: null, likes: [] };
          }
        })
      );

      set({ posts: updatedPosts });
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  },

  // Fetch all user posts
  fetchUserPosts: async () => {
    try {
      const userId = get().userId;
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }
      const response = await axios.get(`${BASE_URL}posts/?user=${userId}`);
      set({ userPosts: response.data });
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
    }
  },

  // Create a new post
  createPost: async (data: FormData) => {
    try {
      await axios.post(`${BASE_URL}posts/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await get().fetchPosts();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  },

  // Update an existing post
  updatePost: async (id, data) => {
    try {
      await axios.put(`${BASE_URL}posts/${id}/`, data);
      await get().fetchPosts();
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  },

  // Delete a post
  deletePost: async (id) => {
    try {
      await axios.delete(`${BASE_URL}posts/${id}/`);
      await get().fetchPosts();
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  },

  // Like a post
  likePost: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}likeposts/`, data);
      const currentLikes = get().likes;
      set({ likes: [...currentLikes, response.data] });
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
      const response = await axios.get(`${BASE_URL}likeposts/?post=${postId}`);
      set({ likes: response.data as Like[] });
    } catch (error) {
      console.error("Failed to fetch likes:", error);
    }
  },

  // Delete a like
  deleteLike: async (userId, postId) => {
    console.log("delete like clicked");
    try {
      const likeToDelete = get().likes.find(
        (like) => like.user === userId && like.post === postId
      );
      if (!likeToDelete) {
        console.log("No like found for this user on this post.");
        return;
      }
      await axios.delete(`${BASE_URL}likeposts/${likeToDelete.id}/`);
      const currentLikes = get().likes;
      set({
        likes: currentLikes.filter((like) => like.id !== likeToDelete.id),
      });
      await get().fetchPosts(); // Refresh UI
    } catch (error: any) {
      console.error(
        "Failed to delete like:",
        error.response?.data || error.message
      );
    }
  },

  // Add a comment to a post
  addComment: async (data) => {
    try {
      await axios.post(`${BASE_URL}commentposts/`, data);
      await get().fetchComments(data.post);
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  },

  // Fetch comments for a specific post
  fetchComments: async (postId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}commentposts/?post=${postId}`
      );
      set({ comments: response.data });
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  },

  // Update a comment
  updateComment: async (id, data) => {
    try {
      await axios.put(`${BASE_URL}commentposts/${id}/`, data);
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
      await axios.delete(`${BASE_URL}commentposts/${id}/`);
      const currentComments = get().comments;
      set({ comments: currentComments.filter((comment) => comment.id !== id) });
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  },

  // Fetch all bookmarks
  fetchBookmarks: async () => {
    try {
      const userId = get().userId;
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }
      const response = await axios.get(`${BASE_URL}bookmarks/?user=${userId}`);
      const bookmarks = response.data;

      const updatedBookmarks = await Promise.all(
        bookmarks.map(async (bookmark: any) => {
          try {
            const postResponse = await axios.get(
              `${BASE_URL}posts/${bookmark.post}/`
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
      await axios.post(`${BASE_URL}bookmarks/`, data);
      await get().fetchBookmarks();
    } catch (error) {
      console.error("Failed to add bookmark:", error);
    }
  },

  // Remove a bookmark
  removeBookmark: async (bookmarkId) => {
    try {
      await axios.delete(`${BASE_URL}bookmarks/${bookmarkId}/`);
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
