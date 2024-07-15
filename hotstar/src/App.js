import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import "./App.css";
import Home from "./components/Home";
import Detail from "./components/Details";
import Play from "./components/Play";
import useFetchConfig from "./useFetch";

function App() {
  const { appConfig, playerConfig, stale } = useFetchConfig();

  return (
    <div className="App">
      {stale && (
        <div className="stale">
          <p>No Mapping / Project Found (Rendering Default Site)</p>
        </div>
      )}
      <Router>
        <Header appConfig={appConfig} />
        <Switch>
          <Route exact path="/">
            {/* <Login /> */}
            <Login appConfig={appConfig} />
          </Route>
          <Route path="/home">
            <Home appConfig={appConfig} />
          </Route>

          <Route path="/detail/:id">
            <Detail appConfig={appConfig} />
          </Route>
          <Route Path="/Play">
            <Play playerConfig={playerConfig} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
