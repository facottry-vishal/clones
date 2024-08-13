import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFolderClosed } from "react-icons/fa6";
import { AiOutlineClose} from "react-icons/ai";
import './watchlistcomponent.css';

function ContentFetcher({ contentType }) {
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, [contentType]);
//Fetch the content in watch list
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

      // Filter content based on contentType prop
      const filteredContent = content.filter((item) => item.type === contentType);
      setContentData(filteredContent);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching ${contentType}:`, error);
      setLoading(false);
    }
  };

//remove the content from watchlist

  const removeWatchlist = async (id) => {
    try {
      const deleteUrl = `https://academics.newtonschool.co/api/v1/ott/watchlist/like`;

      const deleteResponse = await fetch(deleteUrl, {
        method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
            'projectID': 'qkwqr7ns3d9d',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'showId': id,
          }),
      });

      if (!deleteResponse.ok) {
        throw new Error('Error deleting watchlist item');
      }

      // After successfully deleting the item, call fetchContent to update the content
      fetchContent();
    } catch (error) {
      console.error(`Error deleting watchlist item:`, error);
    }
  };

  if (loading || contentData.length === 0) {
    return (
      <div className='wle-body'>
        <FaFolderClosed className='wle-icon' />
        <h1 className='wle-desc'>Uh-Oh! Nothing to watch</h1>
      </div>
    )
  }

  return (
    <div>
      <div className="watchlist-container">
        {contentData.map((item, index) => (
          <div key={index} className="watchlist-item">
            <div className="wathlist-content-img">
            <Link to={`/details/${item.type}/${item._id}`}>
              <img src={item.thumbnail} alt="" className="watchlist-image" />
              </Link>
            </div>

            <div className="wathlist-content-title">
              <p>{item.title}</p>
            </div>
            <span onClick={() => removeWatchlist(item._id)} style={{color:'white', fontSize:'20px'}}><AiOutlineClose /></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentFetcher;
