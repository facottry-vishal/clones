import "./style.css";
import useStore from "../../store";
import ReactPlayer from "react-player";


const SinglePage = () => {
 const { playerConfig } = useStore();

  

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

export default SinglePage;
