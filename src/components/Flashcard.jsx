import React from 'react';

const Flashcard = ({ question, answer, isFlipped, handleFlip }) => {
  return (
    <div
      className="relative w-full h-full"
      style={{ perspective: '1000px' }} // Perspective added to parent for 3D effect
    >
      <div
        className={`absolute inset-0 transition-transform duration-500 transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }} // Ensures both sides are in 3D space
      >
        {/* Front side of the card */}
        <div
          className="absolute inset-0 w-full h-full bg-black text-white p-4 rounded-md border border-red-800 flex flex-col justify-between items-center"
          style={{ backfaceVisibility: 'hidden' }} // Hide when flipped
        >
          <div>{question}</div>
          <button
            onClick={handleFlip}
            className="bg-red-700 w-1/2 rounded-full p-2 my-3"
          >
            See Back!
          </button>
        </div>

        {/* Back side of the card */}
        <div
          className="absolute inset-0 w-full h-full bg-black text-white p-4 rounded-md border border-red-800 flex flex-col justify-between items-center transform rotate-y-180"
          style={{ backfaceVisibility: 'hidden' }} // Hide when not flipped
        >
          <div>{answer}</div>
          <button
            onClick={handleFlip}
            className="bg-red-700 w-1/2 rounded-full p-2 my-3"
          >
            See Front!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
