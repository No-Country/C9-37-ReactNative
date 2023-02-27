import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SuccessProtectedRoute({ children }) {
  const { oobCode, mode, passwordChanged } = useAuth();
  if (!passwordChanged) {
    return <Navigate to="/not-found" replace />;
  }
  return children;
}
