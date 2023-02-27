import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { oobCode, mode, passwordChanged } = useAuth();
  const currentURL = window.location.href;
  if (mode !== "resetPassword" && oobCode === null) {
    return <Navigate to="/not-found" replace />;
  }
  return children;
}
