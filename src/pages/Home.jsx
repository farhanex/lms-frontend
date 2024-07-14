import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AdminProfile from "../components/AdminProfile";
import StudentProfile from "../components/StudentProfile";

const Home = () => {
  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')

  if (!user||!token) {
    return <Navigate to="/login" replace />;
  }

  return user === "admin" ? <AdminProfile /> : <StudentProfile />;
};

export default Home;
