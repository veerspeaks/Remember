import React from "react";
import Link from "next/link";

const Flashcard = ({ question, answer, isFlipped, handleFlip, categoryId, cardId }) => {
  return (
    <div
      className="relative w-full h-full"
      style={{ perspective: "1000px" }} // Perspective added to parent for 3D effect
    >
      <div
        className={`absolute inset-0 transition-transform duration-500 transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }} // Ensures both sides are in 3D space
      >
        {/* Front side of the card */}
        <div
          className="absolute inset-0 w-full h-full bg-black text-white p-4 rounded-md border border-red-800 flex flex-col justify-between items-center"
          style={{ backfaceVisibility: "hidden" }} // Hide when flipped
        >
          {/* Edit Icon */}
          <Link className="absolute top-2 right-2 text-red-500 cursor-pointer" href={`/category/${categoryId}/${cardId}/edit`}>
          <div >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536M9 13h1.5a2 2 0 002-2V9.5m4.708-1.708a2 2 0 00-2.828 0l-9 9V21h4.5l9-9a2 2 0 000-2.828z"
              />
            </svg>
          </div>
          </Link>
          

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
          style={{ backfaceVisibility: "hidden" }} // Hide when not flipped
        >
          {/* Edit Icon */}
          <Link className="absolute top-2 right-2 text-red-500 cursor-pointer" href={`/category/${categoryId}/${cardId}/edit`}>
          <div >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536M9 13h1.5a2 2 0 002-2V9.5m4.708-1.708a2 2 0 00-2.828 0l-9 9V21h4.5l9-9a2 2 0 000-2.828z"
              />
            </svg>
          </div>
          </Link>

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
