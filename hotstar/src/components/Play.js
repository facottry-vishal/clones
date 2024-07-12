// components/Play.js

import React from 'react';
import ReactPlayer from 'react-player';
import   { useState, useEffect } from "react";


const Play = () => {
  const [playerConfig, setPlayerConfig] = useState(null); // State to hold configuration data
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("https://facottry-backend.onrender.com/scale/get-mapping", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filter: {
              COUNTRY: "IN",
              SUBSCRIPTION: "PAID",
            },
            projectID: "vishal_72d8f604-cb87-4358-8dc8-1d53a96670c9",
          }),
        });
 
        const data = await response.json();
        if (data.code === "FOUND") {
          setPlayerConfig(data.mappings.playerConfig); // Set appConfig state with API response
        }
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    };
 
    fetchConfig();
  }, []);
   // Toggle feature flag
   const toggleFeature = (key) => {
     setPlayerConfig((prevConfig) => ({
       ...prevConfig,
       [key]: !prevConfig[key],
     }));
   };
   
   // Render loading state if appConfig is not yet loaded
   if (!playerConfig) {
     return <div>Loading...</div>;
   }
  return (
    <div className="play-container">
      {playerConfig.playvideo && (
      <h1>Play Video</h1>
      )}
       {playerConfig.videourl && ( 
      <ReactPlayer
    
        url={`${process.env.PUBLIC_URL}/videos/insideout2.mp4`}
     
        controls={true}
        width='100%'
        height='100%'
        onBuffer={true}	
        light={false}	
      
      />
    )}
    </div>
  );
}

export default Play;

















// // components/Play.js

// import React, { Component } from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
// import jsonData from '../config.json';

// class Play extends Component {
//   componentDidMount() {
//     this.player = videojs(this.videoNode, {
//       controls: true,
//       responsive: true,
//       fluid: true,
//       sources: [
//         {
//           src: `${process.env.PUBLIC_URL}/videos/insideout2.mp4`,
//           type: 'video/mp4',
//         },
//       ],
//       tracks: [
//         {
//           kind: 'captions',
//           src: `${process.env.PUBLIC_URL}/subtitles/insideout2.vtt`,
//           srclang: 'en',
//           label: 'English',
//           default: false,
//         },
//       ],
//     });

//     this.player.ready(() => {
//       console.log('Player is ready');
//     });

//     this.player.on('error', (e) => {
//       console.error('Player error:', e);
//     });
//   }

//   componentWillUnmount() {
//     if (this.player) {
//       this.player.dispose();
//     }
//   }

//   render() {
//     const playerConfig = jsonData.mappings.playerConfig;
//     return (
//       <div className="play-container">
//         {playerConfig.playvideo && <h1>Play Video</h1>}
//         {playerConfig.videourl && (
//           <div data-vjs-player>
//             <video
//               ref={(node) => (this.videoNode = node)}
//               className="video-js vjs-default-skin"
//             />
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default Play;
