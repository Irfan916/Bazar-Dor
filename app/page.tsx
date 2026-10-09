import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { getProducts } from "@/lib/api";
import { Product } from "@/types";

export default async function Home() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch (e) {
    console.error(e);
  }

  return (
    <div>
      <Hero />

      <section className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
          সব পণ্য
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
          Loading state test
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}