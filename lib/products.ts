import productsData from "@/data/products.json";
import { config } from "./config";

export type Product = {
  slug: string;
  name: string;
  priceCents: number;
  badge: string;
  summary: string;
  teaser: string;
  includes: string[];
  locked: string[];
  audience: string;
  fulfillment: string;
};

export function getProducts(): Product[] {
  return productsData as Product[];
}

export function getProduct(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: config.currency.toUpperCase()
  }).format(cents / 100);
}
