import React, { useState } from "react";
import img from "../assets/user.webp";
import { Trash2 } from "lucide-react";
import { Auth } from "../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

const AddComment = ({ comments, post, hanleComment }) => {
  const [commentCreate, setCommentCreate] = useState("");
  let { user } = Auth();

  let handleCommentCreate = async (postId) => {
    try {
      const res = await axiosInstance.post("v3/create", {
        postId,
        text: commentCreate,
      });
      setCommentCreate("");
      hanleComment();
    } catch (error) {
      console.log(error);
    }
  };

  let handleDelete = async (postId) => {
    console.log(postId);
    try {
      const res = await axiosInstance.delete(`v3/delete/comment/${postId}`);
      hanleComment();
    } catch (error) {
      console.log();
    }
  };

  return (
    <>
      {/* Scrollable Comments */}
      <div className="max-h-64 overflow-y-auto  space-y-2">
        {comments
          .filter((c) => c.postId === post._id)
          .map((comment) => (
            <div key={comment._id}>
              <div className="flex w-full gap-3 pt-5 pb-1 pr-0.5">
                <div className="flex gap-3 w-full mb-3">
                  <img
                    src={comment.userId.profilePic || img}
                    alt=""
                    className="w-9.5 h-9 object-cover rounded-full mt-[-10px]"
                  />
                  <div className="shadow-sm w-full px-3 py-2 rounded-lg flex justify-between bg-gray-100">
                    <div>
                      <h2 className="text-sm font-medium text-gray-900 pb-1">
                        {comment.userId?.name || "Unknown"}
                      </h2>
                      <p className="text-sm text-gray-800">{comment.text}</p>
                    </div>
                    {comment.userId._id === user._id && (
                      <button onClick={() => handleDelete(comment._id)}>
                        <Trash2 className="w-4 h-4 text-gray-600" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <p className="ml-13 mt-1 text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
      </div>

      {/* Input Field */}
      <div className="flex space-x-2 mt-6">
        <img
          src={user.profilePic || img}
          alt=""
          className="w-9.5 h-9 object-cover rounded-full mt-[-10px]"
        />
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentCreate}
          onChange={(e) => setCommentCreate(e.target.value)}
          className="px-4 py-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-1 border-gray-200 w-11/12"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={() => handleCommentCreate(post._id)}
        >
          Post
        </button>
      </div>
    </>
  );
};

export default AddComment;
