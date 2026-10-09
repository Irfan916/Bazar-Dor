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

  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return <NavbarClient today={today} initialCategories={categories} />;
}