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
  const [back,setBack] = useState('')
  const router = useRouter(); // Use Next.js router for navigation
  console.log(data)
  
    useEffect(() => {

      setContent(data.question);
      setBack(data.answer)
        
    },[data])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const response = await axios.post(`/api/singlecard?categoryId=${params.id}&cardId=${params.cardid}`, { content , back });

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
    <div className="flex flex-col items-center justify-center p-4 w-full gap-8">
      <Link href={`/category/${params.id}`}>
        <button className='px-4 bg-white text-black rounded-full font-bold py-1 '> {`< Go Back`} </button>
      </Link>
      
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

export default EditCard;
