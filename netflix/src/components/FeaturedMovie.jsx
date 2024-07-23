import React, { useState } from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import "./FeaturedMovie.css";
import useStore from "../store";

const FeaturedMovie = ({ item }) => {
  let genres = item.genre ? item.genre.split(", ") : [];
  const { appConfig } = useStore();
  const [mode, setMode] = useState(false);

  if (!appConfig?.heroSection) {
    return <div>Loading heroSection Config...</div>;
  }

  return (
    <>
      {appConfig.heroSection.heroSectionBackgroundImageAndDetalisSection && (
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
              <div className="featured--name">{item.title}</div>
              <div className="featured--info">
                <div className="featured--points">{item.imdbVotes} Points</div>
                <div className="featured--year">{item.year}</div>
                <div className="featured--actors">{item.Actors}</div>
              </div>
              <div className="featured--description">{item.Plot}</div>
              <div className="featured--buttons">
                <a href={`/watch/${item.imdbID}`} className="featured--watchbutton">
                  <FaPlay size={13} /> <span>Play</span>
                </a>
                <a
                  href={`/list/add/${item.imdbID}`}
                  onClick={() => setMode(!mode)}
                  className="featured--mylistbutton"
                >
                  <FaPlus size={13} /> {mode ? "My list" : "Menu"}
                </a>
              </div>
              <div className="featured--genres">
                <strong>Genre:</strong> {genres.join(", ")}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default FeaturedMovie;
