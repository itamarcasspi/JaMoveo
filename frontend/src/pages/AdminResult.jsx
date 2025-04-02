import React, { useState, useEffect } from "react";
import { PlayCircle, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { CircleArrowOutUpRight } from "lucide-react";
import { NoSong } from "../assets";

import useSession from "../hooks/useSession";
import useSearch from "../hooks/useSearch";
import NoResult from "../components/NoResult";
import SongResults from "../components/SongResults";


const AdminResults = () => {
  const navigate = useNavigate();
  const { useStart } = useSession();
  const [resultsArray, setResultsArray] = useState({});
  const { search,loading } = useSearch();

  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("query");

  useEffect(() => {
    async function fetchResults() {
      const results = await search(query);
      console.log(results);
      setResultsArray(results);
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
          {!resultsArray === 0 && !loading ? (
            <NoResult></NoResult>
            
          ) : (
            resultsArray.filteredSongs && <SongResults>{resultsArray.filteredSongs}</SongResults>
            
          )}
          
        </div>
      </div>
    </div>
  );
};

export default AdminResults;
