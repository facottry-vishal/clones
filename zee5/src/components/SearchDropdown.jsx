import React,{useState, useEffect, useRef } from 'react';
import Tranding from './Tranding';
import { AiOutlineClose } from "react-icons/ai";

const SearchDropdown = ({ recentSearches, trendingTopics, suggestionResults, isFocused, onClearRecentSearches,onDeleteRecentSearch, onQueryClick }) => {
  
  const isSearchResultsEmpty = suggestionResults.length === 0;
  const isRecentSearchesEmpty = recentSearches.length === 0;
  
  return (
    // <div className={`search-dropdown-backdrop ${isFocused ? 'input-focused' : ''}`}>
    <div className={`search-dropdown ${isFocused ? 'input-focused' : ''}`}>
      
      {isSearchResultsEmpty ? (
        isRecentSearchesEmpty ? null : (
          <div className="recent-searches">
            <div className="rs-head">
            <h3>Recent Searches</h3>
            <button onClick={onClearRecentSearches}>Clear All</button>
            </div>
            
            <ul>
              {recentSearches.map((search, index) => (
                
                <li key={index} onClick={() => onQueryClick(search)}>{search}
                <button onClick={() => {onDeleteRecentSearch(index); return false}}><AiOutlineClose /></button>
                </li>
                
              ))}
            </ul>
           
          </div>
        )
      ) : (
        <div className="search-results">
          <h3>Search Results</h3>
          <ul>
            {suggestionResults.map((result, index) => (
              <li style={{ color: 'white',cursor: 'pointer' }} key={index} onClick={() => onQueryClick(result.title)}>{result.title}</li>
            ))}
          </ul>
        </div>
        
      )}

      {isSearchResultsEmpty ? (
        <div className="trending-topics">
          <h3>Top Searches</h3>
          <div className='trending-topics-holder'>
            <Tranding />
          </div>
        </div>
      ) : null}
    </div>
    // </div> 
  );
};

export default SearchDropdown;
