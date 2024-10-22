import query from "../../../lib/db.js";


export async function GET(req) {
    console.log(req)
    const {searchParams} = new URL(req.url)
    const categoryId = searchParams.get('categoryId')

    if (!categoryId) {
        return new Response(JSON.stringify({ error: 'Category ID is required' }), { status: 400 });
      }
    
      const flashcards = await query('SELECT * FROM flashcards WHERE category_id = ?', [categoryId]);
      
      return new Response(JSON.stringify(flashcards), { status: 200 });
    }



export async function POST(req,res) {
    
  try {
      const body = await req.json();  // Parse the JSON body
      const {searchParams} = new URL(req.url)
      const categoryId = searchParams.get('categoryId')
      const { content , back} = body;
           // Extract the content from the request body

      if (!content) {
          return new Response(JSON.stringify({ message: "Card content is required" }), { status: 400 });
      }

      // Insert the new category into the database
      const result = await query('INSERT INTO flashcards (question,answer,category_id) VALUES (?,?,?)', [content, back ,categoryId]);

      return new Response(JSON.stringify({ id: result.insertId, content }), { status: 201 });
  } catch (error) {
      return new Response(JSON.stringify({ message: 'Error adding category', error }), { status: 500 });
  }
  
}