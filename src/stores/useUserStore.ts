import { create } from 'zustand';
import axios from 'axios';
import { permanentRedirect } from 'next/navigation';
import { toast } from 'react-toastify';

// Define the base URL
const BASE_URL = 'https://lifepage-server.vercel.app/api';

type UserProfile = {
  user: any;
  id: number;
  username: string;
  email: string;
  name: string;
  image: string;
  bio: string;
  status: string;
  contact_info: string;
  followers: any[];
  following: any[];
  followers_count: number;
  following_count: number;
  created_at: string;
  updated_at: string;
};

type UserStore = {
  userId: string | null;
  loggedInProfile: UserProfile | null;
  profile: UserProfile | null;
  allProfiles: UserProfile[];
  signup: (data: { username: string; email: string; password: string; confirm_password: string }) => Promise<void>;
  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  fetchAllProfile: () => Promise<void>;
  fetchLoggedInProfile: () => Promise<void>;
  fetchProfile: (userId : string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  followUser: (data: { followerId: string; followingId: string }) => Promise<void>;
  unfollowUser: (data: { followerId: string; followingId: string }) => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => ({
  userId: typeof window !== 'undefined' ? localStorage.getItem('lifepage_user_id') || null : null,
  loggedInProfile: null,
  profile: null,
  allProfiles: [],

  signup: async (data) => {
    try {
      await axios.post(`${BASE_URL}/user/signup/`, data);
      toast.success('Account created successfully! Redirecting to login.');
      setTimeout(() => permanentRedirect('/auth/login'), 2000);
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message);
      toast.error(error.response?.data?.detail || 'Signup failed. Please try again.');
    }
  },

  login: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login/`, data);
      const userId = response.data?.user_id;
      const token = response.data?.token;
      if (userId) {
        localStorage.setItem('lifepage_user_id', userId);
        localStorage.setItem('lifepage_auth_token', token);
        toast.success('Login successful! Redirecting...');
        setTimeout(() => permanentRedirect('/'), 2000);
      } else {
        throw new Error('User ID not found in the response.');
      }
    } catch (error: any) {
      toast.error('Login error:', error.response?.data || error.message);
    }
  },

  logout: async () => {
    try {
      await axios.post(`${BASE_URL}/user/logout/`);
      localStorage.removeItem('lifepage_user_id');
      localStorage.removeItem('lifepage_auth_token');
      set({ userId: null, profile: null });
      toast.success('Logged out successfully.');
      setTimeout(() => permanentRedirect('/auth/login'), 2000);
    } catch (error: any) {
      console.error('Logout error:', error.response?.data || error.message);
      toast.error(error.response?.data?.detail || `Logout failed. Status: ${error.response?.status}`);
    }
  },

  fetchAllProfile: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/profiles/`);
      set({ allProfiles: response.data });
    } catch (error: any) {
      console.error('Error fetching all profiles:', error.response?.data || error.message);
    }
  },

  fetchLoggedInProfile: async () => {
    const userId = get().userId;
    if (!userId) return;

    try {
      const response = await axios.get(`${BASE_URL}/user/profiles/${userId}`);
      set({ loggedInProfile: response.data });
    } catch (error: any) {
      console.error('Error fetching profile:', error.response?.data || error.message);
    }
  },

  fetchProfile: async (userId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/profiles/${userId}`);
      set({ profile: response.data });
    } catch (error: any) {
      console.error('Error fetching profile:', error.response?.data || error.message);
    }
  },

  updateProfile: async (data) => {
    const userId = get().userId;
    if (!userId) return;

    try {
      const response = await axios.put(`${BASE_URL}/user/profiles/${userId}/`, data);
      set({ profile: response.data });
      toast.success('Profile updated successfully.');
    } catch (error: any) {
      console.error('Error updating profile:', error.response?.data || error.message);
      toast.error(error.response?.data?.detail || 'Failed to update profile.');
    }
  },

  followUser: async (data) => {
    try {
      await axios.post(`${BASE_URL}/user/follow/`, data);
      toast.success("Followed successfully!");
    } catch (error: any) {
      console.error("Error following user:", error.response?.data || error.message);
      // toast.error(error.response?.data?.detail || "Failed to follow user.");
    }
  },

  unfollowUser: async (data) => {
    try {
      await axios.delete(
        `${BASE_URL}/user/follow/?follower_id=${data.followerId}&following_id=${data.followingId}/`
      );
      toast.success("Unfollowed successfully!");
    } catch (error: any) {
      console.error("Error unfollowing user:", error.response?.data || error.message);
      // toast.error(error.response?.data?.detail || "Failed to unfollow user.");
    }
  },
}));
