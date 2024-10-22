'use client';

import CategoryCard from "./CategoryCard";
import AddCategoryForm from "./AddCategoryForm";
import { useState, useEffect } from "react";
import Link from "next/link";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/categories', {next: {revalidate:10}});
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []); // Empty dependency array means this runs once on mount

    const addCategory = (newCategory) => {
        setCategories((prevCategories) => [...prevCategories, newCategory])
    }

    return (
        <div className="h-full">
            <ul className="relative space-y-[-130px] p-8">  {/* Negative space to overlap the cards */}
                {categories.map((category, index) => (
                    <li key={category.id} className={`relative z-${index}`}>
                        <Link href={`/category/${category.id}`} >
                        <CategoryCard id={category.id} name={category.name} />
                        </Link>
                        
                    </li>
                ))}
                <li className={`relative z-100`}>
                    <AddCategoryForm addCategory={addCategory}/>
                </li>
            </ul>
        </div>
    );
};

export default CategoryList;
