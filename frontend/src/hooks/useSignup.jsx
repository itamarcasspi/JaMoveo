import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

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
