import React from 'react'

const CategoryCard = ({id,name}) => {
  return (
    <div>
        <div className='h-44 w-80 bg-black p-2 border border-red-800 text-center rounded-md font-bold text-white'>
            {name}

        </div>
    
    </div>
  )
}

export default CategoryCard