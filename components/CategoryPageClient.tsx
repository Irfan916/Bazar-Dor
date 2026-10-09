"use client";

import { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import { Category, Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import SortDropdown from "@/components/SortDropdown";

export default function CategoryPageClient({ slug }: { slug: string }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    let active = true;

    startTransition(() => {
      setLoading(true);
    });

    async function fetchData() {
      try {
        const cat = await getCategoryBySlug(slug);
        if (!active) return;

        const prods = cat ? await getProductsByCategory(slug) : [];
        if (!active) return;

        startTransition(() => {
          setCategory(cat);
          setProducts(prods);
          setLoading(false);
        });
      } catch (e) {
        console.error(e);
        if (active) {
          startTransition(() => {
            setCategory(null);
            setProducts([]);
            setLoading(false);
          });
        }
      }
    }

    fetchData();
    return () => {
      active = false;
    };
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low-high") return a.today - b.today;
    if (sort === "high-low") return b.today - a.today;
    return 0;
  });

  // Empty / invalid state
  if (!loading && !category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <span className="text-5xl sm:text-6xl mb-4">🔍</span>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          ক্যাটাগরি পাওয়া যায়নি
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-md">
          দুঃখিত, এই ক্যাটাগরির কোনো পণ্য নেই বা লিংকটি সঠিক নয়।
        </p>
        <Link
          href="/"
          className="mt-6 bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition text-sm sm:text-base"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
          {category?.icon ? (
            <span className="text-2xl sm:text-3xl">{category.icon}</span>
          ) : null}
          {category?.nameBn || "..."}
        </h1>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">এই ক্যাটাগরিতে কোনো পণ্য নেই।</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {sortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}