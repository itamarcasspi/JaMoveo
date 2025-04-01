import React, { useState } from "react";
import { UserPlus, Loader } from "lucide-react";
import { MinimalLoginLogo } from "../assets/index.js";
import useSignup from "../hooks/useSignup";

export default function Signup() {
  const { signup, loading } = useSignup();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [instrument, setInstrument] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && instrument && confirmPassword == password) {
      const valid_user = await signup({
        username,
        password,
        confirmPassword,
        instrument,
      });
      const username_form = document.getElementById("username");
      if (!valid_user) {
        username_form.setCustomValidity("Username already exists");
        username_form.reportValidity();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div
        className="w-full max-w-md bg-center bg-cover rounded-2xl shadow-xl"
        style={{ backgroundImage: `url(${MinimalLoginLogo})` }}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Join the music with JaMoveo
            </h1>
            <p className="text-gray-900 ">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                autoComplete="new-password"
                id="username"
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="Choose a username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  validateForm();
                }}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="Create a password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  validateForm();
                }}
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
                id="confirmPassword"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="Confirm password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateForm();
                }}
              />
            </div>
            <div>
              <label
                htmlFor="instrument"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Instrument
              </label>
              <select
                id="instrument"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                onChange={(e) => setInstrument(e.target.value)}
              >
                <option value="">Select your instrument</option>
                <option value="drums">Drums</option>
                <option value="guitar">Guitar</option>
                <option value="bass">Bass</option>
                <option value="saxophone">Saxophone</option>
                <option value="keyboard">Keyboard</option>
                <option value="singer">Singer</option>
              </select>
            </div>

            <div className="flex justify-center h-[60px] mb-6">
              {" "}
              {loading ? (
                <Loader className="animate-spin mt-4" />
              ) : (
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center justify-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Sign Up
                  </div>
                </button>
              )}
            </div>

           
          </form>
          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-600 hover:text-purple-700 font-medium"
            > 
              Sign in
            </a>
          </div>
          <div className="text-center text-sm text-gray-500">
            Looking for Admin signup?{" "}
            <a
              href="/signup"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Click here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const validateForm = () => {
  let validated = true;
  const username = document.getElementById("username");
  if (username.value == "") {
    username.setCustomValidity("Please enter username");
    validated = false;
  } else {
    username.setCustomValidity("");
  }

  const password = document.getElementById("password");
  if (password.value.length < 6) {
    password.setCustomValidity("Password should be at least 6 characters");
    validated = false;
  } else {
    password.setCustomValidity("");
    validated = true;
  }
  const confirm = document.getElementById("confirmPassword");
  if (confirm.value === password.value) {
    confirm.setCustomValidity("");
  } else {
    confirm.setCustomValidity("Passwords do not match");
    validated = false;
  }

  return validated;
};
