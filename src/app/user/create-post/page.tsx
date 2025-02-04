'use client'

import { usePostStore } from "@/stores/usePostStore";
import { useState } from "react";
import { Camera, Send } from "lucide-react"
import { toast, ToastContainer } from "react-toastify";

const AddPost = () => {
  const { createPost, userId } = usePostStore();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Please login to create a post!");
      return;
    }

    if (!image) {
      toast.error("Please upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    formData.append("user", userId);

    try {
      setIsSubmitting(true);
      await createPost(formData);
      toast.success("Post created successfully!");
      setCaption("");
      setImage(null);
    } catch (error) {
      console.error("Failed to create post:", error);
      toast.error("Failed to create post. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 md:p-12 flex items-center justify-center">
      <ToastContainer/>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="image"
                className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
              >
                <span className="flex items-center space-x-2">
                  <Camera className="w-6 h-6 text-gray-600" />
                  <span className="font-medium text-gray-600">{image ? image.name : "Click to upload"}</span>
                </span>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    setImage(file || null)
                  }}
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
              Caption
            </label>
            <textarea
              id="caption"
              rows={4}
              placeholder="What's on your mind..."
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg transition-all duration-200 ease-in-out ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-blue-600 hover:to-purple-700 hover:shadow-lg"
              }`}
            >
              <span>{isSubmitting ? "Posting..." : "Post"}</span>
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
