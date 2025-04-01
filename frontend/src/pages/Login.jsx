import React, { useState } from "react";

import useLogin from "../hooks/useLogin";

import { LogIn, Loader } from "lucide-react";
import { LoginLogo } from "../assets";

export default function CustomLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo -50 to-blue-50 p-4">
      <div
        className="w-full max-w-md rounded-2xl bg-cover bg-center shadow-xl"
        style={{ backgroundImage: `url(${LoginLogo})` }}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            {/* <h1 className="text-2xl mt-50 font-bold text-gray-700"> Login to join the Music!</h1> */}
            <p className="text-gray-500 mt-1"></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm mt-36 font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center h-[60px] mb-6">
              {" "}
              {loading ? (
                <Loader className="animate-spin mt-4" />
              ) : (
                <button
                  type="submit"
                  className="w-full  bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Sign In
                </button>
              )}
            </div>

            
          </form>
          <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}sign up as{" "}
              <a
                href="/signup"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Player
              </a>
              <span> or </span>
              <a
                href="/admin-signup"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Admin
              </a>
            </div>
            
        </div>
      </div>
    </div>
  );
}
