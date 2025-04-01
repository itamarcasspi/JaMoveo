import React from "react";
import { LogOut, Music2 } from "lucide-react";

import LogoutBtn from "../components/LogoutBtn";

export default function PlayerHome() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-xl mx-auto pt-20">
        <div className="text-center block justify-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-purple-100 rounded-full animate-pulse">
              <Music2 className="w-12 h-12 text-purple-600" />
            </div>
          </div>

          <div className="flex justify-center">
            <h1 className="text-3xl mr-1 font-bold text-gray-900 mb-4 flex">
              {Array.from("Waiting...").map((letter, index) => (
                <span
                  key={index}
                  className={`inline-block animate-bounce`}
                  style={{
                    animationDelay: `var(--animation-delay-${index * 150}ms)`,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </h1>
          </div>

          <p className="text-gray-600">
            The admin will select a song soon. Stay tuned!
          </p>
          <div className="flex justify-center">
            <LogoutBtn></LogoutBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
