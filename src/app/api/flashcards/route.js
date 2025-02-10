import { prisma } from '@/lib/prisma'

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const categoryId = parseInt(searchParams.get('categoryId'));

    if (!categoryId) {
        return new Response(JSON.stringify({ error: 'Category ID is required' }), { status: 400 });
    }

    const flashcards = await prisma.flashcard.findMany({
        where: { categoryId: categoryId }
    });

    return new Response(JSON.stringify(flashcards), { status: 200 });
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { content, back, categoryId } = body;

        if (!content) {
            return new Response(JSON.stringify({ message: "Card content is required" }), { status: 400 });
        }
        
        if (!categoryId) {
            return new Response(JSON.stringify({ message: "Category ID is required" }), { status: 400 });
        }

        const result = await prisma.flashcard.create({
            data: {
                question: content,
                answer: back,
                categoryId: parseInt(categoryId)
            }
        });

        return new Response(JSON.stringify({ id: result.id, content }), { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/flashcards:", error);
        return new Response(JSON.stringify({ message: 'Error adding card', error: error.message }), { status: 500 });
    }
}