import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [status, setStatus] = useState("checking"); // checking, auth, unauth

  useEffect(() => {
    const validateAuth = (data) => {
      if (data) {
        setUser(data);
        setStatus("auth");
      } else {
        setStatus("unauth");
      }
    };

    authService.checkAuth(validateAuth);
  }, []);

  const login = async (email, password) => {
    try {
      const user = await authService.login(email, password);

      setUser(user);
      setStatus("auth");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    try {
      authService.logout();
      setUser({});
      setStatus("unauth");
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, status, setStatus, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export { AuthProvider };
