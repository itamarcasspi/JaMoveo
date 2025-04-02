import React from "react";
/**
 * Displays song lyrics, optionally filtering out chords for singers.
 *
 * @param {object} props - The component's props.
 * @param {Array<{text: string, type: string}>} props.lyrics - An array of lyrics/chords objects.
 * @param {boolean} props.isSinger - A boolean indicating if the user is a singer.
 * @returns {JSX.Element} - A div containing the formatted song lyrics.
 *
 * How it works:
 * 1.  Checks if the lyrics prop exists. If not, nothing is rendered.
 * 2.  Maps over the lyrics array, rendering a <p> tag for each line.
 * 3.  If isSinger is true and the line type is "chords", the line is filtered out.
 * 4.  Each line’s text is displayed inside the p tag.
 * 5.  The song lyrics are formatted with styling.
 */
const DisplaySong = (props) => {
  return (
    <div className="pt-36 flex flex-col items-center text-2xl py-8">
      <div className="ml-4 mr-4 py-8 block max-w-full whitespace-nowrap text-[min(8vw,3rem)] w-fit">
        {props.lyrics &&
          props.lyrics.map((line, index) => {
            return (
              <p
                className="whitespace-nowrap text-[3.5vw] w-full  scale-[1] origin-left"
                key={index}
              >
                {!(props.isSinger && line.type == "chords" ) && line.text}
              </p>
            );
          })}
      </div>
    </div>
  );
};

export default DisplaySong;
