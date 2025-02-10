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
    const [categoryName, setCategoryName] = useState("")
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();
        if (!categoryName.trim()) return;
        
        setIsLoading(true);
        try {
            const res = await axios.post('/api/categories', {name: categoryName.trim()})

            if (res.status === 201) {
                setMessage("Category added successfully!")
                addCategory(res.data)
                setCategoryName("")
                // Clear success message after 3 seconds
                setTimeout(() => setMessage(""), 3000);
            } else {
                setMessage("Error adding category")
            }
        } catch (e) {
            setMessage("An error has occurred")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <div className='h-44 w-80 bg-gradient-to-br from-gray-900 to-black p-6 border-2 border-yellow-500/50 text-center rounded-xl text-white shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 group relative overflow-hidden'>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500 to-transparent group-hover:opacity-20 transition-opacity duration-300"></div>
                
                <form className='relative z-10 flex flex-col items-center gap-4' onSubmit={handleSubmit}>
                    <span className={`${geistMono.variable} font-bangers text-xl text-yellow-500/90`}>
                        Create New Category
                    </span>
                    
                    <div className="relative w-full">
                        <input 
                            className='w-full px-4 py-2 bg-black/50 border-2 border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/50 transition-all duration-300'
                            placeholder="Enter category name"
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>

                    {message && (
                        <p className={`text-sm ${message.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                            {message}
                        </p>
                    )}

                    <button
                        className={`px-6 py-2 bg-yellow-500 text-black rounded-full font-bold hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed ${isLoading ? 'cursor-wait' : ''}`}
                        type='submit'
                        disabled={isLoading || !categoryName.trim()}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating...
                            </span>
                        ) : 'Create Category'}
                    </button>
                </form>

                {/* Hover effect */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500/0 via-yellow-500/50 to-yellow-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
        </div>
    );
};

export default AddCategoryForm;