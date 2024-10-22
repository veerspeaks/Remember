'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import localFont from 'next/font/local';


const geistMono = localFont({
  src: "../app/fonts/Bangers-Regular.ttf",
  variable: "--font-geist-mono",
  weight: "400",
});


const NewOrEditCard = ({ params }) => {
  const [content, setContent] = useState(''); // Track content state
  const [back,setBack] = useState('')
  const router = useRouter(); // Use Next.js router for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(content);

    try {
      const response = await axios.post(`/api/flashcards?categoryId=${params.id}`, { content , back });

      if (response.status === 201) {
        console.log('New Card added successfully');
        // Navigate to the category page after successful submission
        router.push(`/category/${params.id}`);
      } else {
        console.log('Error adding new card');
      }
    } catch (e) {
      console.log('Error adding new card', e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full mt-8 gap-8">
      {/* Quill editor container */}
      <span className={`${geistMono.variable} font-bangers antialiased text-red-600`}>Card Front</span>
      <textarea
        className="w-full h-40 rounded-lg p-2 bg text-black"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <span className={`${geistMono.variable} font-bangers antialiased text-red-600`}>Card Back</span>
      <textarea
        className="w-full h-40 rounded-lg p-2 bg text-black"
        value={back}
        onChange={(e) => setBack(e.target.value)}
      ></textarea>

      {/* Submit button */}
      <button
        className="px-6 py-2  bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default NewOrEditCard;
