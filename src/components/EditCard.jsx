'use client';

import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import localFont from 'next/font/local';
import Link from 'next/link';


const geistMono = localFont({
  src: "../app/fonts/Bangers-Regular.ttf",
  variable: "--font-geist-mono",
  weight: "400",
});


const EditCard = ({ params, data}) => {
  const [content, setContent] = useState(''); // Track content state
  const [back, setBack] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Use Next.js router for navigation
  console.log(data)
  
    useEffect(() => {
      if (data) {
        setContent(data.question || '');
        setBack(data.answer || '');
      }
    }, [data])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!content.trim() || !back.trim()) {
      setError('Both front and back of the card are required');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await axios.post(`/api/singlecard`, {
        content,
        back,
        categoryId: params.id,
        cardId: params.cardid
      });

      if (response.status === 201) {
        router.push(`/category/${params.id}`);
      } else {
        setError('Failed to update card. Please try again.');
      }
    } catch (e) {
      console.error('Error updating card:', e);
      setError(e.response?.data?.message || 'An error occurred while updating the card');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="flex flex-col items-center justify-center p-3 sm:p-4 w-full max-w-3xl mx-auto mt-4 sm:mt-8 gap-6 sm:gap-8">
      <div className="w-full flex justify-between items-center px-2">
        <Link href={`/category/${params.id}`}>
          <button className='group px-4 sm:px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base'> 
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </Link>
        <h1 className={`${geistMono.variable} font-bangers text-2xl sm:text-3xl text-yellow-500`}>Edit Card</h1>
        <div className="w-[68px] sm:w-24"></div> {/* Spacer for centering - matches back button width */}
      </div>
      
      {error && (
        <div className="w-full p-3 sm:p-4 text-red-500 bg-red-100 rounded-xl text-center border border-red-200 shadow-sm text-sm sm:text-base">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </div>
      )}

      <div className="w-full space-y-4 sm:space-y-6 px-2">
        <div className="space-y-2">
          <span className={`${geistMono.variable} font-bangers text-xl sm:text-2xl text-yellow-500 block`}>Card Front</span>
          <textarea
            className="w-full h-32 sm:h-40 rounded-xl p-3 sm:p-4 bg-gray-50 text-black focus:ring-2 focus:ring-yellow-500 focus:outline-none border-2 border-gray-200 hover:border-yellow-500/50 transition-all duration-300 text-base sm:text-lg resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the question or front side of the card"
            required
          ></textarea>
        </div>

        <div className="space-y-2">
          <span className={`${geistMono.variable} font-bangers text-xl sm:text-2xl text-yellow-500 block`}>Card Back</span>
          <textarea
            className="w-full h-32 sm:h-40 rounded-xl p-3 sm:p-4 bg-gray-50 text-black focus:ring-2 focus:ring-yellow-500 focus:outline-none border-2 border-gray-200 hover:border-yellow-500/50 transition-all duration-300 text-base sm:text-lg resize-none"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="Enter the answer or back side of the card"
            required
          ></textarea>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          className={`px-6 sm:px-8 py-2.5 sm:py-3 bg-yellow-500 text-black rounded-full font-bold hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none text-sm sm:text-base ${isLoading ? 'cursor-wait' : ''}`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          <span className="flex items-center gap-2">
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default EditCard;
