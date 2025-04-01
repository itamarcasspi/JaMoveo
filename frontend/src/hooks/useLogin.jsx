import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

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
      const res = await fetch("http://localhost:5000/api/auth/login", {
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
