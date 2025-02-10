import React from "react";
import Link from "next/link";

const Flashcard = ({ question, answer, isFlipped, handleFlip, categoryId, cardId }) => {
  return (
    <div
      className="relative w-full h-full group"
      style={{ perspective: "2000px" }}
    >
      <div
        className={`absolute inset-0 transition-all duration-700 transform preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        } ${isFlipped ? "shadow-2xl" : "shadow-xl"}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front side of the card */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 to-black text-white p-4 sm:p-8 rounded-2xl border-2 border-yellow-500/50 flex flex-col justify-between items-center backface-hidden shadow-lg hover:shadow-yellow-500/20 transition-all duration-300"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Edit Icon */}
          <Link 
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-yellow-500/70 hover:text-yellow-400 cursor-pointer transform transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100" 
            href={`/category/${categoryId}/${cardId}/edit`}
          >
            <div className="p-1.5 sm:p-2 rounded-full hover:bg-yellow-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536M9 13h1.5a2 2 0 002-2V9.5m4.708-1.708a2 2 0 00-2.828 0l-9 9V21h4.5l9-9a2 2 0 000-2.828z"
                />
              </svg>
            </div>
          </Link>

          <div className="text-lg sm:text-2xl font-medium text-center leading-relaxed tracking-wide px-2 sm:px-4 overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-yellow-500/20 scrollbar-track-transparent">
            {question}
          </div>
          
          <button
            onClick={handleFlip}
            className="bg-yellow-500 w-[85%] sm:w-2/3 rounded-full py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base font-semibold hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 text-black mt-4"
          >
            Reveal Answer
          </button>
        </div>

        {/* Back side of the card */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 to-black text-white p-4 sm:p-8 rounded-2xl border-2 border-yellow-500/50 flex flex-col justify-between items-center transform rotate-y-180 backface-hidden shadow-lg hover:shadow-yellow-500/20 transition-all duration-300"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Edit Icon */}
          <Link 
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-yellow-500/70 hover:text-yellow-400 cursor-pointer transform transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100" 
            href={`/category/${categoryId}/${cardId}/edit`}
          >
            <div className="p-1.5 sm:p-2 rounded-full hover:bg-yellow-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536M9 13h1.5a2 2 0 002-2V9.5m4.708-1.708a2 2 0 00-2.828 0l-9 9V21h4.5l9-9a2 2 0 000-2.828z"
                />
              </svg>
            </div>
          </Link>

          <div className="text-lg sm:text-2xl font-medium text-center leading-relaxed tracking-wide px-2 sm:px-4 overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-yellow-500/20 scrollbar-track-transparent">
            {answer}
          </div>
          
          <button
            onClick={handleFlip}
            className="bg-yellow-500 w-[85%] sm:w-2/3 rounded-full py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base font-semibold hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 text-black mt-4"
          >
            Back to Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
