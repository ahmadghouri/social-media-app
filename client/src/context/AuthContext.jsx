import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Img from "../assets/user.webp";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("v1/profile");
      setUser(res.data);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, Img }}>
      {children}
    </AuthContext.Provider>
  );
};

export const Auth = () => useContext(AuthContext);

// optional: default export if you're importing this way
export default AuthContext;
