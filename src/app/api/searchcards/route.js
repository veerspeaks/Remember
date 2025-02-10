// api/searchcards.js
import { prisma } from '@/lib/prisma'

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get("q") || ""; // Get the search term from query params

    const result = await prisma.flashcard.findMany({
        where: {
            OR: [
                { question: { contains: term } },
                { answer: { contains: term } }
            ]
        }
    });

    return new Response(JSON.stringify(result), { status: 200 });
}
