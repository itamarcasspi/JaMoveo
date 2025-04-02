import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";


/**
 * Custom hook for handling user logout functionality.
 *
 * @returns {object} An object containing the loading state and logout function.
 * @returns {boolean} object.loading - Indicates if the logout process is in progress.
 * @returns {function} object.logout - A function to initiate the logout process.
 *
 * How it works:
 * 1.  Initializes a loading state to false.
 * 2.  Retrieves the setAuthUser function from the AuthContext.
 * 3.  The logout function sets the loading state to true.
 * 4.  Sends a POST request to the logout API endpoint.
 * 5.  Parses the JSON response.
 * 6.  If the response contains an error, it throws an error.
 * 7.  Removes the user data from localStorage and updates the AuthContext.
 * 8.  If any errors occur during the process, it logs the error.
 * 9.  Finally, sets the loading state to false.
 */
const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("user");
      setAuthUser(null);
    } catch (error) {
        console.log("Error in logout hook:",error)
    } finally {
        setLoading(false);
    }
  };
  return {loading,logout};
};

export default useLogout;