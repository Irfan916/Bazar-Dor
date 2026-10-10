export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 animate-pulse">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full" />
          <div className="flex-1 space-y-3 w-full">
            <div className="w-48 h-6 bg-gray-200 rounded" />
            <div className="w-32 h-4 bg-gray-200 rounded" />
            <div className="flex gap-2 mt-3">
              <div className="w-20 h-6 bg-gray-200 rounded-full" />
              <div className="w-24 h-6 bg-gray-200 rounded-full" />
            </div>
          </div>
          <div className="w-32 h-12 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-xl" />
        ))}
      </div>

      <div className="mt-6 h-64 bg-gray-200 rounded-xl" />
    </div>
  );
}