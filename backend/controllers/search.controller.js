import songsDb from "../songdb/SongsDb.json" with { type: 'json' };
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from "url";

/**
 * Fetches the detailed data for a specific song from its JSON file.
 *
 * @param {object} req - The request object from Express.js.
 * @param {object} res - The response object from Express.js.
 * @returns {Promise<void>} - Sends the song data as a JSON response or an error.
 *
 * How it works:
 * 1.  Gets the songName from the URL's query parameters (e.g., ?songName=example.json).
 * 2.  If songName is missing, sends a 400 error.
 * 3.  Constructs the file path to the song's JSON file.
 * 4.  Reads the file.
 * 5.  Parses the JSON data.
 * 6.  Sends the parsed data as a 200 response.
 * 7.  If any errors occur, sends a 500 error.
 */
export const getSong = async (req, res) => {
    const { songName } = req.query;
  
    if (!songName) {
      return res.status(400).json({ error: "Missing songName or artist" });
    }   
    try {
        
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const songFilePath = path.join(__dirname, '../songdb/songs', songName+".json");
        const songData = await fs.readFile(songFilePath, 'utf8');
        const parsedSongData = JSON.parse(songData);
    
        res.status(200).json(parsedSongData);
    } catch (error) {
        console.error("Error getting song:", error);
        res.status(500).json({ error: "Internal server error" });
    }

  };
  
/**
 * Searches the song database for songs matching a given query.
 *
 * @param {object} req - The request object from Express.js.
 * @param {object} res - The response object from Express.js.
 * @returns {Promise<void>} - Sends an array of matching songs as a JSON response or an error.
 *
 * How it works:
 * 1.  Gets the search query from the URL's query parameters (e.g., ?query=something).
 * 2.  If the query is missing, sends a 400 error.
 * 3.  Filters the songsDb array to find songs where the title or artist includes the query.
 * 4.  Sends the filtered array as a 200 response.
 */
export const findSongs = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing songName or artist" });
  }

  const filteredSongs = songsDb.filter((song) => {
    const queryLower = query.toLowerCase();
    const songLower = song.song.toLowerCase();
    const artistLower = song.artist.toLowerCase();

    return songLower.includes(queryLower) || artistLower.includes(queryLower);
  });

  res.status(200).json({ filteredSongs });
};
