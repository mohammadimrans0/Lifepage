'use client'

import { useUserStore } from '@/stores/useUserStore';
import { usePostStore } from '@/stores/usePostStore';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle } from "lucide-react";

const ProfilePage = () => {
  const { userId, profile, fetchProfile, updateProfile } = useUserStore();
  const { userPosts, fetchUserPosts, bookmarks, fetchBookmarks } = usePostStore();
  const [editableField, setEditableField] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

//   Fetch profile when the component mounts
  useEffect(() => {
    if (userId) {
      fetchProfile();
      fetchUserPosts();
      fetchBookmarks();
    }
  }, [userId, fetchProfile, fetchUserPosts, fetchBookmarks]);

  // Handle input changes in editable fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle saving the updated data
  const handleSave = async (field: string) => {
    try {
      const updatedData = { [field]: formData[field] };
      await updateProfile(updatedData);
      setEditableField(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile.');
    }
  };

  // Render editable fields
  const renderEditableField = (field: string, value: string) => {
    if (editableField === field) {
      return (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            name={field}
            value={formData[field] || value}
            onChange={handleInputChange}
            className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 p-2 bg-transparent "
          />
          <button
            onClick={() => handleSave(field)}
            className="text-blue-500 hover:text-blue-700 transition duration-200"
          >
            Save
          </button>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-2">
        <span className="font-semibold">{value}</span>
        <button
          onClick={() => setEditableField(field)}
          className="text-blue-500 hover:text-blue-700 transition duration-200"
        >
          Edit
        </button>
      </div>
    );
  };

  if (!profile) {
    return <div className="">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto py-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-8">
          <Image
            src={profile.image}
            alt="Profile"
            width = {200}
            height = {200}
            className="rounded-full border-4 border-blue-300 shadow-md object-cover"
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">{profile?.user.username}</h1>
            <div className="flex space-x-6 mt-2">
              <div className="flex items-center">
                <span className="font-semibold mr-1">{profile.followers_count}</span> Posts
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-1">{profile.followers_count}</span> Followers
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-1">{profile.following_count}</span> Following
              </div>
            </div>

            <div className="mt-2">
                {renderEditableField('name', profile.name)}
            </div>
            <div className="mt-2">
                {renderEditableField('bio', profile.bio)}
            </div>

            <div className="flex space-x-2 mt-4">
              <button className="px-4 py-1 bg-blue-400 rounded-lg transition duration-200">
                Follow
              </button>
              <button className="px-4 py-1 bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-blue-500 transition duration-200">
                Message
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-8 space-y-4">
          
          <div className="flex items-center space-x-1">
          <label className="font-semibold">Email :</label>
            {renderEditableField('email', profile?.user.email)}
          </div>
          <div className="flex items-center space-x-1">
            <label className="font-semibold">Status :</label>
            {renderEditableField('status', profile.status)}
            </div>
          <div className="flex items-center space-x-1">
            <label className="font-semibold">Contact Info :</label>
            {renderEditableField('contact_info', profile.contact_info)}
          </div>
        </div>
      </div>

      <hr/>

      {/* Posts and Bookmark Section */}
      <div className="p-8">

        <div>
        <h1 className="text-2xl font-bold mb-4">User Posts</h1>

        <UserPost/>
  
        </div>



        <div>
        <h1 className="text-2xl font-bold mb-4">User Bookmarks</h1>

{bookmarks.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {bookmarks.map((bookmark) => (
      <div
        key={bookmark.id}
        className="relative group w-full h-64 rounded-lg overflow-hidden"
      >
        {/* bookmark Image */}
        <img
          src={bookmark.postDetails.image}
          alt={`bookmark ${bookmark.id}`}
          className="w-full h-full object-cover"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-white flex items-center gap-6">
            {/* Likes */}
            <div className="flex items-center gap-2">
              <Heart className="text-red-500" size={20} />
              <span>{bookmark.postDetails.no_of_likes}</span>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-2">
              <MessageCircle className="text-blue-400" size={20} />
              <span>{bookmark.postDetails.no_of_comments || 0}</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <p className="text-gray-500">No Bookmarks available.</p>
)}
       
       
        </div>
      
    </div>


    </div>
  );
};

export default ProfilePage;
