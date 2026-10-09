import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { Product } from "@/types";

export default async function HomePage() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch (e) {
    console.error("Failed to fetch products:", e);
  }

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div>
      <Hero />

      {risers.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex items-baseline justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-green-600">▲</span> আজ দাম বেড়েছে
            </h2>
            <span className="text-xs sm:text-sm text-gray-500 hidden sm:block">
              সবচেয়ে বেশি বৃদ্ধি
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {risers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {fallers.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex items-baseline justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-red-600">▼</span> আজ দাম কমেছে
            </h2>
            <span className="text-xs sm:text-sm text-gray-500 hidden sm:block">
              সবচেয়ে বেশি হ্রাস
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {fallers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <section id="সব-পণ্য" className="max-w-6xl mx-auto px-4 py-6 sm:py-8 scroll-mt-32">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">সব পণ্য</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            মোট {products.length} টি পণ্যের আজকের বাজার দর
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}