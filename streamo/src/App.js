import "./App.css"
import HomePage from "./home/HomePage"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import SinglePage from "./components/watch/SinglePage"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import useFetchConfig from "../src/useFetch"

function App() {
  const { appConfig, playerConfig, stale, projectID } = useFetchConfig();

  console.log({
    appConfig,
    playerConfig,
    stale,
    projectID
  })

  return (
    <div className="App">
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
  
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/singlepage/:id' component={SinglePage} exact />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App
