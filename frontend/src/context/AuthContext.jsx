import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await axios.post(
      "http://localhost:4000/api/v1/auth/login",
      {
        email,
        password,
      }
    );

    setUser(response.data.user);

    return response.data;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
