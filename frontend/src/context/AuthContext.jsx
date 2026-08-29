import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const getCurrentUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    getCurrentUser();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(
      "http://localhost:4000/api/v1/auth/login",
      {
        email,
        password,
      },
    );

    localStorage.setItem("token", response.data.token);

    setUser(response.data.user);

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
