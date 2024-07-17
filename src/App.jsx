import React, { useContext, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import HistoryPage from "./pages/HistoryPage";
import AllBooks from "./pages/AllBooks";
import IssueBook from "./pages/IssueBook";
import BookHolders from "./pages/BookHolders";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AllStudents from "./pages/AllStudents";

// export const URL="http://localhost:5000"
export const URL="https://lms-backend-mtey.onrender.com"


function App() {


  return (
    <ChakraProvider>
      <AuthContextProvider>

        <Layout>
          <Routes>
         
          <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Route>

          
            <Route element={<ProtectedRoute role="admin" />}>
              <Route path="/allbooks" element={<AllBooks />} />
              <Route path="/issuebook" element={<IssueBook />} />
              <Route path="/bookholders" element={<BookHolders />} />
              <Route path="/allstudents" element={<AllStudents />} />

            </Route>

            <Route element={<ProtectedRoute role="student" />}>
              <Route path="/myhistory" element={<HistoryPage />} />
            </Route>

            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>

      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;

