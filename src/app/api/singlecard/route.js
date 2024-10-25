import query from "../../../lib/db.js";


export async function GET(req) {
    
    
    const {searchParams} = new URL(req.url)
    const categoryId = searchParams.get('categoryId');
    const cardId = searchParams.get('cardId');

    

    if (!categoryId) {
        return new Response(JSON.stringify({ error: `Category ID and cardId is required` }), { status: 400 });
      }
    
      const singlecard = await query('SELECT * FROM flashcards WHERE category_id = ? AND id = ?', [categoryId, cardId]);

      
      return new Response(JSON.stringify(singlecard), { status: 200 });
    }


export async function POST(req){

    try{
        const body = await req.json();  // Parse the JSON body
        const {searchParams} = new URL(req.url)
        const cardId = searchParams.get('cardId')
        const { content , back} = body;

        if(!content){
            return new Response(JSON.stringify({message:"card content is missing "}), {status:400})
        }
            const result = await query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?',[content, back, cardId])
            // const result = await query('INSERT INTO flashcards (question,answer,category_id) VALUES (?,?,?)', [content, back ,categoryId]);

            return new Response(JSON.stringify({ id: result.insertId, content }), { status: 201 });
        }
        catch (error) {
            return new Response(JSON.stringify({ message: 'Error adding category', error }), { status: 500 });
        }
    }

