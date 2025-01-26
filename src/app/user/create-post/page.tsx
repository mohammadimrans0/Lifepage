'use client'

import { usePostStore } from "@/stores/usePostStore";
import { useState } from "react";

const AddPost = () => {
  const { createPost, userId } = usePostStore();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      alert("User not logged in!");
      return;
    }

    if (!image) {
      alert("Please upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    formData.append("user", userId);

    try {
      setIsSubmitting(true);
      await createPost(formData);
      alert("Post created successfully!");
      setCaption("");
      setImage(null);
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <div className="p-4  mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setImage(file || null);
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="caption"
            className="block text-sm font-medium text-gray-700"
          >
            Caption
          </label>
          <textarea
            id="caption"
            rows={3}
            placeholder="Write a caption..."
            className="mt-1 block w-full text-sm border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddPost;
