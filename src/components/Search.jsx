'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [categories,setCategories] = useState([])
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchTerm) {
        setFilteredResults([]);
        return;
      }

      try {
        const response = await fetch(`/api/searchcards?q=${searchTerm}`);
        const results = await response.json();
        setFilteredResults(results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try{
        const catResponse = await fetch('/api/categories')
        const getCategories = await catResponse.json();
        
        setCategories(getCategories)
        
      }catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchResults();
  }, [searchTerm]);

  const handleResultClick = () => {
    setSearchTerm('');
    setFilteredResults([]);
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
    <div ref={searchRef} className="relative w-full md:w-1/3 px-4">
      <input
        type="text"
        className="rounded-full w-full px-4 py-2 border border-gray-300"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredResults.length > 0 && (
        <div className="relative top-full left-0 w-full bg-white shadow-lg rounded-md mt-2 z-180 ">
          {filteredResults.map((result) => (
            <Link
              href={`/category/${result.category_id}/${result.id}/edit`}
              key={result.id}
              onClick={handleResultClick}
              className="block p-4 border-b border-gray-200 hover:bg-[#EAE6FF] hover:shadow-sm transition-colors duration-200 ease-in-out"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-gray-900 font-semibold text-lg">{result.question}</div>
                  <div className="text-gray-600 text-sm mt-1">{result.answer}</div>
                </div>
                <div className="text-sm text-gray-500 font-medium text-red-800">{categories.map(category => (category.id == result.category_id ? category.name : ""))}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
