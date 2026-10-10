import { Suspense } from "react";
import AuthGuard from "@/components/AuthGuard";
import ProductDetailClient from "@/components/ProductDetailClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
          <div className="h-40 bg-gray-200 rounded-xl" />
          <div className="grid grid-cols-3 gap-4 mt-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      }
    >
      <AuthGuard>
        <ProductDetailClient productId={slug} />
      </AuthGuard>
    </Suspense>
  );
}