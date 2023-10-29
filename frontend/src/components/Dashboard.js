import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout, storyPoints, Secret } = useAuth();

  return (
    <div className="p-6 max-w-4xl h-screen mx-auto bg-white rounded-xl shadow-md flex flex-col items-center space-y-4 overflow-hidden">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Welcome, {user.name}!</h1>
      <h2 className="text-lg font-medium text-gray-700">Do you wanna Know my secret?👀 </h2>
      {!storyPoints && 
        <button onClick={Secret} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Reveal Secret
        </button>}
      <div className="story-container mt-4 overflow-auto">
        <div className="text-xl font-medium text-black">
          The Story of Node Reactor
        </div>
        <ul className="text-gray-500 list-disc pl-5">
          {storyPoints?.story.map((point, index) => (
            <li key={index} className="my-2">{point}</li>
          ))}
        </ul>
      </div>
      <button onClick={logout} className="w-1/2 bg-red-500 m-6 text-white p-2 rounded hover:bg-red-700 mt-4">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
