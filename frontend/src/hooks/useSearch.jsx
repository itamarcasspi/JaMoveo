import { useState } from "react";


/**
 * Custom hook for handling song search functionality.
 *
 * @returns {object} An object containing the loading state and search function.
 * @returns {boolean} object.loading - Indicates if the search process is in progress.
 * @returns {function} object.search - A function to initiate the song search.
 *
 * How it works:
 * 1.  Initializes a loading state to false.
 * 2.  The search function takes a search query (_search) as input.
 * 3.  Sets the loading state to true.
 * 4.  Sends a GET request to the song search API endpoint, including the query as a URL parameter.
 * 5.  Parses the JSON response.
 * 6.  If the response contains an error, it throws an error.
 * 7.  Returns the search results (data) if successful.
 * 8.  If any errors occur during the process, it logs the error and returns null.
 * 9.  Finally, sets the loading state to false.
 */
const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const search = async (_search) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/search/findSongs/?query=${_search}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      console.log("Error in search hook:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  return { loading, search};
};

export default useSearch;
