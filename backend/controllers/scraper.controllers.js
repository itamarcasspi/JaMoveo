import axios from "axios";
import * as cheerio from "cheerio";

///api/search/getSong/?songLink=

/**
 * Handles a request to fetch song data based on link.
 * 
 *
 * @param {Express.Request} req - The Express request object.
 * @param {Express.Response} res - The Express response object.
 *
 * @route GET /getSong
 * @query {string} songLink - The link of the song.
 *
 * @returns {Object} JSON response containing song data, chords and lyrics.
 * @throws {Object} Returns an error response if scraping fails.
 *
 * @example
 * // Request example, with or without singer flag:
 * GET /getSong/?songLink=tabs/songs/3396_Oasis_-_Wonderwall.html&singer
 * GET /getSong/?songLink=tabs/songs/3396_Oasis_-_Wonderwall.html
 *
 * // Response example:
 * {
 *   "songArtistPairs": [
 *     ["Bohemian Rhapsody", "Queen", "/song-link"],
 *     ["Bohemian Rhapsody (Acoustic)", "Queen", "/song-link-2"]
 *   ]
 * }
 */

export const linkToData = async (req, res) => {
  const { songLink,singer} = req.query;

  if (!songLink) {
    return res.status(400).json({ error: "Missing songName or artist" });
  }

  try {
    
    // Visit the song's page
    //URI encode the link, and repair backslashes (in case of any "dirty" links)
    const encodedLink = encodeURIComponent(songLink);

    const repairedLink = encodedLink.replaceAll("%2F","/");
    

    const songUrl = `https://www.tab4u.com/${repairedLink}`;
    const songResponse = await axios.get(songUrl);
    const $song = cheerio.load(songResponse.data);

    //Remake query with/without chords
    const song_query = singer == "true" ? ".song" : ".chords,.chords_en,.song";
    console.log(song_query);

  //   const paragraphs = $song('table').map((i, el) => {
  //     return $song(el).text(); // Get the HTML of each <table> element
  // }).get();

    const songLyrics = $song(song_query).map((i, el) => {
      return $song(el).text(); // Extract text and trim whitespace
    }).get(); 
    
    

    // console.log(songLyrics)
    if (!songLyrics) {
      return res.status(404).json({ error: "chords or lyrics not found" });
    }
    res.json({ songLyrics });
    // res.json({lyrics,chords});
  } catch (error) {
    // console.error("Error scraping:", error);
    res.status(500).json({ error: "Scraping failed" });
  }
};


/**
 * Handles a request to search for songs based on a given song name.
 * Scrapes song titles, artists, and links from the Tab4U website.
 *
 * @param {Express.Request} req - The Express request object.
 * @param {Express.Response} res - The Express response object.
 *
 * @route GET /songList
 * @query {string} songName - The name of the song to search for.
 * @query {string} [artist] - (Optional) The artist of the song.
 *
 * @returns {Object} JSON response containing an array of song-artist-link tuples.
 * @throws {Object} Returns an error response if scraping fails.
 *
 * @example
 * // Request example:
 * GET /api/search/songList/?query=${_search}
 *
 * // Response example:
 * {
 *   "songArtistPairs": [
 *     ["Bohemian Rhapsody", "Queen", "/song-link"],
 *     ["Bohemian Rhapsody (Acoustic)", "Queen", "/song-link-2"]
 *   ]
 * }
 */
export const songList = async (req, res) => {
  const { query} = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing songName or artist" });
  }

  try {
    //compose search url
    const searchUrl = `https://www.tab4u.com/resultsSimple?tab=songs&q=${query}`;
    const searchResponse = await axios.get(searchUrl);
    const $search = cheerio.load(searchResponse.data);

    const songLinks = $search(".ruSongLink")
      .map((i, element) => {
        return $search(element).attr("href");
      })
      .get();

    // const songNames = $search(".sNameI19").text();
    // const artistNames = $search(".aNameI19").text();

    const songNames = [];
    const artistNames = [];

    $search(".sNameI19").each((i, el) => {
      songNames.push($search(el).text().trim().replace('/',''));
    });

    $search(".aNameI19").each((i, el) => {
      artistNames.push($search(el).text().trim());
    });



    const songArtistPairs = songNames.map((song, index) => [
      song,
      artistNames[index],
      songLinks[index],
    ]);

    if (!songNames || !artistNames) {
      return res.status(404).json({ error: "Song not found" });
    }

    res.json({ songArtistPairs});
    // res.json({lyrics,chords});
  } catch (error) {
    console.error("Error scraping:", error);
    res.status(500).json({ error: "Scraping failed" });
  }
};

// function extractSongTables(html) {
//   const $ = cheerio.load(html);
//   const songTables = [];

//   $("table").each((i, table) => {
//     const tableData = [];
//     $(table)
//       .find("tr")
//       .each((j, row) => {
//         const rowData = {};
//         rowData.chords = $(row).find(".chords_en").html();
//         rowData.song = $(row).find(".song").text().trim();
//         tableData.push(rowData);
//       });
//     songTables.push(tableData);
//   });
//   return songTables;
// }
