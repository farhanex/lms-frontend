import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { URL } from "../App";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toasts = useToast();

  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser) {
        handleLogout();
        return;
      }

      setUser(storedUser);

      if (["/login", "/register"].includes(location.pathname)) {
        navigate("/", { replace: true });
      }
    } catch (err) {
      // console.error("Error checking user login:", err);
      handleLogout();
    }
  };

  const loginUser = async (userData) => {
    try {
      const url =
        userData.role === "admin"
          ? `${URL}/api/auth/login`
          : `${URL}/api/auth/student/login`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", result.user.role);
        setUser(result.user.role);

        toasts({
          title: "Success",
          description: result.msg,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });

        navigate("/", { replace: true });
      } else {
        throw new Error(result.msg);
      }
    } catch (err) {
      // console.error("Error logging in:", err);
      toasts({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const registerUser = async (userData) => {
    try {
      const url = `${URL}/api/auth/register`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await res.json();

      if (res.ok) {
        toasts({
          title: "Success",
          description: result.msg,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });

        navigate("/", { replace: true });
      } else {
        throw new Error(result.msg);
      }
    } catch (err) {
      // console.error("Error registering:", err);
      toasts({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const logoutUser = async () => {
    try {
      const url = `${URL}/api/auth/logout`;
      const res = await fetch(url, {
        method: "GET",
      });

      const result = await res.json();

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);

      toasts({
        title: "Success",
        description: result.msg,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });

      navigate("/login", { replace: true });
    } catch (err) {
      // console.error("Error logging out:", err);
      toasts({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{ loginUser, registerUser, logoutUser, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
