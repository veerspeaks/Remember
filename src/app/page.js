import CategoryList from "@/components/CategoryList";

// Fetch categories server-side
export default async function Home() {
  // Get the base URL from environment variables, or use a default for development
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/categories`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }
  
  const categories = await res.json();

  return (
    <div className="flex justify-center">
      {/* Pass the fetched categories as a prop */}
      <CategoryList categories={categories} />
    </div>
  );
}
