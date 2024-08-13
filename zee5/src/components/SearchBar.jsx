import React, { useState, useEffect, useRef } from 'react';
import { RiCloseLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import SearchDropdown from './SearchDropdown';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [suggestionResults, setSuggestionResults] = useState([]);
  const scSearchRef = useRef(null);
  const navigate = useNavigate();

  // Debounce related state and variables
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    // Retrieve recent searches from localStorage
    const storedRecentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(storedRecentSearches);

    const handleOutsideClick = (e) => {
      if (scSearchRef.current && !scSearchRef.current.contains(e.target)) {
        setShowDropdown(false);
        setIsInputFocused(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const fetchData = async (inputQuery) => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/ott/show?search={"title":"${inputQuery}"}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'projectID': 'qkwqr7ns3d9d'
        }
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const searchData = await response.json();
      return searchData.data;
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    }
  };

  const handleSearchChange = (e) => {
    const inputQuery = e.target.value;
    setSearchQuery(inputQuery);

    if (inputQuery) {
      setShowDropdown(true);
    }


    // Clear the previous debounce timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new debounce timeout
    const newDebounceTimeout = setTimeout(() => {
      setDebouncedSearchQuery(inputQuery);
    }, 500);

    setDebounceTimeout(newDebounceTimeout);
  };

  useEffect(() => {
    // Perform the search when debounced search query changes
    const fetchDataDebounced = async () => {
      if (debouncedSearchQuery) {
        const suggestionData = await fetchData(debouncedSearchQuery);
        setSuggestionResults(suggestionData);
      }
    };

    fetchDataDebounced();
  }, [debouncedSearchQuery]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    const searchData = await fetchData(searchQuery);
    setSearchResults(searchData);
    navigate(`/search?q=${searchQuery}`);

    // Update recent searches and store in localStorage
    const updatedRecentSearches = [...recentSearches, searchQuery];
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));

    setShowDropdown(true);
  };

  const handleClearRecentSearches = () => {
    // Clear recent searches and remove from localStorage
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Function to delete a single recent search by index
  const handleDeleteRecentSearch = (index) => {
    const updatedRecentSearches = [...recentSearches];
    updatedRecentSearches.splice(index, 1);
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  const handleClearButtonClick = () => {
    setSearchQuery('');
    setSuggestionResults([]);
    setShowDropdown(false);
  };


  const handleInputFocus = () => {
    setIsInputFocused(true);
    setShowDropdown(true);
  };

  // Function to set the search query when an item is clicked
  const handleQueryClick = (query) => {
    setSearchQuery(query); // Update the search query
    setShowDropdown(false); // Hide the suggestion dropdown
    navigate(`/search?q=${query}`); // Navigate to search results
  };

  return (
    <div className="sc-search" ref={scSearchRef}>

      <div className={`search-bar ${isInputFocused ? 'input-focused' : ''}`}>
       <FaSearch />
        <form className='search-bar-input' onSubmit={handleSearchSubmit} >
         
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
          />
        </form>
        {searchQuery.length > 0 && (
          <button className="clear-button" onClick={handleClearButtonClick}>
            <RiCloseLine />
          </button>
        )}
      </div>
      {showDropdown && (
        <SearchDropdown
          recentSearches={recentSearches}
          trendingTopics={trendingTopics}
          suggestionResults={searchQuery ? suggestionResults : []}
          isFocused={isInputFocused}
          onClearRecentSearches={handleClearRecentSearches}
          onDeleteRecentSearch={handleDeleteRecentSearch}
          onQueryClick={handleQueryClick}
        />
      )}
    </div>
  );
};

export default SearchBar;
