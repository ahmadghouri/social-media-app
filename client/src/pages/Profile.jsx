import React, { useEffect, useRef, useState } from "react";
import { Auth } from "../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import VideoImage from "../components/VideoImage";
import { Edit3, Save, Trash2, Upload, X } from "lucide-react";
import Img from "../assets/user.webp";
import ProfileUpdate from "../components/ProfileUpdate";

const Profile = () => {
  let { user } = Auth();
  const [postUser, setPostUser] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  let handleUserpost = async () => {
    let res = await axiosInstance.get("v2/my");
    setPostUser(res.data);
  };
  const handleDelete = async (postId) => {
    await axiosInstance.delete(`v2/post/delete/${postId}`);
    handleUserpost();
  };
  useEffect(() => {
    handleUserpost();
  }, []);
  return (
    <div className="bg-gray-50 min-h-[100vh]">
      <div className="w-full max-w-4xl mx-auto mt-3">
        {/* Cover Image */}
        <div className=" border-1 rounded-2xl shadow-md bg-white border-gray-50 w-[90%] h-[70%] m-auto">
          <div className="relative h-32 bg-gradient-to-r rounded-tr-2xl rounded-tl-2xl from-purple-400 via-blue-500 to-indigo-600">
            {!isEditing && (
              <button
                className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 className="w-4 h-4 text-gray-700" />
              </button>
            )}
            {/* Profile Pic */}
            <div className="absolute -bottom-10 left-4">
              <img
                src={user.profilePic || Img}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
              />
            </div>
          </div>

          {/* Name & Bio */}
          <div className="mb-6">
            <div className="mt-14 px-4 text-left">
              {!isEditing ? (
                <>
                  <h2 className="text-lg font-sans md:text-xl text-gray-900 mb-2 font-bold">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 mb-1">{`@${user.userName}`}</p>
                  <p className="text-gray-600 mb-4">{user.bio}</p>
                </>
              ) : (
                <ProfileUpdate setIsEditing={setIsEditing} />
              )}
            </div>

            {/* Stats */}
            {!isEditing && (
              <div className="flex space-x-6 text-sm pl-5">
                <div className="text-center">
                  <p className=" font-black font-sans text-gray-900">
                    {user.followers.length}
                  </p>
                  <p className=" text-gray-500">Followers</p>
                </div>
                <div className="text-center">
                  <p className=" font-black font-sans text-gray-900">
                    {user.following.length}
                  </p>
                  <p className=" text-gray-500">Following</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Post Section */}
        <div className="mt-10 px-4">
          <h3 className="text-xl font-semibold mb-4">All Post</h3>
          <div className="p-4 space-y-6 max-w-2xl min-h-64 m-auto">
            {postUser.map((post) => (
              <div
                className="bg-white rounded-2xl border-1 min-h-36 border-gray-50 shadow-md p-4"
                key={post._id}
              >
                {/* {user data} */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 text-start"></div>
                </div>
                {/* Caption */}
                <p className="mt-3 font-sans">{post.caption}</p>
                <VideoImage
                  mediaUrl={post.mediaUrl}
                  mediaType={post.mediaType}
                />
                <button
                  className="w-full text-white bg-red-600 hover:bg-red-700 hove:transition-transform rounded-full py-3 mt-3 flex items-center text-center justify-center gap-2"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
