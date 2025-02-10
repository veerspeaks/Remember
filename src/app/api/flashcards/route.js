import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const categoryId = parseInt(searchParams.get('categoryId'));

    if (!categoryId) {
        return NextResponse.json(
            { error: 'Category ID is required' }, 
            { status: 400 }
        );
    }

    const flashcards = await prisma.flashcard.findMany({
        where: { categoryId: categoryId }
    });

    return NextResponse.json(flashcards, { status: 200 });
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { content, back, categoryId } = body;

        if (!content) {
            return NextResponse.json(
                { message: "Card content is required" }, 
                { status: 400 }
            );
        }
        
        if (!categoryId) {
            return NextResponse.json(
                { message: "Category ID is required" }, 
                { status: 400 }
            );
        }

        const result = await prisma.flashcard.create({
            data: {
                question: content,
                answer: back,
                categoryId: parseInt(categoryId)
            }
        });

        return NextResponse.json({ id: result.id, content }, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/flashcards:", error);
        return NextResponse.json(
            { message: 'Error adding card', error: error.message }, 
            { status: 500 }
        );
    }
}