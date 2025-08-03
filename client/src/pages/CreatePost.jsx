import React, { useState } from "react";
import { Auth } from "../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { Image, Video, X, Send } from "lucide-react";
import { toast } from "react-toastify";
const CreatePost = () => {
  const { user, Img } = Auth();

  const [postData, setPostData] = useState({
    caption: "",
    mediaType: "image", // image or video
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setPostData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      alert("Please select an image or video file.");
      return;
    }

    setSelectedFile(file);
    setPostData((prev) => ({
      ...prev,
      mediaType: isImage ? "image" : "video",
    }));

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postData.caption.trim()) return alert("Please add a caption!");
    if (!selectedFile) return alert("Please select an image or video!");

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("caption", postData.caption);
      formData.append("mediaUrl", selectedFile); // 👈 backend expects 'mediaUrl'
      formData.append("mediaType", postData.mediaType);

      await axiosInstance.post("v2/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset form
      setPostData({ caption: "", mediaType: "image" });
      setSelectedFile(null);
      setPreview(null);
      toast.success("post Succes Create");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearPreview = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto mt-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img
            src={user.profilePic || Img}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">@{user.userName}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Caption Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's on your mind?
          </label>
          <textarea
            name="caption"
            value={postData.caption}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Share your thoughts..."
            required
          />
        </div>

        {/* File Upload Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Media
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer">
              <Image className="w-4 h-4" />
              Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
            <label className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer">
              <Video className="w-4 h-4" />
              Video
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          </div>
        </div>

        {/* Media Preview */}
        {preview && (
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Preview:</h4>
            {postData.mediaType === "image" ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-lg"
              />
            ) : (
              <video
                src={preview}
                controls
                className="w-full max-h-64 rounded-lg"
              />
            )}
            <button
              type="button"
              onClick={handleClearPreview}
              className="mt-3 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              Remove Media
            </button>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isLoading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
