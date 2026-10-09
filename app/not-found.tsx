import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <span className="text-5xl sm:text-6xl mb-4">🔍</span>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        ৪০৪ — পেজ পাওয়া যায়নি
      </h1>
      <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-md">
        আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।
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