import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useSession from "./useSession";

const useSong = () => {
  const [loading, setLoading] = useState(false);
  const [song, setSong] = useState(false);
  const {authUser} = useAuthContext();

//   const {sessionData} = useSession();

  const getSong = async (songData) => {
    if (!songData) {
      console.log("Error fetching song ",songData);
      return;
    }
    setLoading(true);
    const isSinger = authUser.instrument == "singer";
    try {
      const res = await fetch(`http://localhost:5000/api/search/getSong/?songLink=${songData}&singer=${isSinger}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) {
        console.log("Data error in login hook");
        throw new Error(data.error);
      }
      return data;

    } catch (error) {
      console.log(error.message);

    } finally {
      setLoading(false);

    }
  };
  return { loading, getSong,song };
};

export default useSong;
