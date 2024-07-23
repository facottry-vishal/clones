import React, { useState } from "react";
import './MovieRow.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import useStore from "../store";

const MovieRow = ({ title, items }) => {
  const [scrollX, setScrollX] = useState(parseInt(localStorage.getItem('scrollX')) || 0);
  const { appConfig } = useStore();

  const handleLeftArrow = () => {
    let x = scrollX;
    x += Math.round(window.innerWidth / 2);
    if (x > 10) {
      x = 10;
    }
    setScrollX(x);
    localStorage.setItem('scrollX', x);
  };

  const handleRightArrow = () => {
    let x = scrollX;
    let listW = items.length * 150;
    x -= Math.round(window.innerWidth / 2);
    if ((window.innerWidth - listW) > x) {
      x = (window.innerWidth - listW) - 60;
    }
    setScrollX(x);
    localStorage.setItem('scrollX', x);
  };
  if (!appConfig?.movieSection) {
    return(
     <div>loading movieSection Config</div>
    );
  }

  return (
    <>
    {appConfig.movieSection.allMovieSection && (

    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow--left" onClick={handleLeftArrow}>
        <FaAngleLeft style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--right" onClick={handleRightArrow}>
        <FaAngleRight style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--listarea">
        <div
          className="movieRow--list"
          style={{
            marginLeft: scrollX,
            width: items.length * 150
          }}
        >
          {items.length > 0 &&
            items.map((item, key) => (
              <div key={key} className="movieRow--item">
                <img
                  src={item.poster}
                  alt={item.title}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default MovieRow;
































// import React, { useState } from "react";
// import './MovieRow.css';
// // import { NavigateBeforeIcon, NavigateNextIcon } from '@mui/icons-material';
// import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// export default ({ title, items }) => {
//     const [scrollX, setScrollX] = useState(0);

//     const handleLeftArrow = () => {
//         let x = scrollX + Math.round(window.innerWidth / 2);
//         if(x > 0) {
//             x = 0;
//         }
//         setScrollX(x);
//     }
//     const handleRightArrow = () => {
//         let x = scrollX - Math.round(window.innerWidth / 2);
//         let listW = items.results.length * 150;
//         if ((window.innerWidth - listW) > x) {
//             x = (window.innerWidth - listW) - 60;
//         }
//         setScrollX(x);
//     }
//     return (
//         <div className="movieRow">
//             <h2>{title}</h2>
//             <div className="movieRow--left" onClick={handleLeftArrow}>
//             <FaAngleLeft style={{fontSize: 50}} />
//             </div>
//             <div className="movieRow--right">
//             <FaAngleRight style={{fontSize: 50}} onClick={handleRightArrow}/>
//             </div>
//             <div className="movieRow--listarea">
//                 <div className="movieRow--list" style={{
//                     marginLeft: scrollX,
//                     width: items.results.length * 150
//                     }}>
//                     {items.results.length > 0 && items.results.map((item, key) => (
//                        <div key={key} className="movieRow--item">
//                         <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
//                     </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }