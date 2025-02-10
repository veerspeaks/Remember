import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const categories = await prisma.category.findMany();
        
        // Ensure we're returning an array, even if empty
        return NextResponse.json(categories || [], {
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json(
            { error: 'Failed to fetch categories' }, 
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { name } = body;

        if (!name) {
            return NextResponse.json(
                { message: "Category name is required" }, 
                { status: 400 }
            );
        }

        const result = await prisma.category.create({
            data: { name }
        });

        return NextResponse.json({ id: result.id, name }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error adding category', error }, 
            { status: 500 }
        );
    }
}