"use client"; // Mark this as a client component

import { useState, useRef, useEffect } from "react";
import Flashcard from "@/components/Flashcard";

const FlashcardSwiper = ({ flashcards }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [orderedFlashcards, setOrderedFlashcards] = useState([]);

  const startY = useRef(0);
  const startTime = useRef(0);
  const minSwipeDistance = 50; // Minimum distance for a swipe
  const maxTapDuration = 200; // Maximum duration for a tap (in milliseconds)

  

  useEffect(() => {
    // Always display the last card first and shuffle the rest
    if (flashcards.length > 1) {
      const lastCard = flashcards[flashcards.length - 1];
      const shuffledOtherCards = [...flashcards.slice(0, -1)].sort(() => 0.5 - Math.random());
      setOrderedFlashcards([lastCard, ...shuffledOtherCards]);
    } else {
      setOrderedFlashcards(flashcards); // If only one card exists, no need to shuffle
    }
  }, [flashcards]);

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    startTime.current = Date.now(); // Record the start time of the touch
  };

  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    const distance = startY.current - endY;
    const touchDuration = Date.now() - startTime.current; // Calculate how long the touch lasted

    // If the touch was very quick (tap), we won't treat it as a swipe
    if (touchDuration < maxTapDuration && Math.abs(distance) < minSwipeDistance) {
      // Do nothing (this was just a tap)
      return;
    }

    // Handle swipes based on the distance
    if (distance > minSwipeDistance) {
      // Swipe Up -> Move to the next card
      setFlipped(false); // Reset flip when swiping
      setActiveIndex((prevIndex) => (prevIndex + 1) % orderedFlashcards.length);
    } else if (distance < -minSwipeDistance) {
      // Swipe Down -> Move to the previous card
      setFlipped(false); // Reset flip when swiping
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? orderedFlashcards.length - 1 : prevIndex - 1
      );
    }
  };

  const handleFlip = () => {
    // Flip only the active card when 'See Back' is clicked
    setFlipped(!flipped);
  };

  const getCardStyle = (index) => {
    const isActive = index === activeIndex;
    const isPrev =
      index === (activeIndex - 1 + orderedFlashcards.length) % orderedFlashcards.length;
    const isNext = index === (activeIndex + 1) % orderedFlashcards.length;

    if (isActive) {
      return "z-20 translate-y-0 scale-100"; // Main card, fully visible
    } else if (isPrev) {
      return "z-10 -translate-y-16 scale-90"; // Card behind, showing top part above the main card
    } else if (isNext) {
      return "z-10 translate-y-16 scale-90"; // Card below, showing top part above the main card
    } else {
      return "z-0 opacity-0"; // Hidden cards
    }
  };

  const handleMouseDown = (e) => {
    startY.current = e.clientY; // Use clientY for mouse events
    startTime.current = Date.now();
  };

  const handleMouseMove = (e) => {
    if (startY.current === 0) return; // Prevent action if not initiated
    const endY = e.clientY;
    const distance = startY.current - endY;

    // Handle swipes based on the distance
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > minSwipeDistance) {
        // Swipe Up -> Move to the next card
        setFlipped(false);
        setActiveIndex((prevIndex) => (prevIndex + 1) % orderedFlashcards.length);
      } else {
        // Swipe Down -> Move to the previous card
        setFlipped(false);
        setActiveIndex((prevIndex) =>
          prevIndex === 0 ? orderedFlashcards.length - 1 : prevIndex - 1
        );
      }
      startY.current = 0; // Reset after swipe
    }
  };

  const handleMouseUp = () => {
    startY.current = 0; // Reset on mouse up
  };

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent default scrolling behavior
    if (e.deltaY < 0) {
      // Scroll Up -> Move to the previous card
      setFlipped(false);
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? orderedFlashcards.length - 1 : prevIndex - 1
      );
    } else if (e.deltaY > 0) {
      // Scroll Down -> Move to the next card
      setFlipped(false);
      setActiveIndex((prevIndex) => (prevIndex + 1) % orderedFlashcards.length);
    }
  };

  const handleUpClick = () => {
    setFlipped(false);
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? orderedFlashcards.length - 1 : prevIndex - 1
    );
  };

  const handleDownClick = () => {
    setFlipped(false);
    setActiveIndex((prevIndex) => (prevIndex + 1) % orderedFlashcards.length);
  };

  return (
    <div className="relative flex justify-center items-center h-full w-full">
      {/* Main card container with all its event handlers */}
      <div
        className="relative flex justify-center items-center h-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Up Arrow - Only visible on desktop */}
        <button
          onClick={handleUpClick}
          className="hidden md:flex absolute -left-72 top-1/2 -translate-y-1/2 bg-yellow-500/10 hover:bg-yellow-500/20 p-3 rounded-full transform transition-all duration-300 hover:scale-110 group"
          aria-label="Previous card"
        >
          <svg
            className="w-6 h-6 text-yellow-500 transform rotate-180 transition-transform group-hover:-translate-y-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>

        {orderedFlashcards.map((flashcard, index) => {
          const cardStyle = getCardStyle(index);
          return (
            <div
              key={flashcard._id}
              className={`absolute w-80 h-80 bg-gray-300 rounded-lg shadow-lg transition-transform duration-500 ${cardStyle}`}
            >
              <Flashcard
                question={flashcard.question}
                answer={flashcard.answer}
                categoryId={flashcard.categoryId}
                cardId={flashcard.id}
                isFlipped={index === activeIndex && flipped}
                handleFlip={handleFlip}
              />
            </div>
          );
        })}

        {/* Down Arrow - Only visible on desktop */}
        <button
          onClick={handleDownClick}
          className="hidden md:flex absolute -right-72 top-1/2 -translate-y-1/2 bg-yellow-500/10 hover:bg-yellow-500/20 p-3 rounded-full transform transition-all duration-300 hover:scale-110 group"
          aria-label="Next card"
        >
          <svg
            className="w-6 h-6 text-yellow-500 transition-transform group-hover:translate-y-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FlashcardSwiper;
