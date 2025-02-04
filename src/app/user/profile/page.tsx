"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import UserPost from "@/components/user/profile/UserPost";
import BookMark from "@/components/user/profile/BookMark";
import { Bookmark, FileText } from "lucide-react";

const ProfilePage = () => {
  const { userId, profile, fetchProfile, updateProfile } = useUserStore();
  const [editableField, setEditableField] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId, fetchProfile]);

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
      console.error("Error updating profile:", error);
      alert("Error updating profile.");
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
      <div className="px-16 py-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-8">
          <Image
            src={profile.image}
            alt="Profile"
            width={200}
            height={200}
            className="rounded-full border-4 border-blue-300 shadow-md object-cover"
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">{profile?.user.username}</h1>
            <div className="flex space-x-6 mt-2">
              <div className="flex items-center">
                <span className="font-semibold mr-1">
                  {profile.followers_count}
                </span>{" "}
                Posts
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-1">
                  {profile.followers_count}
                </span>{" "}
                Followers
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-1">
                  {profile.following_count}
                </span>{" "}
                Following
              </div>
            </div>

            <div className="mt-2">
              {renderEditableField("name", profile.name)}
            </div>
            <div className="mt-2">
              {renderEditableField("bio", profile.bio)}
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
            {renderEditableField("email", profile?.user.email)}
          </div>
          <div className="flex items-center space-x-1">
            <label className="font-semibold">Status :</label>
            {renderEditableField("status", profile.status)}
          </div>
          <div className="flex items-center space-x-1">
            <label className="font-semibold">Contact Info :</label>
            {renderEditableField("contact_info", profile.contact_info)}
          </div>
        </div>
      </div>


      {/* Posts and Bookmark Section */}
      <div className="p-8 border-t border-slate-400">
      {/* Tab Navigation */}
      <div className="flex justify-around items-center mb-8">
        <button
          className={`flex gap-2 items-center px-4 py-2 rounded-lg transition-all duration-300 ${
            activeTab === "posts"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-300"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          <span>Posts</span>
          <FileText className="w-5 h-5" />
        </button>
        <button
          className={`flex gap-2 items-center px-4 py-2 ml-4 rounded-lg transition-all duration-300 ${
            activeTab === "bookmarks"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-300"
          }`}
          onClick={() => setActiveTab("bookmarks")}
        >
          <span>Bookmarks</span>
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      {/* Content Display */}
      <div>
        {activeTab === "posts" ? (
          <div>
            <UserPost />
          </div>
        ) : (
          <div>
            <BookMark />
          </div>
        )}
      </div>
    </div>

    </div>
  );
};

export default ProfilePage;
