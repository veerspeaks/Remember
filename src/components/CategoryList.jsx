'use client';

import CategoryCard from "./CategoryCard";
import AddCategoryForm from "./AddCategoryForm";
import Link from "next/link";
import { useState } from "react";

const CategoryList = ({ categories: initialCategories }) => {
    const [categories, setCategories] = useState(initialCategories || []);  // Use initial data

    const addCategory = (newCategory) => {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
    };

    return (
        <div className="h-full">
            <ul className="relative space-y-[-130px] p-8">  {/* Negative space to overlap the cards */}
                {categories.map((category, index) => (
                    <li key={category.id} className={`relative z-${index}`}>
                        <Link href={`/category/${category.id}`}>
                            <CategoryCard id={category.id} name={category.name} />
                        </Link>
                    </li>
                ))}
                <li className={`relative z-100`}>
                    <AddCategoryForm addCategory={addCategory} />
                </li>
            </ul>
        </div>
    );
};

export default CategoryList;
