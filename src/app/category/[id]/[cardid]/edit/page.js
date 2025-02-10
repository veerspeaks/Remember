import EditCard from '@/components/EditCard'
import axios from 'axios'
import React from 'react'

const EditCardPage = async ({ params }) => {
    // Fetch the data on the server side
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/singlecard?categoryId=${params.id}&cardId=${params.cardid}`)
    const data = response.data // Get the card data
    
    return (
        <div>
            {/* Pass the data to the EditCard component */}
            <EditCard params={params} data={data} />
        </div>
    )
}

export default EditCardPage
