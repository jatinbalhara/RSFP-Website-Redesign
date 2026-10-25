import raw from "@/data/products.json";
import { site } from "@/site.config";

/**
 * Product data.
 *
 * Today this reads data/products.json (copied from the catalog).
 * When Supabase is set up, only the two functions at the bottom need to
 * change to query the `products` table (see supabase/schema.sql); the
 * pages call them and don't care where the data comes from.
 */

export type Category = "Pickles" | "Squash & Sharbat" | "Sweet Things";

export type Product = {
  slug: string;
  name: string;
  nameHi: string;
  category: Category;
  mrp: number | null;
  price: number | null;
  size: string;
  realPhoto: boolean;
  image: string; // 600px card image
  imageLarge: string; // 1200px product page image
  lifestyleImage: string | null;
  description: string;
  taste: string;
  pairsWith: string;
};

type RawProduct = (typeof raw)[number];

function fromRaw(p: RawProduct): Product {
  const size = p.size && p.size !== "TBC" ? p.size : site.sizeByCategory[p.category] ?? "Size to be confirmed";
  return {
    slug: p.slug,
    name: p.name,
    nameHi: p.name_hi,
    category: p.category as Category,
    mrp: p.mrp_inr ?? null,
    price: p.sale_inr ?? p.mrp_inr ?? null,
    size,
    realPhoto: p.photo_type === "real",
    image: `/images/products/${p.slug}-600.webp`,
    imageLarge: `/images/products/${p.slug}-1200.webp`,
    lifestyleImage: p.lifestyle_image ? `/images/lifestyle/${p.lifestyle_image.split("/").pop()}` : null,
    description: p.description,
    taste: p.taste,
    pairsWith: p.pairs_with,
  };
}

const products: Product[] = raw.map(fromRaw);

export const categories: { name: Category; slug: string; blurb: string }[] = [
  { name: "Pickles", slug: "pickles", blurb: "Sun-aged in mustard oil, the pahadi way." },
  { name: "Squash & Sharbat", slug: "sharbat", blurb: "Flowers and fruit of the hills, in a bottle." },
  { name: "Sweet Things", slug: "sweets", blurb: "Jam and petha for the sweet tooth." },
];

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}
