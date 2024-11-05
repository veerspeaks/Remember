'use client';

import { useState, useEffect } from 'react';
import AddNewCard from "@/components/AddNewCard";
import FlashcardSwiper from "@/components/FlashcardSwiper";

export default function CategoryPage({ params }) {
  const [flashcards, setFlashcards] = useState([]);

  // Client-side polling every 1 second
  useEffect(() => {
    const fetchFlashcards = async () => {
      const res = await fetch(`https://remember-alpha-silk.vercel.app/api/flashcards?categoryId=${params.id}`);
      const data = await res.json();
      setFlashcards(data);
    }
    fetchFlashcards(); // Initial fetch

     // Cleanup interval on component unmount
  }, [params.id]);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <FlashcardSwiper flashcards={flashcards} />
      <AddNewCard categoryId={params.id}/>
    </div>
  );
}


