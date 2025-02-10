// api/searchcards.js
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json([], { status: 200 });
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

    return NextResponse.json(formattedResults, { status: 200 });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' }, 
      { status: 500 }
    );
  }
}
