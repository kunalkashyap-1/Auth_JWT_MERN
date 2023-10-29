import React from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Toast from "./components/Toast";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, setUser } = useAuth();
  setUser(JSON.parse(localStorage.getItem("userInfo")));

  return <div className="App">
    {user ? <Dashboard /> : <Login />}
    <Toast/>
    </div>;
}

export default App;
