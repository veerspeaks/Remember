"use client";

import React from 'react'
import localFont from "next/font/local";
import { useState } from 'react';
import axios from 'axios';


const geistMono = localFont({
    src: "../app/fonts/Bangers-Regular.ttf",
    variable: "--font-geist-mono",
    weight: "400",
  });


const AddCategoryForm = ({addCategory}) => {
    const [categoryName,setCategoryName] = useState("")
    const [message,setMessage] = useState("")

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const res = await axios.post('/api/categories', {name:categoryName})

            if(res.status === 201) {
                setMessage("Category added successfully!")
                addCategory(res.data)
            }
            else{
                setMessage("error adding category")
            }
            setCategoryName("")
        }
        catch(e){
            setMessage("An error has occured",e)
        }

    }

    

  return (
    <div>
        <div className='h-44 w-80 bg-black p-4 border border-red-800 text-center rounded-md  text-white'>
            <form className='flex-col flex items-center gap-2' onSubmit={handleSubmit}>
                <span className={`bg-red-700 text-white px-2 rounded-full ${geistMono.variable} font-bangers antialiased` } >Name New Category</span>
                <input className='rounded-full w-60 text-black' placeholder = "" type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}></input>
                <button className='bg-red-700 text-white px-4 rounded-full mt-12 font-bold' type='submit' >Submit</button>
            </form>
        </div>
    </div>
  )
}

export default AddCategoryForm