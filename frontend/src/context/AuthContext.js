import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const login = async (email, pswd) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "origin/api/user/login",
        { email, pswd },
        config
      );
      setLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      //   console.log(error);
      setToast({ isOpen: true, message: error.response.data.message });
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isAuthenticated,
        loading,
        setLoading,
        toast,
        setToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
