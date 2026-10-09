import { getProducts, getCategories } from "@/lib/api";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">API Test</h1>
      <p className="mt-2">Total products: {products.length}</p>
      <p>Total categories: {categories.length}</p>
      <p className="mt-4">First product: {products[0]?.nameBn}</p>
      <p>First category: {categories[0]?.nameBn}</p>
    </div>
  );
}