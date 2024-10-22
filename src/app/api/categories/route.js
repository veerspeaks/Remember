import query from "../../../lib/db.js";


export async function GET() {
    const categories = await query ('SELECT * FROM categories')
    console.log(categories)
    return new Response(JSON.stringify(categories), {status:200 })
}

export async function POST(req,res) {
    
    try {
        const body = await req.json();  // Parse the JSON body
        const { name } = body;          // Extract the category name from the request body

        if (!name) {
            return new Response(JSON.stringify({ message: "Category name is required" }), { status: 400 });
        }

        // Insert the new category into the database
        const result = await query('INSERT INTO categories (name) VALUES (?)', [name]);

        return new Response(JSON.stringify({ id: result.insertId, name }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error adding category', error }), { status: 500 });
    }
    


}