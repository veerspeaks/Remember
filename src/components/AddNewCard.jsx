import React from 'react'
import Link from 'next/link'

const AddNewCard = ({categoryId}) => {
    

  return (
    <div>
        <Link href={`/category/${categoryId}/new`}>
        <button className='bg-white text-red-700 px-8 rounded-full font-bold mb-8' > + Add </button>
        </Link>
        
    </div>
  )
}

export default AddNewCard