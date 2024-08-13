import React, { useState, useEffect, useRef } from 'react';
import { RiCloseLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Tranding from './Tranding';
import { AiOutlineClose,AiOutlineArrowLeft } from "react-icons/ai";

const SearchBarWithDropdown = ({ onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    // const [trendingTopics, setTrendingTopics] = useState([]);
    const [showDropdown, setShowDropdown] = useState(true);
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
            else{
                setSuggestionResults([]);
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
        setShowDropdown(false);
        onClose()

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
        setShowDropdown(true);
    };

    // Function to set the search query when an item is clicked
    const handleQueryClick = (query) => {
        setSearchQuery(query); // Update the search query
        setShowDropdown(false); // Hide the suggestion dropdown
        navigate(`/search?q=${query}`); // Navigate to search results
        onClose();
    };

    const isSearchResultsEmpty = suggestionResults.length === 0;
    const isRecentSearchesEmpty = recentSearches.length === 0;

    return (
        <div className="search-modal-backdrop">
            <div className="search-modal">
                <button className='sg-back' onClick={onClose}>
                    <AiOutlineArrowLeft />
                </button>
              
                <div className={`search-modal-bar ${showDropdown ? 'input-focused' : ''}`}>
                <FaSearch />
                    <form className='search-bar-input' onSubmit={handleSearchSubmit}>
                        
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
                    <div className={`search-modal-dropdown ${showDropdown ? 'input-focused' : ''}`}>
                        {isSearchResultsEmpty ? (
                            isRecentSearchesEmpty ? null : (
                                <div className="recent-modal-searches">
                                    <div className="rs-head">
                                        <h3>Recent Searches</h3>
                                        <button onClick={handleClearRecentSearches}>Clear All</button>
                                    </div>
                                    <ul>
                                        {recentSearches.map((search, index) => (
                                            <li key={index} onClick={() => handleQueryClick(search)}>
                                                {search}
                                                <button onClick={() => { handleDeleteRecentSearch(index); return false }}>
                                                    <AiOutlineClose />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        ) : (
                            <div className="search-modal-results">
                                <h3>Search Results</h3>
                                <ul>
                                    {suggestionResults.map((result, index) => (
                                        <li style={{ color: 'white', cursor: 'pointer' }} key={index} onClick={() => handleQueryClick(result.title)}>
                                            {result.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {isSearchResultsEmpty ? (
                            <div className="trending-modal-topics">
                                <h3>Top Searches</h3>
                                <div>
                                    <Tranding />
                                </div>
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
        
    );
};

export default SearchBarWithDropdown;
