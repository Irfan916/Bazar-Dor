import Link from "next/link";
import { Product } from "@/types";
import { formatPrice, getUnitLabel, toBengaliNumber } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 hover:shadow-md transition flex flex-col"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl sm:text-3xl leading-none">
          {product.image || product.categoryIcon}
        </span>
        <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-50 px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap">
          {product.categoryNameBn}
        </span>
      </div>

      <h3 className="mt-2 sm:mt-3 font-semibold text-sm sm:text-base text-gray-900 line-clamp-2">
        {product.nameBn}
      </h3>
      <p className="text-[10px] sm:text-xs text-gray-500">
        {getUnitLabel(product.unit)}
      </p>

      <div className="mt-auto pt-2 sm:pt-3 flex items-end justify-between gap-1">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs text-gray-400">আজকের দাম</p>
          <p className="text-sm sm:text-lg font-bold text-gray-900 truncate">
            {formatPrice(product.today)}{" "}
            <span className="text-[10px] sm:text-sm font-normal">টাকা</span>
          </p>
        </div>
        <span
          className={`text-[10px] sm:text-xs font-semibold px-1 sm:px-1.5 py-0.5 rounded shrink-0 ${
            isUp
              ? "bg-green-50 text-green-700"
              : isDown
              ? "bg-red-50 text-red-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {toBengaliNumber(Math.abs(product.change.pct))}%
        </span>
      </div>
    </Link>
  );
}