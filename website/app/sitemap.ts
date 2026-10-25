import type { MetadataRoute } from "next";
import { site } from "@/site.config";
import { getProducts } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/shop", "/our-story", "/contact"].map((p) => ({ url: `${site.url}${p}` }));
  const products = (await getProducts()).map((p) => ({ url: `${site.url}/shop/${p.slug}` }));
  return [...pages, ...products];
}
