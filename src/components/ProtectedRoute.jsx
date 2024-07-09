import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("user");
  // const { user } = useContext(AuthContext);

  // if (!token || !userRole) {
  //   return <Navigate to="/login" replace />;
  // }

  if (role === userRole) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
