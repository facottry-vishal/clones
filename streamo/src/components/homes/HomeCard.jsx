import React from "react"
import { Link } from "react-router-dom"
import useStore from "../../store";

const HomeCard = ({ item: { id, cover, name, rating, time, desc, starring, genres, tags, video } }) => {
  const { appConfig } = useStore();
  if (!appConfig?.heroSection) {
    return <div>Loading heroSection Config...</div>;
  }
  return (
    <>
      <div className='box'>
        <div className='coverImage'>
        {appConfig.heroSection.heroSectionBackgroundImage &&(
          <img src={cover} alt='' />
        )}
        </div>
        <div className='content flex'>
          <div className='details row'>
          {appConfig.heroSection.heroSectionName &&(
            <h1>
              {name}</h1>)}
              {appConfig.heroSection.heroSectionDetlis &&(
            <div className='rating flex'>
              <div className='rate'>
                <i className='fas fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star-half'></i>
              </div>
              <label>{rating}(Imdb)</label>
              <span>GP</span>
              <label>{time}</label>
            </div>
              )}            
                                                    
                                                    {appConfig.heroSection.heroSectionDetlis &&(

            <p>{desc}</p>
                                                    )}
                      {appConfig.heroSection.heroSectionDetlis &&(
                                            
            <div className='cast'>
              <h4>
                <span>Starring </span>
                {starring}
              </h4>
              <h4>
                <span>Genres </span>
                {genres}
              </h4>
              <h4>
                <span>Tags </span>
                {tags}
              </h4>
            </div>
                      )}
                         {appConfig.heroSection.heroSectionDetlis &&(
                                                           
            <button className='primary-btn'>
              <i className='fas fa-play'></i> PLAY NOW
            </button>
                         )}
          </div>
          {appConfig.heroSection.heroSectionDetlis &&(
                              
          <div className='palyButton row'>
            <Link to={`/singlepage/${id}`}>
              <button>
                <div className='img'>
                  <img src='./images/play-button.png' alt='' />
                  <img src='./images/play.png' className='change' />
                </div>
                WATCH TRAILER
              </button>
            </Link>
          </div>
          )} 
        </div>
          
      </div>
            
    </>
  )
}

export default HomeCard
