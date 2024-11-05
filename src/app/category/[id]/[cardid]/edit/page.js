import EditCard from '@/components/EditCard'
import axios from 'axios'
import React from 'react'

const EditCardPage = async ({ params }) => {
    // Fetch the data on the server side
    const response = await axios.get(`https://remember-alpha-silk.vercel.app/api/singlecard?categoryId=${params.id}&cardId=${params.cardid}`)
    const data = response.data[0] // Get the card data

    return (
        <div>
            {/* Pass the data to the EditCard component */}
            <EditCard params={params} data={data} />
        </div>
    )
}

export default EditCardPage
