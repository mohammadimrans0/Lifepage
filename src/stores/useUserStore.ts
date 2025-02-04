import { create } from 'zustand';
import axios from 'axios';
import { permanentRedirect } from 'next/navigation'
import { toast } from 'react-toastify';

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
  profile: UserProfile | null;
  allProfiles: UserProfile[];
  signup: (data: { username: string; email: string; password: string; confirm_password: string }) => Promise<void>;
  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  fetchAllProfile: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => ({
  userId: typeof window !== 'undefined' ? localStorage.getItem('user_id') || null : null,
  profile: null,
  allProfiles: [],

  // Function to handle signup
  signup: async (data) => {
    try {
      await axios.post('https://lifepage-server.onrender.com/api/user/signup/', data);
      toast.success('Account created successfully! Redirecting to login.');

      setTimeout(() => {
        permanentRedirect('/auth/login');
      }, 2000);
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message);
      toast.error(error.response?.data?.detail || 'Signup failed. Please try again.');
    }
  },

  // Function to handle login
  login: async (data) => {
    try {
      const response = await axios.post('https://lifepage-server.onrender.com/api/user/login/', data);
      const userId = response.data?.user_id;
      const token = response.data?.token;
      if (userId) {
        localStorage.setItem('user_id', userId);
        localStorage.setItem('token', token);

        toast.success('Login successful! Redirecting...');

        setTimeout(() => {
          permanentRedirect('/');
        }, 2000);
      } else {
        throw new Error('User ID not found in the response.');
      }
    } catch (error : any) {
      toast.error('Login error:', error.response?.data || error.message);
    }
  },

  // Function to handle logout
  logout: async () => {
    try {
      await axios.post('https://lifepage-server.onrender.com/api/user/logout/');
      localStorage.removeItem('user_id');
      localStorage.removeItem('token');
      set({ userId: null, profile: null });
      toast.success('Logged out successfully.');

      setTimeout(() => {
        permanentRedirect('/auth/login');
      }, 2000);
    } catch (error: any) {
      console.error('Logout error:', error.response?.data || error.message);
      toast.error(error.response?.data?.detail || `Logout failed. Status: ${error.response?.status}`);
    }
  },  

  // Function to fetch all profile
  fetchAllProfile: async () => {
    try {
      const response = await axios.get(`https://lifepage-server.onrender.com/api/user/profiles/`);
      set({ allProfiles: response.data });
    } catch (error: any) {
      console.error('Error fetching all profiles:', error.response?.data || error.message);
    }
  },

  // Function to fetch the user's profile
  fetchProfile: async () => {
    const userId = get().userId; // Get the current user ID from the store
    if (!userId) {
      console.warn('User ID not found. Cannot fetch profile.');
      return;
    }

    try {
      const response = await axios.get(`https://lifepage-server.onrender.com/api/user/profiles/${userId}`);
      const profile = response.data;
      set({ profile });
    } catch (error: any) {
      console.error('Error fetching profile:', error.response?.data || error.message);
    }
  },

  // Function to update the user's profile
  updateProfile: async (data) => {
    const userId = get().userId;
    if (!userId) {
      console.warn('User ID not found. Cannot update profile.');
      return;
    }

    try {
      const response = await axios.put(`https://lifepage-server.onrender.com/api/user/profiles/${userId}/`, data);
      const updatedProfile = response.data;
      set({ profile: updatedProfile });
      console.log('Profile updated successfully:', updatedProfile);
      toast.success('Profile updated successfully.');
    } catch (error: any) {
      console.error('Error updating profile:', error.response?.data || error.message);
      toast.error(error.response?.data?.detail || 'Failed to update profile. Please try again.');
    }
  },
}));
