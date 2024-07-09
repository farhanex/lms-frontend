import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import AdminProfile from "../components/AdminProfile";
import StudentProfile from "../components/StudentProfile";

const Home = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user === "admin" ? <AdminProfile /> : <StudentProfile />;
};

export default Home;
