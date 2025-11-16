import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  token: null,
  userRole: null,
  teamId: null,
  saveToken: () => {},
  removeToken: () => {},
  getToken: () => null,
});

export const AuthProvider = ({ children }) => {
  // Initialize auth state directly from localStorage so ProtectedRoute has immediate access
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [userRole, setUserRole] = useState(() => localStorage.getItem("role") || null);
  const [teamId, setTeamId] = useState(() => localStorage.getItem("teamId") || null);

  // ✅ Save token, role & teamId to localStorage
  const saveToken = (token, role, teamId) => {
    console.log("👉 saveToken called with:", { token, role, teamId });

    if (!token) return;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    // ✅ Extract ID if teamId is an object
    let teamIdValue = teamId;
    if (teamId && typeof teamId === "object") {
      teamIdValue = teamId._id || teamId.id || null;
    }

    if (teamIdValue) {
      localStorage.setItem("teamId", teamIdValue);
      setTeamId(teamIdValue);
    } else {
      localStorage.removeItem("teamId");
      setTeamId(null);
    }

    setToken(token);
    setUserRole(role);

    console.log("✅ Saved in localStorage:", {
      token: localStorage.getItem("token"),
      role: localStorage.getItem("role"),
      teamId: localStorage.getItem("teamId"),
    });
  };

  // ✅ Remove everything from localStorage
  const removeToken = () => {
    console.log("🗑 Removing auth data from localStorage");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("teamId");
    setToken(null);
    setUserRole(null);
    setTeamId(null);
  };

  // ✅ Getter for token
  const getToken = () => token;

  return (
    <AuthContext.Provider
      value={{ token, userRole, teamId, saveToken, removeToken, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
