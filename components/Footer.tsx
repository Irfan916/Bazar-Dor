export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 text-center sm:text-left">
        <p>
          <span className="font-semibold text-gray-800">বাজার দর</span> —
          প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-[11px] sm:text-xs text-gray-400">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}