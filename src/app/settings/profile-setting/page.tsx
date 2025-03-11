"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProfileSettingPage = () => {
  const { userId, profile, fetchProfile, updateProfile } = useUserStore();
  const [editableField, setEditableField] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
    } else {
      setTimeout(() => router.push("/auth/login"), 2000);
    }
  }, [userId, fetchProfile, router]);

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
        <div className="flex items-center justify-between w-full mx-auto">
          <input
            type="text"
            name={field}
            value={formData[field] || value}
            onChange={handleInputChange}
            className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 p-2 bg-transparent flex-1 mr-4"
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
      <div className="flex items-center justify-between w-full mx-auto">
        <p className="font-semibold flex-1 mr-4">{value}</p>
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
      <div className="px-2 md:px-16 py-8">
        {/* Profile Image */}
        <div className="flex justify-center">
          <Image
            src={profile.profile.image}
            alt="Profile"
            width={200}
            height={200}
            className="rounded-full border-4 border-blue-300 shadow-md object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="mt-8">
          <div className="flex items-center border-y">
            <label className="font-semibold border-r px-4 py-6 w-32">
              Username
            </label>
            <p className="ml-4">
              {renderEditableField("username", profile.username)}
            </p>
          </div>
          <div className="flex items-center border-b">
            <label className="font-semibold border-r px-4 py-6 w-32">
              Name
            </label>
            <p className="ml-4">{renderEditableField("name", profile.profile.name)}</p>
          </div>
          <div className="flex items-center border-b">
            <label className="font-semibold border-r px-4 py-6 w-32">Bio</label>
            <p className="ml-4">{renderEditableField("bio", profile.profile.bio)}</p>
          </div>
          <div className="flex items-center border-b">
            <label className="font-semibold border-r px-4 py-6 w-32">
              Email
            </label>
            <p className="ml-4">
              {renderEditableField("email", profile.email)}
            </p>
          </div>
          <div className="flex items-center border-b">
            <label className="font-semibold border-r px-4 py-6 w-32">
              Contact Info
            </label>
            <p className="ml-4">
              {renderEditableField("contact_info", profile.profile.contact_info)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingPage;
