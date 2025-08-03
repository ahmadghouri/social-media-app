import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, PlusSquare, User, LogOut, Menu, X } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { Auth } from "../context/AuthContext";

const Navbar = () => {
  let { setUser } = Auth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = axiosInstance.get("v1/logout");
    } catch (error) {
      console.log(error);
      setUser(null);
    }
    setUser(null);

    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold text-purple-600">SocialApp</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-10 items-center">
          <Link
            to="/"
            className="flex items-center text-gray-700 hover:text-purple-600 font-medium"
          >
            <Home className="w-5 h-5 mr-1" />
            Feed
          </Link>
          <Link
            to="/create"
            className="flex items-center text-gray-700 hover:text-purple-600 font-medium"
          >
            <PlusSquare className="w-5 h-5 mr-1" />
            Create
          </Link>
          <Link
            to="/profile"
            className="flex items-center text-gray-700 hover:text-purple-600 font-medium"
          >
            <User className="w-5 h-5 mr-1" />
            Profile
          </Link>
        </div>

        {/* Logout Button */}
        <div className="hidden md:flex">
          <button
            onClick={handleLogout}
            className="flex items-center bg-purple-600 text-white px-4 py-1.5 rounded hover:bg-purple-700 transition"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 items-center">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center text-gray-700 hover:text-purple-600 font-medium"
          >
            <Home className="w-5 h-5 mr-1" />
            Feed
          </Link>
          <Link
            to="/create"
            onClick={() => setIsOpen(false)}
            className="flex items-center text-gray-700 hover:text-purple-600 font-medium"
          >
            <PlusSquare className="w-5 h-5 mr-1" />
            Create
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center text-gray-700 hover:text-purple-600 font-medium"
          >
            <User className="w-5 h-5 mr-1" />
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center bg-purple-600 text-white px-4 py-1.5 rounded hover:bg-purple-700 transition"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
