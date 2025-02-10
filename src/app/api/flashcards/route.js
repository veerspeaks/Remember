import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = parseInt(searchParams.get('categoryId'));

        if (!categoryId || isNaN(categoryId)) {
            return NextResponse.json(
                { error: 'Valid Category ID is required' }, 
                { status: 400 }
            );
        }

        const flashcards = await prisma.flashcard.findMany({
            where: { categoryId: categoryId },
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return NextResponse.json(flashcards || [], { status: 200 });
    } catch (error) {
        console.error('Error fetching flashcards:', error);
        return NextResponse.json(
            { error: 'Failed to fetch flashcards' }, 
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { content, back, categoryId } = body;

        if (!content || !back || !categoryId) {
            return NextResponse.json(
                { error: "All fields are required" }, 
                { status: 400 }
            );
        }

        const parsedCategoryId = parseInt(categoryId);
        if (isNaN(parsedCategoryId)) {
            return NextResponse.json(
                { error: "Invalid category ID format" }, 
                { status: 400 }
            );
        }

        const result = await prisma.flashcard.create({
            data: {
                question: content,
                answer: back,
                categoryId: parsedCategoryId
            }
        });

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("Error creating flashcard:", error);
        return NextResponse.json(
            { error: 'Failed to create flashcard', details: error.message }, 
            { status: 500 }
        );
    }
}