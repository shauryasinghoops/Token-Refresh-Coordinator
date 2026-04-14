import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Login from "./SECTIONS/Login";
import Home from "./pages/Home";
import Signup from "./SECTIONS/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import SmoothScroll from "./components/SmoothScroll";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-white">Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

const AppContent = () => {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },

    {
      path: "/admin",
      element: (
        <ProtectedRoute role="Admin">
          <AdminDashboard />
        </ProtectedRoute>
      )
    },
    {
      path: "/dashboard/*",
      element: (
        <ProtectedRoute role="User">
          <UserDashboard />
        </ProtectedRoute>
      )
    },
  ];

  return useRoutes(routes);
};

const App = () => {
  return (
    <AuthProvider>
      <SmoothScroll>
        <main className="">
          <AppContent />
          <Toaster position="top-center" />
        </main>
      </SmoothScroll>
    </AuthProvider>
  );
};

export default App;
