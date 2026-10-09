import { Suspense } from "react";
import NavbarClient from "./NavbarClient";
import { getCategories } from "@/lib/api";
import { Category } from "@/types";

export default async function Navbar() {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch (e) {
    console.error("Failed to fetch categories in Navbar:", e);
  }

  return <Suspense
      fallback={
        <header className="sticky top-0 z-50 bg-white shadow-sm h-[132px]" />
      }
    >
      <NavbarClient initialCategories={categories}/>
    </Suspense>
}