import { prisma } from '@/lib/prisma'

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const categoryId = parseInt(searchParams.get('categoryId'));
    const cardId = parseInt(searchParams.get('cardId'));

    if (!categoryId || !cardId) {
        return new Response(JSON.stringify({ error: `Category ID and card ID are required` }), { status: 400 });
    }

    const singlecard = await prisma.flashcard.findFirst({
        where: {
            categoryId: categoryId,
            id: cardId
        }
    });

    return new Response(JSON.stringify(singlecard), { status: 200 });
}




export async function POST(req) {
try {
  const body = await req.json();
  // Get cardId from the JSON body rather than from query parameters
  const { content, back, cardId } = body;

  if (!cardId) {
    return new Response(
      JSON.stringify({ message: "Card ID is required" }),
      { status: 400 }
    );
  }

  if (!content) {
    return new Response(
      JSON.stringify({ message: "Card content is missing" }),
      { status: 400 }
    );
  }

  const result = await prisma.flashcard.update({
    where: { id: parseInt(cardId) },
    data: { question: content, answer: back },
  });

  return new Response(JSON.stringify({ id: result.id, content }), {
    status: 201,
  });
} catch (error) {
  console.error("Error updating card:", error);
  return new Response(
    JSON.stringify({ message: "Error updating card", error: error.message }),
    { status: 500 }
  );
}
}