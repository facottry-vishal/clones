import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Player from "./pages/Player";
import TvShow from "./pages/TvShow";
import Netflix from "./pages/Netflix";
import MoviePage from "./pages/MoviePage";
import useFetchConfig from "../src/useFetch.js"

function App() {
  const { appConfig, playerConfig, stale, projectID } = useFetchConfig();

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/player" element={<Player />} />
          <Route path="/tv" element={<TvShow />} />
          <Route path="/" element={<Netflix />} />
          <Route path="/movie" element={<MoviePage />} />
        </Routes>
        {stale && (
          <div className="stale">
            <p>No Mapping / Project Found (Rendering Default Site)</p>
          </div>
        )}
        {(projectID || localStorage.getItem("projectID")) && (
          <div className="projectid">
            <p>Project ID: {projectID || localStorage.getItem("projectID")}</p>
          </div>
        )}
      </BrowserRouter>
  );
}

export default App;
