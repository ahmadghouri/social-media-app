import React, { useRef, useState } from "react";
import { Auth } from "../context/AuthContext";
import { Save, Upload, X } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

const ProfileUpdate = ({ setIsEditing }) => {
  let { user, setUser } = Auth();

  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [selectFile, setSelectedFile] = useState(null);
  const handleSaveFrom = async () => {
    try {
      const formDate = new FormData();
      formDate.append("name", name);
      formDate.append("bio", bio);
      if (selectFile) {
        formDate.append("profilePic", selectFile);
      }

      const res = await axiosInstance.put("v1/update", formDate, {
        headers: {
          "Contact-Type": "multipart/form-data",
        },
      });
      console.log("Profile Updated:", res.data);
      setIsEditing(false);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancalform = () => {
    setName(user.name || "");
    setBio(user.bio || "");
    setSelectedFile(null);
    setIsEditing(false);
  };
  const profilePic = useRef();
  return (
    <>
      <div className="mt-16 px-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-medium text-sm mt-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enyer Name You"
              className="border-gray-300 border-1 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-medium text-sm mt-1">
              Bio
            </label>
            <input
              type="text"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enyer Name You"
              className="border-gray-300 border-1 rounded-md px-2 py-2 pb-15 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium text-sm mt-1">
              Profile Image
            </label>
            <input
              type="file"
              ref={profilePic}
              onChange={(e) => setSelectedFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <div className="border-1 border-blue-500 px-5 py-2 bg-blue-100 w-fit rounded-md">
              <Upload
                onClick={() => profilePic.current.click()}
                className="w-5 h-5 text-blue-500"
              />
            </div>
          </div>

          <div className=" space-x-2 my-2 flex">
            <button
              className="bg-blue-600 px-4 py-2 rounded-md text-white flex w-fit items-center gap-2"
              onClick={handleSaveFrom}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              className="bg-red-600 px-4 py-2 rounded-md text-white flex w-fit items-center gap-1"
              onClick={handleCancalform}
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
