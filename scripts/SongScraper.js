import axios from "axios";
import * as cheerio from "cheerio";
import { promises as fs } from "fs";
import path from "path";

const __dirname = path.resolve();

async function scrapeAndSave(query) {
  try {
    const searchUrl = `https://www.tab4u.com/resultsSimple?tab=songs&q=${query}`;
    console.log(`Searching for: ${query}`);

    const searchResponse = await axios.get(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        Referer: "https://www.tab4u.com/",
        DNT: "1",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        TE: "trailers",
      },
    });

    const $search = cheerio.load(searchResponse.data);

    const songLinks = $search(".ruSongLink")
      .map((i, element) => $search(element).attr("href"))
      .get();
    const songNames = $search(".sNameI19")
      .map((i, el) => $search(el).text().trim().replace("/", ""))
      .get();
    const artistNames = $search(".aNameI19")
      .map((i, el) => $search(el).text().trim())
      .get();

    const songArtistPairs = songNames.map((song, index) => ({
      song,
      artist: artistNames[index],
      link: songLinks[index],
      nameId: song.replace(/[^a-z0-9]/gi, "_"),
    }));

    await updateSongsDb(songArtistPairs);

    for (const songData of songArtistPairs) {
      await saveSongDetails(songData.link, songData.song);
    }

    console.log(`Processed search for: ${query}`);
  } catch (error) {
    console.error(`Error processing search for ${query}:`, error);
  }
}

async function updateSongsDb(newSongs) {
  let existingSongs = [];
  //create path ./songdb/SongsDb.json
  const songsDbDir = path.join(__dirname, "songdb");
  const songsDbPath = path.join(songsDbDir, "SongsDb.json");

  await fs.mkdir(songsDbDir, { recursive: true });

  try {
    const data = await fs.readFile(songsDbPath, "utf8");
    existingSongs = JSON.parse(data);
  } catch (readError) {
    if (readError.code !== "ENOENT") {
      console.error("Error reading SongsDb.json:", readError);
    }
  }

  // Merge new songs with existing ones (avoid duplicates)
  const uniqueSongs = newSongs.filter(
    (newSong) =>
      !existingSongs.some((existingSong) => existingSong.link === newSong.link)
  );

  const updatedSongs = [...existingSongs, ...uniqueSongs];

  try {
    await fs.writeFile(songsDbPath, JSON.stringify(updatedSongs, null, 2));
    console.log("SongsDb.json updated successfully.");
  } catch (writeError) {
    console.error("Error writing to SongsDb.json:", writeError);
  }
}

async function saveSongDetails(songLink, songName) {
  try {
    const encodedLink = encodeURIComponent(songLink);
    const repairedLink = encodedLink.replaceAll("%2F", "/");
    const songUrl = `https://www.tab4u.com/${repairedLink}`;

    const songResponse = await axios.get(songUrl);
    const $song = cheerio.load(songResponse.data);

    const songLines = $song(".chords,.chords_en,.song").map((i, el) => {
      const element = $song(el);
      const text = element.text().trim();
      let type = "words"; // Default to words

      if (element.hasClass("chords") || element.hasClass("chords_en")) {
        type = "chords";
      }

      return { text, type };
    }).get();

    if (songLines.length === 0) {
      console.log(`No lyrics/chords found for: ${songName}`);
      return;
    }

    // Create song JSON file in ./songdb/songs/
    const songDetails = { songName, lyrics: songLines }; 
    const db_folder = path.join(__dirname, "songdb");
    const songs_folder = path.join(db_folder, "songs");
    await fs.mkdir(songs_folder, { recursive: true });
    const songFilePath = path.join(
      songs_folder,
      `${songName.replace(/[^a-z0-9]/gi, "_")}.json`
    );

    await fs.writeFile(songFilePath, JSON.stringify(songDetails, null, 2));
    console.log(`Saved details for: ${songName}`);
  } catch (error) {
    console.error(`Error saving details for ${songName}:`, error);
  }
}

//driver function
async function runScraper() {
    //some base queries to fill in
  const baseQueries = ["love story", "bohemian rhapsody", "hotel california"];
  //get some more args if wanted
  const args = process.argv.slice(2);

  const searchQueries = [...baseQueries,...args];
  for (const query of searchQueries) {
    await scrapeAndSave(query);
  }
}

runScraper();
