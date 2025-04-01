import React, { useState, useEffect } from "react";
import { PlayCircle, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { CircleArrowOutUpRight } from "lucide-react";
import { NoSong } from "../assets";

import useSession from "../hooks/useSession";
import useSearch from "../hooks/useSearch";
import NoResult from "../components/NoResult";

const AdminResults = () => {
  const navigate = useNavigate();
  const { useStart } = useSession();
  const [resultsArray, setResultsArray] = useState([]);
  const { search, loading } = useSearch();

  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("query");

  useEffect(() => {
    async function fetchResults() {
      const results = await search(query);
      
      setResultsArray(results.songArtistPairs);
    }

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto py-8 backdrop-blur-sm">
        <div className="flex justify-between">
          <h1 className="text-2xl  font-bold text-gray-900 mb-6">
            Search Results
          </h1>
          <CircleArrowOutUpRight
            className="mt-2 w-6 h-6 hover:text-purple-600"
            onClick={() => navigate("/admin-home")}
          ></CircleArrowOutUpRight>
        </div>
        
        <div className="space-y-4">
          {resultsArray.length === 0 && !loading ? (
            <NoResult></NoResult>
            
          ) : (
            resultsArray.length > 0 &&
            resultsArray.map((pair, index) => (
              <button
                key={index}
                className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex items-center"
                onClick={() => useStart(pair)}
              >
                <div className="flex-1 p-4 text-left">
                  <h3 className="font-semibold text-gray-900">{pair.at(0)}</h3>
                  <div className="flex items-center text-gray-500 mt-1">
                    <User className="w-4 h-4 mr-1" />
                    <span>{pair.at(1)}</span>
                  </div>
                </div>
                <div className="pr-4">
                  <PlayCircle className="w-8 h-8 text-purple-600 hover:text-purple-400" />
                </div>
              </button>
            ))
          )}
          
        </div>
      </div>
    </div>
  );
};

export default AdminResults;
