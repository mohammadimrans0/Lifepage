import { create } from 'zustand';
import axios from 'axios';
// import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

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
  signup: (data: { username: string; email: string; password: string; confirm_password: string }) => Promise<void>;
  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => ({
  userId: typeof window !== 'undefined' ? localStorage.getItem('user_id') || null : null,
  profile: null, // Initial state for profile data

  // Function to handle signup
  signup: async (data) => {
    try {
      const response = await axios.post('https://lifepage-server.onrender.com/api/user/signup/', data);
      console.log('Signup successful:', response.data);
      alert('Signup successful. Please login.');
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message);
      alert(error.response?.data?.detail || 'Signup failed. Please try again.');
    }
  },

  // Function to handle login
  login: async (data) => {
    try {
      const response = await axios.post('https://lifepage-server.onrender.com/api/user/auth/login/', data);
      console.log(response)
      const userId = response.data?.user_id; // Assuming the API returns a `user_id`
      if (userId) {
        localStorage.setItem('user_id', userId);
        toast.success('Login successful! Redirecting...');
        setTimeout(() => {
          router.push('/'); 
        }, 2000);
      } else {
        throw new Error('User ID not found in the response.');
      }
    } catch (error) {
      toast.error('Login error:', error.response?.data || error.message);
    }
  },

  // Function to handle logout
  logout: async () => {
    try {
      await axios.post('https://lifepage-server.onrender.com/api/user/auth/logout/');
      localStorage.removeItem('user_id'); // Clear user ID from localStorage
      set({ userId: null, profile: null }); // Clear Zustand state
      alert('Logged out successfully.');
    } catch (error: any) {
      console.error('Logout error:', error.response?.data || error.message);
      toast.error(error.response?.data?.detail || 'Logout failed. Please try again.');
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
      const profile = response.data; // Assuming the API returns the profile object
      set({ profile }); // Update Zustand state with the fetched profile
      console.log('Profile fetched successfully:', profile);
    } catch (error: any) {
      console.error('Error fetching profile:', error.response?.data || error.message);
      alert(error.response?.data?.detail || 'Failed to fetch profile. Please try again.');
    }
  },

  // Function to update the user's profile
  updateProfile: async (data) => {
    const userId = get().userId; // Get the current user ID from the store
    if (!userId) {
      console.warn('User ID not found. Cannot update profile.');
      return;
    }

    try {
      const response = await axios.put(`https://lifepage-server.onrender.com/api/user/profiles/${userId}/`, data);
      const updatedProfile = response.data; // Assuming the API returns the updated profile object
      set({ profile: updatedProfile }); // Update Zustand state with the updated profile
      console.log('Profile updated successfully:', updatedProfile);
      alert('Profile updated successfully.');
    } catch (error: any) {
      console.error('Error updating profile:', error.response?.data || error.message);
      alert(error.response?.data?.detail || 'Failed to update profile. Please try again.');
    }
  },
}));
