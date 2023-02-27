import React, { useState, useContext, useEffect } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [oobCode, setOobCode] = useState("");
  const [mode, setMode] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  const value = {
    resetPassword,
    setOobCode,
    oobCode,
    mode,
    setMode,
    passwordChanged,
    setPasswordChanged
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
