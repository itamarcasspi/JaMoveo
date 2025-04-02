import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

/**
 * Custom hook for handling user signup functionality.
 *
 * @returns {object} An object containing the signup function and loading state.
 * @returns {function} object.signup - A function to initiate the signup process.
 * @returns {boolean} object.loading - Indicates if the signup process is in progress.
 *
 * How it works:
 * 1.  Initializes a loading state to false.
 * 2.  Retrieves the setAuthUser function from the AuthContext.
 * 3.  The signup function takes username, password, confirmPassword and instrument as input.
 * 4.  If username or password are missing, it logs an error and returns.
 * 5.  Sets the loading state to true.
 * 6.  Sends a POST request to the signup API endpoint.
 * 7.  Parses the JSON response.
 * 8.  If the response contains an error, it throws an error.
 * 9.  Stores the user data in localStorage and updates the AuthContext.
 * 10. Sets username_valid to true.
 * 11. If any errors occur during the process, it logs the error.
 * 12. Finally, sets the loading state to false and returns username_valid.
 */
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  
  const {setAuthUser} = useAuthContext();

  const signup = async ({ username, password,confirmPassword,instrument}) => {
    let username_valid = false;
    if (!username || !password) {
      console.log("Please enter credentials");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password,confirmPassword,instrument}),
      });

      const data = await res.json();
      if (data.error) {
        console.log("Data error in signup hook");
        throw new Error(data.error);
      }
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      username_valid = true;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
      return username_valid;
    }
  };
  return { signup,loading };
};

export default useSignup;
