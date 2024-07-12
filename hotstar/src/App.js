import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import "./App.css";
import Home from "./components/Home";
import Detail from "./components/Details";
import Play from "./components/Play";
import ReactPlayer from "react-player";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            {/* <Login /> */}
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>

          <Route path="/detail/:id">
            <Detail />
          </Route>
          <Route Path="/Play">
            <Play />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
