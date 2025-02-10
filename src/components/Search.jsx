'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const searchRef = useRef(null);
  const searchTimeout = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchTerm.trim()) {
        setFilteredResults([]);
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        // Clear previous timeout
        if (searchTimeout.current) {
          clearTimeout(searchTimeout.current);
        }

        // Set new timeout for debouncing
        searchTimeout.current = setTimeout(async () => {
          const [searchResponse, categoriesResponse] = await Promise.all([
            fetch(`/api/searchcards?q=${encodeURIComponent(searchTerm.trim())}`),
            fetch('/api/categories')
          ]);

          if (!searchResponse.ok) {
            throw new Error('Failed to fetch search results');
          }

          if (!categoriesResponse.ok) {
            throw new Error('Failed to fetch categories');
          }

          const results = await searchResponse.json();
          const categories = await categoriesResponse.json();
          
          setFilteredResults(results);
          setCategories(categories);
        }, 300); // 300ms debounce

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch results. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();

    // Cleanup function
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchTerm]);

  const handleResultClick = () => {
    setSearchTerm('');
    setFilteredResults([]);
    setError('');
  };

  // Close the search results if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="relative w-full md:w-1/2 px-4">
      <div className="relative">
        <input
          type="text"
          className="rounded-full w-full px-6 py-3 border-2 border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-all duration-300 shadow-md"
          placeholder={isLoading ? 'Searching...' : 'Search flashcards...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading}
        />
        <svg 
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isLoading ? 'text-yellow-500 animate-spin' : 'text-gray-400'}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isLoading ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          )}
        </svg>
      </div>

      {error && (
        <div className="absolute top-full left-0 w-full bg-red-100 text-red-500 p-4 rounded-lg mt-2 text-center">
          {error}
        </div>
      )}

      {filteredResults.length > 0 && !error && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-2xl mt-2 z-50 overflow-hidden border border-gray-100 transform transition-all duration-200">
          {filteredResults.map((result) => (
            <Link
              href={`/category/${result.category_id}/${result.id}/edit`}
              key={result.id}
              onClick={handleResultClick}
              className="block p-4 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex justify-between items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 font-semibold text-lg truncate">{result.question}</div>
                  <div className="text-gray-600 text-sm mt-1 truncate">{result.answer}</div>
                </div>
                <div className="text-sm font-medium text-yellow-500 whitespace-nowrap">
                  {categories.find(category => category.id === result.category_id)?.name || ''}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
