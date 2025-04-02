import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

/**
 * Custom hook for handling user login functionality.
 *
 * @returns {object} An object containing the loading state and login function.
 * @returns {boolean} object.loading - Indicates if the login process is in progress.
 * @returns {function} object.login - A function to initiate the login process.
 *
 * How it works:
 * 1.  Initializes a loading state to false.
 * 2.  Retrieves the setAuthUser function from the AuthContext.
 * 3.  The login function takes username and password as input.
 * 4.  If username or password are missing, it logs an error and returns.
 * 5.  Sets the loading state to true.
 * 6.  Sends a POST request to the login API endpoint.
 * 7.  Parses the JSON response.
 * 8.  If the response contains an error, it throws an error.
 * 9.  Stores the user data in localStorage and updates the AuthContext.
 * 10. If any errors occur during the process, it logs the error.
 * 11. Finally, sets the loading state to false.
 */
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  
  const {setAuthUser} = useAuthContext();

  const login = async ({ username, password }) => {
    if (!username || !password) {
      console.log("Please enter credentials");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.error) {
        console.log("Data error in login hook");
        throw new Error(data.error);
      }
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;
