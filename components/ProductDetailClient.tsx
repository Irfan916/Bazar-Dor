"use client";

import { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import { getProductById } from "@/lib/api";
import { Product } from "@/types";
import { formatPrice, getUnitLabel, toBengaliNumber } from "@/lib/utils";

export default function ProductDetailClient({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    startTransition(() => setLoading(true));

    async function fetchProduct() {
      try {
        const data = await getProductById(productId);
        if (!active) return;
        startTransition(() => {
          setProduct(data);
          setLoading(false);
        });
      } catch (e) {
        console.error(e);
        if (active) {
          startTransition(() => {
            setProduct(null);
            setLoading(false);
          });
        }
      }
    }

    fetchProduct();
    return () => {
      active = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full" />
          <div className="flex-1 space-y-3">
            <div className="w-48 h-6 bg-gray-200 rounded" />
            <div className="w-32 h-4 bg-gray-200 rounded" />
            <div className="w-24 h-4 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-xl" />
          ))}
        </div>
        <div className="mt-8 h-64 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <span className="text-5xl mb-4">🔍</span>
        <h1 className="text-xl font-bold text-gray-800">পণ্য পাওয়া যায়নি</h1>
        <p className="text-sm text-gray-500 mt-2">
          এই পণ্যটি বিদ্যমান নেই বা সরিয়ে ফেলা হয়েছে।
        </p>
        <Link
          href="/"
          className="mt-6 bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const allPrices = product.markets.flatMap((m) => [m.min, m.max]);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const avgPrice = Math.round(
    allPrices.reduce((sum, p) => sum + p, 0) / allPrices.length
  );

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 rounded-full flex items-center justify-center text-3xl sm:text-4xl shrink-0">
            {product.image || product.categoryIcon}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {product.nameBn}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {product.categoryNameBn} — আজকের বাজার দর
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                {product.categoryNameBn}
              </span>
              <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                {getUnitLabel(product.unit)}
              </span>
            </div>
          </div>
          <div className="text-right w-full sm:w-auto">
            <p className="text-xs text-gray-400">আজকের দাম</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              {formatPrice(product.today)}{" "}
              <span className="text-base font-normal">টাকা</span>
            </p>
            <span
              className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded ${
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
        </div>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">
        দামের সারসংক্ষেপ
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs sm:text-sm text-gray-500">সর্বনিম্ন দাম</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">
            {formatPrice(minPrice)}{" "}
            <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs sm:text-sm text-gray-500">সর্বোচ্চ দাম</p>
          <p className="text-xl sm:text-2xl font-bold text-red-600 mt-1">
            {formatPrice(maxPrice)}{" "}
            <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs sm:text-sm text-gray-500">গড় দাম</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
            {formatPrice(avgPrice)}{" "}
            <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3">
        বাজারভিত্তিক আজকের দাম
      </h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-3 sm:px-4 py-3 font-medium">
                  বাজার
                </th>
                <th className="text-left px-3 sm:px-4 py-3 font-medium">
                  বিভাগ
                </th>
                <th className="text-right px-3 sm:px-4 py-3 font-medium">
                  সর্বনিম্ন
                </th>
                <th className="text-right px-3 sm:px-4 py-3 font-medium">
                  সর্বোচ্চ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {product.markets.map((m, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-3 sm:px-4 py-3 text-gray-800 font-medium">
                    {m.market}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-gray-500">
                    {m.division}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-right text-green-700 font-medium">
                    {formatPrice(m.min)} টাকা
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-right text-red-700 font-medium">
                    {formatPrice(m.max)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}