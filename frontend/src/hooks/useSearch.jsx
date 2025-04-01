import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [songList,setSongList] = useState([]);
  const {setAuthUser} = useAuthContext();

  const search = async (_search) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search/songList/?query=${_search}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
    return data;
    } catch (error) {
        console.log("Error in logout hook:",error)
        return null;
    } finally {
        setLoading(false);
    }
  };
  return {loading,search,songList};
};

export default useSearch;