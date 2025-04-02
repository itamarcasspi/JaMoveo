import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Search, Music, Loader } from "lucide-react";
import LogoutBtn from "../components/LogoutBtn";

import useSearch from "../hooks/useSearch";

export default function AdminMain() {
  const [searchValue, setSearch] = useState("");
  const { loading } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchValue) {
      navigate(`/admin-result?query=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-2xl mx-auto pt-20">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-purple-100 rounded-full animate-pulse">
            <Music className="w-12 h-12 text-purple-600" />
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search any song
          </h1>
          <div className="flex justify-center items-center">
            <div
              className="animate-ping duration-[1s,15s] mr-2 w-1 h-1 bg-gray-900 rounded-full"
              style={{ animationDuration: "1.5s", animationDelay: `0s` }}
            ></div>
            <div
              className="animate-ping mr-2 w-1 h-1 font-bold bg-gray-900 rounded-full"
              style={{
                animationDelay: `0.5s`,
                animationDuration: "1.5s",
              }}
            ></div>
            <div
              className="animate-ping  w-1 h-1 bg-gray-900 rounded-full"
              style={{
                animationDelay: `1s`,
                animationDuration: "1.5s",
              }}
            ></div>
          </div>
          <p className="text-gray-500">
            Find the perfect song for your band to play
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              value={searchValue}
              type="text"
              placeholder="Enter song name or artist..."
              className="w-full px-6 py-4 pr-12 text-lg border placeholder:text-gray-600 text-gray-900 border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              {loading ? (
                <Loader className="animate-spin"></Loader>
              ) : (
                <Search className="w-6 h-6" />
              )}
            </button>
          </div>
        </form>
        <div className="flex justify-center">
          <LogoutBtn></LogoutBtn>
        </div>
      </div>
    </div>
  );
}
