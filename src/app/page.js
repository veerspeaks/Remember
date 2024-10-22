import CategoryList from "@/components/CategoryList";

// Fetch categories server-side
export default async function Home() {
  const res = await fetch('https://remember-4wzs.onrender.com/api/categories', { next: { revalidate: 10 } });
  const categories = await res.json();

  return (
    <div className="flex justify-center">
      {/* Pass the fetched categories as a prop */}
      <CategoryList categories={categories} />
    </div>
  );
}
