import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

/**
 * Custom hook for fetching song data.
 *
 * @returns {object} An object containing the loading state, getSong function, and song state.
 * @returns {boolean} object.loading - Indicates if the song fetching process is in progress.
 * @returns {function} object.getSong - A function to fetch song data.
 * @returns {boolean} object.song - The fetched song data.
 *
 * How it works:
 * 1.  Initializes a loading state to false and song state to false.
 * 2.  Retrieves the authUser object from the AuthContext.
 * 3.  The getSong function takes songData as input (the song's name or ID).
 * 4.  If songData is missing, it logs an error and returns.
 * 5.  Sets the loading state to true.
 * 6.  Determines if the user is a singer based on authUser.instrument.
 * 7.  Sends a GET request to the song retrieval API endpoint, including songData and isSinger as URL parameters.
 * 8.  Parses the JSON response.
 * 9.  If the response contains an error, it throws an error.
 * 10. Returns the fetched song data (data) if successful.
 * 11. If any errors occur during the process, it logs the error.
 * 12. Finally, sets the loading state to false.
 */
const useSong = () => {
  const [loading, setLoading] = useState(false);
  const [song, setSong] = useState(false);
  const { authUser } = useAuthContext();

  const getSong = async (songData) => {
    if (!songData) {
      console.log("Error fetching song ", songData);
      return;
    }
    setLoading(true);
    const isSinger = authUser.instrument == "singer";
    try {
      const res = await fetch(
        `/api/search/getSong/?songName=${songData}&singer=${isSinger}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

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
  return { loading, getSong, song };
};

export default useSong;
