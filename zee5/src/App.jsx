
import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
// import { AuthProvider } from './auth';
import NavigationBar from './components/NavigationBar';
import Footer from './footer/Footer';
import More from './more/More';
import ContentDetails from './contentdetails/ContentDetails';
import Home from './home/Home'
import Movies from './movies/Movies'
import TvShows from './tvshow/TvShows'
import Login from './login/Login';
import Signup from './signup/Signup';
// import Premium from './premium/Premium';
import WebSeries from './webseries/WebSeries';
import CommingSoon from './commingsoon/CommingSoon';
import MyAccount from './myaccount/MyAccount';
import Profile from './myaccount/Profile';
import Rentals from './myaccount/Rentals';
import Subscription from './myaccount/Subscription';
import Transaction from './myaccount/Transaction';
import Watchlist from './myaccount/Watchlist';
import PrivateRoute from './PrivateRoute';
import WatchlistButton from './contentdetails/WatchlistButton';
import UserModal from './components/UserModal';
import SearchResults from './components/SearchResults';
import useFetchConfig from "./useFetch";



function App() {
  const { appConfig, playerConfig, stale, projectID } = useFetchConfig();

  return (
    <>
      <Router>

        <div>
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
          <NavigationBar />
          <Routes>
            <Route path="/search" element={<SearchResults />} />
            <Route path="/more/:apiEndpoint/:filterType/:heading" element={<More />} />
            <Route path="/details/:type/:id" element={<ContentDetails />} />
            <Route path="/" exact element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvshows" element={<TvShows />} />
            <Route path="/web-series" element={<WebSeries />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<CommingSoon />} />

            <Route path="/account" element={<PrivateRoute> <MyAccount /> </PrivateRoute>} >
              <Route path="/account/profile" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
                
              <Route path="/account/rentals" element={<PrivateRoute> <Rentals /> </PrivateRoute>} />
              <Route path="/account/subscription" element={<PrivateRoute> <Subscription /> </PrivateRoute>} />
              <Route path="/account/transaction" element={<PrivateRoute> <Transaction /> </PrivateRoute>} />
              <Route path="/account/watchlist" element={<PrivateRoute> <Watchlist /> </PrivateRoute>} />
            </Route>
            <Route path="/details/:type/:id" element={<PrivateRoute> <WatchlistButton /> </PrivateRoute>} />
            <Route path="/usermodal" element={<PrivateRoute> <UserModal /> </PrivateRoute>} />
            {/* <Route path="/premium" element={<CommingSoon />} />
          <Route path="/kids" element={<CommingSoon />} /> 
          <Route path="/livetv" element={<CommingSoon />} /> 
          <Route path="/sports" element={<CommingSoon />} /> 
          <Route path="/music" element={<CommingSoon />} /> 
          <Route path="/news" element={<CommingSoon />} /> 
          <Route path="/education" element={<CommingSoon />} />
          <Route path="/rent" element={<CommingSoon />} /> 
          <Route path="/video" element={<CommingSoon />} /> 
          <Route path="/songs" element={<CommingSoon />} />
          <Route path="/channels" element={<CommingSoon />} /> */}
          </Routes>
          <Footer />
        </div>

      </Router>
    </>
  )
}

export default App
