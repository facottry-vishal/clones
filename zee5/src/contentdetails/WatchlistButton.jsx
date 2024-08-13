import React, { useEffect, useState } from 'react';
import { BiListPlus, BiListCheck } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Auth from '../auth';

function WatchlistButton({ id }) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const navigate = useNavigate();

  //for chaking content already saved or not
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const url = 'https://academics.newtonschool.co/api/v1/ott/watchlist/like';

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
            'projectID': 'qkwqr7ns3d9d',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const content = data.data.shows;
        const isPresent = content.filter(show => show._id === id)
        if (isPresent.length > 0) {
          setIsInWatchlist(true);
        }
        else {
          setIsInWatchlist(false);
        }
       
      } catch (error) {
        setIsInWatchlist(false);
      }
    };

    fetchContent();
  }, [id])

  //for add and removing content from watchlist
  
  const handleWatchlistClick = async () => {
    try {
      // Check if the user is authenticated
      if (!Auth.isAuthenticated()) {
        // Navigate to the login page
        navigate('/login');
        return;
      }

      const response = await fetch(
        'https://academics.newtonschool.co/api/v1/ott/watchlist/like',
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
            'projectID': 'qkwqr7ns3d9d',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'showId': id,
          }),
        }
      );

      if (response.ok) {
        setIsInWatchlist((prevIsInWatchlist) => !prevIsInWatchlist);
      } 
    } catch (error) {
      console.error('Error adding/removing from watchlist', error);
    }
  };

  return (
    <div className='v-ac-btn' onClick={handleWatchlistClick}>
      {isInWatchlist ? <BiListCheck /> : <BiListPlus />} <span>Watchlist</span>
    </div>
  );
}

export default WatchlistButton;
