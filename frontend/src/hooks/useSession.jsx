import { useSocketContext } from "../../context/SocketContext";

/**
 * Custom hook for managing session-related socket interactions.
 *
 * @returns {object} An object containing functions to quit and start sessions.
 * @returns {function} object.useQuit - A function to emit a "sessionEnd" event.
 * @returns {function} object.useStart - A function to emit a "sessionStart" event with song data.
 *
 * 
 */
const useSession = () => {
  const { socket } = useSocketContext();

  const useQuit = () => {
    if (socket) {
      socket.emit("sessionEnd");
    }
  };

 /**
 * Emits a "sessionStart" event with song data.
 *
 * @param {object} data - An object containing song information.
 * @param {string} data.song - The title of the song.
 * @param {string} data.artist - The artist of the song.
 * @param {string} data.link - The link associated with the song.
 * @param {string} data.nameId - The unique identifier of the song.
 */
  const useStart = (data) => {
    if (socket) {
      socket.emit("sessionStart", data);
    }
  };
  return { useQuit, useStart };
};

export default useSession;
