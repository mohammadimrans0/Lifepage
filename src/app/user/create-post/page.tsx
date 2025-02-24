"use client";

import { usePostStore } from "@/stores/usePostStore";
import { useState, useRef } from "react";
import Image from "next/image";
import { Send, X, ImageIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const AddPost = () => {
  const { createPost, userId } = usePostStore();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the file input

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear file input
    }
  };

  // Form submission
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
    <div className="p-2 md:p-6 flex items-center justify-center">
      <ToastContainer />
      <div className="w-full max-w-2xl bg-white rounded-lg drop-shadow-md overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-2 max-w-2xl mx-auto p-4 bg-white shadow-sm rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What's on your mind?"
              className="flex-grow px-4 py-2 text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <ImageIcon size={18} />
              <span className="sr-only">Add image</span>
            </button>

            <button
              type="submit"
              disabled={!caption.trim() && !image || isSubmitting}
              className="p-2 bg-blue-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              <Send size={18} />
              <span className="sr-only">Post</span>
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          {image && (
            <div className="relative w-full h-80 mt-2">
              <Image
                src={URL.createObjectURL(image)}
                alt="Selected"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-1 right-1 p-1 bg-white rounded-full text-gray-500 hover:text-red-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddPost;
