import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
        <div className="w-32 h-7 bg-gray-200 rounded animate-pulse" />
        <div className="w-40 h-9 bg-gray-200 rounded-lg animate-pulse" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}