import React, { useEffect, useState } from "react";
import userImag from "../assets/user.webp";
import LikeComment from "../components/LikeComment";
import VideoImage from "../components/VideoImage";
import axiosInstance from "../../utils/axiosInstance";
import { Auth } from "../context/AuthContext";
const Home = () => {
  let { user, setUser } = Auth();

  const [posts, setPosts] = useState([]);

  const getPostData = async () => {
    try {
      const res = await axiosInstance.get("v2/");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlefollow = async (postId) => {
    try {
      let res = await axiosInstance.put(`v1/follow/${postId}`);
      // setUser(res.data);
      // getPostData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);
  return (
    <>
      <div className="p-4 space-y-6 max-w-2xl min-h-64 m-auto">
        {posts.map((post) => (
          <div
            className="bg-white rounded-2xl border-1 min-h-36 border-gray-50 shadow-md p-4"
            key={post._id}
          >
            {/* {user data} */}
            <div className="flex justify-between items-center">
              <div className="flex gap-3 text-start">
                <img
                  src={post.userId?.profilePic || userImag}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h2 className=" font-semibold">{post.userId?.name}</h2>
                  <p className="text-sm text-gray-500">
                    @{post.userId?.userName || ""}
                  </p>
                </div>
              </div>
              <div>
                {user._id !== post.userId._id && (
                  <button
                    className="text-sm px-3 py-1 bg-blue-500 text-white rounded-3xl"
                    onClick={() => handlefollow(post.userId._id)}
                  >
                    {user.following?.includes(post.userId._id)
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                )}
              </div>
            </div>
            {/* Caption */}
            <p className="mt-3 font-sans">{post.caption}</p>
            <VideoImage mediaUrl={post.mediaUrl} mediaType={post.mediaType} />

            <LikeComment post={post} getPostData={getPostData} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
