"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { Product } from "@/types";
import { formatPrice, toBengaliNumber } from "@/lib/utils";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.slice(0, 10)))
      .catch(console.error);
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="bg-gray-100 border-t border-b border-gray-200 py-1.5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...products, ...products].map((p, i) => (
          <span
            key={i}
            className="mx-3 sm:mx-4 text-xs sm:text-sm flex items-center gap-1 shrink-0"
          >
            <span>{p.image || p.categoryIcon}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span className="text-gray-600">
              {formatPrice(p.today)} টাকা/{p.unit}
            </span>
            <span
              className={
                p.change.dir === "up"
                  ? "text-green-600"
                  : p.change.dir === "down"
                  ? "text-red-600"
                  : "text-gray-500"
              }
            >
              {p.change.dir === "up"
                ? "▲"
                : p.change.dir === "down"
                ? "▼"
                : "—"}
              {toBengaliNumber(Math.abs(p.change.pct))}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}