"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getCategories } from "@/lib/api";
import { Category } from "@/types";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import PriceTicker from "./PriceTicker";
import NavbarDate from "./NavbarDate";

interface NavbarClientProps {
  initialCategories: Category[];
}

export default function NavbarClient({ initialCategories }: NavbarClientProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let active = true;
    getCategories()
      .then((data) => {
        if (active) setCategories(data);
      })
      .catch(console.error);
    return () => {
      active = false;
    };
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        {/* Row 1: Logo + Auth */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            onClick={closeMenu}
          >
            <Image
              src="/logo.svg"
              alt="বাজার দর লোগো"
              width={36}
              height={36}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              priority
            />
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-bold text-primary leading-tight">
                বাজার দর
              </span>
              <NavbarDate />
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            <Link
              href="/signin"
              className="text-sm font-medium text-gray-700 hover:text-primary whitespace-nowrap"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-primary text-white px-3 py-1.5 rounded-md hover:bg-primary-dark transition whitespace-nowrap"
            >
              সাইন আপ
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden pb-3 border-t border-gray-100">
            <div className="flex flex-col gap-1 pt-2">
              <Link href="/signin" onClick={closeMenu} className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                সাইন ইন
              </Link>
              <Link href="/signup" onClick={closeMenu} className="px-3 py-2 text-sm font-medium bg-primary text-white rounded-md text-center">
                সাইন আপ
              </Link>
            </div>
          </div>
        )}

        <nav className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-3 sm:-mx-4 px-3 sm:px-4">
          <Link
            href="/"
            onClick={closeMenu}
            className={cn(
              "text-xs sm:text-sm font-medium whitespace-nowrap px-2 py-1 rounded-md transition shrink-0",
              pathname === "/" ? "bg-primary/10 text-primary" : "text-gray-600 hover:text-primary"
            )}
          >
            সব
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              onClick={closeMenu}
              className={cn(
                "text-xs sm:text-sm font-medium whitespace-nowrap px-2 py-1 rounded-md transition flex items-center gap-1 shrink-0",
                pathname === `/category/${cat.slug}` ? "bg-primary/10 text-primary" : "text-gray-600 hover:text-primary"
              )}
            >
              <span>{cat.icon}</span> {cat.nameBn}
            </Link>
          ))}
        </nav>
      </div>
      <PriceTicker />
    </header>
  );
}