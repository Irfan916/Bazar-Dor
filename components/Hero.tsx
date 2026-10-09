import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-white py-8 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-6 md:gap-8">
        <div className="flex-1 text-center md:text-left">
          <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">
            আজকের বাজার
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 leading-tight">
            প্রয়োজনীয় পণ্যের দাম <br />
            <span className="text-primary">এক নজরে</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
            প্রতিদিনের বাজার খরচ পরিকল্পনা করুন সহজেই। দেশের বিভিন্ন বাজারের
            সর্বশেষ দাম জানুন।
          </p>
          <Link
            href="#সব-পণ্য"
            className="mt-5 sm:mt-6 inline-block bg-primary text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-primary-dark transition"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
          <Image
            src="/hero-basket.png"
            alt="বাজারের ঝুড়ি"
            width={400}
            height={400}
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}