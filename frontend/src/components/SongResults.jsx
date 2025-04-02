import React from "react";
import {PlayCircle,User } from "lucide-react";
import useSession from "../hooks/useSession";

const SongResults = (props) => {
    const {useStart} = useSession();
  return props.children.map((pair, index) => (
    <button
      key={index}
      className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex items-center"
      onClick={() => useStart(pair)}
    >
      <div className="flex-1 p-4 text-left">
        <h3 className="font-semibold text-gray-900">{pair.song}</h3>
        <div className="flex items-center text-gray-500 mt-1">
          <User className="w-4 h-4 mr-1" />
          <span>{pair.artist}</span>
        </div>
      </div>
      <div className="pr-4">
        <PlayCircle className="w-8 h-8 text-purple-600 hover:text-purple-400" />
      </div>
    </button>
  ));
};

export default SongResults;
