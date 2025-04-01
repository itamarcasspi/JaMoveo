import React from "react";
import { LogOut } from "lucide-react";
import useLogout from "../hooks/useLogout";

const LogoutBtn = () => {
    const {logout,loading} = useLogout();
  return (
    <div className="text-center text-sm text-gray-500">
      <a
        onClick={logout}
        className="text-purple-500 hover:text-purple-800 font-medium"
      >
        <LogOut className="mt-50 w-8 h-8"></LogOut>
      </a>
    </div>
  );
};

export default LogoutBtn;
