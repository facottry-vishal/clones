// App.js or equivalent
import React, { useEffect, useState } from "react";
import db from "./db";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import "./style.css";
import useFetchConfig from "./useFetch";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const {appConfig, stale} = useFetchConfig();

  useEffect(() => {
    const loadAll = async () => {
      // Get the full list
      let list = await db.getHomeList();
      setMovieList(list);

      // Get the featured movie
      let originals = list.find((item) => item.slug === "originals");
      let randomChosen = Math.floor(Math.random() * originals.items.length);
      let chosen = originals.items[randomChosen];
      let chosenInfo = await db.getMovieInfo(chosen.imdbID, chosen.type);
      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
    {stale && (
        <div className="stale">
            <p>No Mapping Found (Rendering Default Site)</p>
        </div>
    )}
    
      <Header black={blackHeader} appConfig={appConfig} />
      {featuredData && (
        <FeaturedMovie item={featuredData} appConfig={appConfig} />
      )}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow appConfig={appConfig} key={key} title={item.title} items={item.items} />
        ))}
      </section>
      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
            alt="Images"
          />
        </div>
      )}
    </div>
  );
};

export default App;
