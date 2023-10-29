import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { login, signUp, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login
      await login(email, password);
    } else {
      // Handle sign-up
      await signUp(email, name, password);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3  p-4 rounded-lg bg-[rgba(255,255,255,0.4)] backdrop-blur-md bg-opacity-30 p-6 rounded-xl border border-white border-opacity-20 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 border rounded "
            required
          />
          {!isLogin && (
            <input
              type="text"
              placeholder="User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
              required
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 flex items-center justify-center"
          >
            {loading ? (
              <div className="w-6 h-6 border-t-2 border-blue-100 border-solid rounded-full animate-spin"></div>
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="flex justify-end">
          <p className="">
            {isLogin ? (
              <>
                Haven't registered yet?
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  className="cursor-pointer text-blue-700"
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already a member?
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  className="cursor-pointer text-blue-700"
                >
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
