import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const categoryId = parseInt(searchParams.get('categoryId'));
    const cardId = parseInt(searchParams.get('cardId'));

    if (!categoryId || !cardId) {
        return NextResponse.json(
            { error: 'Category ID and card ID are required' }, 
            { status: 400 }
        );
    }

    const singlecard = await prisma.flashcard.findFirst({
        where: {
            categoryId: categoryId,
            id: cardId
        }
    });

    return NextResponse.json(singlecard, { status: 200 });
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { content, back, categoryId, cardId } = body;

        if (!content || !back || !categoryId || !cardId) {
            return NextResponse.json(
                { message: "All fields are required" }, 
                { status: 400 }
            );
        }

        const result = await prisma.flashcard.update({
            where: {
                id: parseInt(cardId)
            },
            data: {
                question: content,
                answer: back,
                categoryId: parseInt(categoryId)
            }
        });

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("Error updating card:", error);
        return NextResponse.json(
            { message: 'Error updating card', error: error.message }, 
            { status: 500 }
        );
    }
}