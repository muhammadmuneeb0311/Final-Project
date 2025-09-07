import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  token: null,
  userRole: null,
  saveToken: () => {},
  removeToken: () => {},
  getToken: () => null,
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // ✅ Load token & role from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    console.log("🔄 Loading from localStorage on mount:", {
      savedToken,
      savedRole,
    });

    if (savedToken) setToken(savedToken);
    if (savedRole) setUserRole(savedRole);
  }, []);

  // ✅ Save token & role to localStorage
  const saveToken = (token, role) => {
    console.log("👉 saveToken CALLED with:", { token, role });

    if (!token) {
      console.error("❌ No token provided to saveToken");
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setToken(token);
    setUserRole(role);

    console.log("✅ Saved in localStorage:", {
      token: localStorage.getItem("token"),
      role: localStorage.getItem("role"),
    });
  };

  // ✅ Remove token & role
  const removeToken = () => {
    console.log("🗑 Removing token & role from localStorage");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setUserRole(null);
  };

  // ✅ Get token
  const getToken = () => token;

  return (
    <AuthContext.Provider
      value={{ token, userRole, saveToken, removeToken, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
