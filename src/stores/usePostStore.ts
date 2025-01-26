import { create } from 'zustand';
import axios from 'axios';
// import { toast } from 'react-toastify';

export interface Post {
  id: string;
  user: string;
  image: string;
  caption?: string;
  created_at: string;
  no_of_likes: number;
  no_of_comments: number;
}

interface Comment {
  id: string;
  post: string;
  user: string;
  comment: string;
  created_at: string;
}

interface Bookmark {
  postDetails: any;
  id: string;
  post: string;
  user: string;
  created_at: string;
}

interface PostStore {
  userId: string | null; // Store the user ID after login
  posts: Post[];
  userPosts: Post[];
  comments: Comment[];
  bookmarks: Bookmark[];
  fetchPosts: () => Promise<void>;
  fetchUserPosts: () => Promise<void>;
  createPost: (data: FormData) => Promise<void>;
  updatePost: (id: string, data: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  addComment: (data: { post: string; comment: string }) => Promise<void>;
  fetchComments: (postId: string) => Promise<void>;
  updateComment: (id: string, data: Partial<Comment>) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
  fetchBookmarks: () => Promise<void>;
  addBookmark: (postId: string) => Promise<void>;
  removeBookmark: (bookmarkId: string) => Promise<void>;
}

const BASE_URL = 'https://lifepage-server.onrender.com/api/post/';

export const usePostStore = create<PostStore>((set, get) => ({
  userId: typeof window !== 'undefined' ? localStorage.getItem('user_id') || null : null,
  posts: [],
  userPosts: [],
  comments: [],
  bookmarks: [],

  // Fetch all posts
  fetchPosts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}posts/`);
      set({ posts: response.data });
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  },

  // Fetch all user posts
  fetchUserPosts: async () => {
    try {
      const userId = get().userId; // Retrieve userId from the store
      if (!userId) {
        console.error('User ID is not available.');
        return;
      }
      const response = await axios.get(`${BASE_URL}posts/?user=${userId}`);
      set({ userPosts: response.data });
    } catch (error) {
      console.error('Failed to fetch user posts:', error);
    }
  },

  // Create a new post
  createPost: async (data: FormData) => {
    try {
      await axios.post(`${BASE_URL}posts/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await get().fetchPosts();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  },

  // Update an existing post
  updatePost: async (id, data) => {
    try {
      await axios.put(`${BASE_URL}posts/${id}/`, data);
      await get().fetchPosts();
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  },

  // Delete a post
  deletePost: async (id) => {
    try {
      await axios.delete(`${BASE_URL}posts/${id}/`);
      await get().fetchPosts();
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  },

  // Like a post
  likePost: async (postId) => {
    try {
      await axios.post(`${BASE_URL}likeposts/`, { post: postId });
      await get().fetchPosts();
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  },

  // Add a comment to a post
  addComment: async (data) => {
    try {
      await axios.post(`${BASE_URL}commentposts/`, data);
      await get().fetchComments(data.post);
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  },

  // Fetch comments for a specific post
  fetchComments: async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}commentposts/?post=${postId}`);
      set({ comments: response.data });
    } catch (error) {
      console.error('Failed to fetch comments:', error);
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
      console.error('Failed to update comment:', error);
    }
  },

  // Delete a comment
  deleteComment: async (id) => {
    try {
      await axios.delete(`${BASE_URL}commentposts/${id}/`);
      const currentComments = get().comments;
      set({ comments: currentComments.filter((comment) => comment.id !== id) });
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  },

  // Fetch all bookmarks
  fetchBookmarks: async () => {
    try {
      const userId = get().userId; // Retrieve userId from the store
      if (!userId) {
        console.error('User ID is not available.');
        return;
      }
      const response = await axios.get(`${BASE_URL}bookmarks/?user=${userId}`);
      const bookmarks = response.data;

      // Step 2: Fetch post details for each bookmark
      const updatedBookmarks = await Promise.all(
      bookmarks.map(async (bookmark : any) => {
        try {
            const postResponse = await axios.get(
              `${BASE_URL}posts/${bookmark.post}/`
            ); // Assuming post details endpoint
            return { ...bookmark, postDetails: postResponse.data };
          } catch (error) {
            console.error(`Failed to fetch post details for post ID: ${bookmark.post}`, error);
            return { ...bookmark, postDetails: null };
          }
        })
      );

      set({ bookmarks: updatedBookmarks });
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
    }
  },

  // Add a bookmark
  addBookmark: async (postId) => {
    try {
      await axios.post(`${BASE_URL}bookmarks/`, { post: postId });
      await get().fetchBookmarks();
    } catch (error) {
      console.error('Failed to add bookmark:', error);
    }
  },

  // Remove a bookmark
  removeBookmark: async (bookmarkId) => {
    try {
      await axios.delete(`${BASE_URL}bookmarks/${bookmarkId}/`);
      const currentBookmarks = get().bookmarks;
      set({
        bookmarks: currentBookmarks.filter((bookmark) => bookmark.id !== bookmarkId),
      });
    } catch (error) {
      console.error('Failed to remove bookmark:', error);
    }
  },
}));
