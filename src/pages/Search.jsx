import React, { useState } from "react";
import Swal from "sweetalert2";
import { getSubtitles } from "youtube-captions-scraper";

const Search = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const youtube_parser = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const videoId = youtube_parser(url);
      if (videoId) {
        getSubtitles({
          videoID: videoId,
          lang: "en",
        }).then((captions) => {
          console.log(captions);
          setResult(captions);
        });
      } else {
        console.error("Invalid URL");
        Swal.fire(
          "You Have Entered An Invalid URL",
          "Please Enter A Valid Youtube Video's URl",
          "error"
        );
      }
    } catch (err) {
      console.error("Error fetching subtitles:", err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div>
      <h1>Hello!</h1>
      <form className="row g-3 sticky-top mt-1" onSubmit={handleSearch}>
        <div className="col-md-11">
          <label htmlFor="Url" className="visually-hidden">
            Youtube Video URL
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Youtube Video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="col-md-1">
          <button
            type="submit"
            className="btn btn-success mb-3"
            disabled={isSearching}
          >
            {isSearching ? "Loading..." : "Search"}
          </button>
        </div>
      </form>
      {result.length > 0 && (
        <div>
          <h2>Subtitles:</h2>
          <ul>
            {result.map((subtitle, index) => (
              <li key={index}>
                {subtitle.text} - {subtitle.start}s - {subtitle.end}s
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
