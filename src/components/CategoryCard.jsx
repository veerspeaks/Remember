import React from 'react'

const CategoryCard = ({id, name}) => {
  return (
    <div className='h-44 w-80 bg-gradient-to-br from-gray-900 to-black pt-3 pb-6 px-6 border-2 border-yellow-500/50 text-center rounded-xl font-bold text-white shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 flex flex-col justify-center items-center group relative overflow-hidden hover:scale-105'>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500 to-transparent group-hover:opacity-20 transition-opacity duration-300"></div>
      
      {/* Card content */}
      <h2 className="text-yellow-500 text-xl mb-auto relative z-10">{name}</h2>
      <p className="text-gray-400 text-sm relative z-10">Click to view flashcards</p>
      
      {/* Hover effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500/0 via-yellow-500/50 to-yellow-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  )
}

export default CategoryCard