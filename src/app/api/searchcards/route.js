// api/searchcards.js
import { prisma } from '@/lib/prisma'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const results = await prisma.flashcard.findMany({
      where: {
        OR: [
          {
            question: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            answer: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      },
      include: {
        category: true
      }
    });

    const formattedResults = results.map(card => ({
      id: card.id,
      question: card.question,
      answer: card.answer,
      category_id: card.categoryId,
      category_name: card.category.name
    }));

    return new Response(JSON.stringify(formattedResults), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    return new Response(JSON.stringify({ error: 'Failed to perform search' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
