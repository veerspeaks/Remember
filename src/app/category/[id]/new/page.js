import NewOrEditCard from '@/components/NewOrEditCard'
import React from 'react'

const NewCardPage = ({params}) => {
  return (
    <div>
        <NewOrEditCard params={params}/>
    </div>
  )
}

export default NewCardPage