import React, { useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Toast from "./components/Toast";
import { useAuth } from "./context/AuthContext";
import "./App.css";

function App() {
  const { user, setUser } = useAuth();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  return (
    <div className="App">
      {user ? <Dashboard /> : <Login />}
      <Toast />
    </div>
  );
}

export default App;
