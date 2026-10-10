import { Category, Product } from "@/types";

const BASE_URL_1 = "https://openapi.programming-hero.com/api/bazardor";


export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL_1}/categories`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL_1}/products`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const res = await fetch(`${BASE_URL_1}/products?category=${category}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${BASE_URL_1}/products/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const res = await fetch(`${BASE_URL_1}/categories/${slug}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}