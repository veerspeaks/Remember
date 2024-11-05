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

  return (
    <div
      className="relative flex justify-center items-center h-full w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown} // Add mouse down event
      onMouseMove={handleMouseMove} // Add mouse move event
      onMouseUp={handleMouseUp} // Add mouse up event
    >
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
              categoryId={flashcard.category_id}
              cardId={flashcard.id}
              isFlipped={index === activeIndex && flipped} // Only flip the active card
              handleFlip={handleFlip} // Pass down the flip handler
            />
          </div>
        );
      })}
    </div>
  );
};

export default FlashcardSwiper;
