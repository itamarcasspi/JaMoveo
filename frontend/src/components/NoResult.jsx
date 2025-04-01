import React from "react";
import { NoSong } from "../assets";

const NoResult = () => {
  return (
    <div className="mt-30 ">
      <h1 className="text-xl text-center font-semi text-gray-900 mb-6">Sorry!</h1>
      <h1 className="text-l text-center font-semi text-gray-700 mb-6">This time we didn't find anything. Try again?</h1>

      <img
        src={NoSong}
        alt="Sad Ghibli Character"
        className="w-32 h-32 mx-auto rounded-2xl mb-16"
      />
    </div>
  );
};

export default NoResult;
