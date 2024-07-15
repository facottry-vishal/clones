import React, { useEffect, useState } from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import "./FeaturedMovie.css";

const FeaturedMovie = ({ item, appConfig }) => {
  let genres = item.genre ? item.genre.split(", ") : [];

  const [mode, setMode] = useState(false);

  if (!appConfig) {
    return <div>Loading...</div>;
  }

  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${item.poster})`,
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          {appConfig.originalname && (
            <div className="featured--name">{item.title}</div>
          )}
          <div className="featured--info">
            {appConfig.vote && (
              <div className="featured--points">{item.imdbVotes} Points</div>
            )}
            {appConfig.year && (
              <div className="featured--year">{item.year}</div>
            )}
            {appConfig.Actor && (
              <div className="featured--actors">{item.Actors}</div>
            )}
          </div>
          {appConfig.overview && (
            <div className="featured--description">{item.Plot}</div>
          )}
          <div className="featured--buttons">
            {appConfig.Towatch && (
              <a
                href={`/watch/${item.imdbID}`}
                className="featured--watchbutton"
              >
                <FaPlay size={13} /> <span>Play</span>
              </a>
            )}
            {appConfig.Menu && (
              <a
                href={`/list/add/${item.imdbID}`}
                onClick={() => setMode(!mode)}
                className="featured--mylistbutton"
              >
                <FaPlus size={13} /> {mode ? "My list" : "Menu"}
              </a>
            )}
          </div>
          {appConfig.genres && (
            <div className="featured--genres">
              <strong>Genre:</strong> {genres.join(", ")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovie;
