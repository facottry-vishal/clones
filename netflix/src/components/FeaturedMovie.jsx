import React from "react";
import "./FeaturedMovie.css";
import { FaPlay, FaPlus } from "react-icons/fa";

class FeaturedMovie extends React.Component {
  constructor(props) {
    super(props);
    // Initialize mode state with the value from localStorage or false if not set
    this.state = {
      config: null,
      mode: localStorage.getItem('mode') === 'true'  // Convert stored string to boolean
    };
  }

  componentDidMount() {
    this.getConfig('FREE'); // Fetch config for FREE subscription by default
  }

  getConfig = async (subscriptionType) => {
    try {
      const response = await fetch("https://facottry-server.onrender.com/scale/get-mapping", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filter: { COUNTRY: 'IN', SUBSCRIPTION: subscriptionType },
          projectID: 'vishal_72d8f604-cb87-4358-8dc8-1d53a96670c9'
        })
      });
      const data = await response.json();
      // console.log('Full API response:', data); // Log the full response
      // console.log('Fetched config:', data.mappings); // Debug logging
      this.setState({ config: data.mappings }); // Store mappings in state
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  toggleMode = () => {
    const newMode = !this.state.mode;
    this.setState({ mode: newMode });
    localStorage.setItem('mode', newMode); // Store mode in localStorage
  };

  render() {
    const { item } = this.props;
    const { config, mode } = this.state;

    if (!config) return <div>Loading...</div>;

    // console.log('Current config:', config); // Log current config to debug

    let firstDate = new Date(item.first_air_date);
    let genres = item.genres.map(genre => genre.name);

    return (
      <section className="featured"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: (mode || config.appConfig.featuredBackground) ? `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` : "none",
        }}>
        <div className="featured--vertical">
          <div className="featured--horizontal">
            {(mode || config.appConfig.originalname) && (
              <div className="featured--name">{item.original_name}</div>
            )}
            <div className="featured--info">
              {(mode || config.appConfig.year) && (
                <div className="featured--year">{firstDate.getFullYear()}</div>
              )}
              {(mode || config.appConfig.vote) && (
                <div className="featured--points">{item.vote_average} pontos</div>
              )}
              {(mode || config.appConfig.seasons) && (
                <div className="featured--seasons">
                  {item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? "s" : ""}
                </div>
              )}
            </div>
            {(mode || config.appConfig.overview) && (
              <div className="featured--description">{item.overview}</div>
            )}
            {(mode || config.appConfig.Towatch) && (
              <div className="featured--buttons">
                <a href={`/watch/${item.id}`} className="featured--watchbutton">
                  <FaPlay size={13} /> Assistir
                </a>
                {(!mode && config.appConfig.mylist) && (
                  <a href={`/list/add/${item.id}`} className="featured--mylistbutton">
                    <FaPlus size={13} /> My list
                  </a>
                )}
              </div>
            )}
            {(mode || config.appConfig.genres) && (
              <div className="featured--genres">
                <strong>Gêneros:</strong> {genres.join(", ")}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default FeaturedMovie;










// import React, { useState } from 'react';
// import './FeaturedMovie.css';
// import { FaPlay, FaPlus, FaSearch } from 'react-icons/fa';
// import { MdOutlineToggleOff } from "react-icons/md";
// import { MdOutlineToggleOn } from "react-icons/md";

// export default ({ item }) => {
//     // console.log(item);

//     let firstDate = new Date(item.first_air_date);
//     let genres = [];
//     for (let i in item.genres) {
//         genres.push(item.genres[i].name);
//     }
//     const [mode, setMode] = useState(false);





//     return (
//         <section className="featured" style={{
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
//         }}>
//             <div className="featured--vertical">
//                 <div className="featured--horizontal">
//                     <div className="featured--name">
//                         {item.original_name}
//                     </div>
//                     <div className="featured--info">
//                         <div className="featured--points">{item.vote_average} pontos</div>
//                         <div className="featured--year">{firstDate.getFullYear()}</div>
//                         <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
//                     </div>
//                     <div className="featured--description">{item.overview}</div>
//                     <div className="featured--buttons">
//                         <a href='/watch/${item.id}' className="featured--watchbutton"><FaPlay size={13} /> Assistir</a>

//                         {mode ? <a href='/list/add/${item.id}' onClick={() => setMode(!mode)} className="featured--mylistbutton"><FaPlus size={13} /> My lis</a> : <a href='/list/add/${item.id}' onClick={() => setMode(!mode)} className="featured--mylistbutton"><FaPlus size={13} /> Menu</a>}
//                        <div className='icon-hai'> <div className="home-bottom-icon-div" onClick={() => setMode(!mode)}> {mode ? <MdOutlineToggleOn /> : <MdOutlineToggleOff />}
//                         </div>
//                         </div>
//                     </div>


//                     <div className="featured--genres"><strong>Gêneros:</strong> {genres.join(', ')}</div>
//                 </div>
//             </div>
//         </section>
//     );
// }
