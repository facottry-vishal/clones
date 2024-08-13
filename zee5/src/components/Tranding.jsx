import React , { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function Tranding() {
    const [recommendedContent, setRecommendedContent] = useState([]);
    const [loading, setLoading] = useState(true); 
  
    useEffect(() => {
      const fetchRecommendedContent = async () => {
        try {
          const response = await fetch(
            `https://academics.newtonschool.co/api/v1/ott/show?page=16&limit=12`,
            {
              method: "GET",
              headers: new Headers({
                projectId: "qkwqr7ns3d9d",
              }),
            }
          );
  
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
  
          const data = await response.json();
          const recommendedData = data.data;
  
          setRecommendedContent(recommendedData);
          setLoading(false); 
        } catch (error) {
          console.error("Error fetching recommended content", error);
          setLoading(false); 
        }
      };
  
      fetchRecommendedContent();
    }, []);
  
    
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      
        <div className="tr-Container">
        <div className="tr-Container-grid">
          {recommendedContent.map((data, index) => (
            <div className="trnd-cont" key={index}>
              <Link to={`/details/${data.type}/${data._id}`}>
                <img
                  className="item"
                  src={data.thumbnail}
                  alt={`Image ${index + 1}`}
                />
              </Link>
            </div>
          ))}
          </div>
        </div>
      
    );
}

export default Tranding