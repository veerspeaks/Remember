import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { flashcards: true }
                }
            }
        });
        
        return new Response(JSON.stringify(categories), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { name } = body;

        if (!name) {
            return new Response(JSON.stringify({ error: 'Category name is required' }), { status: 400 });
        }

        const category = await prisma.category.create({
            data: { name }
        });

        return new Response(JSON.stringify(category), { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return new Response(JSON.stringify({ error: 'Failed to create category' }), { status: 500 });
    }
}