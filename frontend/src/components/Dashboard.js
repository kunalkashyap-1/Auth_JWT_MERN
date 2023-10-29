import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const {user, logout} = useAuth();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
