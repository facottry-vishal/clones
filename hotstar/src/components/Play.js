// components/Play.js

import React from "react";
import ReactPlayer from "react-player";
import  useStore  from "../store"; // Ensure useStore is imported correctly

const Play = () => {
  const { playerConfig } = useStore();

  // Render loading state if appConfig is not yet loaded
  if (!playerConfig) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {playerConfig.playVideo &&(
    <div className="play-container">
      <h1>Play Video</h1>
     
        <ReactPlayer
          url={playerConfig.videoUrl} // Use the URL from playerConfig
          controls={playerConfig.controls ?? true} // Default to true if not specified
          width={playerConfig.width ?? "100%"} // Default to 100% if not specified
          height={playerConfig.height ?? "100%"} // Default to 100% if not specified
          onBuffer={playerConfig.onBuffer ?? true} // Default to true if not specified
          light={playerConfig.light ?? false} // Default to false if not specified
          volume={playerConfig.volume ?? 0.8} // Default volume to 0.8 if not specified
        />
      
    </div>
    )}
    </>
  );
};

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
//       // console.log('Player is ready');
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
