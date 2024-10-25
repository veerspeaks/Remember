// api/searchcards.js

import query from "../../../lib/db.js";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get("q") || ""; // Get the search term from query params

    const result = await query(`
        SELECT * FROM flashcards 
        WHERE question LIKE ? OR answer LIKE ?
    `, [`%${term}%`, `%${term}%`]);

    return new Response(JSON.stringify(result), { status: 200 });
}
