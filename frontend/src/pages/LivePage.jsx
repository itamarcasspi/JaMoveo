import React, { useState, useEffect, useRef } from "react";
import { OctagonX } from "lucide-react";

import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";

import QuitModal from "../components/QuitModal";
import CheckBox from "../components/CheckBox";

import useSession from "../hooks/useSession";
import useSong from "../hooks/useSong";

import lyrics from "../constants/wonderwall.json";
import DisplaySong from "../components/DisplaySong";

export default function LivePage() {
  const { authUser } = useAuthContext();
  const { sessionData } = useSocketContext();
  const { useQuit } = useSession();
  const { song, getSong } = useSong();

  const [songData, setSongData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCords, setShowCords] = useState(true);
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);

  const [autoScroll, setAutoScroll] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(2);
  //Setup auto scroll
  useEffect(() => {
    let interval;
    if (autoScroll) {
      interval = setInterval(() => {
        window.scrollBy({ top: scrollSpeed, behavior: "smooth" });
      }, 50);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup
  }, [autoScroll, scrollSpeed]);

  //Check if user's admin, for quit btn
  useEffect(() => {
    setIsAdmin(authUser.role == "admin");
    setShowCords(authUser.instrument != "Singer");
  }, []);

  //Fetch song data using getSong hook
  useEffect(() => {
    async function fetchSong() {
      const fetch = await getSong(sessionData.nameId);
      setSongData(fetch);
    }
    fetchSong();
  }, [sessionData]);

  const handleCloseModal = () => {
    setIsQuitModalOpen(false);
  };

  const handleConfirmQuit = () => {
    useQuit();
  };

  return (
    <div>
      <QuitModal
        isOpen={isQuitModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmQuit}
      />
      <div className="min-h-screen backdrop-blur-sm text-2xl">
        <div className="fixed flex items-center top-0 left-0 right-0 backdrop-blur-md p-4 shadow-lg z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center">
              {sessionData.song}
            </h1>
            <p className="text-center text-gray-600">{sessionData.artist}</p>
          </div>
          {isAdmin && (
            <div
              className="z-50 top-8 right-8 cursor-pointer hover:bg-gray-200 rounded-full p-1 transition-colors duration-200"
              onClick={() => {
                setIsQuitModalOpen(!isQuitModalOpen);
              }}
            >
              <OctagonX className="w-8 h-8" />
            </div>
          )}
        </div>
        
        {songData &&  songData.lyrics && <DisplaySong lyrics = {songData.lyrics} isSinger = {authUser.instrument == "singer"}></DisplaySong>}

        {/* <div className="pt-36 flex flex-col items-center text-2xl py-8">
          <div className="ml-4 mr-4 py-8 block max-w-full whitespace-nowrap text-[min(8vw,3rem)] w-fit">
            {songData.length > 0 ?  songData.map((line, index) => {
              return (
                <p
                  className="whitespace-nowrap text-[3.5vw] w-full  scale-[1] origin-left"
                  key={index}
                >
                  {line}
                </p>
              );
            }) : songData.map((line, index) => {
              return (
                <p
                  className="whitespace-nowrap text-[3.5vw] w-full  scale-[1] origin-left"
                  key={index}
                >
                  {line}
                </p>
              );}
            
              
            )}
            
          </div>
        </div> */}
      </div>
      <CheckBox
        autoScroll={autoScroll}
        setAutoScroll={setAutoScroll}
        scrollSpeed={scrollSpeed}
        setScrollSpeed={setScrollSpeed}
      />
    </div>
  );
}
