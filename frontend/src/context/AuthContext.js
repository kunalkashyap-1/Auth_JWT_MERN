import { createContext, useContext, useState } from "react";
import axios from "axios";

// Create a context for authentication
const AuthContext = createContext();

// Define a hook to use the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Define a provider for the authentication context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State for the current user
  const [storyPoints, setStoryPoints] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading status
  const [toast, setToast] = useState({ isOpen: false, message: null }); // State for toast notifications

  // Define a function for user login
  const login = async (email, password) => {
    try {
      setLoading(true); // Start loading
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // Send a POST request to the login endpoint
      const { data } = await axios.post(
        "http://localhost:8383/api/user/login",
        { email, pswd:password },
        config
      );
      setLoading(false); // End loading
      // console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data)); // Store user info in local storage
      setUser(data); // Set the current user
    } catch (error) {
      setToast({ isOpen: true, message: error.response.data.message }); // Show error message in a toast notification
      setLoading(false); // End loading
    }
  };

  // Define a function for user logout
  const logout = () => {
    localStorage.removeItem("userInfo"); // Remove user info from local storage
    setUser(null); // Clear the current user
  };

  // Define a function for user registration
  const signUp = (email, name, password) => {
    if (!email.includes("@")) {
      setToast({ isOpen: true, message: "Please Enter valid Emal ID" });
      return; // Return if email is invalid
    }

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    axios
      .post(
        "http://localhost:8383/api/user/register",
        {
          name,
          email,
          pswd:password,
        },
        config
      )
      .then((data) => {
        localStorage.setItem("userInfo", JSON.stringify(data)); // Store user info in local storage after successful registration
        setUser(data); // Set the current user
      })
      .catch((error) => {
        setToast({ isOpen: true, message: error.response.data.message });
        console.log(error.response.data.message); // Log error message to console on failure
      });
  };

  const Secret = async ()=>{
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:8383/api/user/protected`,
        config
      );
      setLoading(false);
      setStoryPoints(data);
    } catch (error) {
      setToast({ isOpen: true, message: error.response.data.message });
      setLoading(false);
    }
  }


  // Define a function to check if user is authenticated
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
        signUp,
        Secret,
        storyPoints,
        setStoryPoints,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
