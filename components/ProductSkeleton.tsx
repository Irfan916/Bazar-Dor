export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 animate-pulse">
      <div className="flex items-start justify-between gap-2">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full" />
        <div className="w-10 h-3 sm:w-12 sm:h-4 bg-gray-200 rounded" />
      </div>
      <div className="mt-3 w-3/4 h-3 sm:h-4 bg-gray-200 rounded" />
      <div className="mt-1.5 w-1/2 h-2.5 sm:h-3 bg-gray-200 rounded" />
      <div className="mt-4 flex items-end justify-between">
        <div className="w-1/3 h-4 sm:h-5 bg-gray-200 rounded" />
        <div className="w-9 sm:w-10 h-3 sm:h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}